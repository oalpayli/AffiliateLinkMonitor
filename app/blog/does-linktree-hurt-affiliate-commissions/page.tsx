import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Does Linktree Hurt Your Affiliate Commissions?',
    description:
        'An honest analysis of how Linktree affects your affiliate commissions. Learn the pros, cons, and how to maximize revenue from your bio link.',
    keywords: [
        'does linktree hurt affiliate commissions',
        'linktree affiliate marketing',
        'linktree commissions',
        'linktree affiliate links',
        'linktree vs direct links',
        'bio link affiliate marketing',
    ],
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/blog/does-linktree-hurt-affiliate-commissions',
    },
    openGraph: {
        title: 'Does Linktree Hurt Your Affiliate Commissions?',
        description: 'An honest analysis of how Linktree affects your affiliate revenue and what you can do about it.',
        type: 'article',
        url: 'https://www.affiliatelinkmonitoring.com/blog/does-linktree-hurt-affiliate-commissions',
        publishedTime: '2026-02-14T00:00:00Z',
    },
};

export default function LinktreeCommissionsPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/10 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <article className="pt-32 pb-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        {/* Back */}
                        <Link href="/blog" className="text-sm text-slate-400 hover:text-violet-400 flex items-center gap-1 mb-8 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>

                        {/* Header */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
                                <span>•</span>
                                <span>February 14, 2026</span>
                                <span>•</span>
                                <span className="text-violet-400">Updated March 2026</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                Does Linktree Hurt Your Affiliate Commissions?
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                If you&apos;re an affiliate marketer or content creator, your Linktree is probably your most valuable link. But could it be costing you commissions? Let&apos;s find out.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-invert prose-slate max-w-none space-y-8">

                            <h2 className="text-2xl font-bold pt-4">The Short Answer</h2>
                            <p className="text-slate-400 leading-relaxed">
                                <strong className="text-white">No, Linktree itself doesn&apos;t hurt your commissions.</strong> The affiliate tracking still works through Linktree links. However, there are several indirect ways your Linktree setup could be costing you money.
                            </p>

                            <h2 className="text-2xl font-bold pt-4">3 Ways Your Linktree Could Be Costing You Money</h2>

                            <div className="space-y-6">
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <h3 className="text-lg font-bold mb-2 flex items-start gap-3">
                                        <span className="bg-red-500/20 text-red-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                                        Broken Links You Don&apos;t Know About
                                    </h3>
                                    <p className="text-slate-400 text-sm ml-11 mb-3">
                                        This is the biggest problem. You set up your Linktree months ago and haven&apos;t checked it since. Meanwhile, one of your affiliate products was discontinued, a page URL changed, or a domain expired. That broken link is silently losing you money every single day.
                                    </p>
                                    <div className="ml-11 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-200">
                                                <strong>Real impact:</strong> If your Linktree gets 50 clicks/day and one of 5 links is broken, that&apos;s ~10 wasted clicks daily — potentially hundreds of dollars in lost commissions per month.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <h3 className="text-lg font-bold mb-2 flex items-start gap-3">
                                        <span className="bg-yellow-500/20 text-yellow-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                                        Extra Redirect = Slower Load Time
                                    </h3>
                                    <p className="text-slate-400 text-sm ml-11">
                                        Every redirect adds latency. Social media → Linktree → your site → affiliate link = multiple hops. Each hop increases the chance of someone bouncing before the page loads. This is especially true on mobile with slow connections.
                                    </p>
                                </div>

                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <h3 className="text-lg font-bold mb-2 flex items-start gap-3">
                                        <span className="bg-violet-500/20 text-violet-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                                        Decision Fatigue
                                    </h3>
                                    <p className="text-slate-400 text-sm ml-11">
                                        If your Linktree has too many options (15+ links), visitors get overwhelmed and may click nothing. Paradox of choice — fewer, well-organized options often convert better than a long list.
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold pt-4">How to Maximize Commissions from Linktree</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    "Keep your Linktree to 5-7 most important links",
                                    "Put highest-converting links at the top",
                                    "Use clear, action-oriented link titles",
                                    "Remove seasonal or expired promotions",
                                    "Monitor all links weekly for broken URLs",
                                    "A/B test link order monthly",
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-slate-300">{tip}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold pt-4">The #1 Rule: Never Let a Linktree Link Break</h2>

                            <p className="text-slate-400 leading-relaxed">
                                Your Linktree is your Bio Link — the single most valuable link you have on social media. If even one link on it is broken, you&apos;re wasting a significant portion of your traffic. The solution is simple: set up automatic monitoring.
                            </p>

                            <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-violet-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-white mb-2">Our Recommendation</p>
                                        <p className="text-sm text-slate-300">
                                            Use <Link href="/check-linktree-links" className="text-violet-400 hover:text-violet-300 underline">our free Linktree checker</Link> to scan your Linktree right now. Then set up daily monitoring so you get an email alert the moment any link breaks. It takes 30 seconds and it&apos;s free.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-16 p-8 bg-slate-900/50 border border-violet-500/30 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold mb-4">Check your Linktree links right now — free</h3>
                            <p className="text-slate-400 mb-6">See if any of your Linktree links are broken in 10 seconds.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/check-linktree-links" className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3 rounded-xl font-semibold">
                                    Check Linktree Now <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                                    Start Free Monitoring
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* BlogPosting JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: 'Does Linktree Hurt Your Affiliate Commissions?',
                        description: 'An honest analysis of how Linktree affects your affiliate commissions.',
                        datePublished: '2026-02-14',
                        dateModified: '2026-03-03',
                        author: {
                            '@type': 'Person',
                            name: 'Alex M.',
                            url: 'https://www.affiliatelinkmonitoring.com/about/alex',
                        },
                        publisher: {
                            '@type': 'Organization',
                            '@id': 'https://www.affiliatelinkmonitoring.com/#organization',
                            name: 'Affiliate Link Monitor',
                        },
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': 'https://www.affiliatelinkmonitoring.com/blog/does-linktree-hurt-affiliate-commissions',
                        },
                        breadcrumb: {
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
                                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.affiliatelinkmonitoring.com/blog' },
                                { '@type': 'ListItem', position: 3, name: 'Does Linktree Hurt Your Affiliate Commissions?', item: 'https://www.affiliatelinkmonitoring.com/blog/does-linktree-hurt-affiliate-commissions' },
                            ],
                        },
                    }),
                }}
            />

            {/* FAQPage schema — enables AI Overview passage extraction */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'Does Linktree hurt affiliate commissions?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'No, Linktree itself does not hurt your affiliate commissions. The affiliate tracking still works through Linktree links. However, broken or out-of-stock links in your Linktree, extra redirect latency, and decision fatigue from too many links can indirectly reduce your earnings.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'How many links should I have on my Linktree?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Research on the paradox of choice suggests keeping your Linktree to 5–7 links for best conversion. Too many options cause visitors to become overwhelmed and click nothing. Put your highest-converting affiliate links at the top.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'How can I check if my Linktree links are broken?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Use Affiliate Link Monitor\'s free Linktree Link Checker to scan your entire Linktree instantly — no signup required. For ongoing protection, set up automated monitoring to receive email alerts whenever a Linktree link breaks or goes out of stock.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Does an extra redirect from Linktree slow down my links?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes. Each redirect adds approximately 100–300ms of latency. A typical Linktree redirect path (social media → Linktree → your site → affiliate link) adds multiple hops. This is especially noticeable on mobile with slower connections and can cause some visitors to abandon before the destination page loads.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </div>
    );
}
