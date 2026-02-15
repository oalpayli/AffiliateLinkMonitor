'use client';

import { Globe, CheckCircle2, Link2, ShoppingCart, AlertTriangle, Search } from 'lucide-react';

const CAPABILITIES = [
    {
        title: "Amazon Product Pages",
        description: "Detects broken links + out-of-stock products",
        icon: ShoppingCart,
        highlight: true
    },
    {
        title: "Any Blog or Website",
        description: "Scans all outbound links for 404 errors",
        icon: Globe,
        highlight: false
    },
    {
        title: "Linktree Pages",
        description: "Checks every link in your Linktree profile",
        icon: Link2,
        highlight: false
    },
    {
        title: "Pinterest Links",
        description: "Verifies destination URLs from your pins",
        icon: Search,
        highlight: false
    }
];

export default function ServiceAreas() {
    return (
        <section className="py-24 relative bg-slate-950/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Works With Any Link, Anywhere
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Paste any URL and we'll scan every outbound link on that page.
                            If a link returns a 404 or an Amazon product goes out of stock, you'll know instantly.
                        </p>

                        <div className="flex items-center gap-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl mb-8">
                            <AlertTriangle className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white">How It Works</h4>
                                <p className="text-sm text-slate-400">We visit your page, find all links, and check each one for errors — just like a real visitor would.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["404 Detection", "Out-of-Stock Alerts", "Email Notifications", "Daily / Hourly Scans"].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    <span className="text-slate-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-violet-500 rounded-full" />
                            What We Monitor
                        </h3>
                        <div className="space-y-5">
                            {CAPABILITIES.map((cap) => (
                                <div key={cap.title} className={`flex items-start gap-4 p-4 rounded-xl transition-all ${cap.highlight ? 'bg-violet-500/10 border border-violet-500/20' : 'bg-slate-800/30 border border-slate-800'}`}>
                                    <div className={`p-2 rounded-lg flex-shrink-0 ${cap.highlight ? 'bg-violet-500/20' : 'bg-slate-800'}`}>
                                        <cap.icon className={`h-5 w-5 ${cap.highlight ? 'text-violet-400' : 'text-slate-400'}`} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white text-sm">{cap.title}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">{cap.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500">
                                + any page with standard HTML links
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

