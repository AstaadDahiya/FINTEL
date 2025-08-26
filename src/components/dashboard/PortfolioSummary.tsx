
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, TrendingUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";

const mockStockData = {
    "AAPL": { price: 195.71 },
    "GOOGL": { price: 178.22 },
    "TSLA": { price: 184.86 },
    "AMZN": { price: 183.64 },
    "VTI": { price: 267.89 }
};

type StockSymbol = keyof typeof mockStockData;

type Portfolio = {
    cash: number;
    stocks: { [key in StockSymbol]?: number };
}

export default function PortfolioSummary() {
  const [portfolio] = useLocalStorage<Portfolio>('portfolio', {
    cash: 10000,
    stocks: { "AAPL": 5 }
  });

  const [totalValue, setTotalValue] = useState(10000);
  const [allTimeReturn, setAllTimeReturn] = useState(0);

  useEffect(() => {
    const portfolioValue = Object.entries(portfolio.stocks).reduce((acc, [ticker, qty]) => {
        const stockPrice = mockStockData[ticker as StockSymbol]?.price || 0;
        return acc + (stockPrice * (qty || 0));
    }, 0);
    const currentTotalValue = portfolio.cash + portfolioValue;
    setTotalValue(currentTotalValue);

    const initialValue = 10000;
    const returnPercentage = ((currentTotalValue - initialValue) / initialValue) * 100;
    setAllTimeReturn(returnPercentage);

  }, [portfolio]);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Virtual Portfolio</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        <div className={`flex items-center gap-1 text-xs ${allTimeReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          <ArrowUp className="h-3 w-3" />
          <span>{allTimeReturn.toFixed(2)}% all time</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(portfolio.stocks).map(ticker => {
             if((portfolio.stocks[ticker as StockSymbol] || 0) > 0) {
               return <Badge key={ticker} variant="secondary">{ticker}</Badge>
             }
             return null;
          })}
        </div>
      </CardContent>
    </Card>
  )
}
