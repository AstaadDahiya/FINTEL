"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Target, Lightbulb } from "lucide-react";
import PortfolioSummary from "@/components/dashboard/PortfolioSummary";
import PersonalizedLearningContent from "@/components/dashboard/PersonalizedLearning";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-0 md:p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's your progress and portfolio at a glance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 of 5 Modules</div>
            <p className="text-xs text-muted-foreground">60% completed</p>
            <Progress value={60} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Quiz Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        
        <PortfolioSummary />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-xl text-primary">Your Personalized Next Step</CardTitle>
                <CardDescription>Our AI has analyzed your progress to suggest what you should learn next.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PersonalizedLearningContent setOpen={() => {}} />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
