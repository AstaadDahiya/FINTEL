
"use client";

import { useMemo } from 'react';
import { getModuleBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learn/QuizClient';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/hooks/use-auth';

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];

export default function QuizPage({ params }: { params: { slug: string } }) {
  const { user } = useAuth();
  const module = getModuleBySlug(params.slug);

  const completedModulesKey = useMemo(() => user ? `completedModules_${user.uid}` : 'completedModules', [user]);
  const quizScoresKey = useMemo(() => user ? `quizScores_${user.uid}` : 'quizScores', [user]);

  const [, setQuizScores] = useLocalStorage<QuizScores>(quizScoresKey, {});
  const [, setCompletedModules] = useLocalStorage<CompletedModules>(completedModulesKey, []);

  if (!module || !module.quiz) {
    notFound();
  }

  const handleQuizComplete = (finalScore: number) => {
      setQuizScores(prevScores => ({ ...prevScores, [module.slug]: finalScore }));
      setCompletedModules(prevCompleted => {
        if (!prevCompleted.includes(module.slug)) {
          return [...prevCompleted, module.slug];
        }
        return prevCompleted;
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
            <Link href={`/dashboard/learn/${params.slug}`} className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Module</Link>
            <h1 className="text-4xl font-bold font-headline">Quiz: {module.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">Check your understanding of the key concepts.</p>
        </div>
        <QuizClient module={module} onQuizComplete={handleQuizComplete} />
    </div>
  );
}
