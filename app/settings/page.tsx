import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import SettingsClient from '@/components/SettingsClient';

export default async function SettingsPage() {
    const isPro = await checkSubscription();
    const { userId } = await auth();

    let subscriptionData = null;

    if (userId && isPro) {
        try {
            const subscription = await prisma.userSubscription.findUnique({
                where: { userId }
            });

            if (subscription && subscription.stripeSubscriptionId) {
                subscriptionData = {
                    periodEnd: subscription.stripeCurrentPeriodEnd,
                    isCancelled: subscription.stripeCancelAtPeriodEnd || false
                };
            }
        } catch (error) {
            console.error('Error fetching subscription data:', error);
            // Continue without subscription data
        }
    }

    return <SettingsClient isPro={isPro} subscriptionData={subscriptionData} />;
}
