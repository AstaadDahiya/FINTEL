
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { ArrowDown, BookOpen, Bot, LineChart, Loader2, Sparkles, TextSelect } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const heroImages = [
  "https://image2url.com/images/1756806661144-09af950d-0269-4e2d-9e35-b1592f903b12.png",
  "https://image2url.com/images/1756829087282-f9c29d9a-d233-4aa4-a4c6-a9f42418517c.png",
  "https://picsum.photos/1200/800?random=1",
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
];


export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [heroImage, setHeroImage] = useState(heroImages[0]);

    useEffect(() => {
      if (!loading && user) {
        router.push('/dashboard');
      }
    }, [user, loading, router]);
    
    useEffect(() => {
        // This runs only on the client, after the initial render.
        const randomIndex = Math.floor(Math.random() * heroImages.length);
        setHeroImage(heroImages[randomIndex]);
    }, []);


    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (loading || user) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="size-8">
              <defs>
                <linearGradient id="bullishBlueIcon" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#1e3a8a", stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#60a5fa", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="profitGreenIcon" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#15803d", stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#4ade80", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="goldAccentIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#fbbf24", stopOpacity: 1 }} />
                </linearGradient>
                <filter id="premiumShadowIcon">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.15" />
                </filter>
              </defs>
              <g filter="url(#premiumShadowIcon)">
                <circle cx="20" cy="20" r="18" fill="none" stroke="url(#bullishBlueIcon)" strokeWidth="2" opacity="0.3" />
                <circle cx="20" cy="20" r="15" fill="url(#bullishBlueIcon)" opacity="0.05" />
                <g transform="translate(8, 8)">
                  <line x1="2" y1="15" x2="22" y2="15" stroke="url(#bullishBlueIcon)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
                  <path d="M2 20 L5 18 L8 19 L11 17 L14 16" stroke="url(#bullishBlueIcon)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M14 16 L17 12 L20 8 L23 5" stroke="url(#profitGreenIcon)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M20 8 L23 5 L25 7" stroke="url(#profitGreenIcon)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="14" cy="16" r="2" fill="url(#goldAccentIcon)" opacity="0.9" />
                  <circle cx="20" cy="8" r="2.5" fill="url(#goldAccentIcon)" />
                  <path d="M23 3 L24 5 L23 7 L22 5 Z" fill="url(#goldAccentIcon)" opacity="0.8" />
                </g>
              </g>
            </svg>
            <span className="text-lg">FINTEL</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <ThemeToggle />
             <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative flex h-[calc(80vh)] w-full items-center justify-center text-center">
          <Image 
            src={heroImage}
            alt="Hero background"
            fill
            className="object-cover absolute inset-0 z-0 brightness-[0.8] dark:brightness-[0.4]"
            data-ai-hint="finance abstract"
            priority
          />
          <div className="relative z-10 bg-background/30 dark:bg-background/50 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl font-headline text-foreground">
              FINTEL
            </h1>
            <p className="mt-4 text-lg text-foreground/80 md:text-xl">
              Invest with confidence. Learn with purpose.
            </p>
            <div className="mt-8">
              <Button size="lg" onClick={scrollToFeatures}>
                Explore Features <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Features Built For You
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><BookOpen /> Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Interactive modules to build your financial knowledge from the ground up.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><LineChart /> Paper Trading</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Practice trading with real market data in a risk-free simulator.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles /> AI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Get AI-powered sentiment analysis and simplify complex financial news.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TextSelect /> Summarizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Translate and summarize complex financial documents into simple language.</CardDescription>
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bot /> Chatbot</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Get instant answers to your questions about the app and trading concepts.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
         <section id="contact" className="py-16 sm:py-24 bg-muted/20">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Contact Us</h2>
                        <p className="mt-4 text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
                        <div className="mt-6 rounded-lg border bg-amber-50 border-amber-200 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200">
                           <p className="flex items-start gap-2"><Sparkles className="h-4 w-4 mt-0.5 shrink-0" /> <span><span className="font-bold">AI Sentiment Analysis Warning:</span> The stock market insights provided are generated by an AI and are for informational purposes only. They do not constitute financial advice.</span></p>
                        </div>
                    </div>
                     <div>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Your message..." />
                            </div>
                            <Button type="submit">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FINTEL. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
