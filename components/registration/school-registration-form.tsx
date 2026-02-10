'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { calculateSchoolDiscount, PRICING, calculateSchoolPrice } from '@/lib/types';
import { toast } from 'sonner';

const schoolRegistrationSchema = z.object({
  schoolName: z.string().min(2, 'School name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactPosition: z.string().min(2, 'Position is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
  studentNames: z.array(
    z.object({
      name: z.string().min(2, 'Student name is required'),
    })
  ).min(1, 'At least one student name is required'),
});

type SchoolRegistrationFormData = z.infer<typeof schoolRegistrationSchema>;

interface SchoolRegistrationFormProps {
  onBack: () => void;
}

export default function SchoolRegistrationForm({ onBack }: SchoolRegistrationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolRegistrationFormData>({
    resolver: zodResolver(schoolRegistrationSchema),
    defaultValues: {
      studentNames: [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'studentNames',
  });

  const studentNames = watch('studentNames');
  const totalStudents = studentNames.length;
  const pricing = calculateSchoolPrice(totalStudents);
  const discountPercentage = calculateSchoolDiscount(totalStudents);
  const discountedPrice = pricing.total - (pricing.total * discountPercentage / 100);

  const onSubmit = async (data: SchoolRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'school',
          schoolName: data.schoolName,
          contactName: data.contactName,
          contactPosition: data.contactPosition,
          contactEmail: data.contactEmail,
          email: data.contactEmail,
          contactPhone: data.contactPhone,
          studentNames: data.studentNames.map(s => s.name),
          totalStudents,
          programmeCost: pricing.programme,
          bookCost: pricing.book,
          discountPercentage,
          amount: pricing.total,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create payment');
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div className="font-bold text-primary">NAFS</div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>High School Registration</CardTitle>
                <CardDescription>Register your school and students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* School Information */}
                  <div>
                    <h3 className="font-semibold mb-4">School Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="schoolName">School Name *</Label>
                        <Input
                          id="schoolName"
                          placeholder="Enter your school name"
                          {...register('schoolName')}
                          className={errors.schoolName ? 'border-red-500' : ''}
                        />
                        {errors.schoolName && (
                          <p className="text-sm text-red-500 mt-1">{errors.schoolName.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="font-semibold mb-4">Contact Person</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contactName">Full Name *</Label>
                        <Input
                          id="contactName"
                          placeholder="Contact person name"
                          {...register('contactName')}
                          className={errors.contactName ? 'border-red-500' : ''}
                        />
                        {errors.contactName && (
                          <p className="text-sm text-red-500 mt-1">{errors.contactName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactPosition">Position in School *</Label>
                        <select
                          id="contactPosition"
                          {...register('contactPosition')}
                          className={`w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ${
                            errors.contactPosition ? 'border-red-500' : ''
                          }`}
                          defaultValue=""
                        >
                          <option value="" disabled>Select position</option>
                          <option value="Principal">Principal</option>
                          <option value="Vice Principal">Vice Principal</option>
                          <option value="Head Teacher">Head Teacher</option>
                          <option value="Coordinator">Coordinator</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.contactPosition && (
                          <p className="text-sm text-red-500 mt-1">{errors.contactPosition.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactEmail">Email *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="contact@school.edu"
                          {...register('contactEmail')}
                          className={errors.contactEmail ? 'border-red-500' : ''}
                        />
                        {errors.contactEmail && (
                          <p className="text-sm text-red-500 mt-1">{errors.contactEmail.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contactPhone">Phone *</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="(234) 123-4567-89"
                          {...register('contactPhone')}
                          className={errors.contactPhone ? 'border-red-500' : ''}
                        />
                        {errors.contactPhone && (
                          <p className="text-sm text-red-500 mt-1">{errors.contactPhone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Student Names */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Student Names</h3>
                      <span className="text-sm text-muted-foreground">Total: {totalStudents}</span>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                          <Input
                            placeholder={`Student ${index + 1}`}
                            {...register(`studentNames.${index}.name`)}
                            className={errors.studentNames?.[index]?.name ? 'border-red-500' : ''}
                          />
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-3 gap-2 bg-transparent"
                      onClick={() => append({ name: '' })}
                    >
                      <Plus className="h-4 w-4" />
                      Add Student
                    </Button>

                    {errors.studentNames && (
                      <p className="text-sm text-red-500 mt-2">
                        {typeof errors.studentNames.message === 'string'
                          ? errors.studentNames.message
                          : 'Please add at least one student'}
                      </p>
                    )}
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
                    <span className="font-semibold">School (Group)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price</span>
                    <span className="font-semibold">₦{pricing.perStudent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₦{pricing.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
