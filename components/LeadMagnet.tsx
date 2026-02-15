'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Lock } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LeadMagnet() {
    const { user } = useAuth();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] opacity-30" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                                </span>
                                Free Guide for 2026
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Double Your Amazon Earnings <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">in 30 Days</span>
                            </h2>

                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Creating content is hard. Losing money to broken links is tragic.
                                Grab our free checklist to audit your affiliate strategy and stop leaving money on the table.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "The 5 hidden mistakes killing your conversion rate",
                                    "How to find & replace out-of-stock products instantly",
                                    "SEO tips to rank your affiliate posts higher",
                                    "Checklist for Amazon Influencer approval"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {user ? (
                                    <a
                                        href="/guide.pdf"
                                        download="Amazon_Influencer_Checklist_2026.pdf"
                                        className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                        <Download className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                                        Download Now
                                    </a>
                                ) : (
                                    <Link
                                        href="/signup"
                                        className="btn-primary px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                                    >
                                        <Lock className="h-4 w-4" />
                                        <span>Unlock Free Guide</span>
                                    </Link>
                                )}

                                <p className="text-xs text-slate-500 mt-2 sm:mt-0 sm:self-center">
                                    {user ? "*Click to download instantly." : "*Create free account to download."}
                                </p>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div className="relative">
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-all duration-500">
                                <div className="absolute inset-0 bg-violet-500/20 blur-3xl -z-10 transform scale-90" />
                                <Image
                                    src="/images/lead-magnet.png"
                                    alt="Amazon Influencer Checklist 2026 Cover"
                                    fill
                                    className="object-cover rounded-2xl shadow-2xl border border-slate-700/50"
                                />

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow hidden sm:flex">
                                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">100% Free</div>
                                        <div className="text-xs text-slate-400">Limited time offer</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
