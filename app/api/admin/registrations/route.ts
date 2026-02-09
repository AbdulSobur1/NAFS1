import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { getAllRegistrations } from '@/app/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('nafs_session')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const payload = await verifySession(token);
    if (payload.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const registrations = await getAllRegistrations();
    return NextResponse.json({ registrations });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
  }
}
