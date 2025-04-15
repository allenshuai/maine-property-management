import { Suspense } from 'react';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-xl">Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
