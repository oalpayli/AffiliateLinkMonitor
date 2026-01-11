import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_API_KEY || process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia' as any, // Cast to any to avoid type mismatch if library is older/newer
    typescript: true,
});

export function absoluteUrl(path: string) {
    if (typeof window !== 'undefined') return path;
    if (process.env.NEXT_PUBLIC_APP_URL) return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
    return `http://localhost:3000${path}`;
}
