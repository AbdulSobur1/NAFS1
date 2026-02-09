import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { getUserById, getRegistration } from '@/app/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('nafs_session')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const payload = await verifySession(token);
    if (payload.role !== 'school' || !payload.sub) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const user = await getUserById(String(payload.sub));
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const registration = user.registrationId
      ? await getRegistration(user.registrationId)
      : null;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        schoolName: user.schoolName,
        registrationId: user.registrationId,
      },
      registration,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
  }
}
