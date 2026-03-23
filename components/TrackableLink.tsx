'use client';

import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';

interface TrackableLinkProps {
    href: string;
    ctaLocation: string;
    ctaText: string;
    pageName: string;
    className?: string;
    children: React.ReactNode;
}

export default function TrackableLink({ href, ctaLocation, ctaText, pageName, className, children }: TrackableLinkProps) {
    const posthog = usePostHog();

    return (
        <Link
            href={href}
            onClick={() => posthog?.capture('cta_clicked', {
                cta_location: ctaLocation,
                cta_text: ctaText,
                page_name: pageName,
            })}
            className={className}
        >
            {children}
        </Link>
    );
}
