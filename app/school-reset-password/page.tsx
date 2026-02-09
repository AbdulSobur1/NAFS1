import { Suspense } from 'react';
import SchoolResetPasswordClient from './school-reset-password-client';

export default function SchoolResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SchoolResetPasswordClient />
    </Suspense>
  );
}
