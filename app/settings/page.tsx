'use client';

import { useState, useEffect } from 'react';
import { Save, Mail, Settings, Check } from 'lucide-react';

export default function SettingsPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Load saved settings
        const savedEmail = localStorage.getItem('default_alert_email');
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate "saving" to backend (actually just local storage for this demo)
        setTimeout(() => {
            localStorage.setItem('default_alert_email', email);
            setIsLoading(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }, 600);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Settings className="h-8 w-8 text-violet-400" />
                Settings
            </h1>
            <p className="text-slate-400 mb-8">
                Manage your global preferences and configurations.
            </p>

            <div className="glass-card p-6 rounded-2xl">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-slate-400" />
                    Notifications
                </h2>

                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Default Alert Email
                        </label>
                        <p className="text-xs text-slate-500 mb-3">
                            This email will be automatically filled when creating new monitors.
                            Ideally, use the same email configured in your .env SMTP settings.
                        </p>
                        <input
                            type="email"
                            className="glass-input w-full px-4 py-3 rounded-xl"
                            placeholder="alert@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`btn-primary px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${isSaved ? 'bg-emerald-600 hover:bg-emerald-600 ring-2 ring-emerald-500/50' : ''}`}
                        >
                            {isSaved ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    <span>Saved Changes</span>
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    <span>{isLoading ? 'Saving...' : 'Save Preferences'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
