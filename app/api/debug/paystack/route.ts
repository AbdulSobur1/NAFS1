import { NextRequest, NextResponse } from 'next/server';

// Safe debug endpoint: does NOT expose secret key.
// GET -> { configured: boolean }
// Use this after you redeploy to confirm Vercel env has PAYSTACK_SECRET_KEY set.

export async function GET(request: NextRequest) {
    const configured = Boolean(process.env.PAYSTACK_SECRET_KEY && process.env.PAYSTACK_SECRET_KEY.length > 0);
    return NextResponse.json({ configured });
}
