'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, ArrowRight } from 'lucide-react';

export default function ScanForm() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                const scan = await response.json();
                router.push(`/scans/${scan.id}`);
            } else {
                console.error('Scan failed');
                // Ideally show toast error here
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Monitor Your Affiliate Links
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
                Detect broken links and ensure your revenue streams are always active.
                Enter a URL below to start a deep scan.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-xl relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                </div>
                <input
                    type="url"
                    placeholder="https://example.com/blog-post"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="glass-input w-full pl-11 pr-32 py-4 rounded-2xl text-lg"
                />
                <div className="absolute top-2 right-2 bottom-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary h-full px-6 rounded-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Scanning...</span>
                            </>
                        ) : (
                            <>
                                <span>Start Scan</span>
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
