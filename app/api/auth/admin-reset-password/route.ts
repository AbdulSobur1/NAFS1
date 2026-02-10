import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUserPassword } from '@/app/lib/db';
import { hashPassword, signSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { setupKey, email, password } = body;

    if (!setupKey || !email || !password) {
      return NextResponse.json({ message: 'Setup key, email, and password are required' }, { status: 400 });
    }

    const configuredKey = process.env.ADMIN_SETUP_KEY;
    if (!configuredKey) {
      return NextResponse.json({ message: 'ADMIN_SETUP_KEY is not configured' }, { status: 500 });
    }

    if (String(setupKey).trim() !== configuredKey.trim()) {
      return NextResponse.json({ message: 'Invalid setup key' }, { status: 403 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await getUserByEmail(normalizedEmail);
    if (!existing) {
      return NextResponse.json({ message: 'Admin account not found' }, { status: 404 });
    }
    if (existing.role !== 'admin') {
      return NextResponse.json(
        { message: 'This email belongs to a non-admin account. Use the admin email.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await updateUserPassword(normalizedEmail, passwordHash);
    if (!user) {
      return NextResponse.json({ message: 'Unable to update password' }, { status: 500 });
    }

    if (!process.env.SESSION_SECRET) {
      return NextResponse.json({
        success: true,
        session: 'not_set',
        message: 'Password reset. Please log in to continue.',
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
    console.error('Admin reset password error:', error);
    return NextResponse.json({ message: 'An error occurred during password reset' }, { status: 500 });
  }
}
