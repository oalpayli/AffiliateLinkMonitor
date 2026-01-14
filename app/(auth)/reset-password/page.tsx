'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, Loader2, ArrowLeft, Check } from 'lucide-react'

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const supabase = createClient()

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            setSent(true)
            toast.success('Password reset email sent!')
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
                {/* Back to Login */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                </Link>

                {/* Reset Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                    {!sent ? (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                    Reset Password
                                </h1>
                                <p className="text-slate-400">We'll send you a reset link</p>
                            </div>

                            <form onSubmit={handleReset} className="space-y-5">
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
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Check className="h-8 w-8 text-emerald-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
                            <p className="text-slate-400 mb-6">
                                We've sent a password reset link to <strong className="text-white">{email}</strong>
                            </p>
                            <Link
                                href="/login"
                                className="inline-block text-violet-400 hover:text-violet-300 font-medium transition-colors"
                            >
                                Back to login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
