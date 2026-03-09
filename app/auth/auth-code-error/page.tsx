import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthCodeErrorPage() {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Login Failed
                    </h1>

                    <p className="text-slate-400 mb-8">
                        The authentication link has expired or is invalid. This typically happens if the link was already used or if it timed out.
                    </p>

                    <Link
                        href="/login"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
