import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Use a Supabase UUID format
    // Example: You'd get this from your Supabase dashboard after creating a test user
    const userId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with your actual Supabase test user ID
    console.log(`Using Supabase User ID: ${userId}`);

    // Upsert a Pro Subscription
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
    console.log("\n✅ Test subscription created!");
    console.log("⚠️  Remember: Replace the userId with your actual Supabase test user UUID");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
