import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/lib/blogPosts';

export const metadata: Metadata = {
    title: 'Affiliate Marketing Blog — Tips & Guides',
    description: 'Expert tips for affiliate marketers. Learn how to fix broken Amazon links, protect your commissions, and grow your affiliate income.',
    alternates: {
        canonical: 'https://www.affiliatelinkmonitoring.com/blog',
    },
    openGraph: {
        url: 'https://www.affiliatelinkmonitoring.com/blog',
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affiliatelinkmonitoring.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.affiliatelinkmonitoring.com/blog' },
    ],
};


export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
