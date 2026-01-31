/**
 * Lead Finder Script
 *
 * Bu script Linktree ve Beacons profillerini tarar ve potansiyel
 * affiliate marketer'lari bulur.
 *
 * Kullanim:
 *   npx ts-node marketing/scripts/lead-finder.ts <url>
 *   npx ts-node marketing/scripts/lead-finder.ts https://linktr.ee/username
 *   npx ts-node marketing/scripts/lead-finder.ts --file urls.txt
 *
 * Cikti: marketing/data/leads.json
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

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
  notes: string;
  createdAt: string;
}

interface LeadDatabase {
  version: string;
  lastUpdated: string;
  leads: Lead[];
}

// ===== CONFIG =====
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const AFFILIATE_DOMAINS = [
  'amzn.to', 'amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.com.tr',
  'shareasale.com', 'cj.com', 'rakuten.com', 'impact.com',
  'clickbank.net', 'avangate.com', 'geni.us', 'bit.ly',
  'rstyle.me', 'shopstyle.com', 'skimresources.com', 'viglink.com',
  'howl.me', 'cna.st', 'shopmy.us', 'ltk.app', 'liketoknow.it'
];

const SOCIAL_PATTERNS = {
  instagram: [/instagram\.com\/([^\/\?]+)/, /instagr\.am\/([^\/\?]+)/],
  tiktok: [/tiktok\.com\/@([^\/\?]+)/],
  twitter: [/twitter\.com\/([^\/\?]+)/, /x\.com\/([^\/\?]+)/],
  youtube: [/youtube\.com\/(c\/|channel\/|@)?([^\/\?]+)/, /youtu\.be\/([^\/\?]+)/],
};

// ===== HELPERS =====
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function detectPlatform(url: string): Lead['platform'] {
  if (url.includes('linktr.ee')) return 'linktr.ee';
  if (url.includes('beacons.ai')) return 'beacons.ai';
  if (url.includes('lnk.bio')) return 'lnk.bio';
  return 'unknown';
}

function extractUsername(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(p => p);
    return pathParts[0] || 'unknown';
  } catch {
    return 'unknown';
  }
}

function isAffiliateLink(href: string): boolean {
  try {
    const url = new URL(href);
    return AFFILIATE_DOMAINS.some(domain => url.hostname.includes(domain));
  } catch {
    return false;
  }
}

function isAmazonLink(href: string): boolean {
  try {
    const url = new URL(href);
    return url.hostname.includes('amazon') || url.hostname.includes('amzn.to');
  } catch {
    return false;
  }
}

function extractSocialHandle(links: Array<{ url: string }>, platform: keyof typeof SOCIAL_PATTERNS): string | null {
  for (const link of links) {
    for (const pattern of SOCIAL_PATTERNS[platform]) {
      const match = link.url.match(pattern);
      if (match) {
        return '@' + (match[2] || match[1]);
      }
    }
  }
  return null;
}

function extractEmail(html: string): string | null {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = html.match(emailPattern);
  if (matches) {
    // Filter out common false positives
    const filtered = matches.filter(email =>
      !email.includes('example.com') &&
      !email.includes('email.com') &&
      !email.includes('@2x') &&
      !email.includes('.png') &&
      !email.includes('.jpg')
    );
    return filtered[0] || null;
  }
  return null;
}

function detectLanguage(text: string): Lead['language'] {
  const turkishChars = /[şğüöçıİĞÜŞÖÇ]/;
  const turkishWords = ['merhaba', 'benim', 'hakkında', 'iletişim', 'ürün', 'ürünler', 'favorilerim'];

  const lowerText = text.toLowerCase();

  if (turkishChars.test(text)) return 'tr';
  if (turkishWords.some(word => lowerText.includes(word))) return 'tr';

  return 'en'; // Default to English
}

// ===== SCRAPER =====
async function scrapeLinkTreeProfile(url: string): Promise<Partial<Lead>> {
  console.log(`  Scraping Linktree: ${url}`);

  const response = await axios.get(url, {
    headers: { 'User-Agent': USER_AGENT },
    timeout: 10000
  });

  const $ = cheerio.load(response.data);

  // Extract display name
  const displayName = $('h1').first().text().trim() ||
                      $('[data-testid="ProfileHeader"]').find('h1').text().trim() ||
                      $('header h1').text().trim();

  // Extract bio
  const bio = $('[data-testid="ProfileHeader"] p').text().trim() ||
              $('header p').text().trim() ||
              $('meta[name="description"]').attr('content') || null;

  // Extract all links
  const allLinks: Array<{ text: string; url: string }> = [];
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && href.startsWith('http')) {
      allLinks.push({ text, url: href });
    }
  });

  const affiliateLinkCount = allLinks.filter(l => isAffiliateLink(l.url)).length;
  const amazonLinkCount = allLinks.filter(l => isAmazonLink(l.url)).length;

  return {
    displayName: displayName || null,
    bio: bio || null,
    allLinks,
    affiliateLinkCount,
    amazonLinkCount,
    instagram: extractSocialHandle(allLinks, 'instagram'),
    tiktok: extractSocialHandle(allLinks, 'tiktok'),
    twitter: extractSocialHandle(allLinks, 'twitter'),
    youtube: extractSocialHandle(allLinks, 'youtube'),
    email: extractEmail(response.data),
    language: detectLanguage(displayName + ' ' + (bio || ''))
  };
}

async function scrapeBeaconsProfile(url: string): Promise<Partial<Lead>> {
  console.log(`  Scraping Beacons: ${url}`);

  const response = await axios.get(url, {
    headers: { 'User-Agent': USER_AGENT },
    timeout: 10000
  });

  const $ = cheerio.load(response.data);

  // Beacons specific selectors
  const displayName = $('h1').first().text().trim() ||
                      $('[class*="name"]').first().text().trim();

  const bio = $('[class*="bio"]').text().trim() ||
              $('meta[name="description"]').attr('content') || null;

  const allLinks: Array<{ text: string; url: string }> = [];
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && href.startsWith('http')) {
      allLinks.push({ text, url: href });
    }
  });

  const affiliateLinkCount = allLinks.filter(l => isAffiliateLink(l.url)).length;
  const amazonLinkCount = allLinks.filter(l => isAmazonLink(l.url)).length;

  return {
    displayName: displayName || null,
    bio: bio || null,
    allLinks,
    affiliateLinkCount,
    amazonLinkCount,
    instagram: extractSocialHandle(allLinks, 'instagram'),
    tiktok: extractSocialHandle(allLinks, 'tiktok'),
    twitter: extractSocialHandle(allLinks, 'twitter'),
    youtube: extractSocialHandle(allLinks, 'youtube'),
    email: extractEmail(response.data),
    language: detectLanguage(displayName + ' ' + (bio || ''))
  };
}

async function scrapeProfile(url: string): Promise<Lead> {
  const platform = detectPlatform(url);
  const username = extractUsername(url);

  let scraped: Partial<Lead> = {};

  try {
    if (platform === 'linktr.ee') {
      scraped = await scrapeLinkTreeProfile(url);
    } else if (platform === 'beacons.ai') {
      scraped = await scrapeBeaconsProfile(url);
    } else {
      // Generic scraper for unknown platforms
      scraped = await scrapeLinkTreeProfile(url); // Use same logic
    }
  } catch (error: any) {
    console.error(`  Error scraping ${url}: ${error.message}`);
  }

  return {
    id: generateId(),
    platform,
    profileUrl: url,
    username,
    displayName: scraped.displayName || null,
    bio: scraped.bio || null,
    instagram: scraped.instagram || null,
    tiktok: scraped.tiktok || null,
    twitter: scraped.twitter || null,
    youtube: scraped.youtube || null,
    email: scraped.email || null,
    website: null,
    allLinks: scraped.allLinks || [],
    affiliateLinkCount: scraped.affiliateLinkCount || 0,
    amazonLinkCount: scraped.amazonLinkCount || 0,
    language: scraped.language || 'unknown',
    status: 'pending',
    brokenLinkCount: 0,
    outOfStockCount: 0,
    scanDate: null,
    notes: '',
    createdAt: new Date().toISOString()
  };
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

function isDuplicate(db: LeadDatabase, profileUrl: string): boolean {
  return db.leads.some(lead => lead.profileUrl === profileUrl);
}

// ===== MAIN =====
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Lead Finder - Affiliate Marketer Arama Araci
============================================

Kullanim:
  npx ts-node marketing/scripts/lead-finder.ts <url>
  npx ts-node marketing/scripts/lead-finder.ts https://linktr.ee/username
  npx ts-node marketing/scripts/lead-finder.ts --file urls.txt

Ornekler:
  # Tek bir profil tara
  npx ts-node marketing/scripts/lead-finder.ts https://linktr.ee/fashionista

  # Birden fazla profil tara (urls.txt dosyasindan)
  npx ts-node marketing/scripts/lead-finder.ts --file urls.txt

Google Dorking ile URL Bulma:
  site:linktr.ee "amazon associates"
  site:linktr.ee "my amazon storefront"
  site:beacons.ai "shop my favorites"
  site:beacons.ai "affiliate"

Cikti: marketing/data/leads.json
    `);
    process.exit(0);
  }

  const dataDir = path.join(__dirname, '..', 'data');
  const dbPath = path.join(dataDir, 'leads.json');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = loadDatabase(dbPath);
  let urls: string[] = [];

  // Parse arguments
  if (args[0] === '--file' && args[1]) {
    const filePath = args[1];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      urls = content.split('\n').map(u => u.trim()).filter(u => u && u.startsWith('http'));
    } else {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
  } else {
    urls = args.filter(arg => arg.startsWith('http'));
  }

  if (urls.length === 0) {
    console.error('No valid URLs provided');
    process.exit(1);
  }

  console.log(`\nLead Finder - ${urls.length} URL islenecek\n`);
  console.log('='.repeat(50));

  let newLeads = 0;
  let skipped = 0;
  let errors = 0;

  for (const url of urls) {
    // Skip duplicates
    if (isDuplicate(db, url)) {
      console.log(`[SKIP] Already exists: ${url}`);
      skipped++;
      continue;
    }

    try {
      const lead = await scrapeProfile(url);

      // Only add if it has affiliate links
      if (lead.affiliateLinkCount > 0) {
        db.leads.push(lead);
        newLeads++;
        console.log(`[OK] ${lead.username} - ${lead.affiliateLinkCount} affiliate link (${lead.amazonLinkCount} Amazon)`);
        if (lead.instagram) console.log(`     Instagram: ${lead.instagram}`);
        if (lead.email) console.log(`     Email: ${lead.email}`);
      } else {
        console.log(`[SKIP] No affiliate links: ${url}`);
        skipped++;
      }

      // Small delay to be nice to servers
      await new Promise(r => setTimeout(r, 1000));

    } catch (error: any) {
      console.error(`[ERROR] ${url}: ${error.message}`);
      errors++;
    }
  }

  // Save database
  saveDatabase(dbPath, db);

  console.log('\n' + '='.repeat(50));
  console.log(`\nOzet:`);
  console.log(`  Yeni lead: ${newLeads}`);
  console.log(`  Atlanan: ${skipped}`);
  console.log(`  Hata: ${errors}`);
  console.log(`  Toplam lead: ${db.leads.length}`);
  console.log(`\nVeritabani: ${dbPath}`);
}

main().catch(console.error);
