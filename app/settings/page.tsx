import { checkSubscription } from '@/lib/subscription';
import SettingsForm from '@/components/SettingsForm';
import { SubscriptionButton } from '@/components/SubscriptionButton';
import { Settings, CreditCard } from 'lucide-react';

export default async function SettingsPage() {
    const isPro = await checkSubscription();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                <Settings className="h-8 w-8 text-violet-400" />
                Settings
            </h1>
            <p className="text-slate-400 mb-8">
                Manage your global preferences and configurations.
            </p>

            <div className="space-y-8">
                {/* Subscription Management */}
                <div className="glass-card p-6 rounded-2xl border border-slate-800">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
                        <CreditCard className="h-5 w-5 text-slate-400" />
                        Subscription
                    </h2>

                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl mb-6 border border-slate-800">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Current Plan</p>
                            <p className="text-lg font-bold text-white flex items-center gap-2">
                                {isPro ? (
                                    <>
                                        <span className="text-violet-400">Pro Plan</span>
                                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">Active</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-slate-300">Free Tier</span>
                                    </>
                                )}
                            </p>
                        </div>
                        {isPro && (
                            <div className="text-right">
                                <p className="text-sm text-slate-400 mb-1">Status</p>
                                <p className="text-sm font-medium text-emerald-400">Active</p>
                            </div>
                        )}
                    </div>

                    <SubscriptionButton isPro={isPro} />
                </div>

                {/* General Settings Form */}
                <SettingsForm />
            </div>
        </div>
    );
}
