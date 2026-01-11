import { prisma } from './lib/db';

async function main() {
    // 1. Use the specific User ID observed in the browser
    const userId = "user_386EzfjLpNITqG3FrZVe5GqRtIX";
    console.log(`Using User ID: ${userId}`);

    // 2. Upsert a Pro Subscription
    const sub = await prisma.userSubscription.upsert({
        where: { userId },
        update: {
            stripePriceId: process.env.PRO_PRICE_ID || "price_1SoHkKChvVDDWChElAb1LJvm",
            stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
            stripeCustomerId: `cus_force_pro_test_${Date.now()}`,
            stripeSubscriptionId: `sub_force_pro_test_${Date.now()}`,
        },
        create: {
            userId,
            stripePriceId: process.env.PRO_PRICE_ID || "price_1SoHkKChvVDDWChElAb1LJvm",
            stripeCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            stripeCustomerId: `cus_force_pro_test_${Date.now()}`,
            stripeSubscriptionId: `sub_force_pro_test_${Date.now()}`,
        },
    });

    console.log("Forced Pro Subscription:", sub);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
