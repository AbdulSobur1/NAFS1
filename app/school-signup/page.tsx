import { Suspense } from 'react';
import SchoolSignupClient from './school-signup-client';

export default function SchoolSignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SchoolSignupClient />
    </Suspense>
  );
}
