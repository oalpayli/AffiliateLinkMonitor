import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export interface AudiencePageConfig {
    audienceName: string;
    slug: string;
    headline: string;
    subheadline: string;
    badge?: string;
    painPoints: { title: string; desc: string }[];
    features: string[];
    relatedTool?: { label: string; href: string };
    relatedBlog?: { label: string; href: string };
    relatedMonitor?: { label: string; href: string };
    canonicalUrl: string;
}

export default function AudiencePage({ config }: { config: AudiencePageConfig }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${config.canonicalUrl}#webpage`,
                url: config.canonicalUrl,
                name: config.headline,
                description: config.subheadline,
                isPartOf: { '@id': 'https://www.affiliatelinkmonitoring.com/#website' },
                publisher: { '@id': 'https://www.affiliatelinkmonitoring.com/#organization' },
                inLanguage: 'en-US',
                breadcrumb: {
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
                        { '@type': 'ListItem', position: 2, name: 'For', item: 'https://www.affiliatelinkmonitoring.com/for' },
                        { '@type': 'ListItem', position: 3, name: config.audienceName, item: config.canonicalUrl },
                    ],
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/20 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                {/* Breadcrumb */}
                <div className="pt-24 pb-0">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <nav className="text-sm text-slate-500 flex items-center gap-2">
                            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/for" className="hover:text-slate-300 transition-colors">For</Link>
                            <span>/</span>
                            <span className="text-slate-400">{config.audienceName}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero */}
                <section className="pt-10 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <CheckCircle className="h-4 w-4" />
                            {config.badge ?? `Built for ${config.audienceName}`}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                            {config.headline}
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                            {config.subheadline}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
                            >
                                Start Monitoring Free
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            {config.relatedTool && (
                                <Link
                                    href={config.relatedTool.href}
                                    className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
                                >
                                    {config.relatedTool.label}
                                </Link>
                            )}
                        </div>

                        <p className="text-sm text-slate-500 mt-4">Free plan — up to 10 monitors. No credit card required.</p>
                    </div>
                </section>

                {/* Pain points */}
                <section className="pb-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl pt-20">
                        <h2 className="text-3xl font-bold text-center mb-4">
                            The problem {config.audienceName} face
                        </h2>
                        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                            These issues happen quietly. You won&apos;t know until you check — or until Affiliate Link Monitor tells you.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {config.painPoints.map((point, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                                    <AlertTriangle className="h-6 w-6 text-amber-400 mb-3" />
                                    <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                                    <p className="text-slate-400 text-sm">{point.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-4">
                            How Affiliate Link Monitor helps {config.audienceName}
                        </h2>
                        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                            Set up in 30 seconds. Get your first alert within the hour if anything is already broken.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {config.features.map((f, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 text-sm">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Internal links */}
                {(config.relatedBlog || config.relatedMonitor) && (
                    <section className="pb-20">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="grid md:grid-cols-2 gap-6">
                                {config.relatedBlog && (
                                    <Link href={config.relatedBlog.href} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group">
                                        <p className="text-xs text-violet-400 font-medium mb-2 uppercase tracking-wider">Related Guide</p>
                                        <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors">{config.relatedBlog.label}</h3>
                                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">Read article <ArrowRight className="h-3 w-3" /></p>
                                    </Link>
                                )}
                                {config.relatedMonitor && (
                                    <Link href={config.relatedMonitor.href} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group">
                                        <p className="text-xs text-violet-400 font-medium mb-2 uppercase tracking-wider">Platform Guide</p>
                                        <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors">{config.relatedMonitor.label}</h3>
                                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">See monitoring guide <ArrowRight className="h-3 w-3" /></p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Pricing callout */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { plan: 'Free', price: '$0/month', features: ['10 link monitors', 'Daily or weekly scans', 'Email alerts', 'No credit card required'] },
                                { plan: 'Pro', price: '$12/month', features: ['60 link monitors', 'Hourly, daily, or weekly scans', 'Bulk CSV import', 'Priority support', '14-day money-back guarantee'], highlight: true },
                            ].map((tier) => (
                                <div key={tier.plan} className={`p-8 rounded-2xl border ${tier.highlight ? 'bg-violet-500/10 border-violet-500/30' : 'bg-slate-900/50 border-slate-800'}`}>
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-2xl font-bold">{tier.plan}</span>
                                        <span className="text-slate-400">{tier.price}</span>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {tier.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/dashboard"
                                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${tier.highlight ? 'btn-primary' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
                                    >
                                        Get Started <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Stop guessing. Start monitoring.
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Add your first link in 30 seconds. Free forever for up to 10 monitors.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center gap-2 btn-primary px-10 py-4 rounded-xl font-semibold text-lg"
                        >
                            Start Free — No Card Required
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
