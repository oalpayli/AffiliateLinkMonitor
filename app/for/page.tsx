import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Affiliate Link Monitor — Built For Every Type of Affiliate Creator',
    description: 'Affiliate Link Monitor works for bloggers, Amazon Associates, Pinterest creators, Instagram influencers, YouTube creators, TikTok creators, niche site operators, and affiliate agencies.',
    keywords: ['affiliate link monitor for bloggers', 'affiliate link monitor creators', 'affiliate link monitoring use cases'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/for' },
    openGraph: {
        title: 'Affiliate Link Monitor — Built For Every Type of Affiliate Creator',
        description: 'Whether you run a blog, Pinterest board, YouTube channel, or niche site — we monitor your affiliate links 24/7.',
        url: 'https://www.affiliatelinkmonitoring.com/for',
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
        { '@type': 'ListItem', position: 2, name: 'For', item: 'https://www.affiliatelinkmonitoring.com/for' },
    ],
};

const audiences = [
    {
        slug: 'bloggers',
        name: 'Bloggers',
        description: 'Monitor Amazon, ShareASale, and any affiliate link across your entire blog. Get alerted before a broken link costs you weeks of commissions.',
        badge: 'Most Popular',
    },
    {
        slug: 'amazon-associates',
        name: 'Amazon Associates',
        description: 'Detect out-of-stock products, ASIN changes, and 404 errors before they silently drain your Amazon commission income.',
        badge: null,
    },
    {
        slug: 'pinterest-creators',
        name: 'Pinterest Creators',
        description: 'Protect years of evergreen pin traffic. Monitor product destinations and get alerted when anything breaks.',
        badge: null,
    },
    {
        slug: 'instagram-creators',
        name: 'Instagram Creators',
        description: 'Your bio link is your only clickable destination. Make sure every affiliate link behind it works at all times.',
        badge: null,
    },
    {
        slug: 'youtube-creators',
        name: 'YouTube Creators',
        description: 'Old videos still earn commissions — until their description links break. Monitor every affiliate link across all your videos.',
        badge: null,
    },
    {
        slug: 'tiktok-creators',
        name: 'TikTok Creators',
        description: 'Viral traffic hits fast. Make sure your bio link and affiliate links are live before the spike — and get alerted if they break during it.',
        badge: null,
    },
    {
        slug: 'niche-sites',
        name: 'Niche Site Operators',
        description: 'Bulk import hundreds of links. Get hourly scans on money pages. Protect passive income at scale with one dashboard.',
        badge: null,
    },
    {
        slug: 'affiliate-agencies',
        name: 'Affiliate Agencies',
        description: 'Monitor client affiliate links across multiple sites and networks. Get ahead of issues before clients notice broken links.',
        badge: null,
    },
];

export default function ForHubPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/15 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <section className="pt-32 pb-12">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Shield className="h-4 w-4" />
                            Works For Every Affiliate Creator
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Affiliate Link Monitor{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">for Your Use Case</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                            Whether you run a blog, Pinterest boards, a YouTube channel, or manage links for clients — we monitor your affiliate links 24/7 and alert you instantly when something breaks.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3 rounded-xl font-semibold"
                        >
                            Start Free Monitoring
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <section className="pb-24">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-6">
                            {audiences.map((a) => (
                                <Link
                                    key={a.slug}
                                    href={`/for/${a.slug}`}
                                    className="block p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="text-xl font-bold group-hover:text-violet-400 transition-colors">
                                            {a.name}
                                        </h2>
                                        {a.badge && (
                                            <span className="text-xs px-2 py-0.5 rounded-full border bg-violet-500/10 border-violet-500/20 text-violet-400 font-medium">
                                                {a.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4">{a.description}</p>
                                    <span className="text-violet-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                        See how it works <ArrowRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
