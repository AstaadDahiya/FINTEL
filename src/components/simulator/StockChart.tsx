
"use client"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from '@/lib/utils';
import type { StockData } from '@/lib/alpha-vantage';

interface StockChartProps {
    data: { date: string, price: number }[];
    currency: StockData['currency'];
}

export default function StockChart({ data, currency }: StockChartProps) {
  return (
    <div className="h-[350px] w-full">
        <ChartContainer config={{}} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -10,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 20', 'dataMax + 20']} tickFormatter={(value) => formatCurrency(value, currency, {notation: 'compact'})} />
                    <Tooltip
                        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                        content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number, currency)} />}
                     />
                    <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </RechartsLineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  );
}
