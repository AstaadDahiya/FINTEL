import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, TrendingUp } from "lucide-react";

export default function PortfolioSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Virtual Portfolio</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$12,450.32</div>
        <div className="flex items-center gap-1 text-xs text-emerald-600">
          <ArrowUp className="h-3 w-3" />
          <span>+15.2% all time</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">AAPL</Badge>
          <Badge variant="secondary">GOOGL</Badge>
          <Badge variant="secondary">TSLA</Badge>
          <Badge variant="secondary">VTI</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
