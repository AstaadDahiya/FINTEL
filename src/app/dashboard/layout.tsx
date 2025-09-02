

"use client";
import Link from "next/link";
import {
  BookOpen,
  Globe,
  HelpCircle,
  Home,
  Lightbulb,
  LineChart,
  Settings,
  Sparkles,
  TextSelect,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PersonalizedLearningContent from "@/components/dashboard/PersonalizedLearning";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
  const { user, logout } = useAuth();
  const personalizedLearningKey = user ? `showPersonalizedLearning_${user.uid}` : 'showPersonalizedLearning';
  const [showPersonalizedLearning] = useLocalStorage(personalizedLearningKey, true);
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <AuthGuard>
      <SidebarProvider>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <Sidebar side="left" collapsible="icon">
          <SidebarHeader>
            <Link href="/" className="block">
              <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
              <svg viewBox="0 0 220 55" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto group-data-[collapsible=icon]:hidden text-foreground">
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
                      FINTEL
                    </text>
                    <path d="M0 35 Q30 33 102 33" stroke="url(#profitGreen)" strokeWidth="1" fill="none" opacity="0.3"/>
                  </g>
                  <g transform="translate(180, 20)">
                    <circle cx="0" cy="0" r="2" fill="url(#profitGreen)" opacity="0.6"/>
                    <circle cx="8" cy="-3" r="2.5" fill="url(#profitGreen)" opacity="0.8"/>
                    <circle cx="16" cy="-6" r="3" fill="url(#goldAccent)"/>
                  </g>
                </svg>
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="size-8 hidden group-data-[collapsible=icon]:block">
                  <defs>
                      <linearGradient id="bullishBlueIcon" x1_1="0%" y1_1="100%" x2_1="100%" y2_1="0%">
                        <stop offset="0%" style={{stopColor:"#1e3a8a",stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:"#3b82f6",stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#60a5fa",stopOpacity:1}} />
                      </linearGradient>
                      <linearGradient id="profitGreenIcon" x1_2="0%" y1_2="100%" x2_2="100%" y2_2="0%">
                        <stop offset="0%" style={{stopColor:"#15803d",stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:"#22c55e",stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#4ade80",stopOpacity:1}} />
                      </linearGradient>
                      <linearGradient id="goldAccentIcon" x1_3="0%" y1_3="0%" x2_3="100%" y2_3="100%">
                        <stop offset="0%" style={{stopColor:"#f59e0b",stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#fbbf24",stopOpacity:1}} />
                      </linearGradient>
                      <filter id="premiumShadowIcon">
                        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1e3a8a" floodOpacity="0.15"/>
                      </filter>
                    </defs>
                    <g filter="url(#premiumShadowIcon)">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#bullishBlueIcon)" strokeWidth="2" opacity="0.3"/>
                      <circle cx="20" cy="20" r="15" fill="url(#bullishBlueIcon)" opacity="0.05"/>
                      <g transform="translate(8, 8)">
                        <line x1="2" y1="15" x2="22" y2="15" stroke="url(#bullishBlueIcon)" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2"/>
                        <path d="M2 20 L5 18 L8 19 L11 17 L14 16" stroke="url(#bullishBlueIcon)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                        <path d="M14 16 L17 12 L20 8 L23 5" stroke="url(#profitGreenIcon)" strokeWidth="3" fill="none" strokeLinecap="round"/>
                        <path d="M20 8 L23 5 L25 7" stroke="url(#profitGreenIcon)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="14" cy="16" r="2" fill="url(#goldAccentIcon)" opacity="0.9"/>
                        <circle cx="20" cy="8" r="2.5" fill="url(#goldAccentIcon)"/>
                        <path d="M23 3 L24 5 L23 7 L22 5 Z" fill="url(#goldAccentIcon)" opacity="0.8"/>
                      </g>
                    </g>
                </svg>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard" passHref>
                  <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/learn" passHref>
                  <SidebarMenuButton tooltip="Learn" isActive={isActive('/dashboard/learn')}>
                    <BookOpen />
                    <span>Learn</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/simulator" passHref>
                  <SidebarMenuButton tooltip="Simulator" isActive={isActive('/dashboard/simulator')}>
                    <LineChart />
                    <span>Simulator</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/insights" passHref>
                  <SidebarMenuButton tooltip="AI Insights" isActive={isActive('/dashboard/insights')}>
                    <Sparkles />
                    <span>AI Insights</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/summarizer" passHref>
                  <SidebarMenuButton tooltip="Summarizer" isActive={isActive('/dashboard/summarizer')}>
                    <TextSelect />
                    <span>Summarizer</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              {showPersonalizedLearning && (
                <SidebarMenuItem>
                  <DialogTrigger asChild>
                    <SidebarMenuButton tooltip="Your Next Step">
                      <Lightbulb />
                      <span>Your Next Step</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                 <SidebarMenuItem>
                  <Link href="/" passHref>
                    <SidebarMenuButton tooltip="Main Site" isActive={isActive('/')}>
                      <Globe />
                      <span>Main Site</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/support" passHref>
                    <SidebarMenuButton tooltip="Support" isActive={isActive('/dashboard/support')}>
                      <HelpCircle />
                      <span>Support</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/settings" passHref>
                    <SidebarMenuButton tooltip="Settings" isActive={isActive('/dashboard/settings')}>
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="flex-1" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
                    <AvatarFallback>{user?.displayName?.[0] ?? <User />}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard/settings">Profile & Settings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/dashboard/support">Support</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </SidebarInset>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Lightbulb className="h-5 w-5" /> Your Personalized Next Step
            </DialogTitle>
          </DialogHeader>
          <PersonalizedLearningContent setOpen={setModalOpen} />
        </DialogContent>
        </Dialog>
      </SidebarProvider>
      </AuthGuard>
  );
}
