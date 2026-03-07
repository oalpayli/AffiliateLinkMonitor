import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, X, ArrowRight, Shield, DollarSign, Zap, Globe, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Pageradar Alternative — Free Affiliate Link Monitoring Without the Price Tag (2026)',
    description:
        'Looking for a Pageradar alternative? Affiliate Link Monitor offers broken link detection and out-of-stock alerts starting free — vs Pageradar at $39/month. Compare features, pricing, and find the right fit.',
    keywords: [
        'pageradar alternative',
        'pageradar alternative free',
        'cheaper pageradar alternative',
        'pageradar vs affiliate link monitor',
        'pageradar vs linkmonitor',
        'best pageradar alternative 2026',
        'pageradar pricing comparison',
        'affiliate link monitoring free',
    ],
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/alternative/pageradar',
    },
    openGraph: {
        title: 'Pageradar Alternative — Free Affiliate Link Monitoring (2026)',
        description:
            'Free plan available. $12/month Pro. Detect broken links and out-of-stock products without Pageradar\'s $39/month starting price.',
        url: 'https://www.affiliatelinkmonitoring.com/alternative/pageradar',
    },
};

export default function PageradarAlternativePage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com/' },
            { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://www.affiliatelinkmonitoring.com/alternative' },
            { '@type': 'ListItem', position: 3, name: 'Pageradar Alternative', item: 'https://www.affiliatelinkmonitoring.com/alternative/pageradar' },
        ],
    };

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Affiliate Link Monitor',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        offers: [
            { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free Plan' },
            { '@type': 'Offer', price: '12', priceCurrency: 'USD', name: 'Pro Plan' },
        ],
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                {/* ─── 1. HERO ─── */}
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Shield className="h-4 w-4" />
                            Comparison Guide 2026
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Free{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                                Pageradar
                            </span>{' '}
                            Alternative for Affiliate Marketers
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            Pageradar starts at $39/month with no free plan. Affiliate Link Monitor gives you a genuinely useful free tier — 10 monitors, daily scans — with Pro at just $12/month. Same core affiliate monitoring, fraction of the cost.
                        </p>
                    </div>
                </section>

                {/* ─── 2. PAIN POINTS ─── */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why affiliates look for Pageradar alternatives</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <DollarSign className="h-6 w-6 text-red-400" />,
                                    title: 'Expensive Starting Price',
                                    desc: 'Pageradar\'s Starter plan is $39/month — over 3× the cost of LinkMonitor Pro ($12/month). If you\'re a solo affiliate or small blog, that adds up to $468/year vs $144/year.',
                                },
                                {
                                    icon: <Zap className="h-6 w-6 text-yellow-400" />,
                                    title: 'Overkill for Most Affiliates',
                                    desc: 'Pageradar bundles speed monitoring, HTML change detection, and uptime checks alongside affiliate link monitoring. If you just need broken link and out-of-stock alerts, you\'re paying for features you won\'t use.',
                                },
                                {
                                    icon: <Globe className="h-6 w-6 text-violet-400" />,
                                    title: 'No Free Plan Available',
                                    desc: 'Unlike LinkMonitor which offers a permanent free plan with 10 monitors and daily scans, Pageradar requires a paid subscription from day one. No way to try before you commit.',
                                },
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

                {/* ─── 3. FEATURE COMPARISON TABLE ─── */}
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
                                        { feature: 'Works with Any URL', us: true, them: true },
                                        { feature: 'Pinterest / Linktree Support', us: true, them: false },
                                        { feature: 'Geo-targeted Monitoring', us: false, them: true },
                                        { feature: 'Page Speed Monitoring', us: false, them: true },
                                        { feature: 'HTML Change Detection', us: false, them: true },
                                        { feature: 'Redirect Chain Analysis', us: true, them: true },
                                        { feature: 'Slack Alerts', us: false, them: true },
                                        { feature: 'Starting Price', usText: '$0/month', themText: '$39/month' },
                                        { feature: 'Pro / Paid Price', usText: '$12/month', themText: '$39–$199/month' },
                                        { feature: 'Best For', usText: 'Affiliate link health', themText: 'Enterprise site monitoring' },
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
                                <strong className="text-white">Where Pageradar shines:</strong> If you run a large enterprise site and need geo-targeted monitoring from 167 countries, page speed tracking, and HTML change alerts alongside affiliate link checks, Pageradar is the more comprehensive (and more expensive) suite.
                            </p>
                        </div>
                        <p className="text-xs text-slate-500 text-center mt-3">Pricing data as of March 2026. Verify on each provider&apos;s website for the latest plans.</p>
                    </div>
                </section>

                {/* ─── 4. PRICING COMPARISON ─── */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-4">Pricing Comparison</h2>
                        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                            Pageradar bundles speed and HTML monitoring into every plan. If you only need affiliate link health checks, you&apos;re paying for extras.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* LinkMonitor */}
                            <div className="rounded-2xl border-2 border-violet-500/30 bg-gradient-to-b from-violet-500/5 to-transparent p-8 relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                                    RECOMMENDED
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-center">LinkMonitor</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-white">Free</span>
                                            <span className="text-2xl font-bold text-emerald-400">$0<span className="text-sm text-slate-400">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-400">10 monitors · Daily scans · Email alerts</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-white">Pro</span>
                                            <span className="text-2xl font-bold text-emerald-400">$12<span className="text-sm text-slate-400">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-400">60 monitors · Hourly scans · Priority alerts</p>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-slate-500 mt-4">Annual cost: <strong className="text-slate-300">$0 – $144</strong></p>
                            </div>

                            {/* Pageradar */}
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-8">
                                <h3 className="text-2xl font-bold mb-6 text-center text-slate-300">Pageradar</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-slate-300">Starter</span>
                                            <span className="text-2xl font-bold text-slate-300">$39<span className="text-sm text-slate-500">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-500">50 affiliate links · Daily checks · Speed monitoring</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-slate-300">Agency</span>
                                            <span className="text-2xl font-bold text-slate-300">$99<span className="text-sm text-slate-500">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-500">300 affiliate links · Daily checks · Priority support</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-semibold text-slate-300">Enterprise</span>
                                            <span className="text-2xl font-bold text-slate-300">$199<span className="text-sm text-slate-500">/mo</span></span>
                                        </div>
                                        <p className="text-sm text-slate-500">2,000 affiliate links · Extended retention · Dedicated support</p>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-slate-500 mt-4">Annual cost: <strong className="text-slate-400">$468 – $2,388</strong></p>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                            <p className="text-sm text-slate-300">
                                💰 <strong className="text-emerald-400">Save up to $2,244/year</strong> by choosing LinkMonitor Pro over Pageradar Enterprise — while keeping the affiliate link monitoring features you actually need.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── 5. WHEN TO CHOOSE WHICH ─── */}
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">When to choose which?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Choose Pageradar */}
                            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-lg">🔍</span>
                                    Choose Pageradar if…
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'You run a large enterprise or agency site with 500+ pages',
                                        'You need geo-targeted link checks from 167 countries',
                                        'Page speed and HTML change monitoring are essential',
                                        'You want Slack alerts and advanced redirect chain analytics',
                                        'Budget isn\'t a primary concern',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                            <Check className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Choose LinkMonitor */}
                            <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-900/30 to-slate-900 border border-violet-500/20">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center text-lg">✅</span>
                                    Choose LinkMonitor if…
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'You want a free plan to start — no credit card, no trial',
                                        'You\'re a solo affiliate, blogger, or small content team',
                                        'You monitor links across Pinterest, Linktree, Amazon, and more',
                                        'You want simple, flat pricing — $0 or $12/month, nothing more',
                                        'You need affiliate-specific monitoring without bundled extras',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                                            <Check className="h-4 w-4 text-violet-400 flex-shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 6. PRO TIP ─── */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center">
                            <Lightbulb className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-4">Pro tip: Use both together</h2>
                            <p className="text-slate-400 mb-2">
                                Some larger affiliate sites use Pageradar for enterprise-level uptime monitoring and page speed tracking, while relying on LinkMonitor specifically for affiliate link health and out-of-stock detection.
                            </p>
                            <p className="text-slate-500 text-sm">
                                They complement each other: Pageradar watches your site infrastructure, LinkMonitor protects your affiliate revenue.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── 7. CTA ─── */}
                <section className="py-24 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start monitoring for free today</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            No credit card. No trial period. No bundled extras. Just paste your URL and go.
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
