import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, Monitor, Bell, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pretty Links Alternative — Proactive Affiliate Link Monitoring',
    description: 'Pretty Links manages and cloaks your links inside WordPress. Affiliate Link Monitor proactively detects broken affiliate links and out-of-stock products with instant alerts. Free plan available.',
    keywords: ['pretty links alternative', 'pretty links affiliate monitoring', 'pretty links vs affiliate link monitor', 'affiliate link monitor without wordpress'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/alternative/pretty-links' },
    openGraph: {
        title: 'Pretty Links Alternative — Proactive Affiliate Link Monitoring',
        description: 'Monitor affiliate links proactively with instant alerts. Works without WordPress. Free plan available.',
        url: 'https://www.affiliatelinkmonitoring.com/alternative/pretty-links',
    },
};

export default function PrettyLinksAlternativePage() {
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Pretty Links</span>{' '}
                            Alternative for Affiliate Monitoring
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Pretty Links is a powerful WordPress plugin for link cloaking and management. But it doesn&apos;t watch your links 24/7 and alert you when destinations break. Affiliate Link Monitor does exactly that — with a free plan and 60-second alerts.
                        </p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why affiliates look for Pretty Links alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <Bell className="h-6 w-6 text-red-400" />, title: 'No Proactive Monitoring', desc: 'Pretty Links manages your links inside WordPress but doesn\'t proactively check if the destination URLs are working. Affiliate Link Monitor watches every link 24/7 and alerts you within 60 seconds of a failure.' },
                                { icon: <Monitor className="h-6 w-6 text-yellow-400" />, title: 'WordPress Plugin Only', desc: 'Pretty Links only works as a WordPress plugin. If your affiliate links exist on Pinterest pins, Linktree, or any non-WordPress platform, Pretty Links can\'t help you. Affiliate Link Monitor works with any URL.' },
                                { icon: <Globe className="h-6 w-6 text-violet-400" />, title: 'Doesn\'t Detect Out-of-Stock', desc: 'Pretty Links can detect if a redirect is broken, but it can\'t detect Amazon "Currently Unavailable" pages or out-of-stock products — which are the most common source of silent commission loss.' },
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
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">Pretty Links</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Free Plan', us: true, them: true },
                                        { feature: '24/7 Automated Monitoring', us: true, them: false },
                                        { feature: 'Out-of-Stock Alerts', us: true, them: false },
                                        { feature: '60-Second Email Alerts', us: true, them: false },
                                        { feature: 'Works Without WordPress', us: true, them: false },
                                        { feature: 'Link Cloaking / Pretty URLs', us: false, them: true },
                                        { feature: 'Click Tracking & Analytics', us: false, them: true },
                                        { feature: 'A/B Split Testing Links', us: false, them: true },
                                        { feature: 'Pro Pricing', usText: '$12/month', themText: '$99/year+' },
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
                                <strong className="text-white">Use both together:</strong> Pretty Links manages your affiliate link URLs inside WordPress. Affiliate Link Monitor watches those destinations 24/7 and alerts you when any of them break. Together they give you both management and monitoring.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Add proactive monitoring to your link stack</h2>
                        <p className="text-slate-400 text-lg mb-8">Free to start. No WordPress plugin. Set up in 30 seconds.</p>
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
