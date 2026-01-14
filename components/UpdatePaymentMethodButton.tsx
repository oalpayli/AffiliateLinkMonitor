'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function UpdatePaymentMethodButton() {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/dodo/update-payment-method', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    returnUrl: window.location.href
                })
            });

            if (!response.ok) {
                throw new Error('Failed to initiate update');
            }

            const data = await response.json();

            if (data.url) {
                // Open in new tab like portal
                window.open(data.url, '_blank');
            } else {
                toast.error("Failed to get update link");
            }

        } catch (error) {
            console.error('Update payment method failed:', error);
            toast.error('Failed to update payment method');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <CreditCard className="h-4 w-4" />
            )}
            Update Payment Method
        </button>
    );
}
