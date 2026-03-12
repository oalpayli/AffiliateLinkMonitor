import type { Metadata } from 'next';
import { checkSubscription } from '@/lib/subscription';
import { SubscriptionButton } from '@/components/SubscriptionButton';
import { Check, ShieldCheck, AlertTriangle, Star } from 'lucide-react';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export const metadata: Metadata = {
    title: 'Pricing — Free & Pro Plans',
    description: 'Start free with 10 monitors. Upgrade to Pro for $12/month with hourly scans, bulk import, and priority support. No credit card required. 14-day money-back guarantee.',
    alternates: {
        canonical: `${BASE_URL}/pricing`,
    },
    openGraph: {
        title: 'Pricing — Free & Pro Plans',
        description: 'Start free with 10 monitors. Upgrade to Pro for $12/month. No credit card required.',
        url: `${BASE_URL}/pricing`,
    },
};

const pricingSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Affiliate Link Monitor',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${BASE_URL}/pricing`,
    offers: [
        {
            '@type': 'Offer',
            name: 'Free Plan',
            price: '0',
            priceCurrency: 'USD',
            description: '10 monitors, daily or weekly scans, email alerts. No credit card required.',
        },
        {
            '@type': 'Offer',
            name: 'Pro Plan',
            price: '12',
            priceCurrency: 'USD',
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '12',
                priceCurrency: 'USD',
                unitCode: 'MON',
            },
            description: '60 monitors, hourly scans, bulk import, priority support. 14-day money-back guarantee.',
        },
    ],
};

export default async function PricingPage() {
    const isPro = await checkSubscription();

    return (
        <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                {/* Header — Loss Aversion */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        How much are broken links costing you?
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Every day a broken link goes undetected is a day you&apos;re losing commissions you&apos;ll never recover.
                    </p>
                </div>

                {/* Social Proof */}
                <div className="flex flex-col items-center gap-3 mb-16">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-sm text-slate-400 max-w-md text-center">
                        <span className="text-white font-medium">&ldquo;Found 14 broken Amazon links in my first scan. This tool pays for itself.&rdquo;</span>
                        <br />
                        — Sarah M., Amazon Associates Publisher
                    </p>
                    <p className="text-xs text-slate-500">Trusted by 1,200+ affiliate marketers</p>
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
                            <p className="text-xs text-emerald-400 font-medium mt-2">Free forever — not a trial</p>
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

                        {/* Anchoring — Competitor Prices */}
                        <div className="text-center text-xs text-slate-500 mb-4 mt-2">
                            <span className="line-through">AMZ Watcher $19.95</span>
                            <span className="mx-2">·</span>
                            <span className="line-through">Lasso $29</span>
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <div className="flex items-baseline justify-center gap-1 mb-1">
                                <span className="text-5xl font-bold">$12</span>
                                <span className="text-slate-400">/month</span>
                            </div>
                            {/* Mental Accounting */}
                            <p className="text-xs text-violet-300 mt-2">Less than 1 lost commission. Pays for itself instantly.</p>
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

                {/* Money-back guarantee — Regret Aversion (bigger, more prominent) */}
                <div className="mt-10 p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl max-w-lg mx-auto text-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white font-semibold text-lg">14-Day Money-Back Guarantee</p>
                    <p className="text-slate-400 text-sm mt-1">Not happy? We&apos;ll refund every penny, no questions asked.</p>
                </div>

                {/* Loss Aversion nudge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span>Without hourly monitoring, a broken link can bleed commissions for up to 24 hours.</span>
                </div>

                {/* Pricing FAQ */}
                <div className="mt-24 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'How does the free plan work?',
                                a: 'The free plan includes 10 monitors and 5 one-time scans per day with daily or weekly scan frequency. No credit card required — just sign up and start monitoring immediately.',
                            },
                            {
                                q: 'Can I upgrade or downgrade anytime?',
                                a: 'Yes! You can upgrade from Free to Pro at any time. If you want to downgrade, you can cancel and your Pro features will remain active until the end of your billing period.',
                            },
                            {
                                q: 'Is there a money-back guarantee?',
                                a: 'Absolutely. We offer a 14-day money-back guarantee, no questions asked. If you\'re not satisfied for any reason, email us and we\'ll process your refund within 2 business days.',
                            },
                            {
                                q: 'Do you support team accounts?',
                                a: 'Currently all plans are single-user accounts. If you need multi-seat access, contact us at info@affiliatelinkmonitoring.com and we\'ll work something out for your team.',
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe integration. Payments are processed securely — we never store your card details.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="border border-slate-800 rounded-xl bg-slate-900/50 p-6">
                                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
