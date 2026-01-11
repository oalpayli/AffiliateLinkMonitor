'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface SubscriptionButtonProps {
    isPro: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2 
                ${isPro
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/20'
                }`}
        >
            {loading ? (
                <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                </>
            ) : isPro ? (
                'Manage Subscription'
            ) : (
                'Upgrade to Pro'
            )}
        </button>
    );
}
