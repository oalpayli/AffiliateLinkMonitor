import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Activity, ShieldCheck, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

type PlatformParams = {
    platform: string;
};

// Data for programmatic pages
const platforms = {
    'amazon-affiliate-links': {
        name: 'Amazon Associates',
        shortName: 'Amazon',
        description: 'Monitor your Amazon Associates links for 404s, out-of-stock products, and broken tracking tags.',
        toolHref: '/tools/amazon-broken-link-checker',
        toolName: 'Amazon Broken Link Checker',
        blogHref: '/blog/amazon-associates-links-stop-working',
        blogName: 'Why Amazon Links Stop Working',
        audienceHref: '/for/amazon-associates',
        audienceName: 'Amazon Associates',
        color: 'from-orange-500/20 to-orange-900/10'
    },
    'shareasale-links': {
        name: 'ShareASale',
        shortName: 'ShareASale',
        description: 'Track your ShareASale affiliate links. Get alerted instantly when merchants go offline or tracking links break.',
        toolHref: '/tools/link-health-scanner',
        toolName: 'Link Health Scanner',
        blogHref: '/blog/how-often-to-check-affiliate-links',
        blogName: 'How Often Should You Check Links?',
        audienceHref: '/for/bloggers',
        audienceName: 'Bloggers',
        color: 'from-blue-500/20 to-blue-900/10'
    },
    'cj-affiliate-links': {
        name: 'CJ Affiliate',
        shortName: 'CJ',
        description: 'Automate CJ Affiliate link monitoring. Protect your commissions by fixing dead CJ merchant links before losing traffic.',
        toolHref: '/tools/affiliate-link-auditor',
        toolName: 'Affiliate Link Auditor',
        blogHref: '/blog/does-cloaking-affiliate-links-affect-seo',
        blogName: 'Does Cloaking Affect SEO?',
        audienceHref: '/for/niche-sites',
        audienceName: 'Niche Site Operators',
        color: 'from-green-500/20 to-green-900/10'
    },
    'clickbank-links': {
        name: 'ClickBank',
        shortName: 'ClickBank',
        description: 'Never lose a ClickBank sale to a dead vendor hoplink again. Monitor your URLs daily.',
        toolHref: '/tools/revenue-loss-calculator',
        toolName: 'Revenue Loss Calculator',
        blogHref: '/blog/best-affiliate-link-monitoring-tools',
        blogName: 'Best Link Monitoring Tools',
        audienceHref: '/for/affiliate-agencies',
        audienceName: 'Affiliate Agencies',
        color: 'from-red-500/20 to-red-900/10'
    },
    'awin-links': {
        name: 'AWIN',
        shortName: 'AWIN',
        description: 'Keep your AWIN deep links healthy. Automate the frustrating process of checking thousands of AWIN merchant URLs.',
        toolHref: '/tools/link-health-scanner',
        toolName: 'Link Health Scanner',
        blogHref: '/blog/how-often-to-check-affiliate-links',
        blogName: 'Checking Affiliate Links Frequency',
        audienceHref: '/for/bloggers',
        audienceName: 'Bloggers',
        color: 'from-blue-400/20 to-blue-800/10'
    },
    'rakuten-links': {
        name: 'Rakuten Advertising',
        shortName: 'Rakuten',
        description: 'Secure your Rakuten publisher links. Get notified when network redirects fail or merchant programs close.',
        toolHref: '/tools/affiliate-link-auditor',
        toolName: 'Affiliate Link Auditor',
        blogHref: '/blog/does-cloaking-affiliate-links-affect-seo',
        blogName: 'Link Cloaking Guide',
        audienceHref: '/for/niche-sites',
        audienceName: 'Niche Sites',
        color: 'from-violet-500/20 to-violet-900/10'
    },
    'impact-links': {
        name: 'Impact Radius',
        shortName: 'Impact',
        description: 'Ensure your Impact Radius vanity links and tracking URLs are always functional. Automate your daily checks.',
        toolHref: '/tools/link-health-scanner',
        toolName: 'Link Health Scanner',
        blogHref: '/blog/best-affiliate-link-monitoring-tools',
        blogName: 'Compare Tracking Tools',
        audienceHref: '/for/affiliate-agencies',
        audienceName: 'Agencies',
        color: 'from-teal-500/20 to-teal-900/10'
    },
    'pinterest-affiliate-links': {
        name: 'Pinterest Affiliate',
        shortName: 'Pinterest',
        description: 'Scan your Pinterest pins and boards for broken affiliate links to keep your traffic monetized.',
        toolHref: '/tools/pinterest-link-monitor',
        toolName: 'Pinterest Link Monitor',
        blogHref: '/blog/affiliate-links-on-pinterest',
        blogName: 'Guide to Pinterest Affiliate Links',
        audienceHref: '/for/pinterest-creators',
        audienceName: 'Pinterest Creators',
        color: 'from-red-600/20 to-red-800/10'
    },
    'linktree-links': {
        name: 'Linktree',
        shortName: 'Linktree',
        description: 'Keep your Linktree bio links working. Monitor your main traffic hub so followers never hit a dead page.',
        toolHref: '/tools/linktree-link-checker',
        toolName: 'Free Linktree Checker',
        blogHref: '/blog/does-linktree-hurt-affiliate-commissions',
        blogName: 'Does Linktree Hurt Conversions?',
        audienceHref: '/for/instagram-creators',
        audienceName: 'Instagram Creators',
        color: 'from-green-400/20 to-green-700/10'
    }
};

