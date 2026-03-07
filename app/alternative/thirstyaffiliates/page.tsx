import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, DollarSign, Globe, Monitor } from 'lucide-react';

export const metadata: Metadata = {
    title: 'ThirstyAffiliates Alternative — Free Link Monitoring Without WordPress',
    description: 'Looking for a ThirstyAffiliates alternative for link monitoring? Affiliate Link Monitor detects broken links and out-of-stock products without requiring WordPress. Free plan available.',
    keywords: ['thirstyaffiliates alternative', 'thirstyaffiliates free alternative', 'thirstyaffiliates vs', 'affiliate link monitor without wordpress plugin'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/alternative/thirstyaffiliates' },
    openGraph: {
        title: 'ThirstyAffiliates Alternative — Free Link Monitoring Without WordPress',
        description: 'Monitor affiliate links without a WordPress plugin. Free plan, works with any platform.',
        url: 'https://www.affiliatelinkmonitoring.com/alternative/thirstyaffiliates',
    },
};

export default function ThirstyAffiliatesAlternativePage() {
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">ThirstyAffiliates</span>{' '}
                            Alternative for Link Monitoring
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            ThirstyAffiliates is an excellent WordPress plugin for link management and cloaking — but it doesn't give you proactive 24/7 monitoring. If you want to know when a link breaks within 60 seconds, you need Affiliate Link Monitor.
                        </p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why affiliates look for ThirstyAffiliates alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <Monitor className="h-6 w-6 text-red-400" />, title: 'WordPress Only', desc: 'ThirstyAffiliates is a WordPress plugin. If your site runs on Webflow, Squarespace, Ghost, or any other platform — or if you use Linktree or Pinterest — ThirstyAffiliates can\'t monitor your links.' },
                                { icon: <DollarSign className="h-6 w-6 text-yellow-400" />, title: 'High Annual Cost', desc: 'ThirstyAffiliates starts at $79/year for basic features, with advanced tiers going higher. Affiliate Link Monitor Pro is $12/month ($144/year) with more monitoring features included.' },
                                { icon: <Globe className="h-6 w-6 text-violet-400" />, title: 'No Proactive Alerts', desc: 'ThirstyAffiliates manages your links inside WordPress but doesn\'t proactively ping you when a destination URL breaks. Affiliate Link Monitor sends an email within 60 seconds of any failure.' },
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
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">ThirstyAffiliates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Free Plan', us: true, them: false },
                                        { feature: 'Broken Link Detection', us: true, them: true },
                                        { feature: 'Out-of-Stock Alerts', us: true, them: false },
                                        { feature: '60-Second Email Alerts', us: true, them: false },
                                        { feature: 'Works Without WordPress', us: true, them: false },
                                        { feature: 'Link Cloaking', us: false, them: true },
                                        { feature: 'Automatic Keyword Linking', us: false, them: true },
                                        { feature: 'Geolocation Link Targeting', us: false, them: true },
                                        { feature: 'Starting Price', usText: '$0/month', themText: '$79/year' },
                                        { feature: 'Best For', usText: 'Proactive monitoring', themText: 'WP link management' },
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
                                <strong className="text-white">Pro tip: Use both together.</strong> Many WordPress bloggers use ThirstyAffiliates for link cloaking and management inside their CMS, and Affiliate Link Monitor for 24/7 external monitoring with instant alerts. They complement each other.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start monitoring your links for free</h2>
                        <p className="text-slate-400 text-lg mb-8">No WordPress plugin needed. Works with any site. Takes 30 seconds.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg">
                                Start Free — No Card Required
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link href="/tools/link-health-scanner" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                                Try Free Scanner First
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
