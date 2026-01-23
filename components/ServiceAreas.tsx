'use client';

import { Globe, CheckCircle2 } from 'lucide-react';

const NETWORKS = [
    "Amazon Associates (All regions)",
    "ShareASale",
    "CJ Affiliate",
    "Rakuten Advertising",
    "Impact",
    "ClickBank",
    "Ebay Partner Network",
    "Awin",
    "FlexOffers",
    "Skimlinks"
];

export default function ServiceAreas() {
    return (
        <section className="py-24 relative bg-slate-950/50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Supported Everywhere You Are
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Whether you're a travel blogger in Bali or a tech reviewer in New York, we've got you covered.
                            Our global monitoring network checks your links from multiple locations to ensure they work for your international audience.
                        </p>

                        <div className="flex items-center gap-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl mb-8">
                            <Globe className="h-8 w-8 text-violet-400 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white">Global Monitoring</h4>
                                <p className="text-sm text-slate-400">We simulate traffic from US, UK, EU, and Asia.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["99.9% Uptime", "Real-time Alerts", "Stock Detection", "Link Localization"].map((item) => (
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
                            Supported Networks
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {NETWORKS.map((network) => (
                                <div key={network} className="flex items-center gap-3 group cursor-default">
                                    <div className="h-2 w-2 rounded-full bg-slate-700 group-hover:bg-violet-400 transition-colors" />
                                    <span className="text-slate-300 group-hover:text-white transition-colors">
                                        {network}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500">
                                + any standard HTML link returning 404
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
