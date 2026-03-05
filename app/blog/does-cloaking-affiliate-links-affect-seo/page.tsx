import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Clock, Shield, XCircle } from 'lucide-react';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export const metadata: Metadata = {
    title: 'Does Cloaking Affiliate Links Affect SEO? Google\'s Official Position (2026)',
    description:
        'Does link cloaking hurt your SEO? Learn Google\'s official stance on cloaked affiliate links, the rel=sponsored tag, and best practices for affiliate link management in 2026.',
    keywords: [
        'does cloaking affiliate links affect seo',
        'affiliate link cloaking seo',
        'google affiliate link policy',
        'rel sponsored affiliate links',
        'link cloaking seo impact',
        'affiliate link nofollow',
        'pretty links seo',
        'thirstyaffiliates seo',
    ],
    alternates: {
        canonical: `${BASE_URL}/blog/does-cloaking-affiliate-links-affect-seo`,
    },
    openGraph: {
        title: 'Does Cloaking Affiliate Links Affect SEO? Google\'s Official Position (2026)',
        description: 'Google\'s official stance on cloaked affiliate links and rel=sponsored — what every affiliate marketer needs to know.',
        type: 'article',
        url: `${BASE_URL}/blog/does-cloaking-affiliate-links-affect-seo`,
        publishedTime: '2026-03-05T00:00:00Z',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Does cloaking affiliate links hurt SEO?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not inherently, if done correctly. Google does not penalize affiliate link cloaking itself — as long as you use the rel="sponsored" or rel="nofollow" attribute on your affiliate links. What Google does penalize is using cloaking to show different content to Googlebot vs. users. Properly implemented link cloaking with correct rel attributes is SEO-safe.',
            },
        },
        {
            '@type': 'Question',
            name: 'Should affiliate links be nofollow or sponsored?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Google recommends using rel="sponsored" for affiliate links and paid placements. The rel="nofollow" tag also works and is still widely accepted. Both prevent passing PageRank to the affiliate merchant, which is the main concern. As of September 2019, Google treats nofollow as a "hint" rather than a directive, but sponsored is the more precise attribute for affiliate links.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is affiliate link cloaking?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Affiliate link cloaking means redirecting a long, ugly affiliate URL through a clean, branded URL on your own domain — for example, replacing "https://www.amazon.com/dp/B09XYZ123?tag=yourtag-20" with "https://yoursite.com/recommends/my-product". Tools like Pretty Links, ThirstyAffiliates, and Lasso do this automatically. The final destination is still the affiliate merchant.',
            },
        },
        {
            '@type': 'Question',
            name: 'Does link cloaking break affiliate tracking?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No, if your cloaking tool is set up correctly. The redirect preserves your affiliate tracking tag — the user ends up on the merchant\'s site with your affiliate code intact. However, if your cloaking plugin breaks or the redirect fails, your tracking can be lost. This is why monitoring your cloaked links is as important as monitoring raw affiliate links.',
            },
        },
    ],
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Does Cloaking Affiliate Links Affect SEO? Google\'s Official Position (2026)',
    description: 'Google\'s official stance on affiliate link cloaking, rel=sponsored, and best practices for affiliate link management.',
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    author: {
        '@type': 'Person',
        name: 'Alex Miller',
        url: `${BASE_URL}/about/alex`,
        sameAs: 'https://www.linkedin.com/in/alex-miller-affiliatemarketing',
    },
    publisher: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Affiliate Link Monitor',
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/blog/does-cloaking-affiliate-links-affect-seo`,
    },
};

export default function CloakingAffiliateSEOPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-600/10 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <article className="pt-32 pb-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <Link href="/blog" className="text-sm text-slate-400 hover:text-violet-400 flex items-center gap-1 mb-8 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>

                        <div className="mb-12">
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 8 min read</span>
                                <span>•</span>
                                <span>March 5, 2026</span>
                                <span>•</span>
                                <Link href="/about/alex" className="text-violet-400 hover:text-violet-300 transition-colors">By Alex Miller</Link>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                Does Cloaking Affiliate Links Affect SEO? Google&apos;s Official Position (2026)
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                This is one of the most debated questions in affiliate marketing. Here&apos;s what Google actually says — and what you need to do to keep your affiliate links SEO-safe.
                            </p>
                        </div>

                        <div className="prose prose-invert prose-slate max-w-none space-y-8">

                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-emerald-200 mb-1">The Direct Answer</p>
                                        <p className="text-sm text-emerald-200/80">
                                            Affiliate link cloaking does <strong>not</strong> hurt SEO — as long as your cloaked links include <code className="bg-slate-900 px-1 rounded">rel=&quot;sponsored&quot;</code> or <code className="bg-slate-900 px-1 rounded">rel=&quot;nofollow&quot;</code>. Google&apos;s John Mueller has confirmed this multiple times. What Google penalizes is cloaking that hides different content from crawlers — not link shortening.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold pt-4">What Is Affiliate Link Cloaking?</h2>
                            <p className="text-slate-400 leading-relaxed">
                                Affiliate link cloaking means converting a long, messy affiliate URL into a clean, brandable one on your own domain. For example:
                            </p>
                            <div className="space-y-3">
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">Before cloaking (ugly, exposes your affiliate tag):</p>
                                    <code className="text-sm text-red-300 break-all">https://www.amazon.com/dp/B09XYZ123?tag=yourtag-20&linkCode=as2&camp=1789</code>
                                </div>
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-1">After cloaking (clean, branded):</p>
                                    <code className="text-sm text-emerald-300">https://yoursite.com/recommends/best-kitchen-scale</code>
                                </div>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Tools like Pretty Links, ThirstyAffiliates, and Lasso create these redirects automatically. The user still ends up on Amazon with your affiliate tag intact.
                            </p>

                            <h2 className="text-2xl font-bold pt-4">Google&apos;s Official Position on Affiliate Link Cloaking</h2>

                            <div className="p-6 bg-slate-900/50 border-l-4 border-violet-500 rounded-xl">
                                <p className="font-semibold text-violet-300 mb-2">Google Search Central Documentation</p>
                                <blockquote className="text-slate-300 text-sm leading-relaxed italic">
                                    &ldquo;If you participate in an affiliate program, use <code className="text-violet-400 not-italic">rel=&quot;sponsored&quot;</code> on links that are part of your affiliate arrangement. ... If you use a link cloaker or redirector, the underlying link should still follow this guidance.&rdquo;
                                </blockquote>
                                <p className="text-slate-500 text-xs mt-2">— Google Search Central, Links guidance for affiliates</p>
                            </div>

                            <p className="text-slate-400 leading-relaxed">
                                The key phrase: &ldquo;the underlying link should still follow this guidance.&rdquo; Google understands that link cloaking exists. They don&apos;t penalize it. They just require the correct rel attribute.
                            </p>

                            <h2 className="text-2xl font-bold pt-4">rel=&quot;sponsored&quot; vs. rel=&quot;nofollow&quot; — Which Should You Use?</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                                    <h3 className="font-bold text-violet-200 mb-3">rel=&quot;sponsored&quot; <span className="text-xs font-normal text-violet-400">(Recommended)</span></h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>✅ Google&apos;s preferred tag for paid links</li>
                                        <li>✅ Explicitly signals affiliate/commercial relationship</li>
                                        <li>✅ Prevents PageRank from passing to merchant</li>
                                        <li>✅ Introduced in September 2019</li>
                                        <li>⚠️ Not yet supported by all SEO tools</li>
                                    </ul>
                                </div>
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                    <h3 className="font-bold text-slate-200 mb-3">rel=&quot;nofollow&quot; <span className="text-xs font-normal text-slate-400">(Also Acceptable)</span></h3>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li>✅ Still widely used and accepted</li>
                                        <li>✅ Prevents PageRank passing</li>
                                        <li>✅ Universal plugin/tool support</li>
                                        <li>⚠️ Now a &quot;hint&quot; not a directive (since 2019)</li>
                                        <li>⚠️ Less precise for affiliate use case</li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-slate-400 leading-relaxed">
                                <strong className="text-white">Bottom line:</strong> If your cloaking plugin supports it, use <code className="text-violet-400 bg-slate-900 px-1 rounded">rel=&quot;sponsored&quot;</code>. If not, <code className="text-violet-400 bg-slate-900 px-1 rounded">rel=&quot;nofollow&quot;</code> is perfectly fine.
                            </p>

                            <h2 className="text-2xl font-bold pt-4">When Link Cloaking Can Hurt SEO (3 Mistakes to Avoid)</h2>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />,
                                        title: 'Mistake 1: Missing rel attribute',
                                        desc: 'If you cloak affiliate links without adding rel="sponsored" or rel="nofollow", Google may treat them as followed links — potentially passing PageRank to merchants and risking a manual penalty.',
                                    },
                                    {
                                        icon: <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />,
                                        title: 'Mistake 2: Cloaking your cloaker (double redirect)',
                                        desc: 'Adding unnecessary redirect chains (your site → link shortener → affiliate merchant) increases page load time, confuses crawlers, and creates additional points of failure where links can break.',
                                    },
                                    {
                                        icon: <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />,
                                        title: 'Mistake 3: Broken cloaked redirects',
                                        desc: 'If your cloaking plugin breaks or a redirect URL is misconfigured, the link silently fails. Users land on a 404 on your own domain — losing the affiliate commission entirely. These are especially insidious because your link appears to exist (it\'s on your domain) but doesn\'t work.',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        {item.icon}
                                        <div>
                                            <p className="font-semibold text-white mb-1">{item.title}</p>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold pt-4">When Link Cloaking Helps (3 Real Benefits)</h2>

                            <div className="space-y-3">
                                {[
                                    { icon: '🔗', title: 'Cleaner, more trustworthy links', desc: 'Readers are more likely to click a branded link like /recommends/best-coffee-maker than a raw Amazon URL with an affiliate tag. Higher click-through = more commissions.' },
                                    { icon: '🔄', title: 'One-place link management', desc: 'When a product URL changes (e.g., Amazon restructures their URL format), you update one redirect instead of hunting through every article. This significantly reduces broken link risk.' },
                                    { icon: '📊', title: 'Better click tracking', desc: 'Cloaking tools like ThirstyAffiliates and Lasso give you click data per link — which links your readers are actually clicking. This informs content strategy beyond what Amazon Associates reports show.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div>
                                            <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-amber-200 mb-2">The Hidden Risk of Cloaked Links</p>
                                        <p className="text-sm text-amber-200/80">
                                            Cloaked links create an extra layer of indirection. If the underlying affiliate URL changes (product removed, ASIN updated, merchant changes URL structure), your cloaked link still appears to load — but silently redirects to a broken destination. Standard broken link checkers won&apos;t catch this because they only check the redirect URL, not the final destination. Use a tool that follows all redirects and checks the final destination status.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-white mb-2">Monitor cloaked links and their destinations</p>
                                        <p className="text-sm text-slate-300 mb-3">
                                            Affiliate Link Monitor follows all redirect chains to the final destination URL — detecting broken cloaked links that standard tools miss.
                                        </p>
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all"
                                        >
                                            Start Monitoring Free <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-slate-900/50 border border-violet-500/30 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold mb-4">Keep your cloaked affiliate links working</h3>
                            <p className="text-slate-400 mb-6">Automated monitoring that follows redirect chains and checks the final destination — not just your redirect URL.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3 rounded-xl font-semibold">
                                    Start Free Monitoring <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/amazon-broken-link-checker" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                                    Try Free Checker
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
