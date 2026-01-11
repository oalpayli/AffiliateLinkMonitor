import { prisma } from '../lib/db';

async function main() {
    console.log('Connecting to DB...');
    try {
        const userId = 'debug_user_' + Date.now();
        const url = 'https://example.com/' + Date.now();

        console.log(`Attempting to create monitor for user ${userId} and url ${url}`);

        const monitor = await prisma.monitor.create({
            data: {
                userId,
                url,
                frequency: 'daily',
                alertEmail: 'test@example.com'
            }
        });

        console.log('Successfully created monitor:', monitor);
    } catch (e) {
        console.error('Failed to create monitor:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
