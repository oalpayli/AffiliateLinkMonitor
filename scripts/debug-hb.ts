
import { checkLinkHealth } from '../lib/scraper/idx.ts';

async function testHb() {
    const url = 'https://www.hepsiburada.com/oneplus-6-64-gb-ithalatci-garantili-beyaz-pm-HB00000CFF9R';
    console.log(`Checking URLs: ${url}`);

    try {
        const result = await checkLinkHealth(url);
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

testHb();
