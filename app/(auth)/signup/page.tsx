'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, ArrowLeft, Check, X } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

export default function SignupPage() {
    const posthog = usePostHog();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [formStarted, setFormStarted] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    // Track page view
    useEffect(() => {
        posthog?.capture('signup_page_viewed');
    }, [posthog]);

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

        if (!isPasswordValid) {
            toast.error('Password does not meet requirements')
            return
        }

        if (!passwordsMatch) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)

        // Track signup started
        posthog?.capture('signup_started', {
            method: 'email'
        });

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            if (data.user) {
                // Track signup completed
                posthog?.capture('signup_completed', {
                    method: 'email',
                    user_id: data.user.id
                });

                toast.success('Account created! Please check your email to verify your account.')
                router.push('/login')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error('An unexpected error occurred')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back to Home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                {/* Signup Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Start Monitoring 10 Links Free
                        </h1>
                        <p className="text-slate-400">No credit card required. Set up in 30 seconds.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Google Sign-In — lowest friction, shown first */}
                        <GoogleSignInButton />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-400">Or sign up with email</span>
                            </div>
                        </div>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onFocus={() => {
                                        if (!formStarted) {
                                            posthog?.capture('signup_form_started');
                                            setFormStarted(true);
                                        }
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Password Requirements */}
                            {password && (
                                <div className="mt-3 space-y-1.5">
                                    <RequirementItem met={passwordRequirements.length} text="At least 8 characters" />
                                    <RequirementItem met={passwordRequirements.lowercase} text="One lowercase letter" />
                                    <RequirementItem met={passwordRequirements.uppercase} text="One uppercase letter" />
                                    <RequirementItem met={passwordRequirements.number} text="One number" />
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {confirmPassword && (
                                <div className="mt-2">
                                    <RequirementItem met={passwordsMatch} text="Passwords match" />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
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
                                'Start Free Monitoring'
                            )}
                        </button>


                    </form>

                    {/* Login Link */}
                    <p className="text-center text-slate-400 mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center gap-2 text-xs">
            {met ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
                <X className="h-3.5 w-3.5 text-slate-500" />
            )}
            <span className={met ? 'text-emerald-400' : 'text-slate-500'}>{text}</span>
        </div>
    )
}
