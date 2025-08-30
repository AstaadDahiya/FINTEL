
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await signInWithEmail(email, password);
        router.push('/dashboard');
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
        console.error("Login failed:", error);
      }
    } else {
        if(!displayName) {
             toast({
                variant: "destructive",
                title: "Sign Up Failed",
                description: "Please enter your name.",
             });
             return;
        }
      try {
        await signUpWithEmail(email, password, displayName);
        router.push('/dashboard');
      } catch (error) {
         toast({
          variant: "destructive",
          title: "Sign Up Failed",
          description: "Could not create account. The email might be taken.",
        });
        console.error("Sign up failed:", error);
      }
    }
  };
  
  const handleGoogleSignIn = () => {
    signInWithGoogle().catch(error => {
        toast({
          variant: "destructive",
          title: "Google Sign-In Failed",
          description: "Could not sign in with Google. Please try again.",
        });
        console.error("Google Sign-in failed:", error);
    })
  }
  
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }


  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center text-foreground">
              <svg viewBox="0 0 220 55" xmlns="http://www.w3.org/2000/svg" className="h-16">
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
                  <filter id="premiumShadow">
                    <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1e3a8a" floodOpacity="0.15"/>
                  </filter>
                  <filter id="textGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <g transform="translate(8, 8)" filter="url(#premiumShadow)">
                  <circle cx="19.5" cy="19.5" r="18" fill="none" stroke="url(#bullishBlue)" strokeWidth="2" opacity="0.3"/>
                  <circle cx="19.5" cy="19.5" r="15" fill="url(#bullishBlue)" opacity="0.05"/>
                  <g transform="translate(7, 7)">
                    <line x1="2" y1="15" x2="22" y2="15" stroke="url(#bullishBlue)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2"/>
                    <path d="M2 20 L5 18 L8 19 L11 17 L14 16" stroke="url(#bullishBlue)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M14 16 L17 12 L20 8 L23 5" stroke="url(#profitGreen)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <rect x="3" y="22" width="2" height="3" rx="1" fill="url(#bullishBlue)" opacity="0.5"/>
                    <rect x="6" y="21" width="2" height="4" rx="1" fill="url(#bullishBlue)" opacity="0.6"/>
                    <rect x="9" y="20" width="2" height="5" rx="1" fill="url(#bullishBlue)" opacity="0.7"/>
                    <rect x="12" y="19" width="2" height="6" rx="1" fill="url(#profitGreen)" opacity="0.8"/>
                    <rect x="15" y="17" width="2" height="8" rx="1" fill="url(#profitGreen)"/>
                    <rect x="18" y="16" width="2" height="9" rx="1" fill="url(#profitGreen)"/>
                    <path d="M20 8 L23 5 L25 7" stroke="url(#profitGreen)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="14" cy="16" r="2" fill="url(#goldAccent)" opacity="0.9"/>
                    <circle cx="20" cy="8" r="2.5" fill="url(#goldAccent)"/>
                    <path d="M23 3 L24 5 L23 7 L22 5 Z" fill="url(#goldAccent)" opacity="0.8"/>
                  </g>
                </g>
                <g transform="translate(48, 0)">
                  <text x="0" y="30" fontFamily="system-ui, -apple-system, 'Inter', sans-serif" fontSize="26" fontWeight="800" letterSpacing="-0.8px" fill="currentColor" filter="url(#textGlow)">
                    FIN
                  </text>
                  <text x="58" y="30" fontFamily="system-ui, -apple-system, 'Inter', sans-serif" fontSize="26" fontWeight="300" letterSpacing="-0.8px" fill="url(#bullishBlue)" filter="url(#textGlow)">
                    TEL
                  </text>
                  <rect x="55" y="25" width="8" height="1.5" rx="0.75" fill="url(#goldAccent)" opacity="0.6"/>
                  <path d="M0 35 Q30 33 120 33" stroke="url(#profitGreen)" strokeWidth="1" fill="none" opacity="0.3"/>
                </g>
                <g transform="translate(180, 20)">
                  <circle cx="0" cy="0" r="2" fill="url(#profitGreen)" opacity="0.6"/>
                  <circle cx="8" cy="-3" r="2.5" fill="url(#profitGreen)" opacity="0.8"/>
                  <circle cx="16" cy="-6" r="3" fill="url(#goldAccent)"/>
                </g>
              </svg>
            </div>
            <p className="text-balance text-muted-foreground">
              {isLogin ? 'Welcome back! Please enter your details.' : 'Create an account to get started.'}
            </p>
          </div>
            <form onSubmit={handleAuthAction}>
              <div className="grid gap-4">
                {!isLogin && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
                <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
                  {isLogin ? 'Login' : 'Sign up'} with Google
                </Button>
              </div>
            </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="underline">
              {isLogin ? 'Sign up' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/1200/900"
          alt="Stock market chart"
          width="1200"
          height="900"
          data-ai-hint="stock market"
          className="h-full w-full object-cover dark:brightness-[0.3]"
        />
      </div>
    </div>
  );
}
