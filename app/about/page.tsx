import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Target, Users, Zap, Mail, Heart } from 'lucide-react';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export const metadata: Metadata = {
    title: 'About Affiliate Link Monitor — Our Story & Mission',
    description:
        'Affiliate Link Monitor helps affiliate marketers and content creators protect their revenue by automatically detecting broken links and out-of-stock Amazon products. Learn our story.',
    alternates: {
        canonical: `${BASE_URL}/about`,
    },
    openGraph: {
        title: 'About Affiliate Link Monitor — Our Story & Mission',
        description: 'The SaaS tool built by affiliate marketers, for affiliate marketers. Learn how we started and why we built it.',
        url: `${BASE_URL}/about`,
    },
};

const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Affiliate Link Monitor',
    url: `${BASE_URL}/about`,
    description: 'Affiliate Link Monitor is a SaaS tool that helps affiliate marketers protect their revenue by monitoring affiliate links 24/7 and sending instant alerts when links break or products go out of stock.',
    mainEntity: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Affiliate Link Monitor',
        url: BASE_URL,
        email: 'info@affiliatelinkmonitoring.com',
        foundingDate: '2025',
        description: 'We help content creators and affiliate marketers protect their revenue by automatically detecting broken links and out-of-stock products.',
        sameAs: [
            'https://instagram.com/affiliatelinkmonitoring',
            'https://www.producthunt.com/products/affiliate-link-monitor',
            'https://www.g2.com/products/affiliate-link-monitor',
        ],
    },
};

const stats = [
    { value: '1,200+', label: 'Marketers Using Affiliate Link Monitor' },
    { value: '50,000+', label: 'Affiliate Links Monitored Daily' },
    { value: '~15%', label: 'Of Amazon Links Break Within 6 Months' },
    { value: '<60s', label: 'Alert Delivery After Detection' },
];

const values = [
    {
        icon: <Shield className="h-6 w-6 text-violet-400" />,
        title: 'Protect What You Earn',
        desc: 'Every dollar you earn through affiliate marketing represents real work — content created, audiences built, trust earned. A broken link can destroy that return. We exist to prevent that.',
    },
    {
        icon: <Target className="h-6 w-6 text-emerald-400" />,
        title: 'Honest, Useful Tools',
        desc: 'We build tools we would use ourselves. Our free Amazon Broken Link Checker and Linktree checker require no signup because the value should be immediate — no friction.',
    },
    {
        icon: <Zap className="h-6 w-6 text-yellow-400" />,
        title: 'Speed Matters',
        desc: 'A broken link discovered one hour after it breaks costs far less than one discovered a week later. We built for speed — alerts within 60 seconds of detection.',
    },
    {
        icon: <Users className="h-6 w-6 text-blue-400" />,
        title: 'Built for Creators',
        desc: 'We serve bloggers, YouTubers, Pinterest creators, and Instagram publishers — not enterprise SaaS teams. Our pricing, interface, and support reflect that.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/10 rounded-[100%] blur-[120px] opacity-40" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-4xl pt-32 pb-24">
                {/* Hero */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-sm text-violet-300 mb-8">
                        <Heart className="h-4 w-4" />
                        Built by affiliate marketers, for affiliate marketers
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        We built the tool<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                            we wished existed
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Affiliate Link Monitor was created to solve a problem every affiliate marketer faces: broken links and out-of-stock products silently draining commissions — with no alert, no warning, just missing revenue.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <div className="text-3xl font-bold text-violet-400 mb-2">{stat.value}</div>
                            <div className="text-xs text-slate-400 leading-snug">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Story */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8">Our Story</h2>
                    <div className="prose prose-invert prose-slate max-w-none space-y-5">
                        <p className="text-slate-400 leading-relaxed">
                            Like most affiliate marketing tools, this one started from personal frustration. After noticing commission drops that couldn&apos;t be explained by traffic changes, we investigated — and found a pattern. Multiple Amazon product links pointing to discontinued items. A Linktree link with a wrong URL. A product that had been out of stock for three weeks.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            The problem wasn&apos;t unique. In affiliate marketing forums and communities, broken link complaints were everywhere — but the solutions were fragmented: browser plugins that only caught 404s, Amazon-only tools that missed other platforms, or manual checks that nobody had time for.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Affiliate Link Monitor was built to close that gap. A single tool that monitors any affiliate link — Amazon, Linktree, Pinterest, ShareASale, any URL — and sends an email alert within 60 seconds of detecting a problem. Including out-of-stock items, which standard broken link checkers completely miss.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            Today we monitor 50,000+ links daily for 1,200+ affiliate marketers, bloggers, and content creators. Our data helps us understand how affiliate links break — and when we have enough to publish, we share it publicly so the whole industry benefits.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8">What We Believe</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {values.map((val, i) => (
                            <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                <div className="mb-4 p-2 bg-slate-950/50 rounded-lg w-fit border border-slate-800">
                                    {val.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{val.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team / Authors */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-8">Our Team</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Link
                            href="/about/alex"
                            className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-violet-500/40 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                    A
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-violet-300 transition-colors">Alex Miller</h3>
                                    <p className="text-violet-400 text-sm">Affiliate Marketing &amp; SEO Writer</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                8+ years in affiliate marketing and SEO. Writes about Amazon Associates optimization, link management strategy, and affiliate revenue protection.
                            </p>
                            <p className="text-xs text-violet-400 mt-3 group-hover:text-violet-300 transition-colors">View author page →</p>
                        </Link>

                        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                    T
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">The Engineering Team</h3>
                                    <p className="text-emerald-400 text-sm">Infrastructure &amp; Product</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                The team behind the monitoring infrastructure that checks 50,000+ links daily, the alert system, and the free tools — Amazon checker, Linktree checker, and revenue loss calculator.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="mb-20 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Mail className="h-6 w-6 text-violet-400" />
                        Get in Touch
                    </h2>
                    <p className="text-slate-400 mb-4">
                        Have a question, feedback, or partnership inquiry? We read every email.
                    </p>
                    <a
                        href="mailto:info@affiliatelinkmonitoring.com"
                        className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-semibold"
                    >
                        info@affiliatelinkmonitoring.com <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                {/* CTA */}
                <div className="p-8 bg-gradient-to-br from-violet-500/10 to-indigo-500/5 border border-violet-500/30 rounded-2xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Protect your affiliate income — free to start</h3>
                    <p className="text-slate-400 mb-6">10 monitors, daily scans, email alerts. No credit card required.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3 rounded-xl font-semibold">
                            Start Free Monitoring <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                            Read Our Blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
