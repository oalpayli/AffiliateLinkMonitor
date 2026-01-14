import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const checkSubscription = async () => {
    const user = await getCurrentUser();

    if (!user) return false;

    const userSubscription = await prisma.userSubscription.findUnique({
        where: { userId: user.id },
        select: {
            dodoSubscriptionId: true,
            dodoCurrentPeriodEnd: true,
            dodoStatus: true,
        },
    });

    if (!userSubscription) return false;

    // Check if subscription is active and not expired
    const isValid =
        userSubscription.dodoStatus === 'active' &&
        userSubscription.dodoSubscriptionId &&
        userSubscription.dodoCurrentPeriodEnd &&
        userSubscription.dodoCurrentPeriodEnd.getTime() > Date.now();

    return !!isValid;
};
