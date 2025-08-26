import { getModuleBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learn/QuizClient';

export default function QuizPage({ params }: { params: { slug: string } }) {
  const module = getModuleBySlug(params.slug);

  if (!module || !module.quiz) {
    notFound();
  }

  return (
    <QuizClient module={module} slug={params.slug} />
  );
}
