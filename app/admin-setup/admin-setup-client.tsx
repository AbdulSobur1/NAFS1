'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function AdminSetupClient() {
  const router = useRouter();
  const [setupKey, setSetupKey] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!setupKey || !email || !password) {
      setError('Setup key, email, and password are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/admin-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setupKey, email, password, name }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.message || 'Unable to create admin.');
        return;
      }

      if (data?.session === 'not_set') {
        router.push('/login/admin');
        return;
      }

      router.push('/admin-dashboard');
    } catch (err) {
      setError('Unable to create admin. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="font-bold text-primary">NAFS</div>
        </div>
      </nav>

      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card>
          <CardHeader>
            <CardTitle>Admin Setup</CardTitle>
            <CardDescription>
              Create the first admin using the setup key.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="setupKey">Setup Key</Label>
                <Input
                  id="setupKey"
                  value={setupKey}
                  onChange={(e) => setSetupKey(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating admin...' : 'Create Admin'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
