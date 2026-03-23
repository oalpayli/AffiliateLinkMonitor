'use client';

import { useState, useEffect } from 'react';

// A lightweight proxy for usePostHog that doesn't statically import posthog-js.
// This prevents posthog-js (~160KB) from bloating the initial Next.js first-party JS bundle.
export function useSafePostHog() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ph, setPh] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('posthog-js').then((module) => {
                setPh(module.default || module);
            }).catch(err => console.error('Failed to load posthog', err));
        }
    }, []);

    return ph || {
        capture: () => {},
        identify: () => {},
        reset: () => {},
        onFeatureFlags: () => {},
        getFeatureFlag: () => false,
    };
}
