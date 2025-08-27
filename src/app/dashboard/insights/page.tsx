
"use client";

import AIInsights from "@/components/simulator/AIInsights";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InsightsPage() {
    const [ticker, setTicker] = useState("RELIANCE.NS");
    const [inputValue, setInputValue] = useState("RELIANCE.NS");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue) {
            setTicker(inputValue.toUpperCase());
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">AI-Powered Insights</h1>
                <p className="text-muted-foreground">Get AI-driven sentiment and quantitative analysis for any stock.</p>
            </div>

            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Analyze a Stock</CardTitle>
                        <CardDescription>Enter a stock ticker to get the latest AI analysis.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                            <div className="relative flex-grow">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="e.g., AAPL, GOOGL"
                                    className="pl-8"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </div>
                            <Button type="submit">Search</Button>
                        </form>
                    </CardContent>
                </Card>

                <AIInsights ticker={ticker} />
            </div>
        </div>
    );
}
