
"use client";

import { getModuleBySlug, LearningModule } from '@/lib/data';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learn/QuizClient';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useMemo, useCallback } from 'react';

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];


export default function QuizPage({ module, slug }: { module: LearningModule | null, slug: string }) {
  const { user } = useAuth();
  
  const completedModulesKey = useMemo(() => user ? `completedModules_${user.uid}` : 'completedModules', [user]);
  const quizScoresKey = useMemo(() => user ? `quizScores_${user.uid}` : 'quizScores', [user]);

  const [, setQuizScores] = useLocalStorage<QuizScores>(quizScoresKey, {});
  const [, setCompletedModules] = useLocalStorage<CompletedModules>(completedModulesKey, []);
  
  const onQuizComplete = useCallback((finalScore: number) => {
      if (!user) return;
      setQuizScores(prevScores => ({ ...prevScores, [slug]: finalScore }));
      setCompletedModules(prevCompleted => {
        if (!prevCompleted.includes(slug)) {
          return [...prevCompleted, slug];
        }
        return prevCompleted;
      });
  }, [user, slug, setQuizScores, setCompletedModules]);


  if (!module || !module.quiz) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
            <Link href={`/dashboard/learn/${slug}`} className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Module</Link>
            <h1 className="text-4xl font-bold font-headline">Quiz: {module.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">Check your understanding of the key concepts.</p>
        </div>
        <QuizClient module={module} onQuizComplete={onQuizComplete} />
    </div>
  );
}

