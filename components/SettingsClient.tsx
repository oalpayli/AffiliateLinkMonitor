'use client';

import { useState } from 'react';
import { Settings, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import SettingsForm from '@/components/SettingsForm';
import { SubscriptionButton } from '@/components/SubscriptionButton';
import CancelSubscriptionDialog from '@/components/CancelSubscriptionDialog';
import { InvoicesTable } from '@/components/InvoicesTable';
import { UpdatePaymentMethodButton } from '@/components/UpdatePaymentMethodButton';

interface SettingsClientProps {
    isPro: boolean;
    subscriptionData: {
        periodEnd: Date | null;
        isCancelled: boolean;
    } | null;
}

export default function SettingsClient({ isPro, subscriptionData }: SettingsClientProps) {
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const formattedPeriodEnd = subscriptionData?.periodEnd
        ? new Date(subscriptionData.periodEnd).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : null;

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
                        {isPro && formattedPeriodEnd && (
                            <div className="text-right">
                                <p className="text-sm text-slate-400 mb-1">
                                    {subscriptionData?.isCancelled ? 'Cancels on' : 'Renews on'}
                                </p>
                                <p className="text-sm font-medium text-emerald-400">{formattedPeriodEnd}</p>
                            </div>
                        )}
                    </div>

                    {/* Cancellation Notice */}
                    {isPro && subscriptionData?.isCancelled && formattedPeriodEnd && (
                        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="text-yellow-200 font-medium mb-1">Subscription Cancelled</p>
                                <p className="text-yellow-200/80">
                                    Your Pro features will remain active until <strong>{formattedPeriodEnd}</strong>. After this date, you&apos;ll be downgraded to the Free plan.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 items-center mt-6">
                        {!isPro ? (
                            <SubscriptionButton isPro={isPro} className="flex-1 w-full" />
                        ) : (
                            <div className="flex gap-3 w-full">
                                {!subscriptionData?.isCancelled && (
                                    <>
                                        <UpdatePaymentMethodButton />
                                        <button
                                            onClick={() => setShowCancelDialog(true)}
                                            className="px-4 py-2 rounded-lg font-medium bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-all border border-red-900/30 ml-auto"
                                        >
                                            Cancel Subscription
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Billing History (Only for Pro or past subscribers) */}
                {isPro && (
                    <div className="glass-card p-6 rounded-2xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
                            <span className="text-2xl">📄</span>
                            Billing History
                        </h2>
                        <InvoicesTable />
                    </div>
                )}

                {/* General Settings Form */}
                <SettingsForm />
            </div>

            {/* Cancel Dialog */}
            <CancelSubscriptionDialog
                isOpen={showCancelDialog}
                onClose={() => setShowCancelDialog(false)}
                periodEnd={subscriptionData?.periodEnd || null}
            />
        </div>
    );
}
