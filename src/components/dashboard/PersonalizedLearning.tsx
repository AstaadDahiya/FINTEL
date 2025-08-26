"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Lightbulb } from "lucide-react";
import Link from "next/link";
import { getPersonalizedLearningPath, PersonalizedLearningPathOutput } from "@/ai/flows/personalized-learning-path";
import { learningModules } from "@/lib/data";

const userProgress = {
  completedModules: ["introduction-to-stocks", "what-is-an-etf"],
  currentModule: "reading-stock-charts"
};

const quizScores = {
  "introduction-to-stocks": 90,
  "what-is-an-etf": 75,
};

export default function PersonalizedLearning() {
  const [recommendation, setRecommendation] = useState<PersonalizedLearningPathOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        setLoading(true);
        const result = await getPersonalizedLearningPath({
          userProgress: JSON.stringify(userProgress),
          quizScores: JSON.stringify(quizScores),
          availableModules: JSON.stringify(learningModules.map(m => m.slug))
        });
        setRecommendation(result);
      } catch (error) {
        console.error("Failed to get learning path:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendation();
  }, []);
  
  const recommendedModuleDetails = learningModules.find(m => m.slug === recommendation?.recommendedModule);

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline text-xl text-primary">Your Personalized Next Step</CardTitle>
            <CardDescription className="mt-1">Our AI has analyzed your progress to suggest what you should learn next.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Analyzing your progress...</span>
          </div>
        ) : recommendation && recommendedModuleDetails ? (
          <div>
            <h3 className="text-lg font-semibold">{recommendedModuleDetails.title}</h3>
            <p className="mt-2 text-muted-foreground">{recommendation.reasoning}</p>
            <Button asChild className="mt-4">
              <Link href={`/dashboard/learn/${recommendation.recommendedModule}`}>Start Learning</Link>
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground">Could not generate a recommendation. Please complete more modules.</p>
        )}
      </CardContent>
    </Card>
  );
}
