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
        // Process links in parallel batches of 5 for speed
        const BATCH_SIZE = 5;

        for (let i = 0; i < result.affiliateLinks.length; i += BATCH_SIZE) {
            const batch = result.affiliateLinks.slice(i, i + BATCH_SIZE);

            // Process batch in parallel
            const batchResults = await Promise.all(
                batch.map(async (link) => {
                    const health = await checkLinkHealth(link.href);
                    return {
                        href: link.href,
                        status: health.status as 'healthy' | 'broken' | 'error',
                        statusCode: health.statusCode,
                        stockStatus: health.stockStatus
                    };
                })
            );

            processedLinks.push(...batchResults);

            // Small delay between batches to avoid overwhelming the target
            if (i + BATCH_SIZE < result.affiliateLinks.length) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }

    // 3. Save to DB
    const scan = await saveScanResult(url, processedLinks, monitorId);
    return scan;
}
