import { prisma } from '../lib/db.ts';

async function main() {
    const scans = await prisma.scan.findMany({
        include: { links: true }
    });
    console.log(JSON.stringify(scans, null, 2));
}

main();
