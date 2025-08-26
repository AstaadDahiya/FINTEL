import { learningModules } from "@/lib/data";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LearnPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Learning Modules</h1>
        <p className="text-muted-foreground">Build your financial knowledge from the ground up.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {learningModules.map((module) => (
          <Card key={module.slug} className="flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
               <Image src={`https://picsum.photos/400/200?random=${module.slug}`} data-ai-hint="finance education" alt={module.title} width={400} height={200} className="rounded-md object-cover" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/learn/${module.slug}`}>
                  Start Module <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
