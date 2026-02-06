import { NextRequest, NextResponse } from 'next/server';
import { initializePaystackPayment, generatePaymentReference } from '@/lib/paystack';
import { saveRegistration } from '@/app/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      category,
      schoolName,
      contactName,
      contactEmail,
      contactPhone,
      studentNames,
      firstName,
      lastName,
      email,
      universityName,
      degreeLevel,
      phone,
      profession,
      totalStudents,
      basePrice,
      discountPercentage,
      amount,
    } = body;

    // Validate required fields
    if (!category || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create registration record
    const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const paymentReference = generatePaymentReference(`NAFS_${category.toUpperCase()}`);

    // Initialize Paystack payment
    const amountInNaira = Math.round(amount);
    const paystackResponse = await initializePaystackPayment({
      email,
      amount: amountInNaira,
      reference: paymentReference,
      description: `NAFS Registration - ${category}`,
      metadata: {
        registrationId,
        category,
        totalStudents: totalStudents || 1,
      },
    });

    if (!paystackResponse.status || !paystackResponse.data) {
      return NextResponse.json(
        { error: 'Failed to initialize payment with Paystack' },
        { status: 400 }
      );
    }

    // Store registration data in database
    const registration = {
      id: registrationId,
      category,
      reference: paymentReference,
      amount: amountInNaira,
      status: 'pending',
      paystackReference: paystackResponse.data.reference,
      paystackAccessCode: paystackResponse.data.access_code,
      data: {
        schoolName,
        contactName,
        contactEmail,
        contactPhone,
        studentNames,
        firstName,
        lastName,
        email,
        universityName,
        degreeLevel,
        phone,
        profession,
        totalStudents,
        basePrice,
        discountPercentage,
      },
    };

    await saveRegistration(registration);

    return NextResponse.json({
      authorizationUrl: paystackResponse.data.authorization_url,
      accessCode: paystackResponse.data.access_code,
      registrationId,
      paystackReference: paymentReference,
      success: true,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
