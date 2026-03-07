import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, TrendingDown } from 'lucide-react';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export const metadata: Metadata = {
    title: 'Amazon Products Out of Stock: A Complete Guide for Affiliates',
    description:
        'What happens to your affiliate commissions when Amazon products go out of stock? Learn the difference between out-of-stock and unavailable, how long it lasts, and how to protect your income.',
    keywords: [
        'amazon out of stock affiliate',
        'amazon product unavailable commissions',
        'amazon affiliate out of stock earnings',
        'amazon product discontinued affiliate',
        'amazon affiliate link out of stock',
        'affiliate commission out of stock amazon',
    ],
    alternates: {
        canonical: `${BASE_URL}/blog/amazon-products-out-of-stock-affiliate-guide`,
    },
    openGraph: {
        title: 'Amazon Products Out of Stock: A Complete Guide for Affiliates',
        description: 'What happens to your affiliate commissions when Amazon products go out of stock? Complete guide for Amazon Associates.',
        type: 'article',
        url: `${BASE_URL}/blog/amazon-products-out-of-stock-affiliate-guide`,
        publishedTime: '2026-03-05T00:00:00Z',
    },
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Amazon Products Out of Stock: A Complete Guide for Affiliates',
    description: 'What happens to affiliate commissions when Amazon products go out of stock, and how to protect your income.',
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
        '@id': `${BASE_URL}/blog/amazon-products-out-of-stock-affiliate-guide`,
    },
    url: `${BASE_URL}/blog/amazon-products-out-of-stock-affiliate-guide`,
    image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
    },
};

