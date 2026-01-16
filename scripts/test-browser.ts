
import puppeteer from 'puppeteer-core';

async function test() {
    console.log('Launching browser...');
    try {
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: true
        });
        console.log('Browser launched!');
        const page = await browser.newPage();
        await page.goto('https://example.com');
        console.log('Page title:', await page.title());
        await browser.close();
    } catch (e) {
        console.error('Failed:', e);
    }
}
test();
