/**
 * Paystack integration utilities for NAFS registration system
 */

export interface PaystackInitializePaymentParams {
  email: string;
  amount: number; // Amount in Naira
  reference: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaystackPaymentResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

/**
 * Initialize a payment with Paystack
 */
export async function initializePaystackPayment(
  params: PaystackInitializePaymentParams
): Promise<PaystackPaymentResponse> {
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        email: params.email,
        amount: params.amount * 100, // Convert to kobo (Paystack uses kobo)
        reference: params.reference,
        description: params.description || 'NAFS Conference Registration',
        metadata: params.metadata,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Paystack API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: PaystackPaymentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error initializing Paystack payment:', error);
    throw error;
  }
}

/**
 * Verify a Paystack payment
 */
export async function verifyPaystackPayment(reference: string): Promise<boolean> {
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (!PAYSTACK_SECRET_KEY) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured');
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Paystack API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    interface VerifyResponse {
      status: boolean;
      data?: {
        status: string;
      };
    }

    const data: VerifyResponse = await response.json();
    return data.status && data.data?.status === 'success';
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    throw error;
  }
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(prefix: string = 'NAFS'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
}
