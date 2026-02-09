import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/lib/paystack';
import { getRegistrationByReference, updateRegistration } from '@/app/lib/db';

/**
 * Paystack Callback Handler
 * Paystack redirects here after payment with the reference
 */
export async function GET(request: NextRequest) {
    try {
        const reference = request.nextUrl.searchParams.get('reference');

        if (!reference) {
            return NextResponse.redirect(new URL('/status?status=error&message=No+payment+reference+provided', request.url));
        }

        // Verify payment with Paystack
        const paymentVerified = await verifyPaystackPayment(reference);

        if (!paymentVerified) {
            return NextResponse.redirect(new URL('/status?status=error&message=Payment+verification+failed', request.url));
        }

        // Find registration by Paystack reference
        const registration = await getRegistrationByReference(reference);

        if (!registration) {
            return NextResponse.redirect(new URL('/status?status=error&message=Registration+not+found', request.url));
        }

        // Update registration status to completed
        await updateRegistration(registration.id, {
            status: 'completed',
            verifiedAt: new Date().toISOString(),
        });

        // Redirect based on category
        const redirectPath =
            registration.category === 'school'
                ? `/school-signup?registration=${registration.id}`
                : `/confirmation?registration=${registration.id}&category=${registration.category}&status=success`;

        return NextResponse.redirect(new URL(redirectPath, request.url));
    } catch (error) {
        console.error('Error in Paystack callback:', error);
        return NextResponse.redirect(new URL('/status?status=error&message=An+error+occurred+processing+payment', request.url));
    }
}
