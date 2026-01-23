'use client';

import { AuthProvider } from '@/components/auth/AuthProvider';
import { PHProvider } from '@/components/PostHogProvider';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

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
