/**
 * Batch Scan Script
 *
 * Bu script leads.json'daki profillerin affiliate linklerini tarar
 * ve kirik/out-of-stock linkleri tespit eder.
 *
 * Kullanim:
 *   npx ts-node marketing/scripts/batch-scan.ts           # Tum pending leadleri tara
 *   npx ts-node marketing/scripts/batch-scan.ts --limit 5 # Sadece 5 lead tara
 *   npx ts-node marketing/scripts/batch-scan.ts --id abc123  # Belirli bir lead tara
 *
 * Cikti: marketing/data/leads.json (guncellenir)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { scrapeAffiliateLinks, checkLinkHealth } from '../../lib/scraper/idx.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== TYPES =====
interface Lead {
  id: string;
  platform: 'linktr.ee' | 'beacons.ai' | 'lnk.bio' | 'unknown';
  profileUrl: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  instagram: string | null;
  tiktok: string | null;
  twitter: string | null;
  youtube: string | null;
  email: string | null;
  website: string | null;
  allLinks: Array<{ text: string; url: string }>;
  affiliateLinkCount: number;
  amazonLinkCount: number;
  language: 'en' | 'tr' | 'unknown';
  status: 'pending' | 'scanned' | 'contacted' | 'responded' | 'converted' | 'not_interested';
  brokenLinkCount: number;
  outOfStockCount: number;
  scanDate: string | null;
  scanResults?: ScanResult[];
  notes: string;
  createdAt: string;
}

interface ScanResult {
  url: string;
  status: 'healthy' | 'broken' | 'error';
  statusCode: number;
  stockStatus: 'in_stock' | 'out_of_stock' | 'unknown';
}

interface LeadDatabase {
  version: string;
  lastUpdated: string;
  leads: Lead[];
}

// ===== DATABASE =====
function loadDatabase(filePath: string): LeadDatabase {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    leads: []
  };
}

function saveDatabase(filePath: string, db: LeadDatabase): void {
  db.lastUpdated = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));
}

// ===== SCANNER =====
async function scanLead(lead: Lead): Promise<Lead> {
  console.log(`\nTaraniyor: ${lead.username} (${lead.profileUrl})`);
  console.log('-'.repeat(50));

  try {
    // 1. Scrape the profile for affiliate links
    const result = await scrapeAffiliateLinks(lead.profileUrl);
    console.log(`  Toplam link: ${result.totalLinks}`);
    console.log(`  Affiliate link: ${result.affiliateLinks.length}`);

    if (result.affiliateLinks.length === 0) {
      console.log('  Affiliate link bulunamadi, atlaniyor...');
      lead.status = 'scanned';
      lead.scanDate = new Date().toISOString();
      lead.affiliateLinkCount = 0;
      return lead;
    }

    // 2. Check health of each affiliate link
    const scanResults: ScanResult[] = [];
    let brokenCount = 0;
    let outOfStockCount = 0;

    console.log('\n  Link durumu kontrol ediliyor...');

    for (const link of result.affiliateLinks) {
      process.stdout.write(`    ${link.href.substring(0, 50)}... `);

      try {
        const health = await checkLinkHealth(link.href);

        scanResults.push({
          url: link.href,
          status: health.status,
          statusCode: health.statusCode,
          stockStatus: health.stockStatus
        });

        if (health.status === 'broken') {
          brokenCount++;
          console.log(`KIRIK [${health.statusCode}]`);
        } else if (health.stockStatus === 'out_of_stock') {
          outOfStockCount++;
          console.log(`STOKTA YOK`);
        } else {
          console.log(`OK [${health.statusCode}]`);
        }

        // Small delay between requests
        await new Promise(r => setTimeout(r, 500));

      } catch (error: any) {
        console.log(`HATA: ${error.message}`);
        scanResults.push({
          url: link.href,
          status: 'error',
          statusCode: 0,
          stockStatus: 'unknown'
        });
      }
    }

    // 3. Update lead with results
    lead.affiliateLinkCount = result.affiliateLinks.length;
    lead.amazonLinkCount = result.affiliateLinks.filter(l =>
      l.href.includes('amazon') || l.href.includes('amzn.to')
    ).length;
    lead.brokenLinkCount = brokenCount;
    lead.outOfStockCount = outOfStockCount;
    lead.scanResults = scanResults;
    lead.scanDate = new Date().toISOString();
    lead.status = 'scanned';

    console.log(`\n  Ozet: ${brokenCount} kirik, ${outOfStockCount} stokta yok`);

  } catch (error: any) {
    console.error(`  Tarama hatasi: ${error.message}`);
  }

  return lead;
}

// ===== REPORT GENERATOR =====
function generateOutreachReport(lead: Lead): string {
  if (!lead.scanResults || lead.scanResults.length === 0) {
    return '';
  }

  const brokenLinks = lead.scanResults.filter(r => r.status === 'broken');
  const outOfStockLinks = lead.scanResults.filter(r => r.stockStatus === 'out_of_stock');

  let report = `# Link Raporu: ${lead.username}\n`;
  report += `Tarih: ${lead.scanDate}\n\n`;

  if (brokenLinks.length > 0) {
    report += `## Kirik Linkler (${brokenLinks.length})\n`;
    for (const link of brokenLinks) {
      report += `- ${link.url} [${link.statusCode}]\n`;
    }
    report += '\n';
  }

  if (outOfStockLinks.length > 0) {
    report += `## Stokta Olmayan Urunler (${outOfStockLinks.length})\n`;
    for (const link of outOfStockLinks) {
      report += `- ${link.url}\n`;
    }
    report += '\n';
  }

  if (brokenLinks.length === 0 && outOfStockLinks.length === 0) {
    report += `Tum linkler calisiyor!\n`;
  }

  return report;
}

// ===== MAIN =====
async function main() {
  const args = process.argv.slice(2);

  const dataDir = path.join(__dirname, '..', 'data');
  const dbPath = path.join(dataDir, 'leads.json');
  const reportsDir = path.join(dataDir, 'reports');

  // Ensure directories exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const db = loadDatabase(dbPath);

  if (db.leads.length === 0) {
    console.log(`
Batch Scan - Toplu Link Tarama
==============================

Hata: Veritabaninda lead bulunamadi!

Once lead-finder ile profil ekleyin:
  npx ts-node marketing/scripts/lead-finder.ts https://linktr.ee/username

Kullanim:
  npx ts-node marketing/scripts/batch-scan.ts           # Tum pending leadleri tara
  npx ts-node marketing/scripts/batch-scan.ts --limit 5 # Sadece 5 lead tara
  npx ts-node marketing/scripts/batch-scan.ts --id abc123  # Belirli bir lead tara
    `);
    process.exit(0);
  }

  // Parse arguments
  let limit = Infinity;
  let specificId: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--limit' && args[i + 1]) {
      limit = parseInt(args[i + 1], 10);
    }
    if (args[i] === '--id' && args[i + 1]) {
      specificId = args[i + 1];
    }
  }

  // Select leads to scan
  let leadsToScan: Lead[];

  if (specificId) {
    const lead = db.leads.find(l => l.id === specificId);
    if (!lead) {
      console.error(`Lead bulunamadi: ${specificId}`);
      process.exit(1);
    }
    leadsToScan = [lead];
  } else {
    // Get pending leads (not yet scanned)
    leadsToScan = db.leads
      .filter(l => l.status === 'pending')
      .slice(0, limit);
  }

  if (leadsToScan.length === 0) {
    console.log('Taranacak pending lead bulunamadi.');
    console.log(`Toplam lead: ${db.leads.length}`);
    console.log(`Pending: ${db.leads.filter(l => l.status === 'pending').length}`);
    console.log(`Scanned: ${db.leads.filter(l => l.status === 'scanned').length}`);
    process.exit(0);
  }

  console.log(`\nBatch Scan - ${leadsToScan.length} lead taranacak\n`);
  console.log('='.repeat(50));

  // Scan each lead
  for (let i = 0; i < leadsToScan.length; i++) {
    const lead = leadsToScan[i];
    console.log(`\n[${i + 1}/${leadsToScan.length}]`);

    const scannedLead = await scanLead(lead);

    // Update in database
    const idx = db.leads.findIndex(l => l.id === lead.id);
    if (idx !== -1) {
      db.leads[idx] = scannedLead;
    }

    // Generate report if there are issues
    if (scannedLead.brokenLinkCount > 0 || scannedLead.outOfStockCount > 0) {
      const report = generateOutreachReport(scannedLead);
      const reportPath = path.join(reportsDir, `${scannedLead.username}.md`);
      fs.writeFileSync(reportPath, report);
      console.log(`  Rapor kaydedildi: ${reportPath}`);
    }

    // Save database after each scan (in case of interruption)
    saveDatabase(dbPath, db);

    // Delay between profiles
    if (i < leadsToScan.length - 1) {
      console.log('\n  2 saniye bekleniyor...');
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(50));
  console.log('\nTarama Tamamlandi!\n');

  const scannedLeads = db.leads.filter(l => l.status === 'scanned');
  const withIssues = scannedLeads.filter(l => l.brokenLinkCount > 0 || l.outOfStockCount > 0);

  console.log('Ozet:');
  console.log(`  Toplam lead: ${db.leads.length}`);
  console.log(`  Taranan: ${scannedLeads.length}`);
  console.log(`  Sorunlu (kirik/stokta yok): ${withIssues.length}`);

  if (withIssues.length > 0) {
    console.log('\nOncelikli Outreach Listesi (Kirik Link Var):');
    console.log('-'.repeat(50));
    for (const lead of withIssues) {
      console.log(`  ${lead.username}`);
      console.log(`    Kirik: ${lead.brokenLinkCount}, Stokta Yok: ${lead.outOfStockCount}`);
      if (lead.instagram) console.log(`    Instagram: ${lead.instagram}`);
      if (lead.email) console.log(`    Email: ${lead.email}`);
      console.log('');
    }
  }

  console.log(`\nVeritabani: ${dbPath}`);
  console.log(`Raporlar: ${reportsDir}`);
}

main().catch(console.error);
