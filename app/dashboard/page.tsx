import ScanForm from '@/components/ScanForm';
import MonitorList from '@/components/MonitorList';
import ScanList from '@/components/ScanList';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 pb-20">
      <div className="container mx-auto py-8 px-4">
        <ScanForm />
        <MonitorList />
        <ScanList />
      </div>
    </main>
  );
}
