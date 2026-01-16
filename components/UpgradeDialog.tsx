'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface UpgradeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    message: string;
}

export default function UpgradeDialog({ isOpen, onClose, isAuthenticated, message }: UpgradeDialogProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-violet-500/20 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-violet-500/10 rounded-xl">
                            <Sparkles className="h-6 w-6 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Limit Reached!</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="text-slate-400 mb-6 leading-relaxed">
                    {message}
                </p>

                {isAuthenticated ? (
                    <>
                        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6 mb-4">
                            <h4 className="font-semibold text-lg mb-3 text-white">Upgrade to Pro</h4>
                            <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Unlimited scans
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    60 active monitors
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Hourly scan frequency
                                </li>
                            </ul>
                            <Link
                                href="/pricing"
                                className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                            >
                                Upgrade Now
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full py-2 text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            Maybe later
                        </button>
                    </>
                ) : (
                    <>
                        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6 mb-4">
                            <h4 className="font-semibold text-lg mb-3 text-white">Sign up for more!</h4>
                            <p className="text-sm text-slate-300 mb-4">
                                Create a free account to get <strong>5 scans per day</strong> and access to monitoring features.
                            </p>
                            <Link
                                href="/login"
                                className="btn-primary w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                            >
                                Sign Up Free
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full py-2 text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            Continue browsing
                        </button>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
}
