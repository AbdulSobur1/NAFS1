import { NextRequest, NextResponse } from 'next/server';
import { getRegistration, getUserByEmail, saveUser } from '@/app/lib/db';
import { hashPassword, signSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registration, email, password } = body;

    if (!registration || !email || !password) {
      return NextResponse.json({ message: 'Registration, email, and password are required' }, { status: 400 });
    }

    const reg = await getRegistration(registration);
    if (!reg) {
      return NextResponse.json({ message: 'Registration not found' }, { status: 404 });
    }

    if (reg.category !== 'school') {
      return NextResponse.json({ message: 'Registration is not a school registration' }, { status: 400 });
    }

    if (reg.status !== 'completed') {
      return NextResponse.json({ message: 'Payment not completed yet' }, { status: 400 });
    }

    const contactEmail = reg.data?.contactEmail;
    if (!contactEmail || contactEmail.toLowerCase() !== String(email).toLowerCase()) {
      return NextResponse.json({ message: 'Email does not match registration contact email' }, { status: 400 });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ message: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await saveUser({
      id: `school-${registration}`,
      email,
      password: passwordHash,
      role: 'school',
      schoolName: reg.data?.schoolName,
      registrationId: registration,
    });

    const response = NextResponse.json({ success: true, userId: user.id });
    const token = await signSession({ sub: user.id, role: 'school' });
    response.cookies.set('nafs_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('School signup error:', error);
    return NextResponse.json({ message: 'An error occurred during signup' }, { status: 500 });
  }
}
