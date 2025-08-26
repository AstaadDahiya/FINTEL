
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import StockChart from "@/components/simulator/StockChart";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockStockData = {
    "AAPL": { name: "Apple Inc.", price: 195.71, change: 2.14, changePercent: 1.10, data: [{ date: 'Jan 23', price: 150 }, { date: 'Feb 23', price: 155 }, { date: 'Mar 23', price: 160 }, { date: 'Apr 23', price: 162 }, { date: 'May 23', price: 170 }, { date: 'Jun 23', price: 180 }, { date: 'Jul 23', price: 190 }, { date: 'Aug 23', price: 185 }, { date: 'Sep 23', price: 175 }, { date: 'Oct 23', price: 168 }, { date: 'Nov 23', price: 188 }, { date: 'Dec 23', price: 195 }] },
    "GOOGL": { name: "Alphabet Inc.", price: 178.22, change: -1.50, changePercent: -0.83, data: [{ date: 'Jan 23', price: 90 }, { date: 'Feb 23', price: 95 }, { date: 'Mar 23', price: 105 }, { date: 'Apr 23', price: 108 }, { date: 'May 23', price: 120 }, { date: 'Jun 23', price: 125 }, { date: 'Jul 23', price: 130 }, { date: 'Aug 23', price: 128 }, { date: 'Sep 23', price: 135 }, { date: 'Oct 23', price: 130 }, { date: 'Nov 23', price: 140 }, { date: 'Dec 23', price: 142 }] },
    "TSLA": { name: "Tesla, Inc.", price: 184.86, change: 3.21, changePercent: 1.77, data: [{ date: 'Jan 23', price: 150 }, { date: 'Feb 23', price: 200 }, { date: 'Mar 23', price: 190 }, { date: 'Apr 23', price: 160 }, { date: 'May 23', price: 180 }, { date: 'Jun 23', price: 250 }, { date: 'Jul 23', price: 280 }, { date: 'Aug 23', price: 240 }, { date: 'Sep 23', price: 260 }, { date: 'Oct 23', price: 220 }, { date: 'Nov 23', price: 240 }, { date: 'Dec 23', price: 250 }] },
    "AMZN": { name: "Amazon.com, Inc.", price: 183.64, change: -0.18, changePercent: -0.10, data: [{ date: 'Jan 23', price: 100 }, { date: 'Feb 23', price: 95 }, { date: 'Mar 23', price: 102 }, { date: 'Apr 23', price: 105 }, { date: 'May 23', price: 120 }, { date: 'Jun 23', price: 130 }, { date: 'Jul 23', price: 135 }, { date: 'Aug 23', price: 138 }, { date: 'Sep 23', price: 128 }, { date: 'Oct 23', price: 120 }, { date: 'Nov 23', price: 145 }, { date: 'Dec 23', price: 150 }] },
};

type StockSymbol = keyof typeof mockStockData;

type Portfolio = {
    cash: number;
    stocks: { [key in StockSymbol]?: number };
}

type Trade = {
    type: 'Buy' | 'Sell';
    ticker: StockSymbol;
    quantity: number;
    price: number;
    date: string;
}

