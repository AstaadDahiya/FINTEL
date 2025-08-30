

"use client"
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import AppLayout from './dashboard/layout';
import LoginPage from './login/page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function RootContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && pathname === '/login') {
      router.push('/dashboard');
    }
    if (!loading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, loading, pathname, router]);


  if (loading) {
    // You can return a global loading indicator here
    return null;
  }

  if (!user) {
    return <LoginPage />;
  }
  
  if (pathname.startsWith('/dashboard')) {
      return <AppLayout>{children}</AppLayout>;
  }

  // Redirect to dashboard if logged in and at root
  if (pathname === '/') {
    router.push('/dashboard');
    return null; // Or a loading indicator
  }

  // Fallback for any other page if needed, or just show children
  return <>{children}</>;
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FINTEL</title>
        <meta name="description" content="Learn to invest with confidence." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
              <RootContent>{children}</RootContent>
              <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
