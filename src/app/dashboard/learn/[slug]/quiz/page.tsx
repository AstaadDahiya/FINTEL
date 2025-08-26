
import { getModuleBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import QuizClient from '@/components/learn/QuizClient';
import Link from 'next/link';


export default function QuizPage({ params }: { params: { slug: string } }) {
  const module = getModuleBySlug(params.slug);

  if (!module || !module.quiz) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
            <Link href={`/dashboard/learn/${params.slug}`} className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Module</Link>
            <h1 className="text-4xl font-bold font-headline">Quiz: {module.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">Check your understanding of the key concepts.</p>
        </div>
        <QuizClient module={module} />
    </div>
  );
}
