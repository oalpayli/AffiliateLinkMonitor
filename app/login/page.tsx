'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Github, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDemoLogin = () => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            localStorage.setItem('user_session', 'true');
            // Force a hard refresh/navigation to ensure state updates
            window.location.href = '/';
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="glass-card w-full max-w-md p-8 rounded-2xl border-slate-800/50 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-violet-900/30 rounded-xl mb-4 text-violet-400">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to manage your link monitors</p>
                </div>

                <div className="space-y-4">
                    <button
                        disabled
                        className="w-full glass-input py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800/50 transition-colors opacity-70 cursor-not-allowed"
                    >
                        <Github className="h-5 w-5" />
                        <span>Continue with GitHub</span>
                    </button>

                    <button
                        disabled
                        className="w-full glass-input py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800/50 transition-colors opacity-70 cursor-not-allowed"
                    >
                        <Mail className="h-5 w-5 text-red-400" />
                        <span>Continue with Google</span>
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">Or use demo account</span>
                        </div>
                    </div>

                    <button
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                        className="w-full btn-primary py-3 px-4 rounded-xl flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <span>Demo Login</span>
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-slate-500">
                    By clicking continue, you agree to our{' '}
                    <Link href="#" className="underline hover:text-slate-400">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="underline hover:text-slate-400">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
