"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, BookOpen, DollarSign, Target } from "lucide-react";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { learningModules } from "@/lib/data";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { CircularProgress } from "@/components/ui/circular-progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];
type Trade = {
    type: 'Buy' | 'Sell';
    ticker: string;
    quantity: number;
    price: number;
    date: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  
  const completedModulesKey = user ? `completedModules_${user.uid}` : 'completedModules';
  const quizScoresKey = user ? `quizScores_${user.uid}` : 'quizScores';
  const tradeHistoryKey = user ? `tradeHistory_${user.uid}` : 'tradeHistory';
  
  const [completedModules] = useLocalStorage<CompletedModules>(completedModulesKey, []);
  const [quizScores] = useLocalStorage<QuizScores>(quizScoresKey, {});
  const [tradeHistory] = useLocalStorage<Trade[]>(tradeHistoryKey, []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalModules = learningModules.length;
  const completedCount = isClient ? completedModules.length : 0;
  const learningProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  const scoreValues = isClient ? Object.values(quizScores) : [];
  const averageQuizScore = scoreValues.length > 0 
    ? scoreValues.reduce((acc, score) => acc + score, 0) / scoreValues.length
    : 0;
    
  const recentActivity = isClient ? [
    ...tradeHistory.slice(0, 3).map(trade => ({...trade, type: 'trade', id: `trade-${trade.date}`})),
    ...completedModules.map(slug => {
        const module = learningModules.find(m => m.slug === slug);
        return {
            id: `learn-${slug}`,
            type: 'learn',
            title: module?.title || 'Completed Module',
            date: new Date().toLocaleString() // Note: local storage doesn't store completion date.
        }
    }).slice(0, 2)
  ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];


  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, {user?.displayName?.split(' ')[0] || 'Alex'}!</h1>
        <p className="text-muted-foreground text-sm">Here's your progress and portfolio at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PortfolioSummary />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-4">
                <CircularProgress value={learningProgress} />
                <div className="flex-1">
                    <div className="text-2xl font-bold">{completedCount} of {totalModules}</div>
                    <p className="text-xs text-muted-foreground">Modules completed</p>
                </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4" asChild>
                <Link href="/learn">Continue Learning</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
                <CircularProgress value={averageQuizScore} className="text-primary" />
                <div className="flex-1">
                    <div className="text-2xl font-bold">{averageQuizScore.toFixed(0)}%</div>
                    <p className="text-xs text-muted-foreground">Across all quizzes</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <PortfolioChart />
            </CardContent>
        </Card>
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest trades and learning milestones.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                <TableBody>
                  {recentActivity.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        No recent activity.
                      </TableCell>
                    </TableRow>
                  )}
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                        <TableCell>
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted">
                                {activity.type === 'trade' ? <DollarSign className="h-4 w-4 text-muted-foreground"/> : <BookOpen className="h-4 w-4 text-muted-foreground"/>}
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            {activity.type === 'trade' ? `${'ticker' in activity ? `Trade: ${activity.ticker}` : 'Trade'}` : activity.title}
                        </TableCell>
                        <TableCell className="text-right">
                            {activity.type === 'trade' && 'quantity' in activity ? (
                                <Badge variant={activity.type === 'Buy' ? 'default' : 'destructive'} className={activity.type === 'Buy' ? 'bg-emerald-600' : 'bg-red-600'}>
                                    {activity.type === 'Buy' ? '+' : '-'}
                                    {activity.quantity} Shares
                                </Badge>
                            ) : (
                                <Badge variant="secondary">Completed</Badge>
                            )}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
               </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
