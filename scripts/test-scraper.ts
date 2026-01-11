import { scrapeAffiliateLinks, checkLinkHealth } from '../lib/scraper/idx.ts';
import { saveScanResult } from '../lib/scraper/service.ts';

async function main() {
    const url = process.argv[2];
    if (!url) {
        console.error('Please provide a URL to scrape');
        process.exit(1);
    }

    console.log(`🔍 Scraping ${url}...`);
    try {
        const result = await scrapeAffiliateLinks(url);
        console.log(`✅ Found ${result.totalLinks} total links.`);
        console.log(`🎯 Found ${result.affiliateLinks.length} affiliate links.`);

        const processedLinks: Array<{ href: string, status: 'healthy' | 'broken' | 'error', statusCode: number }> = [];

        if (result.affiliateLinks.length > 0) {
            console.log('\nTesting affiliate link health...');
            for (const link of result.affiliateLinks) {
                process.stdout.write(`Checking ${link.href} ... `);
                const health = await checkLinkHealth(link.href);
                const icon = health.status === 'healthy' ? '✅' : '❌';
                console.log(`${icon} [${health.statusCode}]`);

                processedLinks.push({
                    href: link.href,
                    status: health.status as 'healthy' | 'broken' | 'error',
                    statusCode: health.statusCode
                });
            }

            console.log('\n💾 Saving results to database...');
            const savedScan = await saveScanResult(url, processedLinks);
            console.log(`✅ Saved scan with ID: ${savedScan.id}`);
            console.log(`   - Saved ${savedScan.links.length} links`);
        } else {
            console.log('\nNo affiliate links found. Saving scan with 0 links...');
            const savedScan = await saveScanResult(url, []);
            console.log(`✅ Saved scan with ID: ${savedScan.id}`);
        }

    } catch (error) {
        console.error('❌ Error scraping url:', error);
    }
}

main();
