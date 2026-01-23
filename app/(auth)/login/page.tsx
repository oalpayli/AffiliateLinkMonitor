'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'

import { Suspense } from 'react'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            if (data.user) {
                toast.success('Welcome back!')
                const next = searchParams.get('next') || '/dashboard'
                router.push(next)
                router.refresh()
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
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Welcome Back
                </h1>
                <p className="text-slate-400">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                    <Link
                        href="/reset-password"
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
                    </div>
                </div>

                <GoogleSignInButton />
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-slate-400 mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default function LoginPage() {
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

                {/* Login Card */}
                <Suspense fallback={
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl h-[500px] flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                    </div>
                }>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
