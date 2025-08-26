import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import StockChart from "@/components/simulator/StockChart";
import { Label } from "@/components/ui/label";

export default function SimulatorPage() {
    const mockStockData = [
      { date: 'Jan 23', price: 150 },
      { date: 'Feb 23', price: 155 },
      { date: 'Mar 23', price: 160 },
      { date: 'Apr 23', price: 162 },
      { date: 'May 23', price: 170 },
      { date: 'Jun 23', price: 180 },
      { date: 'Jul 23', price: 190 },
      { date: 'Aug 23', price: 185 },
      { date: 'Sep 23', price: 175 },
      { date: 'Oct 23', price: 168 },
      { date: 'Nov 23', price: 188 },
      { date: 'Dec 23', price: 195 },
    ];

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Trading Simulator</h1>
            <p className="text-muted-foreground">Practice trading with delayed real-world market data, risk-free.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl">Apple Inc. (AAPL)</CardTitle>
                                <p className="text-3xl font-bold mt-1">$195.71 <span className="text-sm font-medium text-emerald-600">+2.14 (1.10%)</span></p>
                            </div>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search stocks..." className="pl-8" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <StockChart data={mockStockData} />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Trade AAPL</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" placeholder="0" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline">Sell</Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Buy</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
