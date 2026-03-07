import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';

type AudienceParams = {
    audience: string;
};

const audiences = {
    'bloggers': {
        name: 'Bloggers',
        title: 'Broken Link Monitoring for Bloggers',
        description: 'Stop letting broken affiliate links ruin your passive income. Automate your link checking so you can focus on writing content.',
        toolHref: '/tools/link-health-scanner',
        blogHref: '/blog/how-often-to-check-affiliate-links',
        monitorHref: '/monitor/shareasale-links',
        features: ['Automated daily scans', 'No technical setup', 'Bulk URL checking']
    },
    'amazon-associates': {
        name: 'Amazon Associates',
        title: 'Protect Your Amazon Associates Income',
        description: 'Amazon products go out of stock constantly. Get alerted instantly when a product 404s or becomes unavailable, before you lose commissions.',
        toolHref: '/tools/amazon-broken-link-checker',
        blogHref: '/blog/amazon-associates-links-stop-working',
        monitorHref: '/monitor/amazon-affiliate-links',
        features: ['Out-of-stock detection', 'Tracking ID verification', 'Global store mapping']
    },
    'pinterest-creators': {
        name: 'Pinterest Creators',
        title: 'Keep Your Pinterest Affiliate Links Active',
        description: 'Once a Pin goes viral, a broken link can cost you thousands. Monitor your Pinterest boards automatically.',
        toolHref: '/tools/pinterest-link-monitor',
        blogHref: '/blog/affiliate-links-on-pinterest',
        monitorHref: '/monitor/pinterest-affiliate-links',
        features: ['Pin destination checking', 'Redirect chain analysis', 'Board-level scanning']
    },
    'instagram-creators': {
        name: 'Instagram Creators',
        title: 'Linktree & Bio Link Monitoring',
        description: 'Your single link-in-bio is your most valuable asset. Make sure every link inside your Linktree works perfectly 24/7.',
        toolHref: '/tools/linktree-link-checker',
        blogHref: '/blog/does-linktree-hurt-affiliate-commissions',
        monitorHref: '/monitor/linktree-links',
        features: ['Linktree scanning', 'Bio URL tracking', 'Mobile deep-link checks']
    },
    'youtube-creators': {
        name: 'YouTube Creators',
        title: 'Description Affiliate Link Tracker',
        description: 'Old youtube videos still drive traffic. Ensure the affiliate links in your 3-year-old video descriptions are still paying you.',
        toolHref: '/tools/affiliate-link-auditor',
        blogHref: '/blog/best-affiliate-link-monitoring-tools',
        monitorHref: '/monitor/amazon-affiliate-links',
        features: ['Description link extraction', 'Historical video checks', 'Sponsor URL tracking']
    },
    'tiktok-creators': {
        name: 'TikTok Creators',
        title: 'TikTok Bio Link Uptime Monitoring',
        description: 'When a TikTok blows up, your bio link will be flooded. Make sure your affiliate redirects never fail under pressure.',
        toolHref: '/tools/linktree-link-checker',
        blogHref: '/blog/does-linktree-hurt-affiliate-commissions',
        monitorHref: '/monitor/linktree-links',
        features: ['Bio redirect monitoring', 'High-traffic uptime tracking', 'Link shortener checks']
    },
    'niche-sites': {
        name: 'Niche Site Operators',
        title: 'Scale Your Niche Portfolio Without Link Rot',
        description: 'Managing 10,000+ affiliate links across 5 niche sites? LinkMonitor finds your 404s and redirects before your SEO drops.',
        toolHref: '/tools/revenue-loss-calculator',
        blogHref: '/blog/does-cloaking-affiliate-links-affect-seo',
        monitorHref: '/monitor/cj-affiliate-links',
        features: ['Multi-site management', 'SEO penalty prevention', 'Scale to 100k+ URLs']
    },
    'affiliate-agencies': {
        name: 'Affiliate Agencies',
        title: 'Client ROI Protection Platform',
        description: 'Protect your clients\' affiliate revenue. Provide white-label reports showing the uptime and health of their campaigns.',
        toolHref: '/tools/affiliate-link-auditor',
        blogHref: '/blog/best-affiliate-link-monitoring-tools',
        monitorHref: '/monitor/impact-links',
        features: ['Client reporting', 'API access', 'Team accounts']
    }
};

export async function generateStaticParams() {
    return Object.keys(audiences).map((audience) => ({ audience }));
}

export async function generateMetadata({ params }: { params: Promise<AudienceParams> }): Promise<Metadata> {
    const { audience } = await params;
    const data = audiences[audience as keyof typeof audiences];

    if (!data) return {};

    return {
        title: `${data.title} | LinkMonitor`,
        description: data.description,
        alternates: {
            canonical: `https://www.affiliatelinkmonitoring.com/for/${audience}`
        }
    };
}

export default async function AudiencePage({ params }: { params: Promise<AudienceParams> }) {
    const { audience } = await params;
    const data = audiences[audience as keyof typeof audiences];

    if (!data) {
        notFound();
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com/' },
            { '@type': 'ListItem', position: 2, name: 'For You', item: 'https://www.affiliatelinkmonitoring.com/for' },
            { '@type': 'ListItem', position: 3, name: data.name, item: `https://www.affiliatelinkmonitoring.com/for/${audience}` }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Header */}
            <header className="pt-32 pb-20 relative border-b border-white/5 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-950"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                    <div className="text-sm font-medium text-slate-400 mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>›</span>
                        <span className="text-slate-500">For</span>
                        <span>›</span>
                        <span className="text-white">{data.name}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-bold tracking-wide border border-violet-500/20">
                                FOR {data.name.toUpperCase()}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                {data.title}
                            </h1>
                            <p className="text-lg text-slate-400">
                                {data.description}
                            </p>
                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Link href="/pricing" className="btn-primary px-6 py-3 rounded-xl font-bold shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2">
                                    Monitor Your Links <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
                            <Users className="h-12 w-12 text-violet-400 mb-6" />
                            <h3 className="text-xl font-bold text-white mb-4">Why {data.name} trust us</h3>
                            <ul className="space-y-4">
                                {data.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hub Section */}
            <main className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Essential Resources for {data.name}</h2>
                    <p className="text-slate-400">Everything you need to grow and protect your affiliate income.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Link href={data.toolHref} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                        <div className="h-10 w-10 bg-slate-950 rounded-lg flex items-center justify-center mb-4 text-violet-400 group-hover:scale-110 transition-transform">
                            1
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">Free Checker Tool</h3>
                        <p className="text-sm text-slate-400 mb-4">Use our free diagnostic tool to quickly identify immediate issues.</p>
                        <span className="text-violet-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Try Tool <ArrowRight className="h-4 w-4" /></span>
                    </Link>

                    <Link href={data.monitorHref} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                        <div className="h-10 w-10 bg-slate-950 rounded-lg flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                            2
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Platform Monitoring</h3>
                        <p className="text-sm text-slate-400 mb-4">See how to automate checks for your specific affiliate network.</p>
                        <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">View Setup <ArrowRight className="h-4 w-4" /></span>
                    </Link>

                    <Link href={data.blogHref} className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                        <div className="h-10 w-10 bg-slate-950 rounded-lg flex items-center justify-center mb-4 text-fuchsia-400 group-hover:scale-110 transition-transform">
                            3
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors">Expert Strategy</h3>
                        <p className="text-sm text-slate-400 mb-4">Read our deep-dive guide on maximizing your commission uptime.</p>
                        <span className="text-fuchsia-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read Guide <ArrowRight className="h-4 w-4" /></span>
                    </Link>
                </div>
            </main>
        </div>
    );
}
