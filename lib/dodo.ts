import DodoPayments from 'dodopayments';

const apiKey = process.env.DODO_API_KEY || process.env.DODO_PAYMENTS_API_KEY;

if (!apiKey) {
    console.error('DODO_API_KEY is missing!');
}

export const dodo = new DodoPayments({
    bearerToken: apiKey!,
    environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
});

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`;
}

export const PRO_VARIANT_ID = process.env.DODO_VARIANT_ID!;
