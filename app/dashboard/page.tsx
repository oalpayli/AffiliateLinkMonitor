import ScanForm from '@/components/ScanForm';
import MonitorList from '@/components/MonitorList';
import ScanList from '@/components/ScanList';


export const dynamic = 'force-dynamic';

export default async function DashboardPage() {


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
