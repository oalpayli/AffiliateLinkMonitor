import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

type CategoryParams = {
    slug: string;
};

const categories = {
    'amazon': {
        name: 'Amazon Associates',
        description: 'Guides and strategies for maximizing your Amazon Associates income.',
        posts: [
            {
                slug: 'amazon-products-out-of-stock-affiliate-guide',
                title: 'Amazon Products Out of Stock: A Complete Guide for Affiliates',
                excerpt: 'What happens to your commissions when Amazon products go out of stock, how long they stay unavailable...',
                date: '2026-03-05',
                readTime: '6 min read'
            },
            {
                slug: 'amazon-associates-links-stop-working',
                title: 'Why Amazon Associates Links Stop Working (and How to Fix Them)',
                excerpt: 'Discover the top reasons your Amazon affiliate links break and learn practical solutions...',
                date: '2026-02-15',
                readTime: '6 min read'
            }
        ]
    },
    'pinterest': {
        name: 'Pinterest Marketing',
        description: 'Learn how to legally use affiliate links on Pinterest and protect your pins from breaking.',
        posts: [
            {
                slug: 'affiliate-links-on-pinterest',
                title: 'Can You Use Affiliate Links on Pinterest? Rules & Best Practices 2026',
                excerpt: 'Pinterest\'s official affiliate link policy explained — which programs are allowed...',
                date: '2026-03-05',
                readTime: '7 min read'
            }
        ]
    },
    'link-monitoring': {
        name: 'Link Monitoring',
        description: 'Tools, software, and methods to monitor your affiliate links effectively.',
        posts: [
            {
                slug: 'best-affiliate-link-monitoring-tools',
                title: 'Best Affiliate Link Monitoring Tools 2026 (Honest Comparison)',
                excerpt: 'We compare AMZ Watcher, Pageradar, ThirstyAffiliates, Lasso, and Affiliate Link Monitor...',
                date: '2026-03-05',
                readTime: '10 min read'
            },
            {
                slug: 'does-linktree-hurt-affiliate-commissions',
                title: 'Does Linktree Hurt Your Affiliate Commissions?',
                excerpt: 'An honest look at how Linktree affects your affiliate revenue and what you can do to maximize commissions...',
                date: '2026-02-14',
                readTime: '5 min read'
            }
        ]
    },
    'affiliate-strategy': {
        name: 'Affiliate Strategy',
        description: 'General affiliate marketing strategies, SEO tips, and growth tactics.',
        posts: [
            {
                slug: 'how-often-to-check-affiliate-links',
                title: 'How Often Should You Check Your Affiliate Links? (2026 Guide)',
                excerpt: 'The optimal monitoring frequency by traffic level — hourly for 10k+ visitors, daily for 1k–10k, weekly minimum...',
                date: '2026-03-05',
                readTime: '5 min read'
            },
            {
                slug: 'does-cloaking-affiliate-links-affect-seo',
                title: 'Does Cloaking Affiliate Links Affect SEO? Google\'s Official Position',
                excerpt: 'Google\'s stance on link cloaking, when rel=sponsored is required, and the 3 mistakes that can actually hurt your rankings.',
                date: '2026-03-05',
                readTime: '8 min read'
            }
        ]
    }
};

export async function generateStaticParams() {
    return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<CategoryParams> }): Promise<Metadata> {
    const { slug } = await params;
    const data = categories[slug as keyof typeof categories];

    if (!data) return {};

    return {
        title: `${data.name} Articles | LinkMonitor Blog`,
        description: data.description,
        alternates: {
            canonical: `https://www.affiliatelinkmonitoring.com/blog/category/${slug}`
        }
    };
}

export default async function BlogCategoryPage({ params }: { params: Promise<CategoryParams> }) {
    const { slug } = await params;
    const data = categories[slug as keyof typeof categories];

    if (!data) {
        notFound();
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.affiliatelinkmonitoring.com/blog' },
            { '@type': 'ListItem', position: 3, name: data.name, item: `https://www.affiliatelinkmonitoring.com/blog/category/${slug}` }
        ]
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10 pt-32 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
                        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <span>›</span>
                        <span className="text-white">{data.name}</span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 mb-12 text-center backdrop-blur-sm">
                        <Tag className="h-10 w-10 text-violet-400 mx-auto mb-4" />
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
                            {data.name}
                        </h1>
                        <p className="text-lg text-slate-400">
                            {data.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {data.posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="block p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-violet-500/30 transition-all group"
                            >
                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                                    <span className="px-2.5 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">{data.name}</span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.readTime}
                                    </span>
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
            </div>
        </div>
    );
}
