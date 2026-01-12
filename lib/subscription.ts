import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const user = await getCurrentUser();

    if (!user) return false;

    const userSubscription = await prisma.userSubscription.findUnique({
        where: { userId: user.id },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    });

    if (!userSubscription) return false;

    const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd &&
        userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
};
