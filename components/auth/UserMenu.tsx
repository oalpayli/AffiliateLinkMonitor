'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from './AuthProvider'
import Link from 'next/link'
import { Settings, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
    const { user, signOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        await signOut()
        router.push('/')
    }

    if (!user) return null

    // Get user initials from email
    const email = user.email || ''
    const initials = email.charAt(0).toUpperCase()

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm hover:shadow-lg transition-all"
            >
                {initials}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-sm font-medium text-white truncate">{email}</p>
                        <p className="text-xs text-slate-400 mt-1">Free Plan</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            href="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
