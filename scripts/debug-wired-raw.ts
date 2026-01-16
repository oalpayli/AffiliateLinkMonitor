
import { scrapeDynamicContent } from '../lib/scraper/browser.ts';

async function testWiredRaw() {
    const url = 'https://www.wired.com/gallery/best-keyboards/';
    console.log(`Scraping RAW URL: ${url}`);

    try {
        const links = await scrapeDynamicContent(url);
        console.log(`Total RAW Links Found: ${links.length}`);

        // Print links that look interesting (contain 'go', 'amazon', 'offer', or external)
        const interesting = links.filter(l =>
            l.href.includes('/go/') ||
            l.href.includes('amazon') ||
            l.href.includes('howl') ||
            l.href.includes('skimresources') ||
            !l.href.includes('wired.com')
        );

        console.log('Interesting Links Sample (first 20):');
        interesting.slice(0, 20).forEach(l => console.log(`- [${l.text}] ${l.href}`));

    } catch (e) {
        console.error('Error:', e);
    }
}

testWiredRaw();