export async function generateStaticParams() {
    return Object.keys(platforms).map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<PlatformParams> }): Promise<Metadata> {
    const { platform } = await params;
    const data = platforms[platform as keyof typeof platforms];

    if (!data) return {};

    return {
        title: `Monitor ${data.name} Affiliate Links | LinkMonitor`,
        description: data.description,
        alternates: {
            canonical: `https://www.affiliatelinkmonitoring.com/monitor/${platform}`
        }
    };
}

export default async function MonitorPlatformPage({ params }: { params: Promise<PlatformParams> }) {
    const { platform } = await params;
    const data = platforms[platform as keyof typeof platforms];

    if (!data) {
        notFound();
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com/' },
            { '@type': 'ListItem', position: 2, name: 'Monitor', item: 'https://www.affiliatelinkmonitoring.com/monitor' },
            { '@type': 'ListItem', position: 3, name: `${data.name} Links`, item: `https://www.affiliatelinkmonitoring.com/monitor/${platform}` }
        ]
    };

    // SoftwareApp Schema
    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `LinkMonitor for ${data.shortName}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD',
            description: 'Free basic tracking to monitor affiliate links.'
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            {/* Hero Section */}
            <div className={`pt-32 pb-20 border-b border-white/5 relative bg-gradient-to-b ${data.color} overflow-hidden`}>
                <div className="container mx-auto px-4 relative">
                    <div className="text-sm font-medium text-slate-400 mb-6 flex items-center justify-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>›</span>
                        <span className="text-slate-500">Monitor</span>
                        <span>›</span>
                        <span className="text-white">{data.name} Links</span>
                    </div>

                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                            Automate Monitoring for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                {data.name} Links
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {data.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/pricing" className="btn-primary px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto shadow-lg shadow-violet-500/25">
                                Start Monitoring {data.shortName} Links
                            </Link>
                            <Link href={data.toolHref} className="px-8 py-4 rounded-xl font-bold text-lg w-full sm:w-auto bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5">
                                Try Free {data.toolName}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <main className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {/* Features Hub & Spoke */}
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-6">Why Monitor Your {data.name} Commissions?</h2>
                            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                                <p>
                                    As an affiliate, your income relies entirely on your links functioning properly. When a {data.shortName} product goes out of stock, the merchant closes their program, or a minor typo breaks your tracking ID, you lose money instantly and silently.
                                </p>
                                <p>
                                    Our automated <Link href="/pricing" className="text-violet-400 hover:underline">monitoring platform</Link> continuously scans your site for dead {data.shortName} URLs to ensure you never leave money on the table.
                                </p>
                            </div>
                        </section>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                                <AlertTriangle className="h-8 w-8 text-amber-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Detect Broken Tracking</h3>
                                <p className="text-slate-400 text-sm">Find 404s and invalid redirects before you lose months of potential {data.shortName} revenue.</p>
                            </div>
                            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                                <Zap className="h-8 w-8 text-violet-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Daily Automated Checks</h3>
                                <p className="text-slate-400 text-sm">Stop checking links manually. Get email alerts the moment a {data.shortName} link fails.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Hub Links */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-white mb-4">Related Resources</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href={data.blogHref} className="group block">
                                        <span className="text-sm text-slate-500 block mb-1">Expert Guide</span>
                                        <span className="text-violet-400 group-hover:text-violet-300 transition-colors font-medium flex items-center gap-2">
                                            {data.blogName} <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </Link>
                                </li>
                                <li className="pt-4 border-t border-white/5">
                                    <Link href={data.audienceHref} className="group block">
                                        <span className="text-sm text-slate-500 block mb-1">Solutions for</span>
                                        <span className="text-violet-400 group-hover:text-violet-300 transition-colors font-medium flex items-center gap-2">
                                            {data.audienceName} <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </Link>
                                </li>
                                <li className="pt-4 border-t border-white/5">
                                    <Link href="/tools" className="group block">
                                        <span className="text-sm text-slate-500 block mb-1">More Free Tools</span>
                                        <span className="text-violet-400 group-hover:text-violet-300 transition-colors font-medium flex items-center gap-2">
                                            View Affiliate Toolkit <ArrowRight className="h-4 w-4" />
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 rounded-2xl text-center">
                            <ShieldCheck className="h-10 w-10 text-white/80 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Protect Your Income</h3>
                            <p className="text-white/80 text-sm mb-6">Create a free account to test our monitoring automation today.</p>
                            <Link href="/pricing" className="block w-full bg-white text-violet-900 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors">
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
