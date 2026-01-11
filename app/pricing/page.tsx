import { checkSubscription } from '@/lib/subscription';
import { SubscriptionButton } from '@/components/SubscriptionButton';
import { Check, X } from 'lucide-react';

export default async function PricingPage() {
    const isPro = await checkSubscription();

    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Choose the plan that fits your needs. Upgrade at any time.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Free Plan */}
                <div className="glass-card p-8 rounded-2xl flex flex-col border border-slate-800 relative overflow-hidden">
                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-slate-300 mb-2">Free Starter</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">$0</span>
                            <span className="text-slate-500">/month</span>
                        </div>
                        <p className="text-slate-400 mt-4">Perfect for hobbyists and testing.</p>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-emerald-400" />
                            <span className="text-slate-300">3 Active Monitors</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-emerald-400" />
                            <span className="text-slate-300">Daily Checks</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <X className="h-5 w-5 text-slate-600" />
                            <span className="text-slate-500">Hourly Checks</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <X className="h-5 w-5 text-slate-600" />
                            <span className="text-slate-500">Email Alerts</span>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button disabled className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-medium cursor-not-allowed">
                            {isPro ? 'Downgrade to Free' : 'Current Plan'}
                        </button>
                    </div>
                </div>

                {/* Pro Plan */}
                <div className="glass-card p-8 rounded-2xl flex flex-col border border-indigo-500/30 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                        POPULAR
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-indigo-400 mb-2">Pro Business</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-white">$9</span>
                            <span className="text-slate-500">/month</span>
                        </div>
                        <p className="text-slate-400 mt-4">For serious affiliate marketers.</p>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-indigo-400" />
                            <span className="text-slate-200">50 Active Monitors</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-indigo-400" />
                            <span className="text-slate-200">Hourly Checks</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-indigo-400" />
                            <span className="text-slate-200">Email Alerts</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-indigo-400" />
                            <span className="text-slate-200">Priority Support</span>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="w-full">
                            <SubscriptionButton isPro={isPro} className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
