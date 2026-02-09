import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackPayment } from '@/lib/paystack';
import { getRegistration, updateRegistration, saveUser } from '@/app/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reference, registration, category } = body;

    // Validate inputs
    if (!reference || !registration) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get registration from database
    const registrationData = await getRegistration(registration);
    if (!registrationData) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    // Verify payment with Paystack
    const paymentVerified = await verifyPaystackPayment(reference);

    if (paymentVerified) {
      // Update registration status to completed
      await updateRegistration(registration, {
        status: 'completed',
        verifiedAt: new Date().toISOString(),
      });

      // If school registration, create user account for login
      if (category === 'school' && registrationData.data?.contactEmail) {
        try {
          const tempPassword = Math.random().toString(36).slice(2, 10);
          const passwordHash = await hashPassword(tempPassword);
          await saveUser({
            id: `school-${registration}`,
            email: registrationData.data.contactEmail,
            password: passwordHash,
            role: 'school',
            schoolName: registrationData.data.schoolName,
            registrationId: registration,
          });

          await updateRegistration(registration, {
            data: {
              ...registrationData.data,
              tempPassword,
            },
          });
        } catch (error) {
          console.error('Error creating school user:', error);
          // Don't fail the payment verification if user creation fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        registration,
      });
    } else {
      // Payment verification failed
      await updateRegistration(registration, {
        status: 'failed',
        failedAt: new Date().toISOString(),
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Payment verification failed',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
