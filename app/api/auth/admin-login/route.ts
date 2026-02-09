import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, initializeDefaultUsers, updateUserPassword } from '@/app/lib/db';
import { isBcryptHash, signSession, verifyPassword, hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // Initialize default users on first request
        await initializeDefaultUsers();

        const body = await request.json();
        const { email, password } = body;

        // Validate inputs
        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Fetch user from database
        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Validate password
        const passwordMatches = isBcryptHash(user.password)
          ? await verifyPassword(password, user.password)
          : user.password === password;

        if (user.role !== 'admin' || !passwordMatches) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Upgrade legacy plain-text passwords to hashed on successful login
        if (!isBcryptHash(user.password)) {
            const newHash = await hashPassword(password);
            await updateUserPassword(user.email, newHash);
        }

        // Create session (in production, use JWT or sessions)
        const response = NextResponse.json(
            {
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    name: user.name,
                },
            },
            { status: 200 }
        );

        if (!process.env.SESSION_SECRET) {
            return NextResponse.json(
                { message: 'SESSION_SECRET is not configured' },
                { status: 500 }
            );
        }

        const token = await signSession({ sub: user.id, role: 'admin' });
        response.cookies.set('nafs_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60, // 24 hours
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json(
            { message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
