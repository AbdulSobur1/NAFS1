import { Suspense } from 'react';
import AdminSetupClient from './admin-setup-client';

export default function AdminSetupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminSetupClient />
    </Suspense>
  );
}
