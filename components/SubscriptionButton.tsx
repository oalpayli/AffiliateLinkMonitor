"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

interface SubscriptionButtonProps {
    isPro: boolean;
    className?: string;
}

export const SubscriptionButton = ({ isPro = false, className }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        // Track click
        posthog.capture('Subscription Started', { is_pro_currently: isPro });

        // If already Pro, go to settings page where custom management UI is
        if (isPro) {
            router.push('/settings');
            return;
        }

        // If not Pro, open checkout
        try {
            setLoading(true);
            const response = await fetch("/api/dodo/checkout", {
                method: "POST"
            });

            if (response.status === 401) {
                toast.error("Please sign in to upgrade");
                router.push("/login?redirect_url=/pricing");
                return;
            }

            if (!response.ok) {
                const text = await response.text();
                toast.error("Something went wrong. Please check your configuration.");
                console.error("Checkout API Error:", text);
                return;
            }

            const data = await response.json();

            // Open checkout in new tab
            const checkoutWindow = window.open(data.url, '_blank', 'width=800,height=900,scrollbars=yes');

            if (!checkoutWindow) {
                toast.error("Please allow popups for this site");
                return;
            }

            toast.success("Complete payment in the new tab");

            // Poll for subscription activation
            const pollInterval = setInterval(async () => {
                try {
                    const statusResponse = await fetch('/api/subscription-status');
                    if (statusResponse.ok) {
                        const { isPro } = await statusResponse.json();

                        if (isPro) {
                            clearInterval(pollInterval);

                            // Close checkout tab if still open
                            if (checkoutWindow && !checkoutWindow.closed) {
                                checkoutWindow.close();
                            }

                            toast.success("🎉 Successfully upgraded to Pro!");

                            // Track success
                            posthog.capture('Subscription Success');

                            // Refresh the page to show Pro UI
                            // Force full reload to ensure server state is fresh
                            window.location.href = '/dashboard';
                        }
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 2000); // Check every 2 seconds

            // Stop polling after 5 minutes
            setTimeout(() => {
                clearInterval(pollInterval);
                setLoading(false);
            }, 300000);

        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Failed to open checkout");
        } finally {
            // Keep loading state while polling
            // Will be cleared by polling timeout
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isPro
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
                } ${className || ""}`}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Zap className={`h-4 w-4 ${isPro ? "text-yellow-500 fill-yellow-500" : "fill-current"}`} />
            )}
            {isPro ? "Manage Subscription" : "Upgrade to Pro"}
        </button>
    );
};
