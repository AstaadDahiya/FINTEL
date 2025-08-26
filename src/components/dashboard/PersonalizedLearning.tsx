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
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analyzing your progress...</span>
        </div>
      ) : recommendation && recommendedModuleDetails ? (
        <div>
          <h3 className="text-lg font-semibold">{recommendedModuleDetails.title}</h3>
          <p className="mt-2 text-muted-foreground">{recommendation.reasoning}</p>
          <Button asChild className="mt-4" onClick={() => setOpen(false)}>
            <Link href={`/dashboard/learn/${recommendation.recommendedModule}`}>Start Learning</Link>
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground">Could not generate a recommendation. Please complete more modules.</p>
      )}
    </>
  );
}
