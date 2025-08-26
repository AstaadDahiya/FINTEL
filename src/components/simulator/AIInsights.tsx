"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { getAiPoweredInsights, AIPoweredInsightsOutput } from "@/ai/flows/ai-powered-insights";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircularProgress } from "../ui/circular-progress";

interface AIInsightsProps {
    ticker: string;
}

export default function AIInsights({ ticker }: AIInsightsProps) {
    const [insights, setInsights] = useState<AIPoweredInsightsOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchInsights = async () => {
        setLoading(true);
        setError(null);
        setInsights(null);
        try {
            const result = await getAiPoweredInsights({ ticker });
            setInsights(result);
        } catch (e) {
            setError("Failed to fetch AI insights. Please try again later.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const getSentimentColor = (score: number) => {
        if (score > 66) return "text-emerald-500";
        if (score > 33) return "text-yellow-500";
        return "text-red-500";
    }

    return (
        <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-accent flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI-Powered Insights
                    </CardTitle>
                    <CardDescription>Get an AI analysis for {ticker}</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleFetchInsights} disabled={loading} variant="outline" className="text-accent border-accent hover:bg-accent/20 hover:text-accent">
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
                  </Button>
                </div>
            </CardHeader>
            <CardContent>
                {!insights && !loading && !error && (
                    <div className="text-center text-muted-foreground p-4">Click "Analyze" to get AI-powered insights.</div>
                )}
                {loading && (
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                    </div>
                )}
                {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                {insights && (
                    <div className="space-y-4 text-sm">
                         <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                            <CircularProgress value={insights.sentimentScore} className={getSentimentColor(insights.sentimentScore)} />
                            <div className="flex-1">
                                <h4 className="font-semibold text-accent">Sentiment Analysis</h4>
                                <p className="text-muted-foreground">{insights.sentimentAnalysis}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-accent">Quantitative Analysis</h4>
                            <p className="text-muted-foreground">{insights.quantitativeAnalysis}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-accent">Forecast Reasoning</h4>
                            <p className="text-muted-foreground">{insights.forecastReasoning}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