export default function AmazonOutOfStockPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <article className="pt-32 pb-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <Link href="/blog" className="text-sm text-slate-400 hover:text-violet-400 flex items-center gap-1 mb-8 transition-colors">
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>

                        <div className="mb-12">
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 6 min read</span>
                                <span>•</span>
                                <span>March 5, 2026</span>
                                <span>•</span>
                                <Link href="/about/alex" className="text-violet-400 hover:text-violet-300 transition-colors">By Alex Miller</Link>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                                Amazon Products Out of Stock: A Complete Guide for Affiliates
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                You write the perfect product review. Thousands of readers click your Amazon affiliate link. But the product is out of stock. Here&apos;s exactly what that means for your commissions — and what to do about it.
                            </p>
                        </div>

                        <div className="prose prose-invert prose-slate max-w-none space-y-8">

                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <TrendingDown className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-red-200 mb-1">The Commission Truth</p>
                                        <p className="text-sm text-red-200/80">
                                            When an Amazon product is out of stock, there is <strong>no Add to Cart button</strong>. No purchase = no commission. Every click is wasted until the product restocks or you update the link.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold pt-4">Out of Stock vs. Currently Unavailable: What&apos;s the Difference?</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                    <h3 className="font-bold text-amber-200 mb-3">⏱ &quot;Out of Stock&quot;</h3>
                                    <ul className="space-y-2 text-sm text-amber-200/80">
                                        <li>• Product exists, temporarily unavailable</li>
                                        <li>• Listing shows &quot;Temporarily out of stock&quot;</li>
                                        <li>• May return within days to weeks</li>
                                        <li>• You can set up &quot;Notify me&quot; alerts</li>
                                        <li>• Worth monitoring — may not need replacing</li>
                                    </ul>
                                </div>
                                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                                    <h3 className="font-bold text-red-200 mb-3">❌ &quot;Currently Unavailable&quot;</h3>
                                    <ul className="space-y-2 text-sm text-red-200/80">
                                        <li>• Product is discontinued or removed</li>
                                        <li>• Listing shows &quot;Currently unavailable&quot;</li>
                                        <li>• Unlikely or impossible to return</li>
                                        <li>• No notify option available</li>
                                        <li>• Requires immediate link replacement</li>
                                    </ul>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold pt-4">How Long Do Amazon Products Stay Out of Stock?</h2>
                            <p className="text-slate-400 leading-relaxed">
                                It depends on the reason for the stock shortage. Here&apos;s what to expect based on the most common causes:
                            </p>

                            <div className="space-y-3">
                                {[
                                    { cause: 'Peak season demand spike (Black Friday, Prime Day)', duration: 'Hours to 3 days', action: 'Wait — likely restocks fast' },
                                    { cause: 'Normal inventory cycle', duration: '3–14 days', action: 'Monitor; replace if 2+ weeks' },
                                    { cause: 'Supply chain disruption', duration: '2–8 weeks', action: 'Find a substitute immediately' },
                                    { cause: 'Product discontinuation', duration: 'Permanent', action: 'Replace the link now' },
                                    { cause: 'Seller account suspended', duration: 'Unknown', action: 'Find alternative seller/ASIN' },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-sm">
                                        <span className="text-slate-300 font-medium">{row.cause}</span>
                                        <span className="text-violet-400 text-center">{row.duration}</span>
                                        <span className="text-slate-400 text-right">{row.action}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold pt-4">The Commission Impact: A Real Example</h2>

                            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
                                <h3 className="font-semibold text-white mb-4">Scenario</h3>
                                <div className="space-y-3 text-sm text-slate-300">
                                    <p>📄 Blog post about kitchen gadgets: 2,000 monthly visitors</p>
                                    <p>🔗 10 Amazon affiliate links on the page, 1 goes out of stock</p>
                                    <p>📊 Typical affiliate conversion rate: 2.5%</p>
                                    <p>💰 Average commission: $3.50 per sale</p>
                                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <p className="font-semibold text-red-300 mb-1">Monthly commission loss from 1 out-of-stock link:</p>
                                        <p className="text-2xl font-bold text-red-400">≈ $17.50 / month</p>
                                        <p className="text-slate-500 text-xs mt-1">200 clicks × 2.5% conversion × $3.50 commission</p>
                                    </div>
                                    <p className="text-slate-500">A popular product page with 10,000 monthly visitors and a $25 average commission could lose $500+ per month from a single out-of-stock item.</p>
                                    <Link href="/tools/revenue-loss-calculator" className="inline-flex items-center gap-1.5 mt-3 text-sm text-violet-400 hover:text-violet-300 underline font-medium">
                                        Calculate your own revenue loss →
                                    </Link>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold pt-4">How to Find the Right Replacement ASIN</h2>
                            <p className="text-slate-400 leading-relaxed">
                                When a product goes permanently unavailable, your job is to find the best substitute before too much traffic is wasted. Here&apos;s a quick process:
                            </p>

                            <div className="space-y-4">
                                {[
                                    { step: 1, title: 'Search for the product by name on Amazon', desc: 'Often, the same product exists under a new ASIN, with slightly updated packaging or a different seller.' },
                                    { step: 2, title: 'Check the brand\'s own listing', desc: 'Go to the brand\'s Amazon storefront directly. If the exact item is gone, find the closest model in the same price range.' },
                                    { step: 3, title: 'Filter by review count and rating', desc: 'Choose a replacement with 4.0+ stars and 100+ reviews to maintain your content quality and reader trust.' },
                                    { step: 4, title: 'Update all occurrences on the page', desc: 'Search your content for the old ASIN or URL and replace every instance — including in image alt text and any embedded widgets.' },
                                    { step: 5, title: 'Set up monitoring on the new link', desc: 'Add the replacement link to your monitoring setup immediately, so you\'re alerted if it goes out of stock too.' },
                                ].map((item) => (
                                    <div key={item.step} className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl flex gap-4">
                                        <span className="bg-violet-500/20 text-violet-400 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</span>
                                        <div>
                                            <p className="font-semibold text-white mb-1">{item.title}</p>
                                            <p className="text-sm text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-2xl font-bold pt-4">Why Automated Monitoring Is Essential</h2>
                            <p className="text-slate-400 leading-relaxed">
                                Manually checking every affiliate link for out-of-stock status is near-impossible at scale. A site with 50 articles and 10 affiliate links each = 500 links to check regularly. Automated tools scan your links daily or hourly and alert you the moment something changes — so you can fix it before losing meaningful revenue.
                            </p>

                            <div className="p-6 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-violet-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-white mb-2">Affiliate Link Monitor detects out-of-stock Amazon products</p>
                                        <p className="text-sm text-slate-300 mb-3">
                                            Unlike generic broken link checkers that only catch 404 errors, Affiliate Link Monitor specifically detects when Amazon products go out of stock or become &quot;Currently Unavailable&quot; — even when the page still loads correctly.
                                        </p>
                                        <Link
                                            href="/tools/amazon-broken-link-checker"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all"
                                        >
                                            Try the Free Amazon Checker <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div className="mt-12 pt-8 border-t border-slate-800">
                            <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Link href="/blog/amazon-associates-links-stop-working" className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-violet-500/30 transition-colors group">
                                    <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Why Amazon Associates Links Stop Working</p>
                                    <p className="text-xs text-slate-500 mt-1">Amazon · 6 min read</p>
                                </Link>
                                <Link href="/blog/how-often-to-check-affiliate-links" className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-violet-500/30 transition-colors group">
                                    <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">How Often Should You Check Your Affiliate Links?</p>
                                    <p className="text-xs text-slate-500 mt-1">Strategy · 5 min read</p>
                                </Link>
                                <Link href="/blog/best-affiliate-link-monitoring-tools" className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-violet-500/30 transition-colors group">
                                    <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">Best Affiliate Link Monitoring Tools 2026</p>
                                    <p className="text-xs text-slate-500 mt-1">Tool Comparison · 10 min read</p>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-slate-900/50 border border-violet-500/30 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold mb-4">Stop losing commissions to out-of-stock Amazon products</h3>
                            <p className="text-slate-400 mb-6">Get instant alerts when your Amazon affiliate links go out of stock. Setup takes 30 seconds.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-3 rounded-xl font-semibold">
                                    Start Monitoring Free <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/tools/amazon-broken-link-checker" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all">
                                    Free Amazon Link Check
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
