import { prisma } from '../lib/db.ts';

async function debugGroupBy() {
    console.log('🔍 Debugging groupBy Query\n');

    // Get recent scans
    const scans = await prisma.scan.findMany({
        where: { monitorId: null },
        orderBy: { createdAt: 'desc' },
        take: 3,
    });

    console.log(`Found ${scans.length} scans\n`);

    const scanIds = scans.map(s => s.id);
    console.log(`Scan IDs: ${scanIds.join(', ')}\n`);

    // Test groupBy
    console.log('Testing groupBy query...\n');
    const linkCounts = await prisma.link.groupBy({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        by: ['scanId', 'status', 'stockStatus'] as any,
        where: {
            scanId: { in: scanIds }
        },
        _count: true
    });

    console.log(`GroupBy returned ${linkCounts.length} results:\n`);
    console.log(JSON.stringify(linkCounts, null, 2));

    // Manual count for comparison
    console.log('\n\nManual count for comparison:\n');
    for (const scan of scans) {
        const links = await prisma.link.findMany({
            where: { scanId: scan.id },
            select: { status: true, stockStatus: true }
        });

        const healthy = links.filter(l => l.status === 'healthy').length;
        const broken = links.filter(l => l.status === 'broken').length;
        const oos = links.filter(l => l.stockStatus === 'out_of_stock').length;

        console.log(`Scan ${scan.id}:`);
        console.log(`  Total: ${links.length}`);
        console.log(`  Healthy: ${healthy}`);
        console.log(`  Broken: ${broken}`);
        console.log(`  OOS: ${oos}\n`);
    }
}

debugGroupBy().catch(console.error).finally(() => process.exit(0));
