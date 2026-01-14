'use client';

import { useEffect, useState } from 'react';
import { Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface Invoice {
    id: string;
    amount: number;
    currency: string;
    status: string;
    date: string;
    receipt_url?: string | null;
}

export function InvoicesTable() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch('/api/dodo/invoices');
                if (response.ok) {
                    const data = await response.json();
                    setInvoices(data.invoices);
                }
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
                toast.error('Failed to load billing history');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (invoices.length === 0) {
        return (
            <div className="text-center p-8 text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                No billing history found
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Receipt</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 text-slate-700">
                                {new Date(invoice.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                                ${(invoice.amount).toFixed(2)} {invoice.currency.toUpperCase()}
                            </td>
                            <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                    ${invoice.status === 'succeeded' ? 'bg-green-100 text-green-700' :
                                        invoice.status === 'failed' ? 'bg-red-100 text-red-700' :
                                            'bg-slate-100 text-slate-700'}`}>
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                {invoice.receipt_url ? (
                                    <a
                                        href={invoice.receipt_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:underline"
                                    >
                                        <Download className="h-3 w-3" />
                                        Download
                                    </a>
                                ) : (
                                    <span className="text-slate-400 text-xs italic">Email sent</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
