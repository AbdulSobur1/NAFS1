'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Globe, ArrowLeft } from 'lucide-react';
import SchoolRegistrationForm from '@/components/registration/school-registration-form';
import UniversityRegistrationForm from '@/components/registration/university-registration-form';
import GeneralPublicRegistrationForm from '@/components/registration/general-public-registration-form';

type RegistrationCategory = 'school' | 'university' | 'general' | null;

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<RegistrationCategory>(null);

  useEffect(() => {
    const categoryParam = searchParams.get('category') as RegistrationCategory;
    if (categoryParam && ['school', 'university', 'general'].includes(categoryParam)) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  if (category === 'school') {
    return <SchoolRegistrationForm onBack={() => setCategory(null)} />;
  }

  if (category === 'university') {
    return <UniversityRegistrationForm onBack={() => setCategory(null)} />;
  }

  if (category === 'general') {
    return <GeneralPublicRegistrationForm onBack={() => setCategory(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Select Your Registration Type</h1>
          <p className="text-lg text-muted-foreground">Choose the option that best describes you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* School Registration */}
          <Card 
            className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
            onClick={() => setCategory('school')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>High School Registration</CardTitle>
              <CardDescription>Register multiple students from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ Bulk student registration</li>
                <li>✓ Automatic group discounts</li>
                <li>✓ One consolidated payment</li>
                <li>✓ School dashboard access</li>
              </ul>
              <Button className="w-full">Register School</Button>
            </CardContent>
          </Card>

          {/* University Registration */}
          <Card 
            className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
            onClick={() => setCategory('university')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>University Registration</CardTitle>
              <CardDescription>Individual student registration</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ Individual registration</li>
                <li>✓ University affiliation required</li>
                <li>✓ Individual payment</li>
                <li>✓ Instant confirmation</li>
              </ul>
              <Button className="w-full">Register as Student</Button>
            </CardContent>
          </Card>

          {/* General Public Registration */}
          <Card 
            className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
            onClick={() => setCategory('general')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>General Public Registration</CardTitle>
              <CardDescription>Open to all professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ No institutional requirement</li>
                <li>✓ Open to all professionals</li>
                <li>✓ Flexible registration</li>
                <li>✓ Fast checkout</li>
              </ul>
              <Button className="w-full">Register Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Schools:</span> Individual high school students cannot register directly. Only authorized school administrators can register students.
            </p>
            <p>
              <span className="font-semibold">Payment:</span> Registration is only complete after successful payment. All payments are processed securely through Stripe.
            </p>
            <p>
              <span className="font-semibold">Discounts:</span> School group discounts are automatically calculated based on the number of students. No promo codes needed.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
