import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('⚠️  WARNING: This will delete ALL user data!');
    console.log('⚠️  Resetting monitors, scans, links, and subscriptions...\n');

    try {
        // Delete in correct order to respect foreign key constraints
        console.log('1. Deleting links...');
        const linksDeleted = await prisma.link.deleteMany({});
        console.log(`   ✓ Deleted ${linksDeleted.count} links`);

        console.log('2. Deleting scans...');
        const scansDeleted = await prisma.scan.deleteMany({});
        console.log(`   ✓ Deleted ${scansDeleted.count} scans`);

        console.log('3. Deleting monitors...');
        const monitorsDeleted = await prisma.monitor.deleteMany({});
        console.log(`   ✓ Deleted ${monitorsDeleted.count} monitors`);

        console.log('4. Deleting user subscriptions...');
        const subscriptionsDeleted = await prisma.userSubscription.deleteMany({});
        console.log(`   ✓ Deleted ${subscriptionsDeleted.count} subscriptions`);

        console.log('\n✅ Database reset complete!');
        console.log('   All user data has been cleared.');
        console.log('   Ready for Supabase user IDs.');
    } catch (error) {
        console.error('\n❌ Error resetting database:', error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
