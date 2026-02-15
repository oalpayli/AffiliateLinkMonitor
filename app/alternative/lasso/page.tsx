import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, DollarSign, Zap, Monitor } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Lasso Alternative — Free Affiliate Link Monitoring Without WordPress',
    description:
        'Looking for a Lasso alternative? Affiliate Link Monitor offers free broken link detection without requiring WordPress. Works with any website, blog, or platform.',
    keywords: [
        'lasso alternative',
        'lasso wordpress plugin alternative',
        'lasso affiliate alternative free',
        'lasso vs',
        'best lasso alternative',
        'affiliate link plugin alternative',
    ],
    alternates: {
        canonical: 'https://affiliatelinkmonitoring.com/alternative/lasso',
    },
    openGraph: {
        title: 'Lasso Alternative — Free Affiliate Link Monitoring Without WordPress',
        description: 'Free link monitoring that works with any platform. No WordPress required.',
        url: 'https://affiliatelinkmonitoring.com/alternative/lasso',
    },
};

export default function LassoAlternativePage() {
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
                                Lasso
                            </span>{' '}
                            Alternative That Works Without WordPress
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Lasso is a great WordPress plugin for affiliate link management, but not everyone uses WordPress — and not everyone needs product display boxes. If you just want to catch broken links, there&apos;s a simpler way.
                        </p>
                    </div>
                </section>

                {/* Pain Points */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why creators look for Lasso alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: <DollarSign className="h-6 w-6 text-red-400" />, title: "$29/Month for Monitoring", desc: "Lasso starts at $29/month. If you mainly need broken link detection and out-of-stock alerts, that's expensive. LinkMonitor is free for up to 10 monitors and just $12/month for Pro." },
                                { icon: <Monitor className="h-6 w-6 text-yellow-400" />, title: "WordPress Only", desc: "Lasso only works as a WordPress plugin. If your site runs on Webflow, Squarespace, Ghost, Next.js, or any other platform — or if you use Linktree/Pinterest — Lasso can't help you." },
                                { icon: <Zap className="h-6 w-6 text-violet-400" />, title: "Too Many Features", desc: "Lasso bundles link management, product displays, keyword monetization, and monitoring. If you just need link health checks, you're paying for features you won't use." },
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
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-400">Lasso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { feature: "Free Plan", us: true, them: false },
                                        { feature: "Broken Link Detection", us: true, them: true },
                                        { feature: "Out-of-Stock Alerts", us: true, them: true },
                                        { feature: "Email Alerts", us: true, them: true },
                                        { feature: "Works Without WordPress", us: true, them: false },
                                        { feature: "Product Display Boxes", us: false, them: true },
                                        { feature: "Link Cloaking", us: false, them: true },
                                        { feature: "Keyword Auto-Linking", us: false, them: true },
                                        { feature: "Starting Price", usText: "$0/month", themText: "$29/month" },
                                        { feature: "Best For", usText: "Link monitoring", themText: "WP link management" },
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
                                <strong className="text-white">Where Lasso shines:</strong> If you use WordPress and want beautiful product display boxes, link cloaking, and automatic keyword linking — Lasso is excellent. But if you just need to catch broken links and get alerts, LinkMonitor does that for free.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Use Together */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center">
                            <h2 className="text-2xl font-bold mb-4">💡 Pro tip: Use both together</h2>
                            <p className="text-slate-400 mb-2">
                                Many WordPress bloggers use Lasso for link management and product displays, and LinkMonitor for reliable 24/7 broken link monitoring with instant alerts.
                            </p>
                            <p className="text-slate-500 text-sm">
                                They complement each other: Lasso manages your links, LinkMonitor watches them.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Start monitoring your links for free
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            No WordPress needed. No plugins to install. Just paste your URL and go.
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
                                href="/tools/link-health-scanner"
                                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
                            >
                                Try Free Scanner First
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
