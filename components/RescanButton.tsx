'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export default function RescanButton({ url }: { url: string }) {
    const [isScanning, setIsScanning] = useState(false);
    const router = useRouter();

    const handleRescan = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isScanning) return;

        setIsScanning(true);
        try {
            const res = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/scans/${data.id}`);
            }
        } catch (error) {
            console.error('Failed to rescan', error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <button
            onClick={handleRescan}
            disabled={isScanning}
            className="p-1.5 rounded-md hover:bg-violet-950/50 text-slate-600 hover:text-violet-400 transition-colors ml-1 z-20 relative group/rescan"
            title="Re-scan"
            type="button"
        >
            <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin text-violet-400' : ''}`} />
            {isScanning && <span className="sr-only">Scanning...</span>}
        </button>
    );
}
