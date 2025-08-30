
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LineChart, MessageSquareQuote, Newspaper, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="#" className="flex items-center justify-center">
            <svg viewBox="0 0 220 55" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto text-foreground">
              <defs>
                <linearGradient id="bullishBlue" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#1e3a8a",stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:"#3b82f6",stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#60a5fa",stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="profitGreen" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#15803d",stopOpacity:1}} />
                  <stop offset="50%" style={{stopColor:"#22c55e",stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#4ade80",stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#f59e0b",stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#fbbf24",stopOpacity:1}} />
                </linearGradient>
              </defs>
              <g transform="translate(8, 8)">
                <circle cx="19.5" cy="19.5" r="18" fill="none" stroke="url(#bullishBlue)" strokeWidth="2" opacity="0.3"/>
                <circle cx="19.5" cy="19.5" r="15" fill="url(#bullishBlue)" opacity="0.05"/>
                <g transform="translate(7, 7)">
                  <line x1="2" y1="15" x2="22" y2="15" stroke="url(#bullishBlue)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2"/>
                  <path d="M2 20 L5 18 L8 19 L11 17 L14 16" stroke="url(#bullishBlue)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M14 16 L17 12 L20 8 L23 5" stroke="url(#profitGreen)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  <path d="M20 8 L23 5 L25 7" stroke="url(#profitGreen)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
              <g transform="translate(48, 0)">
                <text x="0" y="30" fontFamily="system-ui, -apple-system, 'Inter', sans-serif" fontSize="26" fontWeight="800" letterSpacing="-0.8px" fill="currentColor">
                  FIN
                </text>
                <text x="58" y="30" fontFamily="system-ui, -apple-system, 'Inter', sans-serif" fontSize="26" fontWeight="300" letterSpacing="-0.8px" fill="url(#bullishBlue)">
                  TEL
                </text>
              </g>
            </svg>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
          <Button asChild>
            <Link href="/login">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Welcome to Fintel
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A simple and clean platform to learn about stock trading, practice with a paper trading account, and get AI-powered insights.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 font-headline">
              Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                   <BookOpen className="h-8 w-8 text-primary" />
                   <CardTitle>Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Interactive modules to learn the fundamentals of stock trading.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <LineChart className="h-8 w-8 text-primary" />
                    <CardTitle>Paper Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Practice your trading strategies in a risk-free simulator.</p>
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Newspaper className="h-8 w-8 text-primary" />
                    <CardTitle>News Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get AI-powered sentiment analysis on the latest financial news.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                     <MessageSquareQuote className="h-8 w-8 text-primary" />
                     <CardTitle>More</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Explore more features like our content summarizer and support agent.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Contact Us</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? We'd love to hear from you.
              </p>
               <p className="text-xs text-muted-foreground pt-4">* Warning: AI-powered features like sentiment analysis are for informational purposes and are not financial advice.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Fintel. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
