import { checkSubscription } from '@/lib/subscription';
import { SubscriptionButton } from '@/components/SubscriptionButton';
import { Check } from 'lucide-react';

export default async function PricingPage() {
    const isPro = await checkSubscription();

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Start free. No credit card required. Upgrade when you grow.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Tier */}
                    <div className="p-8 rounded-2xl border bg-slate-900/50 border-slate-800 relative">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-1">
                                <span className="text-5xl font-bold">$0</span>
                                <span className="text-slate-400">/forever</span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>10 monitors</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Daily or Weekly scans</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Email alerts</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Single link addition</span>
                            </li>
                        </ul>

                        <button
                            disabled
                            className="block w-full text-center px-6 py-3 rounded-xl font-semibold bg-slate-800 text-slate-400 cursor-not-allowed"
                        >
                            Current Plan
                        </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-2xl border bg-gradient-to-b from-violet-500/10 to-slate-900/50 border-violet-500/50 relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 text-white text-sm font-semibold rounded-full">
                            Most Popular
                        </div>

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-1">
                                <span className="text-5xl font-bold">$12</span>
                                <span className="text-slate-400">/per</span>
                            </div>
                            <p className="text-sm text-slate-500">month</p>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>60 monitors</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Hourly, Daily, or Weekly scans</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Email alerts</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Bulk import</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Check className="h-5 w-5 text-violet-400 flex-shrink-0" />
                                <span>Priority support</span>
                            </li>
                        </ul>

                        <SubscriptionButton isPro={isPro} className="w-full !bg-white !text-slate-900 font-bold hover:!bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}
