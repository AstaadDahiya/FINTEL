"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { getPersonalizedLearningPath, PersonalizedLearningPathOutput } from "@/ai/flows/personalized-learning-path";
import { learningModules } from "@/lib/data";

const userProgress = {
  completedModules: ["introduction-to-indian-stocks", "what-is-an-etf-india"],
  currentModule: "sebi-and-investor-protection"
};

const quizScores = {
  "introduction-to-indian-stocks": 90,
  "what-is-an-etf-india": 75,
};

interface PersonalizedLearningContentProps {
  setOpen: (open: boolean) => void;
}

export default function PersonalizedLearningContent({ setOpen }: PersonalizedLearningContentProps) {
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
    <>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Analyzing...</span>
        </div>
      ) : recommendation && recommendedModuleDetails ? (
        <div className="text-sm">
          <h3 className="font-semibold text-foreground">{recommendedModuleDetails.title}</h3>
          <p className="mt-1 text-muted-foreground text-xs leading-snug">{recommendation.reasoning}</p>
          <Button asChild size="sm" className="mt-3 w-full" onClick={() => setOpen(false)}>
            <Link href={`/dashboard/learn/${recommendation.recommendedModule}`}>Start Learning</Link>
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Could not generate a recommendation.</p>
      )}
    </>
  );
}
