import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Your actual Supabase user ID - get from the payment
    const userId = "45a21163-9225-4152-bbad-28957f227d6b"; // From the checkout log
    console.log(`Creating Pro subscription for user: ${userId}`);

    const sub = await prisma.userSubscription.upsert({
        where: { userId },
        update: {
            dodoCustomerId: 'pay_0NWGeGWGCnBTo4FNOEuiJ',
            dodoSubscriptionId: `sub_test_${Date.now()}`,
            dodoStatus: 'active',
            dodoVariantId: process.env.DODO_VARIANT_ID || 'pdt_0NWDlrZLIA8mweRFflkwI',
            dodoCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
            dodoCancelAtPeriodEnd: false,
        },
        create: {
            userId,
            dodoCustomerId: 'pay_0NWGeGWGCnBTo4FNOEuiJ',
            dodoSubscriptionId: `sub_test_${Date.now()}`,
            dodoStatus: 'active',
            dodoVariantId: process.env.DODO_VARIANT_ID || 'pdt_0NWDlrZLIA8mweRFflkwI',
            dodoCurrentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            dodoCancelAtPeriodEnd: false,
        },
    });

    console.log("✅ Pro subscription created:", sub);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
