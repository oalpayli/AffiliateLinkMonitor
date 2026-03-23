'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, Check, X, XCircle } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'

const SCAN_RESULTS_KEY = 'pending_scan_results';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    scanContext?: string;
    /** Store these results in sessionStorage so they survive OAuth redirect */
    pendingScanData?: Record<string, unknown>;
}

/** Save scan data before OAuth redirect */
export function savePendingScanResults(data: Record<string, unknown>) {
    try {
        sessionStorage.setItem(SCAN_RESULTS_KEY, JSON.stringify(data));
    } catch {
        // sessionStorage not available
    }
}

/** Retrieve and clear pending scan results after OAuth redirect */
export function getPendingScanResults(): Record<string, unknown> | null {
    try {
        const data = sessionStorage.getItem(SCAN_RESULTS_KEY);
        if (data) {
            sessionStorage.removeItem(SCAN_RESULTS_KEY);
            return JSON.parse(data);
        }
    } catch {
        // sessionStorage not available
    }
    return null;
}

function GoogleSignInForModal({ onBeforeRedirect }: { onBeforeRedirect?: () => void }) {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            // Call the pre-redirect hook to save scan results
            onBeforeRedirect?.();

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // Redirect back to the CURRENT page (not dashboard) after auth
                    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname)}`,
                },
            })

            if (error) {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
            )}
            Sign in with Google
        </button>
    )
}

export default function SignupModal({ isOpen, onClose, onSuccess, scanContext = 'unknown', pendingScanData }: SignupModalProps) {
    const posthog = usePostHog();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (isOpen) {
            posthog?.capture('signup_modal_shown', { context: scanContext });
        }
    }, [isOpen, posthog, scanContext])

    const handleBeforeOAuthRedirect = useCallback(() => {
        if (pendingScanData) {
            savePendingScanResults(pendingScanData);
        }
    }, [pendingScanData]);

    // Password validation
    const passwordRequirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
    }
    const isPasswordValid = Object.values(passwordRequirements).every(Boolean)
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isPasswordValid || !passwordsMatch) return

        setLoading(true)
        posthog?.capture('signup_started', { method: 'email', context: scanContext });

        try {
            const supabase = createClient()
            const { data, error } = await supabase.auth.signUp({ email, password })

            if (error) {
                toast.error(error.message)
                return
            }

            if (data.user) {
                posthog?.capture('signup_completed', {
                    method: 'email',
                    user_id: data.user.id,
                    context: scanContext,
                });
                toast.success('Account created! Check your email to verify.')
                onSuccess()
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            toast.error('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <XCircle className="h-6 w-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
                        <Check className="h-6 w-6 text-violet-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Scan Complete!
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Sign up free to see your results & start monitoring
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Google Sign-In with redirect-back */}
                    <GoogleSignInForModal onBeforeRedirect={handleBeforeOAuthRedirect} />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-400">Or sign up with email</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                                placeholder="Password (min 8 chars)"
                            />
                        </div>
                        {password && (
                            <div className="mt-2 grid grid-cols-2 gap-1">
                                <RequirementItem met={passwordRequirements.length} text="8+ characters" />
                                <RequirementItem met={passwordRequirements.lowercase} text="Lowercase" />
                                <RequirementItem met={passwordRequirements.uppercase} text="Uppercase" />
                                <RequirementItem met={passwordRequirements.number} text="Number" />
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                                placeholder="Confirm password"
                            />
                        </div>
                        {confirmPassword && (
                            <div className="mt-2">
                                <RequirementItem met={passwordsMatch} text="Passwords match" />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !isPasswordValid || !passwordsMatch}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'See My Results — Free'
                        )}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-xs mt-4">
                    No credit card required. Free plan includes 10 monitors.
                </p>
            </div>
        </div>,
        document.body
    )
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs">
            {met ? (
                <Check className="h-3 w-3 text-emerald-500" />
            ) : (
                <X className="h-3 w-3 text-slate-500" />
            )}
            <span className={met ? 'text-emerald-400' : 'text-slate-500'}>{text}</span>
        </div>
    )
}
