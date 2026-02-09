import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, saveUser } from '@/app/lib/db';
import { hashPassword, signSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { setupKey, email, password, name } = body;

    if (!setupKey || !email || !password) {
      return NextResponse.json({ message: 'Setup key, email, and password are required' }, { status: 400 });
    }

    if (!process.env.ADMIN_SETUP_KEY || setupKey !== process.env.ADMIN_SETUP_KEY) {
      return NextResponse.json({ message: 'Invalid setup key' }, { status: 403 });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ message: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await saveUser({
      id: `admin-${Date.now()}`,
      email,
      password: passwordHash,
      role: 'admin',
      name: name || 'Admin',
    });

    if (!process.env.SESSION_SECRET) {
      return NextResponse.json({
        success: true,
        session: 'not_set',
        message: 'Admin created. Please log in to continue.',
      });
    }

    const response = NextResponse.json({ success: true, session: 'ok' });
    const token = await signSession({ sub: user.id, role: 'admin' });
    response.cookies.set('nafs_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json({ message: 'An error occurred during admin setup' }, { status: 500 });
  }
}
