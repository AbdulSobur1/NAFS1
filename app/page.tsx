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
              Nurturing Awareness, Faith and Self-control
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
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
            Nurturing Awareness, <span className="text-primary">Faith</span> and Self-control
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-4 max-w-2xl mx-auto">
            De-normalizing Zina & Reclaiming Youth Purity
          </p>
          <p className="text-lg text-accent mb-8 max-w-2xl mx-auto font-medium">
            NAFS PROJECT
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2 h-12 px-8 text-base">
              Register Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* NAFS Project */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">NAFS PROJECT</h2>
          <div className="text-lg text-muted-foreground space-y-4 max-w-4xl mx-auto">
            <p>
              The NAFS Project (Nurturing Awareness, Faith, and Self-control) is a youth-focused moral and psychological guidance initiative dedicated to helping young people understand and manage the challenges of desire, emotional attachment, and identity in a modern world filled with early exposure and silent struggles.
            </p>
            <p>
              Through faith-based education, psychological guidance, and confidential support from trained therapists and qualified scholars, the project provides a safe and responsible space for youth, from secondary school students to university students and young adults, to ask questions, gain clarity, and develop healthy self-control.
            </p>
            <p>
              At the heart of the initiative is the educational resource "Architecture of Desires," a youth-friendly book designed to help readers understand attraction, emotional development, and Islamic moral discipline in a thoughtful and accessible way.
            </p>
            <p>
              The NAFS Project does not shame desire; it teaches mastery over it. By replacing silence with guidance and confusion with understanding, the project aims to raise a generation of youth with strong faith, emotional intelligence, and moral resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-4">Choose Your Registration Path</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Whether you are registering a school group or joining individually, NAFS welcomes you.
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
                  <span className="text-sm">Safe Questions Space</span>
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
        <h2 className="text-4xl font-bold text-center mb-4">Why the NAFS Project?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We have built a safe, guided path for youth to gain clarity, ask questions, and grow in self-control.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Faith-Based Guidance</h3>
              <p className="text-muted-foreground">Faith-informed teaching that helps youth make sense of desire, identity, and boundaries with clarity.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Psychological Support</h3>
              <p className="text-muted-foreground">Confidential support from trained therapists to navigate emotions, attachment, and self-control.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Safe Questions Space</h3>
              <p className="text-muted-foreground">A respectful, non-judgmental space to ask hard questions and receive responsible answers.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Youth-Centered Resources</h3>
              <p className="text-muted-foreground">Practical tools like the "Architecture of Desires" resource to guide understanding and discipline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-4">Registration Pricing</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          All prices include programme materials and study resources. All prices in Nigerian Naira (₦).
        </p>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Table Layout for Pricing */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Participant Category</th>
                  <th className="text-right py-4 px-4 font-semibold">Total per Student</th>
                  <th className="text-center py-4 px-4 font-semibold">Discount</th>
                </tr>
              </thead>
              <tbody>
                {pricingTiers.map((tier, index) => (
                  <tr key={index} className={`border-b border-border hover:bg-muted/50 transition-colors ${index === pricingTiers.length - 1 ? '' : ''}`}>
                    <td className="py-4 px-4 font-medium">{tier.description}</td>
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
                <CardTitle className="text-base">For School Groups</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">Group pricing with automatic discounts</p>
                <p className="font-medium">Up to 30% savings for 100+ students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">For Individuals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">University students and young professionals</p>
                <p className="font-medium">₦6,000 per person</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">What You Receive</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-muted-foreground">Full project access</p>
                <p className="font-medium">Study materials and guidance resources</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border text-center">
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a growing movement restoring clarity, dignity, and self-control for the next generation.
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

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">Mission & Vision</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            A clear purpose guides everything we do — from the way we teach, to the resources we build, to the community we grow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-lg border border-border/40 hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                NAFS exists to de-normalize, confront zina and protect the next generations by restoring fear of Allah, clarity about the body, and dignity in desire — before curiosity becomes regret.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border border-border/40 hover:shadow-xl transition-shadow">
            <CardHeader className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We see a generation that understands desire without being enslaved by it, fears Allah before trends, and reaches marriage with dignity instead of regret or wounds.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/70 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="text-xl font-bold text-primary">NAFS</div>
              <p className="text-sm text-muted-foreground mt-2">
                Nurturing Awareness, Faith and Self-control
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                De-normalizing Zina & reclaiming youth purity.
              </p>
            </div>

            <div>
              <div className="font-semibold mb-3">Explore</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link href="/register" className="block hover:text-primary">Register</Link>
                <Link href="/login/school" className="block hover:text-primary">School Login</Link>
                <Link href="/login/admin" className="block hover:text-primary">Admin Login</Link>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-3">Contact</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: <a className="hover:text-primary" href="mailto:adebanjoayomideqawaam@gmail.com">adebanjoayomideqawaam@gmail.com</a></p>
                <p>Phone: <a className="hover:text-primary" href="tel:+2348077907300">+234 807 790 7300</a></p>
                <p>WhatsApp: <a className="hover:text-primary" href="https://wa.me/message/ZWPNJ7V6PETCB1" target="_blank" rel="noreferrer">Chat on WhatsApp</a></p>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-3">Social</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a className="block hover:text-primary" href="https://www.facebook.com/profile.php?id=61587109243292" target="_blank" rel="noreferrer">Facebook</a>
                <a className="block hover:text-primary" href="https://www.instagram.com/nafs_movement?igsh=dWszdzFpbG82MTQ5" target="_blank" rel="noreferrer">Instagram</a>
                <a className="block hover:text-primary" href="https://x.com/nafsmovement?t=BJ7YFjRn335EleWHYGA2gw&s=09" target="_blank" rel="noreferrer">X / Twitter</a>
                <a className="block hover:text-primary" href="https://www.linkedin.com/in/nafs-movement-30334a3aa" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} NAFS. Guiding hearts, restoring dignity.</span>
            <span>Secure payment powered by <span className="font-semibold">Paystack</span></span>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-3">
            #GrowthMindset #Legacy #Discipline
          </div>
        </div>
      </footer>
    </div>
  );
}






