
"use client"
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';

function RootContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isAuthPage = pathname === '/login';

  if(loading) {
    return null;
  }

  if(isAuthPage) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>
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
