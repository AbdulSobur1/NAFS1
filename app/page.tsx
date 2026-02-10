'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Users, GraduationCap, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { getPricingTiers } from '@/lib/types';

export default function HomePage() {
  const pricingTiers = getPricingTiers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">NAFS</div>
            <div className="text-xs font-medium text-muted-foreground hidden sm:block">
              Nurturing Aspirations of the Soul
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login/admin">
              <Button variant="ghost" size="sm">Admin</Button>
            </Link>
            <Link href="/login/school">
              <Button variant="ghost" size="sm">School Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Registration Now Open
            </Badge>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-balance mb-6 leading-tight">
            Nurture Your <span className="text-primary">Aspirations</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-4 max-w-2xl mx-auto">
            Join educators, innovators, and transformational leaders at Nigeria's most inspiring educational conference.
          </p>
          <p className="text-lg text-accent mb-8 max-w-2xl mx-auto font-medium">
            Empower minds. Elevate souls. Create lasting change.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2 h-12 px-8 text-base">
              Register Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Registration Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-4">Choose Your Path</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Whether you're bringing a school delegation or joining as an individual, NAFS welcomes you.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Schools */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>High Schools</CardTitle>
              <CardDescription>Empower your students with group discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">10% discount from 20+ students</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">20% discount from 50+ students</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">30% discount from 100+ students</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">School dashboard access</span>
                </li>
              </ul>
              <Link href="/register?category=school" className="block">
                <Button className="w-full">Register School</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Universities */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Universities</CardTitle>
              <CardDescription>Individual student registration</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Flexible, individual registration</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Fast checkout process</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Instant confirmation</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Digital certificate included</span>
                </li>
              </ul>
              <Link href="/register?category=university" className="block">
                <Button className="w-full">Register as Student</Button>
              </Link>
            </CardContent>
          </Card>

          {/* General Public */}
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Professionals & Public</CardTitle>
              <CardDescription>Open to all aspiring learners</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">No institutional requirements</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Professionals and educators welcome</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Simple registration process</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Secure payment with Paystack</span>
                </li>
              </ul>
              <Link href="/register?category=general" className="block">
                <Button className="w-full">Register Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose NAFS?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We've designed the registration process to be simple, transparent, and inspiring.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Smart Group Discounts</h3>
              <p className="text-muted-foreground">Save up to 30% when bringing larger school delegations. Discounts apply automatically.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Powered by Paystack for safe, reliable transactions. Your payment details are always protected.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instant Confirmation</h3>
              <p className="text-muted-foreground">Receive immediate confirmation and access details right after payment. No delays or surprises.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">School Leadership Tools</h3>
              <p className="text-muted-foreground">Dedicated dashboard for school administrators to manage student registrations and track attendance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-4">Transparent Pricing</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          All prices include both the Programme package and Study Materials (Books). All prices in Nigerian Naira (₦).
        </p>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Table Layout for Pricing */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Participant Category</th>
                  <th className="text-right py-4 px-4 font-semibold">Programme Fee</th>
                  <th className="text-right py-4 px-4 font-semibold">Books & Materials</th>
                  <th className="text-right py-4 px-4 font-semibold">Total per Student</th>
                  <th className="text-center py-4 px-4 font-semibold">Discount</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier, index) => (
                  <tr key={index} className={`border-b border-border hover:bg-muted/50 transition-colors ${index === pricingTiers.length - 1 ? '' : ''}`}>
                    <td className="py-4 px-4 font-medium">{tier.description}</td>
                    <td className="text-right py-4 px-4">₦{tier.programme.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">₦{tier.book.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 font-bold text-primary text-lg">₦{tier.total.toLocaleString()}</td>
                    <td className="text-center py-4 px-4">
                      {tier.discount > 0 ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                          {tier.discount}% off
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">For Schools</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">Bulk pricing with automatic discounts</p>
                <p className="font-medium">Up to 30% savings for 100+ students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">For Individuals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">University students & professionals</p>
                <p className="font-medium">₦6,000 per person</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">Full conference access</p>
                <p className="font-medium">+ Study materials & resources</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border text-center">
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educators and leaders nurturing aspirations. Secure your spot with our secure, streamlined registration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2 h-12 px-8">
                Register Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login/admin">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-lg mb-1">NAFS</div>
                <p className="text-sm text-muted-foreground">Nurturing Aspirations of the Soul</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Secure payment powered by <span className="font-semibold">Paystack</span>
              </div>
            </div>
            <div className="border-t border-border pt-4 text-sm text-muted-foreground">
              © 2025 NAFS. Empowering education, one soul at a time.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
