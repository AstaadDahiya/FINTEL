
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState, useMemo } from "react";
import { fetchStockData, StockData } from "@/lib/alpha-vantage";
import { useAuth } from "@/hooks/use-auth";


type StockSymbol = string;

type Portfolio = {
    cash: number;
    stocks: { [key in StockSymbol]?: number };
}

export default function PortfolioSummary() {
  const { user } = useAuth();
  const portfolioKey = useMemo(() => user ? `portfolio_${user.uid}` : 'portfolio', [user]);
  const [portfolio] = useLocalStorage<Portfolio>(portfolioKey, {
    cash: 10000,
    stocks: { "AAPL": 5 }
  });
  
  const [stockCache, setStockCache] = useState<{[key: string]: StockData}>({});
  const [totalValue, setTotalValue] = useState(10000);
  const [allTimeReturn, setAllTimeReturn] = useState(0);

  useEffect(() => {
    const updatePortfolioValues = async () => {
        const tickersToUpdate = Object.keys(portfolio.stocks).filter(ticker => portfolio.stocks[ticker]! > 0);
        if (tickersToUpdate.length === 0) {
            setTotalValue(portfolio.cash);
            const initialValue = 10000;
            const returnPercentage = ((portfolio.cash - initialValue) / initialValue) * 100;
            setAllTimeReturn(returnPercentage);
            return;
        };

        const newCache = { ...stockCache };
        let currentPortfolioValue = 0;

        for (const ticker of tickersToUpdate) {
            if (!newCache[ticker]) {
                const data = await fetchStockData(ticker);
                if (data) {
                    newCache[ticker] = data;
                }
            }
            if(newCache[ticker]) {
                currentPortfolioValue += newCache[ticker].price * (portfolio.stocks[ticker] || 0);
            }
        }

        setStockCache(newCache);
        
        const currentTotalValue = portfolio.cash + currentPortfolioValue;
        setTotalValue(currentTotalValue);

        const initialValue = 10000; // This should ideally be tracked based on deposits.
        const returnPercentage = ((currentTotalValue - initialValue) / initialValue) * 100;
        setAllTimeReturn(returnPercentage);
    };

    updatePortfolioValues();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio]);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Virtual Portfolio Value</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        <div className={`flex items-center gap-1 text-xs ${allTimeReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
           {allTimeReturn >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{allTimeReturn.toFixed(2)}% all time return</span>
        </div>
      </CardContent>
    </Card>
  )
}

    
    