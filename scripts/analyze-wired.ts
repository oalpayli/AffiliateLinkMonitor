
import { scrapeAffiliateLinks, checkLinkHealth } from '../lib/scraper/idx.ts';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fetchPageContent } from '../lib/scraper/browser.ts';

// Monkey-patch console.log to be quiet for general logs if needed, 
// strictly we want to see the output here.

async function checkSpecificLink(url: string) {
    console.log(`\n--- Checking: ${url} ---`);
    const result = await checkLinkHealth(url);
    console.log(`Result: Status=${result.status}, Code=${result.statusCode}, Stock=${result.stockStatus}`);

    // If it's broken, try to see why (manually trace redirects)
    if (result.status === 'broken') {
        try {
            console.log('  Tracing redirects for broken link...');
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                },
                timeout: 10000,
                maxRedirects: 10,
                validateStatus: () => true
            });
            console.log(`  Final Status: ${response.status}`);
            console.log(`  Final URL: ${response.request.res.responseUrl}`);
        } catch (e: any) {
            console.log(`  Trace failed: ${e.message}`);
        }
    }

    // If OOS, try to see WHY (fetch content and search for keywords)
    if (result.stockStatus === 'out_of_stock' || result.stockStatus === 'unknown') {
        console.log('  Analyzing content for OOS triggers...');
        try {
            const html = await fetchPageContent(url); // Use browser to get what the scraper sees
            const lowerHtml = html.toLowerCase();

            const oosKeywords = [
                'currently unavailable',
                'out of stock',
                'sold out',
                'temporarily out of stock',
                'no longer available',
                'stokta yok',
                'tükendi',
                'temin edilememektedir',
                'satışa kapalı',
                'bu ürün şu an satılamamaktadır'
            ];

            const matchedKeyword = oosKeywords.find(k => lowerHtml.includes(k));
            if (matchedKeyword) {
                console.log(`  [MATCH] Found OOS keyword: "${matchedKeyword}"`);
                // Print context
                const idx = lowerHtml.indexOf(matchedKeyword);
                console.log(`  Context: "...${lowerHtml.substring(idx - 50, idx + 50)}..."`);
            } else {
                console.log('  [NO KEYWORD MATCH] - Checking Schema...');
            }

            if (lowerHtml.includes('schema.org/outofstock')) console.log('  [MATCH] Found schema.org/OutOfStock');
            if (lowerHtml.includes('schema.org/instock')) console.log('  [INFO] Found schema.org/InStock');

            // Check for Amazon "Deliver directly to Turkey" issue
            if (lowerHtml.includes('does not ship to') || lowerHtml.includes('cannot be shipped to')) {
                console.log('  [WARN] Potential Geolocation Issue: "cannot be shipped to" found.');
            }

        } catch (e) {
            console.error('  Content analysis failed:', e);
        }
    }
}

async function analyzeWired() {
    console.log('Scraping Wired page for links...');
    const url = 'https://www.wired.com/gallery/best-keyboards/';
    const result = await scrapeAffiliateLinks(url);
    console.log(`Found ${result.affiliateLinks.length} affiliate links.`);

    // Pick a few random ones + try to find Amazon ones specifically
    const amazonLinks = result.affiliateLinks.filter(l => l.href.includes('cna.st')); // Wired uses cna.st which redirects to Amz often

    // Check the first 3 links
    const linksToCheck = amazonLinks.slice(0, 3);

    for (const link of linksToCheck) {
        await checkSpecificLink(link.href);
    }
}

analyzeWired();
