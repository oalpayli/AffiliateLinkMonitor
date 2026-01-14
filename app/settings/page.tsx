import { checkSubscription } from '@/lib/subscription';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import SettingsClient from '@/components/SettingsClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const userId = user.id;
    const isPro = await checkSubscription();

    let subscriptionData = null;

    if (userId && isPro) {
        try {
            const subscription = await prisma.userSubscription.findUnique({
                where: { userId }
            });

            if (subscription && subscription.dodoSubscriptionId) {
                subscriptionData = {
                    periodEnd: subscription.dodoCurrentPeriodEnd,
                    isCancelled: subscription.dodoCancelAtPeriodEnd || false
                };
            }
        } catch (error) {
            console.error('Error fetching subscription data:', error);
            // Continue without subscription data
        }
    }

    return <SettingsClient isPro={isPro} subscriptionData={subscriptionData} />;
}
