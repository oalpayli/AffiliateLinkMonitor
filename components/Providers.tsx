'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
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
        </ClerkProvider>
    );
}

