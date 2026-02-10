import { Suspense } from 'react';
import AdminResetPasswordClient from './admin-reset-password-client';

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminResetPasswordClient />
    </Suspense>
  );
}
