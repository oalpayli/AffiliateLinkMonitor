import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, Monitor, Globe, Bell } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Link Whisper Alternative — Affiliate Link Monitoring Without WordPress',
    description: 'Looking for a Link Whisper alternative for affiliate link monitoring? Affiliate Link Monitor detects broken affiliate links and out-of-stock products on any platform. Free plan available.',
    keywords: ['link whisper alternative', 'link whisper affiliate link monitor', 'link whisper vs affiliate link monitor', 'affiliate link monitoring without link whisper'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/alternative/link-whisper' },
    openGraph: {
        title: 'Link Whisper Alternative — Affiliate Link Monitoring Without WordPress',
        description: 'Proactive affiliate link monitoring without a WordPress plugin. Free plan, works with any platform.',
        url: 'https://www.affiliatelinkmonitoring.com/alternative/link-whisper',
    },
};

export default function LinkWhisperAlternativePage() {
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Link Whisper</span>{' '}
                            Alternative for Affiliate Link Monitoring
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Link Whisper is primarily an internal linking and SEO tool for WordPress. If you need proactive affiliate link monitoring — detecting broken links and out-of-stock products with instant alerts — Affiliate Link Monitor is the right tool.
                        </p>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why affiliates look for Link Whisper alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <Monitor className="h-6 w-6 text-red-400" />, title: 'Built for Internal Links, Not Affiliate Links', desc: 'Link Whisper is designed to suggest and manage internal SEO links inside WordPress. It doesn\'t specialize in monitoring external affiliate link health or detecting out-of-stock products.' },
                                { icon: <Bell className="h-6 w-6 text-yellow-400" />, title: 'No Proactive Alerts', desc: 'Link Whisper doesn\'t send you an email when an affiliate link breaks. Affiliate Link Monitor alerts you within 60 seconds of any failure — so you can fix it before losing more commissions.' },
                                { icon: <Globe className="h-6 w-6 text-violet-400" />, title: 'WordPress Plugin Only', desc: 'Link Whisper only works inside WordPress. If you use Pinterest, Linktree, a non-WordPress site, or manage links across multiple platforms, you need a platform-agnostic monitoring solution.' },
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
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">Link Whisper</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: 'Free Plan', us: true, them: false },
                                        { feature: 'Affiliate Link Monitoring', us: true, them: false },
                                        { feature: 'Out-of-Stock Alerts', us: true, them: false },
                                        { feature: '60-Second Email Alerts', us: true, them: false },
                                        { feature: 'Works Without WordPress', us: true, them: false },
                                        { feature: 'Internal Link Suggestions', us: false, them: true },
                                        { feature: 'Broken Internal Link Detection', us: false, them: true },
                                        { feature: 'SEO Internal Linking Reports', us: false, them: true },
                                        { feature: 'Starting Price', usText: '$0/month', themText: '$77/year' },
                                        { feature: 'Best For', usText: 'Affiliate link monitoring', themText: 'WordPress internal SEO links' },
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
                                <strong className="text-white">These tools do different things.</strong> Link Whisper builds your internal SEO link structure. Affiliate Link Monitor protects your external affiliate links. Most serious affiliate bloggers benefit from using both.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start monitoring affiliate links for free</h2>
                        <p className="text-slate-400 text-lg mb-8">No plugin required. Works with any platform. Set up in 30 seconds.</p>
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
