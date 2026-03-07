import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, Shield, ArrowRight, Activity, Zap } from 'lucide-react';

type CompetitorParams = {
    competitor: string;
};

const competitors = {
    'pageradar': {
        name: 'PageRadar',
        title: 'PageRadar Alternative for Affiliate Monitoring',
        description: 'Looking for a PageRadar alternative? LinkMonitor offers deeper affiliate network integrations and specific out-of-stock detection vs basic uptime monitoring.',
        features: ['Focused entirely on Affiliate Links, not just general 404s', 'Parses complex network redirects', 'Calculates revenue lost', 'Amazon product out-of-stock checking'],
        competitorLimitations: ['General purpose uptime tool', 'Does not understand affiliate redirects', 'No affiliate revenue tracking', 'Cannot check Amazon product availability status']
    },
    'thirstyaffiliates': {
        name: 'ThirstyAffiliates',
        title: 'ThirstyAffiliates Alternative & Companion',
        description: 'ThirstyAffiliates cloaks links, but LinkMonitor protects them. Use LinkMonitor alongside or instead of TA to ensure your destination URLs actually work.',
        features: ['Scans destination URLs past redirects', 'Works with any link shortener', 'No WordPress plugin bloat', 'Notifies you if the merchant goes offline'],
        competitorLimitations: ['Only a link cloaking tool', 'Does not actively scan destination health daily', 'Tied to WordPress', 'Cannot detect if an Amazon product is out of stock']
    },
    'link-whisper': {
        name: 'Link Whisper',
        title: 'Link Whisper Alternative for Broken Links',
        description: 'Link Whisper is great for internal links, but fails at complex affiliate redirects. Switch to LinkMonitor for dedicated external affiliate URL monitoring.',
        features: ['Follows 5+ deep redirect chains', 'Cloud-based scanning (zero server load)', 'Daily automated checks', 'Extracts and verifies Amazon ASINs'],
        competitorLimitations: ['Runs checks on your WordPress server, slowing it down', 'Struggles with affiliate network redirects (ShareASale, CJ, etc.)', 'Primarily built for internal linking, not affiliate protection']
    },
    'dead-link-checker': {
        name: 'Dead Link Checker',
        title: 'Dead Link Checker Alternative',
        description: 'Stop using generic dead link checkers that get blocked by Amazon. LinkMonitor is purpose-built to navigate affiliate networks without getting blocked.',
        features: ['Bypasses anti-bot screens on affiliate networks', 'Specific Amazon product checking', 'Continuous daily monitoring', 'Categorized reporting by affiliate network'],
        competitorLimitations: ['Gets blocked by Amazon and Pinterest', 'Manual checking required for free tools', 'No understanding of affiliate tokens or IDs', 'Ugly, outdated interface']
    },
    'pretty-links': {
        name: 'Pretty Links',
        title: 'Pretty Links Alternative for Monitoring',
        description: 'While Pretty Links makes links look nice, LinkMonitor makes sure they are profitable. Discover 404s in your Pretty Links destination URLs automatically.',
        features: ['Monitors the final destination URL', 'Platform agnostic (no WP required)', 'Identifies which specific Pretty Link is broken', 'Zero impact on site speed'],
        competitorLimitations: ['Only manages the superficial short link', 'Silent failures when the merchant changes links', 'Heavy database usage on large WordPress sites', 'No active daily health alerts for the final destination']
    }
};

export async function generateStaticParams() {
    return Object.keys(competitors).map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: { params: Promise<CompetitorParams> }): Promise<Metadata> {
    const { competitor } = await params;
    const data = competitors[competitor as keyof typeof competitors];

    if (!data) return {};

    return {
        title: data.title,
        description: data.description,
        alternates: {
            canonical: `https://www.affiliatelinkmonitoring.com/alternative/${competitor}`
        }
    };
}

export default async function CompetitorAlternativePage({ params }: { params: Promise<CompetitorParams> }) {
    const { competitor } = await params;
    const data = competitors[competitor as keyof typeof competitors];

    if (!data) {
        notFound();
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com/' },
            { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://www.affiliatelinkmonitoring.com/alternative' },
            { '@type': 'ListItem', position: 3, name: data.name, item: `https://www.affiliatelinkmonitoring.com/alternative/${competitor}` }
        ]
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <header className="pt-32 pb-20 relative border-b border-white/5 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <div className="text-sm font-medium text-slate-400 mb-6 flex justify-center items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>›</span>
                        <Link href="/blog/best-affiliate-link-monitoring-tools" className="hover:text-white transition-colors">Alternative</Link>
                        <span>›</span>
                        <span className="text-white">{data.name}</span>
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wide border border-blue-500/20 mb-6">
                        VS {data.name.toUpperCase()}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                        The Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{data.name} Alternative</span> <br />
                        For Affiliate Marketers
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        {data.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/pricing" className="btn-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
                            Compare Plans <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link href="/blog/best-affiliate-link-monitoring-tools" className="px-8 py-4 rounded-xl font-bold text-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5 flex items-center justify-center">
                            See Full Comparison
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-20 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Competitor Limits */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full blur-2xl"></div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <X className="h-5 w-5 text-red-500" />
                            </span>
                            {data.name} Limits
                        </h2>
                        <ul className="space-y-4">
                            {data.competitorLimitations.map((lim, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-300">{lim}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* LinkMonitor Advantages */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl"></div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Check className="h-5 w-5 text-blue-400" />
                            </span>
                            LinkMonitor Edge
                        </h2>
                        <ul className="space-y-4">
                            {data.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-200 font-medium">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Hub links */}
                <div className="bg-slate-900 border border-white/5 rounded-3xl p-10 text-center">
                    <Shield className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Ready for specialized affiliate monitoring?</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                        Stop trying to make generic tools work for affiliate marketing links. LinkMonitor parses complex networks, tracks out-of-stock items, and prevents revenue loss.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/pricing" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                            View Pricing
                        </Link>
                        <Link href="/monitor/amazon-affiliate-links" className="text-blue-400 hover:text-blue-300 font-bold px-8 py-3 flex items-center justify-center gap-2 transition-colors">
                            Explore Platform Monitoring <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
