'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, ArrowRight, Shield, Zap, Upload, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

interface UpgradeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    message: string;
    monitorCount?: number;
    monitorLimit?: number;
    brokenLinksFound?: number;
}

export default function UpgradeDialog({
    isOpen,
    onClose,
    isAuthenticated,
    message,
    monitorCount = 10,
    monitorLimit = 10,
    brokenLinksFound = 0
}: UpgradeDialogProps) {
    const [mounted, setMounted] = useState(false);
    const posthog = usePostHog();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            posthog?.capture('upgrade_dialog_shown', {
                is_authenticated: isAuthenticated,
                monitor_count: monitorCount,
                monitor_limit: monitorLimit,
                broken_links_found: brokenLinksFound,
            });
        }
    }, [isOpen, isAuthenticated, monitorCount, monitorLimit, brokenLinksFound, posthog]);

    if (!isOpen || !mounted) return null;

    const progressPercent = Math.min((monitorCount / monitorLimit) * 100, 100);
    const estimatedSavings = brokenLinksFound * 15;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-violet-500/20 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-yellow-500/10 rounded-xl">
                            <AlertTriangle className="h-6 w-6 text-yellow-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {isAuthenticated
                                ? `Your ${monitorLimit} monitor slots are full`
                                : 'You found issues — don\'t lose track!'}
                        </h3>
                    </div>
                    <button
                        onClick={() => {
                            posthog?.capture('upgrade_dialog_dismissed', {
                                is_authenticated: isAuthenticated,
                            });
                            onClose();
                        }}
                        className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {isAuthenticated ? (
                    /* ─── Authenticated: Free → Pro ─── */
                    <>
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                <span>Monitor Usage</span>
                                <span className="text-yellow-400 font-semibold">{monitorCount}/{monitorLimit}</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-yellow-400 to-red-500 h-2.5 rounded-full transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Loss Aversion Message */}
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                            <p className="text-sm text-red-200 text-center">
                                Your unmonitored links are <strong className="text-red-100">losing you money</strong> right now.
                            </p>
                        </div>

                        {/* Personalized Stats */}
                        {brokenLinksFound > 0 && (
                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
                                <p className="text-xs text-emerald-300 text-center">
                                    📊 So far we&apos;ve caught <strong>{brokenLinksFound} broken link{brokenLinksFound !== 1 ? 's' : ''}</strong> for you
                                    {estimatedSavings > 0 && <> — saving you an estimated <strong>~${estimatedSavings}/mo</strong> in commissions</>}.
                                </p>
                            </div>
                        )}

                        {/* Pro Features */}
                        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-5 mb-4">
                            <h4 className="font-semibold text-lg mb-3 text-white">With Pro, protect ALL your links:</h4>
                            <ul className="space-y-2.5 text-sm text-slate-300 mb-5">
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    <span><strong className="text-white">60 monitors</strong> — you need more room</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Zap className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    <span><strong className="text-white">Hourly scans</strong> — catch breaks 24× faster</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Upload className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    <span><strong className="text-white">Bulk import</strong> — add 50 links at once</span>
                                </li>
                            </ul>
                            <Link
                                href="/pricing"
                                onClick={() => posthog?.capture('upgrade_dialog_cta_clicked', {
                                    cta_text: 'Upgrade to Pro',
                                    monitor_count: monitorCount,
                                })}
                                className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                            >
                                Upgrade to Pro — $12/mo
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <p className="text-xs text-violet-300/70 text-center mt-2">
                                Pays for itself with 1 saved sale
                            </p>
                        </div>

                        {/* Guarantee */}
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
                            <Shield className="h-3.5 w-3.5 text-emerald-400" />
                            <span>14-day money-back guarantee</span>
                        </div>

                        {/* Escape Hatch */}
                        <button
                            onClick={() => {
                                posthog?.capture('upgrade_dialog_dismissed', {
                                    is_authenticated: true,
                                    dismiss_text: 'risk_it',
                                });
                                onClose();
                            }}
                            className="w-full py-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                        >
                            Not now, I&apos;ll risk it
                        </button>
                    </>
                ) : (
                    /* ─── Unauthenticated: Signup ─── */
                    <>
                        <p className="text-slate-400 mb-5 text-sm leading-relaxed">
                            {message || 'Sign up free to save your results and start monitoring your links automatically.'}
                        </p>

                        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-5 mb-4">
                            <h4 className="font-semibold text-lg mb-3 text-white">Sign up FREE to:</h4>
                            <ul className="space-y-2.5 text-sm text-slate-300 mb-5">
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    Monitor 10 links 24/7 automatically
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    Get email alerts when links break
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                    Never miss a broken link again
                                </li>
                            </ul>
                            <Link
                                href="/signup"
                                onClick={() => posthog?.capture('upgrade_dialog_cta_clicked', {
                                    cta_text: 'Start Free Monitoring',
                                    is_authenticated: false,
                                })}
                                className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                            >
                                Start Free Monitoring
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <p className="text-xs text-slate-500 text-center mb-3">
                            No credit card · Setup in 30 seconds
                        </p>

                        <button
                            onClick={() => {
                                posthog?.capture('upgrade_dialog_dismissed', {
                                    is_authenticated: false,
                                    dismiss_text: 'continue_without',
                                });
                                onClose();
                            }}
                            className="w-full py-2 text-slate-500 hover:text-slate-300 transition-colors text-sm"
                        >
                            Continue without saving
                        </button>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
