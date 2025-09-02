
import { getModuleBySlug, learningModules } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateStaticParams() {
  return learningModules.map((module) => ({
    slug: module.slug,
  }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = getModuleBySlug(params.slug);

  if (!module) {
    notFound();
  }

  return (
    <div>
        <div className="mb-8">
            <Link href="/dashboard/learn" className="text-sm text-primary hover:underline mb-2 block">&larr; Back to Modules</Link>
            <h1 className="text-4xl font-bold font-headline">{module.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{module.description}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Accordion type="single" collapsible defaultValue={module.content.length > 0 ? module.content[0].title : undefined} className="w-full">
                    {module.content.map((item, index) => (
                        <AccordionItem value={item.title} key={index}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline">{item.title}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                                {item.text}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Module Complete?</CardTitle>
                        <CardDescription>Test your knowledge with a short quiz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src={`https://picsum.photos/400/250?random=${module.slug}2`} data-ai-hint="knowledge test" alt="Quiz illustration" width={400} height={250} className="rounded-md" />
                        <Button asChild className="w-full mt-4">
                           <Link href={`/dashboard/learn/${module.slug}/quiz`}>Take the Quiz</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
