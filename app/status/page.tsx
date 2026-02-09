'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle2, AlertCircle, Search } from 'lucide-react';

type RegistrationResult = {
  id: string;
  reference: string;
  category: string;
  status: string;
  createdAt: string;
  name: string;
  email: string;
};

export default function RegistrationStatusPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'reference'>('email');
  const [foundRegistration, setFoundRegistration] = useState<RegistrationResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setHasSearched(true);
    setIsSearching(true);
    try {
      const response = await fetch('/api/registration-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          searchType === 'email' ? { email: searchQuery } : { reference: searchQuery }
        ),
      });

      if (!response.ok) {
        setFoundRegistration(null);
        return;
      }

      const data = await response.json();
      setFoundRegistration(data.registration || null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Check Your Registration Status</h1>
          <p className="text-lg text-muted-foreground">
            Enter your email or reference number to view your NAFS registration details and confirmation.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Registration Lookup</CardTitle>
            <CardDescription>Find your registration details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Type Tabs */}
            <div className="flex gap-2 border-b border-border">
              <button
                onClick={() => {
                  setSearchType('email');
                  setFoundRegistration(null);
                  setHasSearched(false);
                  setSearchQuery('');
                }}
                className={`pb-3 px-4 font-medium transition-colors ${
                  searchType === 'email'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Search by Email
              </button>
              <button
                onClick={() => {
                  setSearchType('reference');
                  setFoundRegistration(null);
                  setHasSearched(false);
                  setSearchQuery('');
                }}
                className={`pb-3 px-4 font-medium transition-colors ${
                  searchType === 'reference'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Search by Reference
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {searchType === 'email' ? 'Email Address' : 'Reference Number or Registration ID'}
              </label>
              <div className="flex gap-2">
                <Input
                  type={searchType === 'email' ? 'email' : 'text'}
                  placeholder={
                    searchType === 'email'
                      ? 'example@email.com'
                      : 'NAFS-2025-00004 or REG-004'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="gap-2" disabled={isSearching || !searchQuery.trim()}>
                  <Search className="h-4 w-4" />
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {/* Info */}
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-900 dark:text-blue-100">
                Use the email address you registered with or your Registration ID / reference.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSearched && foundRegistration && (
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader className="bg-green-50 dark:bg-green-950 border-b border-green-200 dark:border-green-900">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div>
                  <CardTitle className="text-green-900 dark:text-green-100">Registration Found</CardTitle>
                  <CardDescription className="text-green-800 dark:text-green-200">
                    Your registration is confirmed and active
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold mb-3">Your Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{foundRegistration.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{foundRegistration.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Category</p>
                    <p className="font-medium capitalize">{foundRegistration.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registration Date</p>
                    <p className="font-medium">{new Date(foundRegistration.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-3">Registration Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <div className="mt-1">
                      {foundRegistration.status === 'completed' ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 capitalize">
                          {foundRegistration.status}
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 capitalize">
                          {foundRegistration.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reference Number</p>
                    <p className="font-mono font-semibold text-lg mt-1">{foundRegistration.reference}</p>
                  </div>
                </div>
              </div>

              {/* Conference Details */}
              <div className="border-t border-border pt-6 bg-primary/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Conference Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Conference Date</p>
                    <p className="font-medium">June 15–17, 2025</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detailed conference schedule and logistical information will be sent to your email 30 days before the event.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border pt-6 flex gap-3 flex-col sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setSearchQuery('');
                    setFoundRegistration(null);
                    setHasSearched(false);
                  }}
                >
                  New Search
                </Button>
                <Button className="flex-1" disabled>
                  Download Confirmation (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Not Found Message */}
        {hasSearched && !foundRegistration && (
          <Card className="border-amber-200 dark:border-amber-900">
            <CardHeader className="bg-amber-50 dark:bg-amber-950 border-b border-amber-200 dark:border-amber-900">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <div>
                  <CardTitle className="text-amber-900 dark:text-amber-100">Registration Not Found</CardTitle>
                  <CardDescription className="text-amber-800 dark:text-amber-200">
                    We couldn't find a registration matching your search
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground">
                Please double-check your email address or reference number and try again.
              </p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setSearchQuery('');
                    setFoundRegistration(null);
                    setHasSearched(false);
                  }}
                >
                  Try Again
                </Button>
                <Link href="/register" className="flex-1">
                  <Button className="w-full">Register Now</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-base">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              If you're having trouble finding your registration or have questions about your payment, please contact us:
            </p>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> support@nafs.com</p>
              <p><span className="font-semibold">Phone:</span> +234 (XXX) XXX-XXXX</p>
              <p><span className="font-semibold">Hours:</span> Monday - Friday, 9 AM - 5 PM (WAT)</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
