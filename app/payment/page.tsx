'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, CheckCircle2, Home } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing your payment...');

  const intent = searchParams.get('intent');
  const registration = searchParams.get('registration');
  const category = searchParams.get('category');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!intent || !registration) {
          setStatus('error');
          setMessage('Invalid payment session');
          return;
        }

        // Verify payment status
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent,
            registration,
            category,
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage('Payment successful! Your registration is complete.');
          // Redirect to confirmation page after 3 seconds
          setTimeout(() => {
            router.push(`/confirmation?registration=${registration}&category=${category}`);
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Payment could not be processed. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('error');
        setMessage('An error occurred while processing your payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [intent, registration, category, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Processing Payment</CardTitle>
          <CardDescription>Please wait while we process your registration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Spinner className="h-12 w-12" />
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Payment Successful</h3>
                <p className="text-sm text-muted-foreground mb-4">{message}</p>
                <p className="text-xs text-muted-foreground">
                  Redirecting to confirmation page...
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Link href="/register" className="w-full">
                <Button className="w-full">Try Again</Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
