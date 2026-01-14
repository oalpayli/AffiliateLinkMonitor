import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Use a Supabase UUID format
    // Example: You'd get this from your Supabase dashboard after creating a test user
    const userId = "550e8400-e29b-41d4-a716-446655440000"; // Replace with your actual Supabase test user ID
    console.log(`Using Supabase User ID: ${userId}`);

    // Upsert a Pro Subscription (Dodo Payments)
    const sub = await prisma.userSubscription.upsert({
        where: { userId },
        update: {
            dodoVariantId: process.env.DODO_VARIANT_ID || "variant_test_123",
            dodoCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
            dodoCustomerId: `cus_force_pro_test_${Date.now()}`,
            dodoSubscriptionId: `sub_force_pro_test_${Date.now()}`,
            dodoStatus: 'active',
            dodoCancelAtPeriodEnd: false,
        },
        create: {
            userId,
            dodoVariantId: process.env.DODO_VARIANT_ID || "variant_test_123",
            dodoCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            dodoCustomerId: `cus_force_pro_test_${Date.now()}`,
            dodoSubscriptionId: `sub_force_pro_test_${Date.now()}`,
            dodoStatus: 'active',
            dodoCancelAtPeriodEnd: false,
        },
    });

    console.log("Forced Pro Subscription (Dodo Payments):", sub);
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
