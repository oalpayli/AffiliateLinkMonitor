import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Linkedin } from 'lucide-react';

const BASE_URL = 'https://www.affiliatelinkmonitoring.com';

export const metadata: Metadata = {
    title: 'Alex Miller — Affiliate Marketing & SEO Writer | Affiliate Link Monitor',
    description: 'Alex Miller is an affiliate marketing practitioner and SEO writer with 8+ years of experience. Expert in Amazon Associates, broken link detection, and affiliate revenue optimization.',
    alternates: {
        canonical: `${BASE_URL}/about/alex`,
    },
    openGraph: {
        url: `${BASE_URL}/about/alex`,
    },
};

const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alex Miller',
    url: `${BASE_URL}/about/alex`,
    sameAs: 'https://www.linkedin.com/in/alex-miller-affiliatemarketing',
    jobTitle: 'Affiliate Marketing & SEO Writer',
    worksFor: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Affiliate Link Monitor',
    },
    knowsAbout: [
        'Affiliate Marketing',
        'Amazon Associates',
        'Broken Link Detection',
        'SEO',
        'Content Monetization',
    ],
    description: 'Affiliate marketing practitioner and SEO writer with 8+ years of experience helping content creators and bloggers protect their affiliate revenue.',
};

const articles = [
    {
        title: 'Why Amazon Associates Links Stop Working (and How to Fix Them)',
        href: '/blog/amazon-associates-links-stop-working',
        date: 'February 15, 2026',
        readTime: '6 min read',
    },
    {
        title: 'Does Linktree Hurt Your Affiliate Commissions?',
        href: '/blog/does-linktree-hurt-affiliate-commissions',
        date: 'February 14, 2026',
        readTime: '5 min read',
    },
];

export default function AuthorPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-[100%] blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-3xl pt-32 pb-24">
                {/* Back */}
                <Link href="/blog" className="text-sm text-slate-400 hover:text-violet-400 flex items-center gap-1 mb-12 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>

                {/* Author Card */}
                <div className="flex flex-col sm:flex-row items-start gap-8 mb-16 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-bold">
                        A
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Alex Miller</h1>
                        <p className="text-violet-400 font-medium mb-4">Affiliate Marketing & SEO Writer</p>
                        <p className="text-slate-400 leading-relaxed mb-5">
                            Affiliate marketing practitioner with 8+ years of experience helping content creators, bloggers, and social media publishers protect their affiliate revenue. Specializes in Amazon Associates program optimization, broken link management, and affiliate SEO strategy.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                            {['Amazon Associates', 'Affiliate SEO', 'Broken Link Detection', 'Content Monetization'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <a
                            href="https://www.linkedin.com/in/alex-miller-affiliatemarketing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
                        >
                            <Linkedin className="h-4 w-4" /> LinkedIn
                        </a>
                    </div>
                </div>

                {/* Articles */}
                <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-violet-400" />
                        Articles by Alex Miller
                    </h2>
                    <div className="space-y-4">
                        {articles.map(article => (
                            <Link
                                key={article.href}
                                href={article.href}
                                className="block p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-violet-500/40 transition-all group"
                            >
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                    <span>{article.date}</span>
                                    <span>·</span>
                                    <span>{article.readTime}</span>
                                </div>
                                <h3 className="font-semibold group-hover:text-violet-300 transition-colors">{article.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