export default function SimulatorPage() {
    const [portfolio, setPortfolio] = useLocalStorage<Portfolio>('portfolio', {
        cash: 10000,
        stocks: { "AAPL": 5 }
    });
    const [tradeHistory, setTradeHistory] = useLocalStorage<Trade[]>('tradeHistory', []);
    const { toast } = useToast();

    const [selectedStock, setSelectedStock] = useState<StockSymbol>("AAPL");
    const [quantity, setQuantity] = useState(1);
    const [searchInput, setSearchInput] = useState("AAPL");

    const stockInfo = mockStockData[selectedStock];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const upperCaseInput = searchInput.toUpperCase() as StockSymbol;
        if (upperCaseInput in mockStockData) {
            setSelectedStock(upperCaseInput);
        } else {
            toast({
                variant: "destructive",
                title: "Invalid Ticker",
                description: `Stock with ticker "${searchInput}" not found.`,
            });
        }
    };

    const handleTrade = (type: 'Buy' | 'Sell') => {
        const tradeAmount = quantity * stockInfo.price;
        
        if (type === 'Buy') {
            if (portfolio.cash < tradeAmount) {
                toast({ variant: "destructive", title: "Insufficient Funds", description: "You do not have enough cash to make this purchase." });
                return;
            }
            setPortfolio(prev => ({
                cash: prev.cash - tradeAmount,
                stocks: {
                    ...prev.stocks,
                    [selectedStock]: (prev.stocks[selectedStock] || 0) + quantity
                }
            }));
        } else { // Sell
            if ((portfolio.stocks[selectedStock] || 0) < quantity) {
                toast({ variant: "destructive", title: "Insufficient Shares", description: `You do not own enough shares of ${selectedStock}.` });
                return;
            }
             setPortfolio(prev => ({
                cash: prev.cash + tradeAmount,
                stocks: {
                    ...prev.stocks,
                    [selectedStock]: (prev.stocks[selectedStock] || 0) - quantity
                }
            }));
        }

        const newTrade: Trade = {
            type,
            ticker: selectedStock,
            quantity,
            price: stockInfo.price,
            date: new Date().toLocaleString()
        };
        setTradeHistory(prev => [newTrade, ...prev]);

        toast({
            title: "Trade Executed",
            description: `Successfully ${type === 'Buy' ? 'bought' : 'sold'} ${quantity} share(s) of ${selectedStock}.`,
        });
    };
    
    const portfolioValue = Object.entries(portfolio.stocks).reduce((acc, [ticker, qty]) => {
        const stockPrice = mockStockData[ticker as StockSymbol]?.price || 0;
        return acc + (stockPrice * (qty || 0));
    }, 0);
    const totalValue = portfolio.cash + portfolioValue;

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
                                    <CardTitle className="text-2xl">{stockInfo.name} ({selectedStock})</CardTitle>
                                    <p className={`text-3xl font-bold mt-1 flex items-center gap-2 ${stockInfo.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                      ${stockInfo.price.toFixed(2)} 
                                      <span className="text-sm font-medium flex items-center">
                                        {stockInfo.change >= 0 ? <ArrowUp className="h-4 w-4"/> : <ArrowDown className="h-4 w-4"/>}
                                        {stockInfo.change.toFixed(2)} ({stockInfo.changePercent.toFixed(2)}%)
                                      </span>
                                    </p>
                                </div>
                                <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-64">
                                  <div className="relative flex-grow">
                                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        type="search" 
                                        placeholder="Search stocks..." 
                                        className="pl-8" 
                                        value={searchInput}
                                        onChange={e => setSearchInput(e.target.value)}
                                      />
                                  </div>
                                  <Button type="submit" size="icon" variant="outline"><Search className="h-4 w-4"/></Button>
                                </form>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <StockChart data={stockInfo.data} />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Trade {selectedStock}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input 
                                  id="quantity" 
                                  type="number" 
                                  placeholder="1"
                                  min="1"
                                  value={quantity} 
                                  onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)}
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Total Cost:</span>
                                <span className="font-semibold text-foreground">${(quantity * stockInfo.price).toFixed(2)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="text-red-600 border-red-600/50 hover:bg-red-600/10 hover:text-red-700" onClick={() => handleTrade('Sell')}>Sell</Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleTrade('Buy')}>Buy</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                           <div className="flex justify-between items-center">
                             <div>
                               <CardTitle>My Portfolio</CardTitle>
                               <CardDescription>Your current holdings and cash balance.</CardDescription>
                             </div>
                             <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total Value</p>
                                <p className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                             </div>
                           </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="history">Trade History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Asset</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Current Value</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Cash</TableCell>
                                                <TableCell>Currency</TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>${portfolio.cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                                            </TableRow>
                                            {Object.entries(portfolio.stocks).map(([ticker, qty]) => {
                                                if (!qty || qty === 0) return null;
                                                const stock = mockStockData[ticker as StockSymbol];
                                                const value = (stock.price * qty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2});
                                                return (
                                                    <TableRow key={ticker}>
                                                        <TableCell className="font-medium">{ticker}</TableCell>
                                                        <TableCell>Stock</TableCell>
                                                        <TableCell>{qty}</TableCell>
                                                        <TableCell>${value}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value="history">
                                     <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Ticker</TableHead>
                                                <TableHead>Quantity</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tradeHistory.map((trade, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{trade.date}</TableCell>
                                                    <TableCell className={trade.type === 'Buy' ? 'text-emerald-600' : 'text-red-600'}>{trade.type}</TableCell>
                                                    <TableCell className="font-medium">{trade.ticker}</TableCell>
                                                    <TableCell>{trade.quantity}</TableCell>
                                                    <TableCell>${trade.price.toFixed(2)}</TableCell>
                                                    <TableCell>${(trade.quantity * trade.price).toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
