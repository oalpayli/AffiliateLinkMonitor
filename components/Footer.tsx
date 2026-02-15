import React from 'react';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900/50 border-t border-white/5 pt-16 pb-8 mt-auto relative z-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 overflow-hidden rounded-lg">
                                <img src="/logo.png" alt="Logo" className="h-full w-full object-cover opacity-80" />
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
                            <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>
                            <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
                            <li><Link href="/manual" className="hover:text-emerald-400 transition-colors">User Manual</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
                            <li><a href="mailto:info@affiliatelinkmonitoring.com" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                        </ul>
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
