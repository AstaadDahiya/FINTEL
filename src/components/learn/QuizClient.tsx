
"use client"
import { useState, useMemo, useEffect, useCallback } from 'react';
import type { LearningModule } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/hooks/use-auth';

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];

interface Props {
  module: LearningModule;
  slug: string;
}

export default function QuizClient({ module, slug }: Props) {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

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

  const finalScore = useMemo(() => module.quiz.length > 0 ? Math.round((score / module.quiz.length) * 100) : 0, [score, module.quiz.length]);

  useEffect(() => {
    if (isQuizFinished) {
      onQuizComplete(finalScore);
    }
  }, [isQuizFinished, finalScore, onQuizComplete]);


  if (!module.quiz || module.quiz.length === 0) {
      return (
        <Card className="text-center p-6">
            <CardHeader>
                <CardTitle>No Quiz Available</CardTitle>
                <CardDescription>This module does not have a quiz yet.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild><Link href="/dashboard/learn">Explore other modules</Link></Button>
            </CardContent>
        </Card>
      )
  }

  const currentQuestion = module.quiz[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerChecked(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < module.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsQuizFinished(false);
  };


  if (isQuizFinished) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          <CardDescription>You scored:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-primary">{finalScore}%</div>
          <p className="text-muted-foreground mt-2">{score} out of {module.quiz.length} correct</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleRestart} variant="outline"><RefreshCw className="mr-2 h-4 w-4"/> Restart Quiz</Button>
            <Button asChild><Link href="/dashboard/learn">Explore other modules <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestionIndex) / module.quiz.length) * 100;
  
  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
            <Link href={`/dashboard/learn/${slug}`} className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Module</Link>
            <h1 className="text-4xl font-bold font-headline">Quiz: {module.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">Check your understanding of the key concepts.</p>
        </div>
        <Card>
          <CardHeader>
            <Progress value={progress} className="w-full mb-4 h-2" />
            <CardTitle>Question {currentQuestionIndex + 1}/{module.quiz.length}</CardTitle>
            <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer ?? ''}
              onValueChange={(value) => setSelectedAnswer(value)}
              disabled={isAnswerChecked}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => {
                const isCorrect = option === currentQuestion.correctAnswer;
                const isSelected = option === selectedAnswer;
                
                let stateClass = '';
                if(isAnswerChecked && isCorrect) {
                   stateClass = 'border-green-500 bg-green-500/10 text-green-900 dark:text-green-300';
                } else if (isAnswerChecked && isSelected && !isCorrect) {
                   stateClass = 'border-red-500 bg-red-500/10 text-red-900 dark:text-red-300';
                }

                return (
                  <Label key={option} htmlFor={option} className={cn(`flex items-center space-x-3 p-4 rounded-md border-2 transition-all`, stateClass, !isAnswerChecked ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default')}>
                    <RadioGroupItem value={option} id={option} />
                    <span className="flex-1">{option}</span>
                    {isAnswerChecked && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {isAnswerChecked && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                  </Label>
                );
              })}
            </RadioGroup>
            
            {isAnswerChecked && (
              <div className="mt-4 p-4 bg-muted/50 rounded-md border">
                <h4 className="font-semibold text-primary">{selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite.'}</h4>
                <p className="text-muted-foreground mt-1">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              {!isAnswerChecked ? (
                <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>Check Answer</Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < module.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}
