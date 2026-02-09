import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/lib/paystack';
import { getRegistration, updateRegistration, saveUser } from '@/app/lib/db';
import { hashPassword } from '@/lib/auth';

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
        const allRegistrations = await (async () => {
            const fs = await import('fs/promises');
            const path = await import('path');
            const dbFile = path.default.join(process.cwd(), '.nafs-db', 'registrations.json');
            try {
                const data = await fs.readFile(dbFile, 'utf-8');
                return JSON.parse(data);
            } catch (error) {
                return [];
            }
        })();

        const registration = allRegistrations.find((r: any) => r.paystackReference === reference);

        if (!registration) {
            return NextResponse.redirect(new URL('/status?status=error&message=Registration+not+found', request.url));
        }

        // Update registration status to completed
        await updateRegistration(registration.id, {
            status: 'completed',
            verifiedAt: new Date().toISOString(),
        });

        // If school registration, create user account for login
        if (registration.category === 'school' && registration.data?.contactEmail) {
            try {
                const tempPassword = Math.random().toString(36).slice(2, 10);
                const passwordHash = await hashPassword(tempPassword);
                await saveUser({
                    id: `school-${registration.id}`,
                    email: registration.data.contactEmail,
                    password: passwordHash,
                    role: 'school',
                    schoolName: registration.data.schoolName,
                    registrationId: registration.id,
                });

                await updateRegistration(registration.id, {
                    data: {
                        ...registration.data,
                        tempPassword,
                    },
                });
            } catch (error) {
                console.error('Error creating school user:', error);
                // Don't fail the process if user creation fails
            }
        }

        // Redirect to confirmation page
        return NextResponse.redirect(
            new URL(`/confirmation?registration=${registration.id}&category=${registration.category}&status=success`, request.url)
        );
    } catch (error) {
        console.error('Error in Paystack callback:', error);
        return NextResponse.redirect(new URL('/status?status=error&message=An+error+occurred+processing+payment', request.url));
    }
}
