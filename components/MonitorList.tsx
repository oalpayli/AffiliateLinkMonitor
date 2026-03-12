'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Clock, Plus, Activity, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmDialog from './ConfirmDialog';
import posthog from 'posthog-js';

interface Monitor {
    id: string;
    url: string;
    frequency: string;
    nextRun: string;
    isActive: boolean;
    _count?: { scans: number };
}

export default function MonitorList() {
    const [monitors, setMonitors] = useState<Monitor[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [isLoading, setIsLoading] = useState(true);
    const [isRunningCron, setIsRunningCron] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [monitorToDelete, setMonitorToDelete] = useState<Monitor | null>(null);
    const [usage, setUsage] = useState({ count: 0, limit: 3, isPro: false });
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [isBulkDeleting, setIsBulkDeleting] = useState(false);
    const [isBulkDeleteConfirmOpen, setIsBulkDeleteConfirmOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchMonitors();
    }, []);

    const fetchMonitors = async () => {
        try {
            const res = await fetch('/api/monitors');
            const contentType = res.headers.get('content-type');
            if (res.ok && contentType?.includes('application/json')) {
                const data = await res.json();
                // Handle new metadata response format
                if (data.monitors) {
                    setMonitors(data.monitors);
                    setUsage({
                        count: data.count || data.monitors.length,
                        limit: data.limit,
                        isPro: data.isPro
                    });
                } else {
                    // Fallback for old format (just array)
                    setMonitors(data);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMonitor = async (e: React.FormEvent) => {
        e.preventDefault();

        // Split input by newlines or commas and clean up
        const rawUrls = newUrl.split(/[\n,]+/).map(u => u.trim()).filter(u => u.length > 0);

        if (rawUrls.length === 0) return;

        setIsAdding(true);

        try {
            const res = await fetch('/api/monitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: rawUrls, frequency })
            });

            // Check if response is JSON before parsing
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                // Likely an auth redirect - response is HTML
                if (res.status === 401 || res.status === 403 || res.redirected) {
                    toast.error('Please sign in to add monitors');
                    return;
                }
                toast.error('Unexpected server response. Please try again.');
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setNewUrl('');
                // Only clear email if user wants? Keeping it sticky is usually better for bulk add flows
                // setAlertEmail(''); 

                // Track success
                posthog.capture('Monitor Added', {
                    count: Array.isArray(data) ? data.length : 1,
                    frequency,
                    is_pro: usage.isPro
                });

                toast.success(`${Array.isArray(data) ? data.length : 1} Link(s) added!`);
                fetchMonitors();
            } else {
                // Specific handling for Plan Limit Reached (403)
                if (res.status === 403) {
                    toast.error(data.error || 'Limit reached! Redirecting to pricing...', { duration: 3000 });
                    setTimeout(() => router.push('/pricing'), 2000);
                } else if (res.status === 429) {
                    // Rate limit for scans
                    toast.error(data.error || 'Scan limit reached', { duration: 4000 });
                    if (!data.isAuthenticated) {
                        setTimeout(() => router.push('/login'), 2500);
                    }
                } else {
                    toast.error(data.error || 'Failed to add monitor');
                }
            }
        } catch (e) {
            toast.error('Something went wrong. Please refresh and try again.');
            console.error(e);
        } finally {
            setIsAdding(false);
        }
    };

    const toggleSelection = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleAll = () => {
        if (selectedIds.size === monitors.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(monitors.map(m => m.id)));
        }
    };

    const handleBulkDeleteClick = () => {
        if (selectedIds.size === 0) return;
        setIsBulkDeleteConfirmOpen(true);
    };

    const handleBulkDeleteConfirm = async () => {
        setIsBulkDeleting(true);
        try {
            const res = await fetch('/api/monitors', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: Array.from(selectedIds) })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Monitors deleted successfully');
                setSelectedIds(new Set());
                setIsSelectionMode(false);
                fetchMonitors();
            } else {
                toast.error(data.error || 'Failed to delete monitors');
            }
        } catch (e) {
            console.error(e);
            toast.error('Something went wrong');
        } finally {
            setIsBulkDeleting(false);
            setIsBulkDeleteConfirmOpen(false);
        }
    };

    const handleRunCron = async () => {
        setIsRunningCron(true);
        try {
            await fetch('/api/cron');
            // Refresh list to show updated lastRun/nextRun if we were smart enough to show it
            // For now just wait a bit and refresh
            setTimeout(fetchMonitors, 1000);
        } catch (e) {
            console.error(e);
        } finally {
            setIsRunningCron(false);
        }
    };

    const handleDeleteClick = (monitor: Monitor) => {
        setMonitorToDelete(monitor);
    };

    const handleDeleteConfirm = async () => {
        if (!monitorToDelete) return;

        setDeletingId(monitorToDelete.id);
        try {
            const res = await fetch(`/api/monitors/${monitorToDelete.id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Monitor deleted!');

                // Track deletion
                posthog.capture('Monitor Deleted', { url: monitorToDelete.url });

                setMonitors(prev => prev.filter(m => m.id !== monitorToDelete.id));
                setMonitorToDelete(null);
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to delete monitor');
            }
        } catch (e) {
            toast.error('Something went wrong. Please try again.');
            console.error(e);
        } finally {
            setDeletingId(null);
        }
    };

    const handleDeleteCancel = () => {
        if (!deletingId) {
            setMonitorToDelete(null);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="h-6 w-6 text-violet-400" />
                    Active Monitors
                    {usage.limit > 0 && (
                        <span className={`text-sm ml-2 px-2 py-0.5 rounded-full border ${usage.count >= usage.limit ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            usage.count >= usage.limit * 0.8 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                            {usage.count} / {usage.limit}
                        </span>
                    )}
                </h2>
                <div className="flex gap-2">
                    {isSelectionMode ? (
                        <>
                            <button
                                onClick={() => setIsSelectionMode(false)}
                                className="text-sm text-slate-400 hover:text-white px-3 py-1.5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={toggleAll}
                                className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                            >
                                {selectedIds.size === monitors.length ? 'Deselect All' : 'Select All'}
                            </button>
                            {selectedIds.size > 0 && (
                                <button
                                    onClick={handleBulkDeleteClick}
                                    disabled={isBulkDeleting}
                                    className="flex items-center gap-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Trash2 className="h-3 w-3" />
                                    Delete ({selectedIds.size})
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={() => setIsSelectionMode(true)}
                            disabled={monitors.length === 0}
                            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700 disabled:opacity-50"
                        >
                            Select
                        </button>
                    )}

                    {!isSelectionMode && (
                        <button
                            onClick={handleRunCron}
                            disabled={isRunningCron}
                            className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Play className="h-3 w-3" />
                            {isRunningCron ? 'Running...' : 'Run Checks Now'}
                        </button>
                    )}
                </div>
            </div>

            <form onSubmit={handleAddMonitor} className="glass-card p-4 rounded-xl flex flex-col gap-3 mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-grow">
                        {usage.isPro ? (
                            <textarea
                                placeholder="https://site-to-monitor.com (One per line or comma separated)"
                                className="glass-input w-full px-4 py-2 rounded-lg min-h-[42px] h-[42px] focus:h-24 transition-all resize-none pt-2.5"
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                required
                            />
                        ) : (
                            <input
                                type="url"
                                placeholder="https://site-to-monitor.com"
                                className="glass-input w-full px-4 py-2 rounded-lg"
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                required
                            />
                        )}
                    </div>
                    <select
                        value={frequency}
                        onChange={e => setFrequency(e.target.value)}
                        className="glass-input px-4 py-2 rounded-lg bg-slate-900 border-none"
                    >
                        {usage.isPro && <option value="hourly">Hourly</option>}
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    <button
                        type="submit"
                        className="btn-primary px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                <span>Adding...</span>
                            </>
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                <span>Add</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="grid gap-3">
                {isLoading ? (
                    <div className="text-center py-8 text-slate-500">Loading monitors...</div>
                ) : monitors.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                        No active monitors. Add one above!
                    </div>
                ) : (
                    monitors.map(monitor => (
                        <div
                            key={monitor.id}
                            onClick={() => isSelectionMode && toggleSelection(monitor.id)}
                            className={`glass-card p-4 rounded-xl flex items-center justify-between group transition-all relative overflow-hidden ${isSelectionMode ? 'cursor-pointer hover:bg-slate-800/50' : ''} ${selectedIds.has(monitor.id)
                                ? 'ring-2 ring-violet-500 bg-violet-500/10'
                                : 'hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                {isSelectionMode && (
                                    <div className={`flex-shrink-0 transition-all duration-200 ${selectedIds.has(monitor.id) ? 'w-6 opacity-100 scale-100' : 'w-0 opacity-0 scale-0'}`}>
                                        <CheckCircle className="h-5 w-5 text-violet-500 fill-violet-500/20" />
                                    </div>
                                )}
                                <div className={`h-2 w-2 rounded-full flex-shrink-0 ${monitor.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-slate-200 truncate overflow-hidden" title={monitor.url}>{monitor.url}</div>
                                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                        <span className="flex items-center gap-1">
                                            <RefreshCw className="h-3 w-3" /> {monitor.frequency}
                                        </span>
                                        <span className="h-3 w-px bg-slate-700" />
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> Next: {new Date(monitor.nextRun).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-mono text-slate-600">
                                    {monitor._count?.scans || 0} scans
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(monitor);
                                    }}
                                    disabled={deletingId === monitor.id}
                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all disabled:opacity-50 relative z-10"
                                    title="Delete monitor"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            {/* Selection Overlay for visual feedback */}
                            {isSelectionMode && !selectedIds.has(monitor.id) && (
                                <div className="absolute inset-0 bg-slate-800/0 hover:bg-slate-800/10 transition-colors pointer-events-none" />
                            )}
                        </div>
                    ))
                )}
            </div>

            <ConfirmDialog
                isOpen={!!monitorToDelete}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Monitor"
                message={`Are you sure you want to delete the monitor for "${monitorToDelete?.url}"? This will also delete all associated scans and cannot be undone.`}
                isLoading={!!deletingId}
            />

            {/* Bulk Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={isBulkDeleteConfirmOpen}
                onClose={() => setIsBulkDeleteConfirmOpen(false)}
                onConfirm={handleBulkDeleteConfirm}
                title={`Delete ${selectedIds.size} Monitors`}
                message={`Are you sure you want to delete ${selectedIds.size} monitors? This will remove all associated data and cannot be undone.`}
                isLoading={isBulkDeleting}
            />
        </div >
    );
}
