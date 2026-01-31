import { prisma } from '../lib/db.ts';

async function testFixedQuery() {
    console.log('🧪 Testing Fixed Recent Scans Query\n');

    // Get a user ID from recent scans
    const recentScan = await prisma.scan.findFirst({
        orderBy: { createdAt: 'desc' },
        include: {
            monitor: {
                select: { userId: true }
            }
        }
    });

    // For testing, we'll use a dummy userId since manual scans don't have one
    const testUserId = recentScan?.monitor?.userId || 'test-user-id';

    console.log(`Testing with userId: ${testUserId}\n`);

    // Get user's monitors
    const userMonitors = await prisma.monitor.findMany({
        where: { userId: testUserId },
        select: { id: true }
    });

    const monitorIds = userMonitors.map(m => m.id);
    console.log(`User has ${userMonitors.length} monitors`);
    console.log(`Monitor IDs: ${monitorIds.join(', ') || 'none'}\n`);

    // New query with OR condition
    const scans = await prisma.scan.findMany({
        where: {
            OR: [
                { monitorId: { in: monitorIds } },
                { monitorId: null }
            ]
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            links: {
                select: {
                    status: true,
                    stockStatus: true
                }
            }
        }
    });

    console.log(`✅ Found ${scans.length} scans\n`);

    scans.forEach((scan, index) => {
        const healthy = scan.links.filter(l => l.status === 'healthy').length;
        const broken = scan.links.filter(l => l.status === 'broken').length;
        const oos = scan.links.filter(l => l.stockStatus === 'out_of_stock').length;

        console.log(`${index + 1}. ${scan.url.substring(0, 50)}...`);
        console.log(`   Monitor: ${scan.monitorId || 'Manual Scan'}`);
        console.log(`   Total: ${scan.links.length} | Healthy: ${healthy} | Broken: ${broken} | OOS: ${oos}`);
    });
}

testFixedQuery().catch(console.error).finally(() => process.exit(0));
