import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, DollarSign, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AMZ Watcher Alternative — Free Amazon Link Monitoring',
    description:
        'Looking for a free AMZ Watcher alternative? Affiliate Link Monitor offers free broken Amazon link detection with out-of-stock alerts. No page credit system.',
    keywords: [
        'amz watcher alternative',
        'amz watcher free alternative',
        'amzwatcher alternative',
        'amazon affiliate link monitor free',
        'amz watcher vs',
        'cheaper amz watcher alternative',
    ],
    alternates: {
        canonical: 'https://affiliatelinkmonitoring.com/alternative/amz-watcher',
    },
    openGraph: {
        title: 'AMZ Watcher Alternative — Free Amazon Link Monitoring',
        description: 'Free affiliate link monitoring with out-of-stock detection. No complex credit system.',
        url: 'https://affiliatelinkmonitoring.com/alternative/amz-watcher',
    },
};

export default function AmzWatcherAlternativePage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                {/* Hero */}
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Shield className="h-4 w-4" />
                            Comparison Guide 2026
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Free{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                                AMZ Watcher
                            </span>{' '}
                            Alternative for Amazon Affiliates
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            AMZ Watcher is a solid tool for Amazon affiliates, but it starts at $19.95/month and uses a confusing credit system. We offer a simpler and more affordable way to monitor your Amazon links.
                        </p>
                    </div>
                </section>

                {/* Why Switch */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why creators look for AMZ Watcher alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <DollarSign className="h-6 w-6 text-red-400" />, title: "Expensive for Beginners", desc: "AMZ Watcher starts at $19.95/month with a page credit system. If you have a small blog with 20-30 articles, you're overpaying for features you don't need. LinkMonitor is free for up to 10 monitors." },
                                { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: "Confusing Credit System", desc: "AMZ Watcher uses 'page credits' — each page check costs one credit. It's hard to predict your monthly cost. LinkMonitor uses simple flat pricing: free or $12/month." },
                                { icon: <Globe className="h-6 w-6 text-violet-400" />, title: "Amazon Only", desc: "AMZ Watcher is built exclusively for Amazon links. If you also promote products on other platforms, you need a separate tool. LinkMonitor works with any URL — Amazon, Pinterest, Linktree, or any website." },
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

                {/* Comparison Table */}
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Feature</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-violet-400">LinkMonitor</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">AMZ Watcher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: "Free Plan", us: true, them: false },
                                        { feature: "Broken Link Detection", us: true, them: true },
                                        { feature: "Out-of-Stock Alerts", us: true, them: true },
                                        { feature: "Email Alerts", us: true, them: true },
                                        { feature: "Works with Any URL", us: true, them: false },
                                        { feature: "Pinterest / Linktree Support", us: true, them: false },
                                        { feature: "WordPress Plugin Needed", us: false, them: true },
                                        { feature: "Pricing Model", usText: "Free / $12 flat", themText: "From $19.95 (credits)" },
                                        { feature: "Setup Time", usText: "30 seconds", themText: "5-10 minutes" },
                                        { feature: "Best For", usText: "All affiliate links", themText: "Amazon only" },
                                    ].map((row, i) => (
                                        <tr key={i} className="border-b border-slate-800/50 last:border-0">
                                            <td className="px-6 py-4 text-sm text-slate-300">{row.feature}</td>
                                            <td className="px-6 py-4 text-center">
                                                {row.usText ? (
                                                    <span className="text-sm text-emerald-400 font-medium">{row.usText}</span>
                                                ) : row.us ? (
                                                    <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-red-400 mx-auto" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {row.themText ? (
                                                    <span className="text-sm text-slate-400">{row.themText}</span>
                                                ) : row.them ? (
                                                    <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                                                ) : (
                                                    <X className="h-5 w-5 text-red-400 mx-auto" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
                            <p className="text-sm text-slate-300">
                                <strong className="text-white">Where AMZ Watcher shines:</strong> If you exclusively use Amazon and need features like missing affiliate tag detection and revenue diversification suggestions, AMZ Watcher offers deeper Amazon-specific insights. But for simple link monitoring at a fraction of the cost, LinkMonitor is the better choice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Start monitoring your Amazon links for free
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            No page credits. No confusing pricing. Just paste your URL and go.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
                            >
                                Start Free — No Card Required
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/amazon-broken-link-checker"
                                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
                            >
                                Try Amazon Link Checker
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
