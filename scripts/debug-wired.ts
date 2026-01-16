
import { scrapeAffiliateLinks } from '../lib/scraper/idx.ts';

async function testWired() {
    const url = 'https://www.wired.com/gallery/best-keyboards/';
    console.log(`Scraping URL: ${url}`);

    try {
        const result = await scrapeAffiliateLinks(url);
        console.log(`Total Links Found: ${result.totalLinks}`);
        console.log(`Affiliate Links Found: ${result.affiliateLinks.length}`);

        // Log the first few links to see what they look like, even if not affiliate
        // We need to modify scrapeAffiliateLinks to verify what raw links it sees if count is 0
        // But here I can only see the result.

        if (result.affiliateLinks.length > 0) {
            console.log('Sample Affiliate Links:', result.affiliateLinks.slice(0, 3));
        } else {
            console.log('No affiliate links found. This might be due to filtering.');
            // Since we can't easily see the raw links from the return value of scrapeAffiliateLinks
            // (it returns the filtered list), I will just rely on manually inspecting the page or
            // hacking the check.
            // Wait, I can't see them.
            // I'll assume I need to use the browser scraper directly to see raw links.
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

testWired();
