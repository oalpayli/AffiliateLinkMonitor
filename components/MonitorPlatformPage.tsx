import Link from 'next/link';
import { ArrowRight, CheckCircle, Bell, Clock, Shield } from 'lucide-react';

export interface MonitorPlatformConfig {
    platformName: string;
    slug: string;
    headline: string;
    subheadline: string;
    badge?: string;
    whatBreaks: { title: string; desc: string }[];
    features: string[];
    relatedTool?: { label: string; href: string };
    relatedBlog?: { label: string; href: string };
    relatedAudience?: { label: string; href: string };
    faq: { question: string; answer: string }[];
    canonicalUrl: string;
}

export default function MonitorPlatformPage({ config }: { config: MonitorPlatformConfig }) {
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
                        { '@type': 'ListItem', position: 2, name: 'Monitor', item: 'https://www.affiliatelinkmonitoring.com/monitor' },
                        { '@type': 'ListItem', position: 3, name: `${config.platformName} Affiliate Links`, item: config.canonicalUrl },
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
                            <Link href="/monitor" className="hover:text-slate-300 transition-colors">Monitor</Link>
                            <span>/</span>
                            <span className="text-slate-400">{config.platformName} Affiliate Links</span>
                        </nav>
                    </div>
                </div>

                {/* Hero */}
                <section className="pt-10 pb-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-8">
                            <Shield className="h-4 w-4" />
                            {config.badge ?? `${config.platformName} Affiliate Link Monitoring`}
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

                        <p className="text-sm text-slate-500 mt-4">Free plan available — no credit card required</p>
                    </div>
                </section>

                {/* What breaks */}
                <section className="pb-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-4">
                            What breaks {config.platformName} affiliate links
                        </h2>
                        <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
                            These issues cost affiliates commissions every day — and most go undetected for weeks.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {config.whatBreaks.map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                    <div className="text-2xl mb-3 font-bold text-red-400">#{i + 1}</div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it works */}
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">How monitoring works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: <ArrowRight className="h-6 w-6 text-violet-400" />, step: '1', title: 'Add your links', desc: 'Paste your affiliate URLs or bulk import from a CSV. Takes 30 seconds.' },
                                { icon: <Clock className="h-6 w-6 text-violet-400" />, step: '2', title: 'We watch 24/7', desc: 'Our system checks every link on your chosen schedule — hourly, daily, or weekly.' },
                                { icon: <Bell className="h-6 w-6 text-violet-400" />, step: '3', title: 'Instant email alert', desc: 'The moment a link breaks, we email you within 60 seconds so you can fix it fast.' },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-violet-400">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Everything you get with {config.platformName} monitoring
                        </h2>
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

                {/* Internal links section */}
                {(config.relatedBlog || config.relatedAudience) && (
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
                                {config.relatedAudience && (
                                    <Link href={config.relatedAudience.href} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group">
                                        <p className="text-xs text-violet-400 font-medium mb-2 uppercase tracking-wider">Built For</p>
                                        <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors">{config.relatedAudience.label}</h3>
                                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">See use case <ArrowRight className="h-3 w-3" /></p>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ */}
                <section className="py-20 bg-slate-950/50">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
                        <div className="space-y-4">
                            {config.faq.map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                                    <h3 className="font-semibold mb-2">{item.question}</h3>
                                    <p className="text-slate-400 text-sm">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Start monitoring your {config.platformName} links today
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Free plan included. No credit card. Takes 30 seconds to set up.
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
                                href="/pricing"
                                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
