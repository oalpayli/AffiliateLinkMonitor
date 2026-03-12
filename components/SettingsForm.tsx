'use client';

import { useState, useEffect } from 'react';
import { Mail, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SettingsForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch the actual user email from Supabase auth (user-scoped, not browser-scoped)
        const fetchUserEmail = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
                setEmail(user.email);
            }
            setIsLoading(false);
        };
        fetchUserEmail();

        // Clean up old localStorage key if it exists
        localStorage.removeItem('default_alert_email');
    }, []);

    return (
        <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-200">
                <Mail className="h-5 w-5 text-slate-400" />
                Notifications
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Alert Email
                    </label>
                    <p className="text-xs text-slate-500 mb-3">
                        Alerts are automatically sent to your account email. To change this, update your account email.
                    </p>
                    <div className="glass-input w-full px-4 py-3 rounded-xl flex items-center gap-2 text-slate-300">
                        {isLoading ? (
                            <span className="text-slate-500">Loading...</span>
                        ) : (
                            <>
                                <Shield className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                <span>{email}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-start gap-2 text-xs text-slate-500">
                        <Shield className="h-3.5 w-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>
                            All monitors you create will automatically use this email for broken link alerts.
                            This is tied to your login account, not your browser.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
