import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900/50 border-t border-white/5 pt-16 pb-8 mt-auto relative z-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 overflow-hidden rounded-lg flex-shrink-0">
                                <Image src="/logo.png" alt="Affiliate Link Monitor Logo" width={32} height={32} className="h-full w-full object-cover opacity-80" />
                            </div>
                            <span className="font-bold text-lg text-white">LinkMonitor</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Protect your revenue by automatically detecting broken affiliate links. The smartest way to monitor your content.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors py-1 block">Pricing</Link></li>
                            <li><Link href="/tools" className="hover:text-emerald-400 transition-colors py-1 block">Free Tools</Link></li>
                            <li><Link href="/monitor" className="hover:text-emerald-400 transition-colors py-1 block">Monitor by Platform</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors py-1 block">How It Works</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/blog" className="hover:text-violet-400 transition-colors py-1 block">Blog</Link></li>
                            <li><Link href="/tools/amazon-broken-link-checker" className="hover:text-violet-400 transition-colors py-1 block">Amazon Checker</Link></li>
                            <li><Link href="/tools/linktree-link-checker" className="hover:text-violet-400 transition-colors py-1 block">Linktree Checker</Link></li>
                            <li><Link href="/tools/revenue-loss-calculator" className="hover:text-violet-400 transition-colors py-1 block">Revenue Calculator</Link></li>
                            <li><Link href="/tools/link-health-scanner" className="hover:text-violet-400 transition-colors py-1 block">Link Health Scanner</Link></li>
                        </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Use Cases</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/for/bloggers" className="hover:text-blue-400 transition-colors py-1 block">For Bloggers</Link></li>
                            <li><Link href="/for/amazon-associates" className="hover:text-blue-400 transition-colors py-1 block">For Amazon Assoc.</Link></li>
                            <li><Link href="/for/pinterest-creators" className="hover:text-blue-400 transition-colors py-1 block">For Pinterest</Link></li>
                            <li><Link href="/for/instagram-creators" className="hover:text-blue-400 transition-colors py-1 block">For Instagram</Link></li>
                            <li><Link href="/for/niche-sites" className="hover:text-blue-400 transition-colors py-1 block">For Niche Sites</Link></li>
                            <li><Link href="/for/affiliate-agencies" className="hover:text-blue-400 transition-colors py-1 block">For Agencies</Link></li>
                            <li><Link href="/for" className="hover:text-blue-400 transition-colors py-1 block text-slate-500">All Use Cases →</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/about" className="hover:text-purple-400 transition-colors py-1 block">About</Link></li>
                            <li><Link href="/about/alex" className="hover:text-purple-400 transition-colors py-1 block">Alex Miller</Link></li>
                            <li><Link href="/support" className="hover:text-purple-400 transition-colors py-1 block">Support</Link></li>
                            <li><Link href="/blog/best-affiliate-link-monitoring-tools" className="hover:text-purple-400 transition-colors py-1 block">Comparisons</Link></li>
                            <li><Link href="/privacy" className="hover:text-purple-400 transition-colors py-1 block">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-purple-400 transition-colors py-1 block">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Monitor platforms row */}
                <div className="border-t border-white/5 pt-8 pb-6 mb-4">
                    <p className="text-xs text-slate-600 uppercase tracking-wider mb-4 font-medium">Monitor by Platform</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {[
                            { label: 'Amazon', href: '/monitor/amazon-affiliate-links' },
                            { label: 'Pinterest', href: '/monitor/pinterest-affiliate-links' },
                            { label: 'Linktree', href: '/monitor/linktree-links' },
                        ].map((p) => (
                            <Link key={p.href} href={p.href} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                                {p.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Comparisons row */}
                <div className="pb-6 mb-4">
                    <p className="text-xs text-slate-600 uppercase tracking-wider mb-4 font-medium">Comparisons</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {[
                            { label: 'AMZ Watcher Alternative', href: '/alternative/amz-watcher' },
                            { label: 'Lasso Alternative', href: '/alternative/lasso' },
                            { label: 'Pageradar Alternative', href: '/alternative/pageradar' },
                            { label: 'ThirstyAffiliates Alternative', href: '/alternative/thirstyaffiliates' },
                            { label: 'Link Whisper Alternative', href: '/alternative/link-whisper' },
                            { label: 'Dead Link Checker Alternative', href: '/alternative/dead-link-checker' },
                            { label: 'Pretty Links Alternative', href: '/alternative/pretty-links' },
                        ].map((c) => (
                            <Link key={c.href} href={c.href} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                                {c.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} LinkMonitor. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://instagram.com/affiliatelinkmonitoring"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-white transition-colors"
                            aria-label="Follow us on Instagram"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
