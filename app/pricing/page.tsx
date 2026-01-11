'use client';

import { Check } from 'lucide-react';

export default function PricingPage() {
    const handleSubscribe = async () => {
        try {
            const response = await fetch('/api/stripe/checkout', { method: 'POST' });
            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
            <p className="text-center text-slate-400 mb-12">
                Start for free, upgrade when you need more power.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Free Plan */}
                <div className="glass-card p-8 rounded-2xl flex flex-col">
                    <h2 className="text-xl font-semibold text-slate-300">Free Tier</h2>
                    <div className="text-4xl font-bold mt-4 mb-2">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <p className="text-slate-500 text-sm mb-6">Perfect for checking a few links manually.</p>

                    <ul className="space-y-4 mb-8 flex-grow">
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-emerald-500" /> 3 Monitors</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-emerald-500" /> Daily Check Frequency</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-emerald-500" /> Basic Email Alerts</li>
                    </ul>

                    <button className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 pointer-events-none opacity-50">
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="glass-card p-8 rounded-2xl flex flex-col border-violet-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
                    <h2 className="text-xl font-semibold text-violet-300">Pro Power</h2>
                    <div className="text-4xl font-bold mt-4 mb-2">$9<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <p className="text-slate-500 text-sm mb-6">For serious affiliate marketers.</p>

                    <ul className="space-y-4 mb-8 flex-grow">
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-violet-400" /> 50 Monitors</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-violet-400" /> Hourly Check Frequency</li>
                        <li className="flex items-center gap-2"><Check className="h-5 w-5 text-violet-400" /> Priority Support</li>
                    </ul>

                    <button
                        onClick={handleSubscribe}
                        className="w-full btn-primary py-3 rounded-xl text-white font-medium hover:scale-[1.02] transition-transform"
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>
    );
}
