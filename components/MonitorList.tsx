'use client';

import { useState, useEffect } from 'react';
import { Play, Clock, Plus, Activity, CheckCircle, RefreshCw } from 'lucide-react';

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
    const [alertEmail, setAlertEmail] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [isLoading, setIsLoading] = useState(true);
    const [isRunningCron, setIsRunningCron] = useState(false);

    useEffect(() => {
        fetchMonitors();
        const defaultEmail = localStorage.getItem('default_alert_email');
        if (defaultEmail) setAlertEmail(defaultEmail);
    }, []);

    const fetchMonitors = async () => {
        try {
            const res = await fetch('/api/monitors');
            if (res.ok) {
                const data = await res.json();
                setMonitors(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMonitor = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/monitors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: newUrl, frequency, alertEmail })
            });
            if (res.ok) {
                setNewUrl('');
                setAlertEmail('');
                fetchMonitors();
            }
        } catch (e) {
            console.error(e);
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

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="h-6 w-6 text-violet-400" />
                    Active Monitors
                </h2>
                <button
                    onClick={handleRunCron}
                    disabled={isRunningCron}
                    className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Play className="h-3 w-3" />
                    {isRunningCron ? 'Running...' : 'Run Checks Now'}
                </button>
            </div>

            {/* Add New Monitor Form */}
            <form onSubmit={handleAddMonitor} className="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-3 mb-6">
                <input
                    type="url"
                    placeholder="https://site-to-monitor.com"
                    className="glass-input flex-grow px-4 py-2 rounded-lg"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    required
                />
                <select
                    value={frequency}
                    onChange={e => setFrequency(e.target.value)}
                    className="glass-input px-4 py-2 rounded-lg bg-slate-900 border-none"
                >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
                <button type="submit" className="btn-primary px-6 py-2 rounded-lg flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                </button>
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
                        <div key={monitor.id} className="glass-card p-4 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${monitor.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
                                <div>
                                    <div className="font-medium text-slate-200">{monitor.url}</div>
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
                            <div className="text-sm font-mono text-slate-600">
                                {monitor._count?.scans || 0} scans
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
