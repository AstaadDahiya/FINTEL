
"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target } from "lucide-react";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { learningModules } from "@/lib/data";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];

export default function Dashboard() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useLocalStorage<CompletedModules>('completedModules', []);
  const [quizScores, setQuizScores] = useLocalStorage<QuizScores>('quizScores', {});
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

  if (!isClient) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="container mx-auto p-0 md:p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.displayName?.split(' ')[0] || 'Alex'}!</h1>
        <p className="text-muted-foreground">Here's your progress and portfolio at a glance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount} of {totalModules} Modules</div>
            <p className="text-xs text-muted-foreground">{learningProgress.toFixed(0)}% completed</p>
            <Progress value={learningProgress} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageQuizScore.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">Across all completed quizzes</p>
          </CardContent>
        </Card>
        
        <PortfolioSummary />
      </div>
    </div>
  );
}
