import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import AdminDashboardClient from './admin-dashboard-client';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('nafs_session')?.value;
  if (!token) {
    redirect('/login/admin');
  }

  try {
    const payload = await verifySession(token);
    if (payload.role !== 'admin') {
      redirect('/login/admin');
    }
  } catch (error) {
    redirect('/login/admin');
  }

  return <AdminDashboardClient />;
}
