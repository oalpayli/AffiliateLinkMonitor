'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

export default function DeleteButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const router = useRouter();

    const handleDeleteClick = (e: React.MouseEvent) => {
        // Stop propagation here to prevent Link navigation when clicking the trash icon
        e.preventDefault();
        e.stopPropagation();
        setShowDialog(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/scans/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                router.refresh();
                setShowDialog(false);
            }
        } catch (error) {
            console.error('Failed to delete', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="p-1.5 rounded-md hover:bg-rose-950/50 text-slate-600 hover:text-rose-400 transition-colors ml-1 z-20 relative"
                title="Delete Scan"
                type="button"
            >
                {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Trash2 className="h-4 w-4" />
                )}
            </button>

            {showDialog && (
                <ConfirmDialog
                    isOpen={showDialog}
                    onClose={() => setShowDialog(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Scan History"
                    message="Are you sure you want to delete this scan? This action cannot be undone and will verify remove all associated link data."
                    isLoading={isDeleting}
                />
            )}
        </>
    );
}
