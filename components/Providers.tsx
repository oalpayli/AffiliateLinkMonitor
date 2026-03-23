'use client';

import { AuthProvider } from '@/components/auth/AuthProvider';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const PHProvider = dynamic(
    () => import('@/components/PostHogProvider').then(mod => mod.PHProvider),
    { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <PHProvider>
                <AuthProvider>
                    {children}
                    <Toaster
                        position="bottom-right"
                        toastOptions={{
                            style: {
                                background: '#1e293b',
                                border: '1px solid #334155',
                                color: '#e2e8f0',
                            },
                        }}
                    />
                </AuthProvider>
            </PHProvider>
        </Suspense>
    );
}
