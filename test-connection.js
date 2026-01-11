const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        console.log('Testing database connection...');
        const count = await prisma.monitor.count();
        console.log('✓ Connection successful! Monitor count:', count);

        // Test if userSubscription table exists
        const subCount = await prisma.userSubscription.count();
        console.log('✓ UserSubscription table exists! Count:', subCount);
    } catch (e) {
        console.error('✗ Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
