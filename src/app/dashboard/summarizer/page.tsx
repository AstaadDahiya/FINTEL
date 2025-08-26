
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, TextSelect, Languages, FileText } from 'lucide-react';
import { processContent, ContentProcessorOutput } from '@/ai/flows/content-processor';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const languages = [
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Malayalam', label: 'Malayalam' },
];

export default function SummarizerPage() {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('Hindi');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ContentProcessorOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await processContent({ text, targetLanguage: language });
            setResult(response);
        } catch (err) {
            console.error("Failed to process content:", err);
            setError("Sorry, something went wrong while processing the content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Content Summarizer</h1>
                <p className="text-muted-foreground">Paste complex financial text to get a simple summary and a translation.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TextSelect className="h-5 w-5" />
                            Input Content
                        </CardTitle>
                        <CardDescription>Paste text from SEBI, NSE, or other financial sites.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Textarea
                                placeholder="Paste your text here..."
                                className="min-h-[250px] text-sm"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                disabled={loading}
                            />
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Select onValueChange={setLanguage} defaultValue={language} disabled={loading}>
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map(lang => (
                                            <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="submit" disabled={loading || !text.trim()} className="w-full sm:w-auto">
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Summarize & Translate
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Languages className="h-5 w-5" />
                            AI Processed Content
                        </CardTitle>
                        <CardDescription>Here is the simplified summary and translation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading && (
                            <div className="flex items-center justify-center p-8 h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {result && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> English Summary</h3>
                                    <p className="text-sm text-muted-foreground bg-background p-4 rounded-md border">{result.summary}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Languages className="h-5 w-5 text-primary" /> Translated Summary ({language})</h3>
                                    <p className="text-sm text-muted-foreground bg-background p-4 rounded-md border">{result.translatedSummary}</p>
                                </div>
                            </div>
                        )}
                         {!loading && !error && !result && (
                            <div className="text-center text-muted-foreground p-8 h-full flex flex-col justify-center items-center">
                                <Languages className="h-12 w-12 mb-4" />
                                <p>Your summary and translation will appear here.</p>
                            </div>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
