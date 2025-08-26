"use client"
import { useState, useEffect } from 'react';
import type { LearningModule } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface Props {
  module: LearningModule;
}

type QuizScores = { [moduleSlug: string]: number };
type CompletedModules = string[];

export default function QuizClient({ module }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [quizScores, setQuizScores] = useLocalStorage<QuizScores>('quizScores', {});
  const [completedModules, setCompletedModules] = useLocalStorage<CompletedModules>('completedModules', []);

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

  useEffect(() => {
    if (isQuizFinished) {
      const finalScore = Math.round((score / module.quiz.length) * 100);
      setQuizScores({ ...quizScores, [module.slug]: finalScore });
      if (!completedModules.includes(module.slug)) {
        setCompletedModules([...completedModules, module.slug]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuizFinished]);

  if (isQuizFinished) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
          <CardDescription>You scored:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-primary">{Math.round((score / module.quiz.length) * 100)}%</div>
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
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAnswer;
            
            let stateClass = '';
            if(isAnswerChecked && isCorrect) {
               stateClass = 'border-green-500 bg-green-500/10 text-green-900 dark:text-green-300';
            } else if (isAnswerChecked && isSelected && !isCorrect) {
               stateClass = 'border-red-500 bg-red-500/10 text-red-900 dark:text-red-300';
            }

            return (
              <Label key={index} className={`flex items-center space-x-3 p-4 rounded-md border-2 transition-all ${stateClass} ${!isAnswerChecked ? 'cursor-pointer hover:bg-muted/50' : 'cursor-default'}`}>
                <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
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
  );
}
