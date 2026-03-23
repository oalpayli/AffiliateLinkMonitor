'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, Check, X, XCircle } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    scanContext?: string; // e.g. "homepage", "amazon-checker"
}

export default function SignupModal({ isOpen, onClose, onSuccess, scanContext = 'unknown' }: SignupModalProps) {
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
                    {/* Google Sign-In */}
                    <GoogleSignInButton />

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
