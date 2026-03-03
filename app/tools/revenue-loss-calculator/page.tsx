'use client';

import { useState, useCallback } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingDown, AlertCircle, BarChart3, RefreshCw } from 'lucide-react';

// Note: metadata can't be used from 'use client' — it's in the parent layout
// This page needs to be converted to use a server wrapper for metadata.
// For now the client component is the default export.

function formatCurrency(n: number) {
    if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
    return `$${n.toFixed(0)}`;
}

function formatNumber(n: number) {
    return n.toLocaleString('en-US');
}

export default function RevenueLossCalculator() {
    const [traffic, setTraffic] = useState(5000);
    const [conversionRate, setConversionRate] = useState(2.5);
    const [avgCommission, setAvgCommission] = useState(3.5);
    const [linkCount, setLinkCount] = useState(20);
    const [brokenPercent, setBrokenPercent] = useState(15);

    const calculate = useCallback(() => {
        // Monthly affiliate conversions from working links
        const workingLinks = Math.round(linkCount * (1 - brokenPercent / 100));
        const brokenLinks = linkCount - workingLinks;

        // Estimate clicks distributed across links (broken links get wasted clicks)
        const clicksPerLink = traffic / linkCount;
        const wastedClicks = brokenLinks * clicksPerLink;
        const convertedSales = wastedClicks * (conversionRate / 100);
        const monthlyLoss = convertedSales * avgCommission;
        const annualLoss = monthlyLoss * 12;

        return {
            workingLinks,
            brokenLinks,
            wastedClicks: Math.round(wastedClicks),
            monthlyLoss,
            annualLoss,
        };
    }, [traffic, conversionRate, avgCommission, linkCount, brokenPercent]);

    const results = calculate();

    const SliderInput = ({
        label,
        value,
        min,
        max,
        step,
        onChange,
        format,
        hint,
    }: {
        label: string;
        value: number;
        min: number;
        max: number;
        step: number;
        onChange: (v: number) => void;
        format: (v: number) => string;
        hint?: string;
    }) => (
        <div className="space-y-3">
            <div className="flex justify-between items-baseline">
                <label className="text-sm font-medium text-slate-300">{label}</label>
                <span className="text-lg font-bold text-violet-400">{format(value)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-slate-600">
                <span>{format(min)}</span>
                {hint && <span className="text-slate-500 italic">{hint}</span>}
                <span>{format(max)}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/15 rounded-[100%] blur-[120px] opacity-60" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-red-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl pt-32 pb-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-300 mb-6">
                        <TrendingDown className="h-4 w-4" />
                        Revenue Loss Calculator
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
                        How Much Money Are Broken<br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-violet-400"> Affiliate Links Costing You?</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Adjust the sliders to match your site. Results update instantly based on industry-average data from affiliate program monitoring.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-8 backdrop-blur-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-violet-400" />
                            Your Site&apos;s Numbers
                        </h2>

                        <SliderInput
                            label="Monthly Site Traffic"
                            value={traffic}
                            min={500}
                            max={100000}
                            step={500}
                            onChange={setTraffic}
                            format={v => formatNumber(v) + ' visitors'}
                            hint="unique visitors/month"
                        />
                        <SliderInput
                            label="Affiliate Conversion Rate"
                            value={conversionRate}
                            min={0.5}
                            max={10}
                            step={0.5}
                            onChange={setConversionRate}
                            format={v => v.toFixed(1) + '%'}
                            hint="industry avg: 1–3%"
                        />
                        <SliderInput
                            label="Average Commission Per Sale"
                            value={avgCommission}
                            min={1}
                            max={50}
                            step={0.5}
                            onChange={setAvgCommission}
                            format={v => '$' + v.toFixed(2)}
                            hint="Amazon avg: $2–5"
                        />
                        <SliderInput
                            label="Number of Affiliate Links"
                            value={linkCount}
                            min={5}
                            max={200}
                            step={5}
                            onChange={setLinkCount}
                            format={v => v + ' links'}
                        />
                        <SliderInput
                            label="% of Links That Are Broken"
                            value={brokenPercent}
                            min={5}
                            max={40}
                            step={1}
                            onChange={setBrokenPercent}
                            format={v => v + '%'}
                            hint="industry avg: ~15%"
                        />

                        <button
                            onClick={() => {
                                setTraffic(5000);
                                setConversionRate(2.5);
                                setAvgCommission(3.5);
                                setLinkCount(20);
                                setBrokenPercent(15);
                            }}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            <RefreshCw className="h-3.5 w-3.5" /> Reset to defaults
                        </button>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                        {/* Main loss card */}
                        <div className="bg-gradient-to-br from-red-500/10 to-slate-900/60 border border-red-500/30 rounded-2xl p-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-red-300 mb-3 text-sm font-medium">
                                <TrendingDown className="h-4 w-4" />
                                Estimated Monthly Revenue Lost
                            </div>
                            <div className="text-6xl font-black text-red-400 mb-2">
                                {formatCurrency(results.monthlyLoss)}
                            </div>
                            <p className="text-slate-400 text-sm">per month from {results.brokenLinks} broken links</p>
                        </div>

                        {/* Annual loss */}
                        <div className="bg-gradient-to-br from-orange-500/10 to-slate-900/60 border border-orange-500/20 rounded-2xl p-6 text-center">
                            <div className="text-sm text-orange-300 mb-2 font-medium">Annual Revenue Lost</div>
                            <div className="text-4xl font-bold text-orange-400">
                                {formatCurrency(results.annualLoss)}
                            </div>
                            <p className="text-slate-500 text-xs mt-1">per year if left unmonitored</p>
                        </div>

                        {/* Breakdown */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
                                <div className="text-2xl font-bold text-red-400 mb-1">{results.brokenLinks}</div>
                                <div className="text-xs text-slate-400">Broken Links</div>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
                                <div className="text-2xl font-bold text-amber-400 mb-1">{formatNumber(results.wastedClicks)}</div>
                                <div className="text-xs text-slate-400">Wasted Clicks/Month</div>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">{results.workingLinks}</div>
                                <div className="text-xs text-slate-400">Working Links</div>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
                                <div className="text-2xl font-bold text-violet-400 mb-1">{brokenPercent}%</div>
                                <div className="text-xs text-slate-400">Links Broken</div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <AlertCircle className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-slate-300">
                                    These numbers assume your broken links stay broken. With monitoring, you can fix them within hours. <strong className="text-white">Start protecting {formatCurrency(results.annualLoss)} in annual revenue today.</strong>
                                </p>
                            </div>
                            <Link
                                href="/dashboard"
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all"
                            >
                                <DollarSign className="h-5 w-5" />
                                Start Monitoring Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <p className="text-center text-xs text-slate-500 mt-3">Free plan · 10 monitors · No credit card</p>
                        </div>
                    </div>
                </div>

                {/* Methodology note */}
                <div className="mt-16 p-6 bg-slate-900/40 border border-slate-800 rounded-xl">
                    <h2 className="font-semibold mb-3 text-slate-300">Methodology</h2>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        This calculator estimates revenue loss by distributing your monthly traffic evenly across all affiliate links. For each broken link, the clicks it would have received are considered &quot;wasted&quot; and are multiplied by your conversion rate and average commission. The industry-average broken link rate of 15% is based on patterns observed across affiliate link monitoring. Actual losses may vary depending on which specific links are broken and their individual traffic share.
                    </p>
                </div>
            </div>
        </div>
    );
}
