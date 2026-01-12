"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SubscriptionButtonProps {
    isPro: boolean;
    className?: string;
}

export const SubscriptionButton = ({ isPro = false, className }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/stripe", {
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
                console.error("Stripe API Error:", text);
                return;
            }

            const data = await response.json();
            window.location.href = data.url;
        } finally {
            setLoading(false);
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
