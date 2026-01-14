import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // User from logs: c0fd99e1-17e3-4078-8201-02be44df42c4
    const userId = "c0fd99e1-17e3-4078-8201-02be44df42c4";
    console.log(`Fixing subscription for user: ${userId}`);

    const sub = await prisma.userSubscription.update({
        where: { userId },
        data: {
            dodoCustomerId: 'cus_0NWGhJolhGcv5CWqw1E59', // Correct customer ID from logs
            dodoSubscriptionId: 'sub_0NWGhJoyWQyhZ0FoRXom9', // Correct subscription ID from logs
            dodoStatus: 'active',
        },
    });

    console.log("✅ Subscription updated with correct customer ID:", sub);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
