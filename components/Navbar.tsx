'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, BookOpen, Menu } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-violet-600/20 rounded-lg group-hover:bg-violet-600/30 transition-colors">
                        <Activity className="h-5 w-5 text-violet-500" />
                    </div>
                    <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        LinkMonitor
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-white/5">
                    <Link
                        href="/"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isActive('/')
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/pricing"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isActive('/pricing')
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/settings"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isActive('/settings')
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                    >
                        Settings
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                    >
                        <BookOpen className="h-4 w-4" />
                        Docs
                    </a>

                    <div className="h-6 w-px bg-slate-800 hidden md:block" />

                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg border border-slate-700/50">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
