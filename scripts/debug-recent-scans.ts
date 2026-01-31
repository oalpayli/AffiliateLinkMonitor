import { prisma } from '../lib/db.ts';

async function debugRecentScans() {
    console.log('🔍 Debugging Recent Scans Data\n');

    // Get all recent scans
    const allScans = await prisma.scan.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            monitor: {
                select: {
                    userId: true,
                    url: true
                }
            },
            links: {
                select: {
                    status: true,
                    stockStatus: true
                }
            }
        }
    });

    console.log(`Found ${allScans.length} recent scans:\n`);

    for (const scan of allScans) {
        console.log(`Scan ID: ${scan.id}`);
        console.log(`  URL: ${scan.url}`);
        console.log(`  Monitor ID: ${scan.monitorId || 'NULL (manual scan)'}`);
        console.log(`  Monitor User: ${scan.monitor?.userId || 'N/A'}`);
        console.log(`  Total Links: ${scan.links.length}`);

        const healthy = scan.links.filter(l => l.status === 'healthy').length;
        const broken = scan.links.filter(l => l.status === 'broken').length;
        const oos = scan.links.filter(l => l.stockStatus === 'out_of_stock').length;

        console.log(`  Healthy: ${healthy}`);
        console.log(`  Broken: ${broken}`);
        console.log(`  Out of Stock: ${oos}`);
        console.log(`  Created: ${scan.createdAt}`);
        console.log('');
    }

    // Test the current query
    console.log('\n📊 Testing Current Query (with monitor filter):\n');

    const scansWithMonitor = await prisma.scan.findMany({
        where: {
            monitor: {
                userId: allScans[0]?.monitor?.userId || 'test'
            }
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
    });

    console.log(`Found ${scansWithMonitor.length} scans with monitor filter`);
}

debugRecentScans().catch(console.error).finally(() => process.exit(0));
