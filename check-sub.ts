import { prisma } from './lib/db';

async function main() {
    const subs = await prisma.userSubscription.findMany();
    console.log('User Subscriptions:', subs);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
