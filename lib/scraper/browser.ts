
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// Helper to wait for timeout
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function scrapeDynamicContent(url: string) {
    let browser = null;
    try {
        // Configure Chromium based on environment
        // Local: Use local Chrome executable
        // Production (Vercel): Use @sparticuz/chromium
        const isLocal = process.env.NODE_ENV === 'development';

        // Path to local Chrome/Chromium - THIS NEEDS TO BE ADJUSTED FOR MAC OS
        const localExecutablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

        const options = isLocal ? {
            args: [],
            executablePath: localExecutablePath,
            headless: true
        } : {
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        };

        browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        // Set User Agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Scroll to bottom to trigger lazy loading (essential for social feeds)
        await autoScroll(page);

        // Wait a bit for final renders
        await wait(2000);

        // Extract all 'a' tags
        const links = await page.evaluate(() => {
            const anchorTags = Array.from(document.querySelectorAll('a'));
            return anchorTags.map(a => ({
                href: a.href,
                text: a.innerText.trim() || ''
            })).filter(l => l.href.startsWith('http'));
        });

        // SPECIAL HANDLING: YouTube Description
        // YouTube descriptions often don't use <a> tags for everything in the collapsed state
        // We'll try to find the description text specifically if it's a youtube video
        if (url.includes('youtube.com/watch')) {
            const descriptionLinks = await page.evaluate(() => {
                // Try to grab text from description and regex match URLs
                // This is a backup if <a> tags aren't sufficient
                const descriptionEl = document.querySelector('#description-inline-expander') || document.querySelector('#description');
                if (!descriptionEl) return [];

                const text = descriptionEl.textContent || '';
                const urlRegex = /(https?:\/\/[^\s]+)/g;
                const matches = text.match(urlRegex) || [];
                return matches.map(href => ({ href, text: 'YouTube Description Link' }));
            });

            // Merge unique
            const existingHrefs = new Set(links.map(l => l.href));
            descriptionLinks.forEach(l => {
                if (!existingHrefs.has(l.href)) {
                    links.push(l);
                    existingHrefs.add(l.href);
                }
            });
        }

        return links;

    } catch (error) {
        console.error('Browser Scraper Failed:', error);
        throw error;
    } finally {
        if (browser) await browser.close();
    }
}

async function autoScroll(page: any) {
    await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                // Stop scrolling if we've gone far enough (e.g. 5000px) or hit bottom
                if (totalHeight >= 3000 || totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
