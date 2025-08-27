
"use client"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/hooks/use-auth';
import { useMemo } from 'react';

// This is a simplified simulation. In a real app, you'd fetch this historical data from a server.
const generateFakeHistory = (totalValue: number) => {
    const data = [];
    let currentValue = totalValue;
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        // Fluctuate the value by a small random percentage
        const fluctuation = (Math.random() - 0.5) * 0.05; // up to 2.5% change
        currentValue *= (1 + fluctuation);
        if (i === 30) {
             // Make the starting point a bit lower to show growth
            currentValue = totalValue * (0.9 + Math.random() * 0.05);
        }
         if (i === 0) {
            currentValue = totalValue;
        }

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric'}),
            value: currentValue,
        });
    }
    return data;
}

type Portfolio = {
    cash: number;
    stocks: { [key: string]: number };
}

export default function PortfolioChart() {
    const { user } = useAuth();
    const portfolioKey = useMemo(() => user ? `portfolio_${user.uid}` : 'portfolio', [user]);
    const [portfolio] = useLocalStorage<Portfolio>(portfolioKey, {
        cash: 10000,
        stocks: { "RELIANCE.NS": 5 }
    });

    const portfolioValue = Object.entries(portfolio.stocks).reduce((acc, [ticker, qty]) => {
        // This is a simplification and won't be accurate without real-time prices.
        // For the chart, we'll just simulate based on the initial cash value.
        // A real implementation would need a more robust way to calculate historical portfolio value.
        return acc + (150 * (qty || 0)); // Assume an average price for charting
    }, 0);

    const totalValue = portfolio.cash + portfolioValue;
    const chartData = generateFakeHistory(totalValue);

  return (
    <div className="h-[350px] w-full">
        <ChartContainer config={{
            value: {
                label: "Portfolio Value",
                color: "hsl(var(--primary))",
            }
        }} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 10,
                        left: -10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${(value / 1000)}k`} />
                    <Tooltip
                        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                        content={<ChartTooltipContent formatter={(value) => `₹${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />}
                     />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </RechartsLineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  );
}

    