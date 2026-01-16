
import { checkLinkHealth } from '../lib/scraper/idx.ts';

async function testBestBuy() {
    const url = 'https://www.bestbuy.com/product/razer-joro-portable-75-wireless-scissor-gaming-keyboard-with-chroma-rgb-backlighting-black/J39HWFHFXV?irclickid=3RiX1FSTPxycUW8yNmXAAzsAUkpSxq2hD1aqSU0&irgwc=1&afsrc=1&ref=198&loc=Wired&acampID=0&mpid=1305164&affgroup=%22Content%22';
    console.log(`Checking BestBuy URL: ${url}`);

    try {
        const result = await checkLinkHealth(url);
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (e) {
        console.error('Error:', e);
    }
}

testBestBuy();
