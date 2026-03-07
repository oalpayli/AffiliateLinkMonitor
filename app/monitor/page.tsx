import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Affiliate Link Monitor by Platform — Amazon, ShareASale, CJ, AWIN & More',
    description: 'Automated 24/7 affiliate link monitoring for every major platform. Amazon, ShareASale, CJ Affiliate, AWIN, Rakuten, Impact, ClickBank, Pinterest, and Linktree. Free plan available.',
    keywords: ['affiliate link monitor by platform', 'amazon affiliate link monitor', 'shareasale link monitor', 'awin affiliate monitoring'],
    alternates: { canonical: 'https://www.affiliatelinkmonitoring.com/monitor' },
    openGraph: {
        title: 'Affiliate Link Monitor by Platform',
        description: 'Automated broken link detection for Amazon, ShareASale, CJ, AWIN, Rakuten, Impact, ClickBank, Pinterest, and Linktree.',
        url: 'https://www.affiliatelinkmonitoring.com/monitor',
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
        { '@type': 'ListItem', position: 2, name: 'Monitor', item: 'https://www.affiliatelinkmonitoring.com/monitor' },
    ],
};

const platforms = [
    {
        name: 'Amazon',
        slug: 'amazon-affiliate-links',
        description: 'Detect out-of-stock products, ASIN changes, and 404 errors. The #1 cause of silent commission loss for affiliates.',
        badge: 'Most Popular',
        badgeColor: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    },
    {
        name: 'Pinterest',
        slug: 'pinterest-affiliate-links',
        description: 'Monitor pin destination URLs for out-of-stock products and broken links. Protect years of evergreen pin traffic.',
        badge: 'Creator Favorite',
        badgeColor: 'bg-red-500/10 border-red-500/20 text-red-400',
    },
    {
        name: 'Linktree',
        slug: 'linktree-links',
        description: 'Watch every affiliate link in your bio link profile. One broken link costs you traffic from every social platform.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'ShareASale',
        slug: 'shareasale-links',
        description: 'Alert when merchants leave the network, products are removed, or programs are deactivated.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'CJ Affiliate',
        slug: 'cj-affiliate-links',
        description: 'Monitor Commission Junction deep links and detect when advertiser relationships end or pages 404.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'AWIN',
        slug: 'awin-links',
        description: 'Track AWIN publisher links across all regions and alert when advertiser programs pause or close.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'Impact',
        slug: 'impact-links',
        description: 'Monitor impact.com brand partner links and catch when promotion pages expire or products are removed.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'Rakuten',
        slug: 'rakuten-links',
        description: 'Detect broken Rakuten Advertising deep links and alerts when advertiser programs change.',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'ClickBank',
        slug: 'clickbank-links',
        description: 'Monitor ClickBank hoplinks and get alerted when vendors remove products or change sales page URLs.',
        badge: null,
        badgeColor: '',
    },
];

export default function MonitorHubPage() {
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
                            Platform-Agnostic Monitoring
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Affiliate Link Monitor{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">by Platform</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                            Whether you earn from Amazon, ShareASale, Pinterest, or any other network — we watch every link 24/7 and email you within 60 seconds when something breaks.
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {platforms.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/monitor/${p.slug}`}
                                    className="block p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h2 className="text-xl font-bold group-hover:text-violet-400 transition-colors">
                                            {p.name}
                                        </h2>
                                        {p.badge && (
                                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.badgeColor}`}>
                                                {p.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                                    <span className="text-violet-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View monitoring guide <ArrowRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16 p-8 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
                            <h2 className="text-2xl font-bold mb-3">Your platform not listed?</h2>
                            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                                Affiliate Link Monitor works with any URL from any affiliate network. If you can paste a link, we can monitor it.
                            </p>
                            <Link
                                href="/tools/link-health-scanner"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium"
                            >
                                Try the Free Link Scanner
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
