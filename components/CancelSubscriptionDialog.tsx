'use client';

import { useState } from 'react';
import { AlertTriangle, Calendar, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CancelSubscriptionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    periodEnd: Date | null;
}

export default function CancelSubscriptionDialog({ isOpen, onClose, periodEnd }: CancelSubscriptionDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleCancel = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/dodo/cancel', {
                method: 'POST',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to cancel subscription');
            }

            const data = await response.json();
            const endDate = new Date(data.periodEnd).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            toast.success(`Subscription cancelled. Pro access until ${endDate}`);
            onClose();
            router.refresh();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'Failed to cancel subscription');
        } finally {
            setIsLoading(false);
        }
    };

    const formattedDate = periodEnd
        ? new Date(periodEnd).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        : 'Unknown';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    disabled={isLoading}
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold">Cancel Your Subscription?</h3>
                    </div>

                    <div className="space-y-4 text-sm">
                        <p className="text-slate-300">
                            Your Pro features will remain active until:
                        </p>

                        <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-violet-400" />
                            <div>
                                <p className="font-semibold text-white">{formattedDate}</p>
                                <p className="text-xs text-slate-400">End of billing period</p>
                            </div>
                        </div>

                        <p className="text-slate-400">
                            After this date, you&apos;ll be downgraded to the <strong className="text-white">Free plan</strong> with:
                        </p>

                        <ul className="text-slate-400 space-y-1 pl-4">
                            <li>• 10 monitors (down from 60)</li>
                            <li>• Daily/Weekly scans only</li>
                            <li>• No bulk import</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all disabled:opacity-50"
                    >
                        Keep Subscription
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            'Cancel Subscription'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
