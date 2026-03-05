import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Affiliate Marketing Blog — Tips, Guides & Link Monitoring Insights',
    description: 'Expert tips for affiliate marketers. Learn how to fix broken Amazon links, protect your commissions, and grow your affiliate income.',
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/blog',
    },
    openGraph: {
        url: 'https://www.affiliatelinkmonitoring.com/blog',
    },
};

const blogPosts = [
    {
        slug: 'best-affiliate-link-monitoring-tools',
        title: 'Best Affiliate Link Monitoring Tools 2026 (Honest Comparison)',
        excerpt: 'We compare AMZ Watcher, Pageradar, ThirstyAffiliates, Lasso, and Affiliate Link Monitor — with honest pros, cons, and a clear recommendation for your situation.',
        date: '2026-03-05',
        readTime: '10 min read',
        category: 'Tool Comparison',
    },
    {
        slug: 'affiliate-links-on-pinterest',
        title: 'Can You Use Affiliate Links on Pinterest? Rules & Best Practices 2026',
        excerpt: 'Pinterest\'s official affiliate link policy explained — which programs are allowed, FTC disclosure requirements, and how to protect your Pinterest affiliate income.',
        date: '2026-03-05',
        readTime: '7 min read',
        category: 'Pinterest',
    },
    {
        slug: 'does-cloaking-affiliate-links-affect-seo',
        title: 'Does Cloaking Affiliate Links Affect SEO? Google\'s Official Position',
        excerpt: 'Google\'s stance on link cloaking, when rel=sponsored is required, and the 3 mistakes that can actually hurt your rankings.',
        date: '2026-03-05',
        readTime: '8 min read',
        category: 'SEO',
    },
    {
        slug: 'amazon-products-out-of-stock-affiliate-guide',
        title: 'Amazon Products Out of Stock: A Complete Guide for Affiliates',
        excerpt: 'What happens to your commissions when Amazon products go out of stock, how long they stay unavailable, and how to find the right replacement ASIN.',
        date: '2026-03-05',
        readTime: '6 min read',
        category: 'Amazon',
    },
    {
        slug: 'how-often-to-check-affiliate-links',
        title: 'How Often Should You Check Your Affiliate Links? (2026 Guide)',
        excerpt: 'The optimal monitoring frequency by traffic level — hourly for 10k+ visitors, daily for 1k–10k, weekly minimum. And why the math matters more than you think.',
        date: '2026-03-05',
        readTime: '5 min read',
        category: 'Strategy',
    },
    {
        slug: 'amazon-associates-links-stop-working',
        title: 'Why Amazon Associates Links Stop Working (and How to Fix Them)',
        excerpt: 'Discover the top reasons your Amazon affiliate links break and learn practical solutions to keep your commissions flowing.',
        date: '2026-02-15',
        readTime: '6 min read',
        category: 'Amazon',
    },
    {
        slug: 'does-linktree-hurt-affiliate-commissions',
        title: 'Does Linktree Hurt Your Affiliate Commissions?',
        excerpt: 'An honest look at how Linktree affects your affiliate revenue and what you can do to maximize commissions from your bio link.',
        date: '2026-02-14',
        readTime: '5 min read',
        category: 'Linktree',
    },
];

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-600/15 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10">
                <section className="pt-32 pb-12">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Affiliate Marketing{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Blog</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Practical tips and guides to protect your affiliate revenue and grow your income.
                        </p>
                    </div>
                </section>

                <section className="pb-24">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="space-y-6">
                            {blogPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="block p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group"
                                >
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                                        <span className="px-2.5 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">{post.category}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {post.readTime}
                                        </span>
                                        <span className="text-slate-600">·</span>
                                        <span>By Alex Miller</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-400 mb-4">{post.excerpt}</p>
                                    <span className="text-violet-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read article <ArrowRight className="h-4 w-4" />
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
