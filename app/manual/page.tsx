import React from 'react';
import { BookOpen, Search, Activity, Mail, Database, Settings } from 'lucide-react';

export default function ManualPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            {/* Header */}
            <div className="bg-slate-900 border-b border-white/5 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                        User Manual
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Everything you need to know about using the Affiliate Link Monitor to track and optimize your affiliate strategies.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-12">

                    {/* Section 1: Introduction */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-emerald-400 mb-6">
                            <BookOpen className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold text-white">System Overview</h2>
                        </div>
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5 space-y-4">
                            <p className="text-slate-300 leading-relaxed">
                                This application is a specialized monitoring tool designed to track the health of affiliate links across your content.
                                It automatically detects checks link status, and alerts you when your revenue-generating links are broken.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-slate-950 p-4 rounded-lg border border-white/5">
                                    <h3 className="font-medium text-white mb-2">Scraper Engine</h3>
                                    <p className="text-sm text-slate-400">Intelligently detects affiliate links and validates them using browser-like checks.</p>
                                </div>
                                <div className="bg-slate-950 p-4 rounded-lg border border-white/5">
                                    <h3 className="font-medium text-white mb-2">Automation</h3>
                                    <p className="text-sm text-slate-400">Regularly scans your URLs based on your configured schedule (Daily, Hourly, etc.).</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Getting Started */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-blue-400 mb-6">
                            <Settings className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
                        </div>

                        <div className="grid gap-6">
                            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                <h3 className="text-xl font-medium text-white mb-4">1. Account & Settings</h3>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                                        <span>Sign In to access your personalized dashboard.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                                        <span>Navigate to <strong>Settings</strong> via the navbar.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                                        <span>Save your <strong>Default Alert Email</strong>. This will be automatically used for all new monitors you create.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Using the Dashboard */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-purple-400 mb-6">
                            <Activity className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold text-white">Dashboard Operations</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Manual Scan */}
                            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                        <Search className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-2">Manual Quick Scan</h3>
                                        <p className="text-slate-300 mb-4">
                                            Perfect for checking a page instantly without setting up a recurring monitor.
                                        </p>
                                        <ol className="list-decimal list-inside space-y-2 text-slate-400 ml-1">
                                            <li>Enter a URL in the main search bar (e.g., <code>https://mysite.com/best-laptops</code>).</li>
                                            <li>Click <strong>Start Scan</strong>.</li>
                                            <li>View results immediately to identify healthy vs. broken links.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Monitor */}
                            <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
                                        <Database className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white mb-2">Automated Monitoring</h3>
                                        <p className="text-slate-300 mb-4">
                                            Set up recurring checks so you don't have to manually scan every day.
                                        </p>
                                        <div className="space-y-3 text-slate-400">
                                            <p>Scroll to the "Active Monitors" section and:</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>Enter the <strong>URL</strong> to watch.</li>
                                                <li>Select a <strong>Frequency</strong> (e.g., Daily).</li>
                                                <li>Verify the <strong>Alert Email</strong> (pre-filled from Settings).</li>
                                                <li>Click <strong>Add Monitor</strong>.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Alerts */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3 text-red-400 mb-6">
                            <Mail className="h-6 w-6" />
                            <h2 className="text-2xl font-semibold text-white">Email Alerts</h2>
                        </div>
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-white/5">
                            <p className="text-slate-300 mb-4">
                                When the system detects broken affiliate links during a scheduled scan, it sends a notification email immediately.
                            </p>
                            <div className="bg-slate-950 p-4 rounded-lg border border-white/5 font-mono text-sm text-slate-400">
                                <div className="mb-2"><strong>Subject:</strong> [ALERT] Broken Affiliate Links Found on mysite.com</div>
                                <div><strong>Body:</strong> We found 3 broken links... (list of links)</div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
