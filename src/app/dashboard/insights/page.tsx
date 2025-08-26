import AIInsights from "@/components/simulator/AIInsights";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function InsightsPage() {
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
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search stocks (e.g., AAPL, GOOGL)..." className="pl-8" />
                        </div>
                    </CardContent>
                </Card>

                <AIInsights ticker="AAPL" />
            </div>
        </div>
    );
}
