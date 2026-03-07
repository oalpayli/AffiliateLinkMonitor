import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, DollarSign, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pageradar Alternative — Free Affiliate Link Monitoring Without the Price',
    description: 'Looking for a Pageradar alternative? Affiliate Link Monitor offers broken link detection and out-of-stock alerts at $12/month — cheaper than Pageradar with a free plan included.',
    keywords: ['pageradar alternative', 'pageradar free alternative', 'cheaper pageradar alternative', 'pageradar vs affiliate link monitor'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/alternative/pageradar' },
    openGraph: {
        title: 'Pageradar Alternative — Free Affiliate Link Monitoring',
        description: 'Free plan available. $12/month Pro. Detect broken links and out-of-stock products without Pageradar\'s price.',
        url: 'https://www.affiliatelinkmonitoring.com/alternative/pageradar',
    },
};

export default function PageradarAlternativePage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Shield className="h-4 w-4" />
                            Comparison Guide 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Free{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Pageradar</span>{' '}
                            Alternative for Affiliate Marketers
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Pageradar starts at $14/month with no free plan. Affiliate Link Monitor gives you a genuinely useful free tier — 10 monitors, daily scans — with Pro at $12/month. Same core monitoring, lower cost.
                        </p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why affiliates look for Pageradar alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <DollarSign className="h-6 w-6 text-red-400" />, title: 'No Free Plan', desc: 'Pageradar requires a paid subscription from day one. Affiliate Link Monitor offers a permanent free plan with 10 monitors and daily scans — no credit card required.' },
                                { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: 'Higher Starting Price', desc: 'Pageradar starts at $14/month. Our Pro plan is $12/month with 60 monitors. If you\'re just starting out or have a smaller site, the cost difference adds up over the year.' },
                                { icon: <Globe className="h-6 w-6 text-violet-400" />, title: 'Limited Platform Coverage', desc: 'Pageradar is built primarily for Amazon affiliate sites. Affiliate Link Monitor works with any URL — Amazon, Pinterest, Linktree, ShareASale, or any affiliate program.' },
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                    <div className="mb-4 p-2 bg-slate-950/50 rounded-lg w-fit border border-slate-800">{item.icon}</div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Feature</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-violet-400">LinkMonitor</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">Pageradar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Free Plan', us: true, them: false },
                                        { feature: 'Broken Link Detection', us: true, them: true },
                                        { feature: 'Out-of-Stock Alerts', us: true, them: true },
                                        { feature: 'Email Alerts', us: true, them: true },
                                        { feature: 'Works with Any URL', us: true, them: false },
                                        { feature: 'Pinterest / Linktree Support', us: true, them: false },
                                        { feature: 'Hourly Monitoring', us: true, them: true },
                                        { feature: 'Starting Price', usText: '$0/month', themText: '$14/month' },
                                        { feature: 'Pro Price', usText: '$12/month', themText: '$14/month+' },
                                        { feature: 'Best For', usText: 'All affiliate links', themText: 'Amazon-focused sites' },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-slate-800/50 last:border-0">
                                            <td className="px-6 py-4 text-sm text-slate-300">{row.feature}</td>
                                            <td className="px-6 py-4 text-center">
                                                {row.usText ? <span className="text-sm text-emerald-400 font-medium">{row.usText}</span> : row.us ? <Check className="h-5 w-5 text-emerald-400 mx-auto" /> : <X className="h-5 w-5 text-red-400 mx-auto" />}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.themText ? <span className="text-sm text-slate-400">{row.themText}</span> : row.them ? <Check className="h-5 w-5 text-emerald-400 mx-auto" /> : <X className="h-5 w-5 text-red-400 mx-auto" />}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">Where Pageradar shines:</strong> If you have a large Amazon-focused site and need advanced ASIN-level analytics, Pageradar provides deeper Amazon-specific reporting. For most affiliates who just need reliable monitoring with a lower entry cost, Affiliate Link Monitor is the better fit.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start monitoring for free today</h2>
                        <p className="text-slate-400 text-lg mb-8">No credit card. No trial period. Just paste your URL and go.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg">
                                Start Free — No Card Required
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
