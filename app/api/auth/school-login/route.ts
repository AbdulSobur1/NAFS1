import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, initializeDefaultUsers } from '@/app/lib/db';

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

        // Validate password (in production, use bcrypt or similar)
        if (user.role !== 'school' || user.password !== password) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
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
                    schoolName: user.schoolName,
                },
            },
            { status: 200 }
        );

        // Set a simple session cookie (in production, use secure session management)
        response.cookies.set('nafs_session', JSON.stringify({ userId: user.id, role: 'school' }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60, // 24 hours
        });

        return response;
    } catch (error) {
        console.error('School login error:', error);
        return NextResponse.json(
            { message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
