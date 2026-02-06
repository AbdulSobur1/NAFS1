'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Mail, Download, Home } from 'lucide-react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const registration = searchParams.get('registration');
  const category = searchParams.get('category');

  const getCategoryLabel = (cat: string | null) => {
    switch (cat) {
      case 'school':
        return 'High School Registration';
      case 'university':
        return 'University Student Registration';
      case 'general':
        return 'General Public Registration';
      default:
        return 'Conference Registration';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="text-primary hover:text-primary/80">
            <span>← Back to Home</span>
          </Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader className="text-center border-b border-border">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-3xl">Registration Complete!</CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you for registering for EduConf 2025
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pt-8">
            {/* Confirmation Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Confirmation Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Registration ID</p>
                  <p className="font-mono text-sm mt-1">{registration || 'N/A'}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Registration Type</p>
                  <p className="font-semibold text-sm mt-1">{getCategoryLabel(category)}</p>
                </div>

                <div className="bg-muted p-4 rounded-lg col-span-2">
                  <p className="text-sm text-muted-foreground">Payment Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-600 hover:bg-green-700">Paid</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border-t border-border pt-8 space-y-4">
              <h3 className="font-semibold text-lg">What's Next?</h3>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Check Your Email</p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to your registered email address with your registration details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Download className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Download Documents</p>
                    <p className="text-sm text-muted-foreground">
                      Your confirmation certificate and other documents are available in your account dashboard.
                    </p>
                  </div>
                </div>

                {category === 'school' && (
                  <div className="flex gap-3">
                    <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">📊</div>
                    <div>
                      <p className="font-semibold text-sm">School Dashboard</p>
                      <p className="text-sm text-muted-foreground">
                        Access your school dashboard to manage student registrations and view payment details.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Important</p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Please keep your Registration ID safe for future reference</li>
                <li>• The conference will take place on June 15-17, 2025</li>
                <li>• More details will be emailed to you 30 days before the event</li>
                <li>• Refund requests must be made within 30 days of registration</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {category === 'school' ? (
                <Link href="/login/school" className="w-full">
                  <Button className="w-full">Go to School Dashboard</Button>
                </Link>
              ) : (
                <Link href="/status" className="w-full">
                  <Button className="w-full">View My Registration Status</Button>
                </Link>
              )}

              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
