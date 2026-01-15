'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export default function AuthButton() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        // Check session on mount
        const session = localStorage.getItem('user_session');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoggedIn(!!session);
        setIsLoading(false);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('user_session');
        window.location.reload(); // Hard reload to reset state
    };

    if (isLoading) {
        return (
            <div className="h-9 w-9 bg-slate-800 rounded-full animate-pulse" />
        );
    }

    if (isLoggedIn) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800"
                >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                        <User className="h-4 w-4" />
                    </div>
                </button>

                {showMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 py-2 bg-slate-900 border border-slate-800 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 border-b border-slate-800 mb-1">
                                <p className="text-sm font-medium text-white">Demo User</p>
                                <p className="text-xs text-slate-500 truncate">user@demo.com</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/20 flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg border border-slate-700/50"
        >
            Sign In
        </Link>
    );
}
