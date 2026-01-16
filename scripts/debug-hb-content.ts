
import { fetchPageContent } from '../lib/scraper/browser.ts';
import * as cheerio from 'cheerio';

async function checkContent() {
    const url = 'https://www.hepsiburada.com/oneplus-6-64-gb-ithalatci-garantili-beyaz-pm-HB00000CFF9R';
    console.log(`fetching content for: ${url}`);

    try {
        const html = await fetchPageContent(url);
        // Save to file for manual inspection if needed, but for now just log key phrases
        // console.log(html); 

        const $ = cheerio.load(html);

        // Remove scripts/styles
        $('script').remove();
        $('style').remove();

        const text = $('body').text().replace(/\s+/g, ' ').toLowerCase();

        const index = text.indexOf('oneplus');
        if (index > -1) {
            console.log("Context around 'Oneplus':", text.substring(index, index + 2000));
        } else {
            console.log("Could not find product title in text");
        }

        const keywords = [
            'stokta yok',
            'tükendi',
            'temin edilememektedir',
            'satışa kapalı',
            'bu ürün geçici olarak temin edilememektedir',
            'şu anda satılmamaktadır'
        ];

        keywords.forEach(k => {
            if (text.includes(k)) console.log(`[MATCH] Found keyword: "${k}"`);
            else console.log(`[NO MACH] "${k}"`);
        });

    } catch (e) {
        console.error('Error:', e);
    }
}
checkContent();
