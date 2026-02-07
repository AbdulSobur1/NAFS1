'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { PRICING } from '@/lib/types';
import { toast } from 'sonner';

const universityRegistrationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  universityName: z.string().min(2, 'University name is required'),
  degreeLevel: z.enum(['bachelor', 'master', 'phd', 'other']),
});

type UniversityRegistrationFormData = z.infer<typeof universityRegistrationSchema>;

interface UniversityRegistrationFormProps {
  onBack: () => void;
}

export default function UniversityRegistrationForm({ onBack }: UniversityRegistrationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UniversityRegistrationFormData>({
    resolver: zodResolver(universityRegistrationSchema),
  });

  const degreeLevel = watch('degreeLevel');

  const onSubmit = async (data: UniversityRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'university',
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          universityName: data.universityName,
          degreeLevel: data.degreeLevel,
          basePrice: PRICING.basePrice,
          discountPercentage: 0,
          amount: Math.round(PRICING.basePrice),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const { authorizationUrl, registrationId, paystackReference } = await response.json();

      // Redirect to Paystack payment page
      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      } else {
        throw new Error('No authorization URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to proceed to payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>University Student Registration</CardTitle>
                <CardDescription>Register as an individual university student</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            {...register('firstName')}
                            className={errors.firstName ? 'border-red-500' : ''}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            {...register('lastName')}
                            className={errors.lastName ? 'border-red-500' : ''}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@university.edu"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* University Information */}
                  <div>
                    <h3 className="font-semibold mb-4">University Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="universityName">University Name *</Label>
                        <Input
                          id="universityName"
                          placeholder="Harvard University"
                          {...register('universityName')}
                          className={errors.universityName ? 'border-red-500' : ''}
                        />
                        {errors.universityName && (
                          <p className="text-sm text-red-500 mt-1">{errors.universityName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="degreeLevel">Degree Level *</Label>
                        <Select
                          onValueChange={(value: any) => setValue('degreeLevel', value)}
                          defaultValue={degreeLevel}
                        >
                          <SelectTrigger id="degreeLevel">
                            <SelectValue placeholder="Select your degree level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="master">Master's Degree</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.degreeLevel && (
                          <p className="text-sm text-red-500 mt-1">{errors.degreeLevel.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration Type</span>
                    <span className="font-semibold">Individual</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price</span>
                    <span>₦{PRICING.basePrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₦{PRICING.basePrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-3">
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Registration is complete after successful payment. You'll receive a confirmation email immediately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
