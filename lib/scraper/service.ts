import { prisma } from '../db.ts';
import { scrapeAffiliateLinks, checkLinkHealth } from './idx.ts';

interface LinkResult {
    href: string;
    status: 'healthy' | 'broken' | 'error';
    statusCode: number;
    stockStatus?: 'in_stock' | 'out_of_stock' | 'unknown';
}

export async function saveScanResult(url: string, affiliateLinks: LinkResult[], monitorId?: string) {
    try {
        const scan = await prisma.scan.create({
            data: {
                url,
                monitorId,
                links: {
                    create: affiliateLinks.map(link => ({
                        href: link.href,
                        status: link.status,
                        statusCode: link.statusCode,
                        stockStatus: link.stockStatus || 'unknown'
                    }))
                }
            },
            include: {
                links: true
            }
        });
        return scan;
    } catch (error) {
        console.error('Error saving scan result:', error);
        throw error;
    }
}

export async function performFullScan(url: string, monitorId?: string) {
    // 1. Scrape for links
    const result = await scrapeAffiliateLinks(url);

    // 2. Check health of affiliate links
    const processedLinks: Array<{
        href: string,
        status: 'healthy' | 'broken' | 'error',
        statusCode: number,
        stockStatus: 'in_stock' | 'out_of_stock' | 'unknown'
    }> = [];

    if (result.affiliateLinks.length > 0) {
        for (const link of result.affiliateLinks) {
            // Add a small random delay (500ms - 1500ms) to identify as human/avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

            const health = await checkLinkHealth(link.href);
            processedLinks.push({
                href: link.href,
                status: health.status as 'healthy' | 'broken' | 'error',
                statusCode: health.statusCode,
                stockStatus: health.stockStatus
            });
        }
    }

    // 3. Save to DB
    const scan = await saveScanResult(url, processedLinks, monitorId);
    return scan;
}
