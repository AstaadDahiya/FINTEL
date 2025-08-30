
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import StockChart from "@/components/simulator/StockChart";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchStockData, StockData } from "@/lib/alpha-vantage";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

type StockSymbol = string;

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
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);

    const portfolioKey = useMemo(() => user ? `portfolio_${user.uid}` : 'portfolio', [user]);
    const tradeHistoryKey = useMemo(() => user ? `tradeHistory_${user.uid}` : 'tradeHistory', [user]);

    const [portfolio, setPortfolio] = useLocalStorage<Portfolio>(portfolioKey, {
        cash: 10000,
        stocks: { "AAPL": 5, "RELIANCE.NS": 10 }
    });
    const [tradeHistory, setTradeHistory] = useLocalStorage<Trade[]>(tradeHistoryKey, []);
    const { toast } = useToast();

    const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [searchInput, setSearchInput] = useState("AAPL");
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [stockCache, setStockCache] = useState<{[key: string]: StockData | null}>({});
    const [apiError, setApiError] = useState<string | null>(null);


    const updatePortfolioStockPrices = useCallback(async (tickersToUpdate: string[]) => {
        if (tickersToUpdate.length === 0) return;

        const updatedCache = { ...stockCache };
        let cacheWasUpdated = false;
        
        const promises = tickersToUpdate.map(async ticker => {
            if (!updatedCache[ticker]) {
                const data = await fetchStockData(ticker);
                if (data && typeof data === 'object' && 'symbol' in data) {
                    updatedCache[ticker.toUpperCase()] = data;
                    cacheWasUpdated = true;
                } else {
                    updatedCache[ticker.toUpperCase()] = null; 
                }
            }
        });

        await Promise.all(promises);

        if (cacheWasUpdated) {
            setStockCache(updatedCache);
        }
    }, [stockCache]);
    
    const executeSearch = useCallback(async (tickerToSearch: string) => {
        if (!tickerToSearch) return;
        const upperCaseTicker = tickerToSearch.toUpperCase();
        setIsSearching(true);
        setApiError(null);
        setSelectedStock(null);

        try {
            const data = await fetchStockData(upperCaseTicker);
            
            if (data === 'rate-limited') {
                const errorMessage = "API rate limit reached. Live data for US stocks may be unavailable. Indian stocks are using mock data.";
                toast({ variant: "destructive", title: "API Limit Reached", description: errorMessage });
                setApiError(errorMessage);
            } else if (data === 'not-found') {
                const errorMessage = `Stock with ticker "${upperCaseTicker}" not found. Please check the symbol (e.g., AAPL for US, RELIANCE.NS for India).`;
                toast({ variant: "destructive", title: "Invalid Ticker", description: errorMessage });
                setApiError(errorMessage);
            } else if (data) {
                setSelectedStock(data);
                setStockCache(prev => ({...prev, [upperCaseTicker]: data}));
            } else {
                 const errorMessage = "An unknown error occurred while fetching stock data.";
                 toast({ variant: "destructive", title: "Error", description: errorMessage });
                 setApiError(errorMessage);
            }
        } catch (error) {
            console.error("Failed to fetch stock data", error);
            const errorMessage = "Could not fetch stock data. Please try again later.";
            toast({ variant: "destructive", title: "API Error", description: errorMessage });
            setApiError(errorMessage);
        } finally {
            setIsSearching(false);
        }
    }, [toast]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        executeSearch(searchInput);
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
    
        const initialize = async () => {
            setLoading(true);
            
            await executeSearch("AAPL");
            
            const portfolioTickers = Object.keys(portfolio.stocks).filter(t => portfolio.stocks[t]! > 0);
            if (portfolioTickers.length > 0) {
                await updatePortfolioStockPrices(portfolioTickers);
            }
            
            setLoading(false);
        };
    
        initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient]);

    const handleTrade = (type: 'Buy' | 'Sell') => {
        if (!selectedStock) return;
        
        let tradeAmount = quantity * selectedStock.price;
        // Assume INR for cash, convert USD stock price to INR for calculation
        if (selectedStock.currency === 'USD') {
            tradeAmount *= 83; // Rough conversion rate
        }
        
        if (type === 'Buy') {
            if (portfolio.cash < tradeAmount) {
                toast({ variant: "destructive", title: "Insufficient Funds", description: "You do not have enough cash to make this purchase." });
                return;
            }
            setPortfolio(prev => ({
                cash: prev.cash - tradeAmount,
                stocks: {
                    ...prev.stocks,
                    [selectedStock.symbol]: (prev.stocks[selectedStock.symbol] || 0) + quantity
                }
            }));
        } else { // Sell
            if ((portfolio.stocks[selectedStock.symbol] || 0) < quantity) {
                toast({ variant: "destructive", title: "Insufficient Shares", description: `You do not own enough shares of ${selectedStock.symbol}.` });
                return;
            }
             setPortfolio(prev => ({
                cash: prev.cash + tradeAmount,
                stocks: {
                    ...prev.stocks,
                    [selectedStock.symbol]: (prev.stocks[selectedStock.symbol] || 0) - quantity
                }
            }));
        }

        const newTrade: Trade = {
            type,
            ticker: selectedStock.symbol,
            quantity,
            price: selectedStock.price,
            date: new Date().toLocaleString()
        };
        setTradeHistory(prev => [newTrade, ...prev]);

        toast({
            title: "Trade Executed",
            description: `Successfully ${type === 'Buy' ? 'bought' : 'sold'} ${quantity} share(s) of ${selectedStock.symbol}.`,
        });
    };
    
    const portfolioValue = useMemo(() => {
        if (!isClient) return 0;
        return Object.entries(portfolio.stocks).reduce((acc, [ticker, qty]) => {
            const stock = stockCache[ticker as StockSymbol];
            if (!stock) return acc;
            
            let value = stock.price * (qty || 0);
            if (stock.currency === 'USD') {
                value *= 83; // Rough conversion
            }
            return acc + value;
        }, 0);
    }, [portfolio.stocks, stockCache, isClient]);

    const totalValue = isClient ? portfolio.cash + portfolioValue : 0;

    if (!isClient) {
        return (
             <div className="flex h-full w-full items-center justify-center p-16">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Trading Simulator</h1>
                <p className="text-muted-foreground">Practice trading with live US market data and mock Indian market data, risk-free.</p>
            </div>
            {apiError && !selectedStock && (
                 <Alert variant="destructive" className="mb-8">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {apiError}
                    </AlertDescription>
                </Alert>
            )}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Card>
                        <CardHeader>
                            {loading || isSearching ? (
                               <div className="flex items-center justify-center h-24">
                                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                               </div>
                            ) : selectedStock ? (
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-2xl">{selectedStock.name} ({selectedStock.symbol})</CardTitle>
                                        <p className={`text-3xl font-bold mt-1 flex items-center gap-2 ${selectedStock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                          {formatCurrency(selectedStock.price, selectedStock.currency)}
                                          <span className="text-sm font-medium flex items-center">
                                            {selectedStock.change >= 0 ? <ArrowUp className="h-4 w-4"/> : <ArrowDown className="h-4 w-4"/>}
                                            {selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                                          </span>
                                        </p>
                                    </div>
                                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-64">
                                      <div className="relative flex-grow">
                                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                          <Input 
                                            type="search" 
                                            placeholder="e.g., AAPL" 
                                            className="pl-8" 
                                            value={searchInput}
                                            onChange={e => setSearchInput(e.target.value)}
                                          />
                                      </div>
                                      <Button type="submit" size="icon" variant="outline" disabled={isSearching}>
                                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : <Search className="h-4 w-4"/>}
                                      </Button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center p-4">
                                    <p className="font-semibold text-destructive">Could not load stock data.</p>
                                    <p className="text-sm text-muted-foreground mb-4">Please try searching for a different ticker.</p>
                                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-sm mx-auto">
                                      <div className="relative flex-grow">
                                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                          <Input 
                                            type="search" 
                                            placeholder="e.g., AAPL, RELIANCE.NS" 
                                            className="pl-8" 
                                            value={searchInput}
                                            onChange={e => setSearchInput(e.target.value)}
                                          />
                                      </div>
                                      <Button type="submit" variant="outline" disabled={isSearching}>
                                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : "Search"}
                                      </Button>
                                    </form>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent>
                             {loading || isSearching ? (
                                <div className="h-[350px] w-full flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : selectedStock ? (
                               <StockChart data={selectedStock.data} currency={selectedStock.currency} />
                            ) : (
                                <div className="h-[350px] w-full flex items-center justify-center bg-muted rounded-md">
                                    <p className="text-muted-foreground">No data to display. Please search for a valid stock ticker.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                           <CardTitle>Key Statistics</CardTitle>
                           <CardDescription>Important data points for {selectedStock?.symbol || '...'}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {loading || isSearching ? (
                                <div className="h-[100px] w-full flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            ) : selectedStock ? (
                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                   <div className="space-y-1">
                                       <p className="text-muted-foreground">Day High</p>
                                       <p className="font-semibold">{formatCurrency(selectedStock.dayHigh, selectedStock.currency) || 'N/A'}</p>
                                   </div>
                                   <div className="space-y-1">
                                       <p className="text-muted-foreground">Day Low</p>
                                       <p className="font-semibold">{formatCurrency(selectedStock.dayLow, selectedStock.currency) || 'N/A'}</p>
                                   </div>
                                   <div className="space-y-1">
                                       <p className="text-muted-foreground">52 Wk High</p>
                                       <p className="font-semibold">{formatCurrency(selectedStock.yearHigh, selectedStock.currency) || 'N/A'}</p>
                                   </div>
                                    <div className="space-y-1">
                                       <p className="text-muted-foreground">52 Wk Low</p>
                                       <p className="font-semibold">{formatCurrency(selectedStock.yearLow, selectedStock.currency) || 'N/A'}</p>
                                   </div>
                               </div>
                            ) : (
                                <div className="h-[100px] w-full flex items-center justify-center bg-muted rounded-md">
                                    <p className="text-muted-foreground">No statistics to display.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <Card>
                         <CardHeader>
                           <div className="flex justify-between items-center">
                             <div>
                               <CardTitle>Portfolio</CardTitle>
                               <CardDescription>Your current holdings and cash balance.</CardDescription>
                             </div>
                             <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total Value</p>
                                <p className="text-2xl font-bold">
                                    {formatCurrency(totalValue, 'INR')}
                                </p>
                             </div>
                           </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="trade">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="trade">Trade</TabsTrigger>
                                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>
                                <TabsContent value="trade">
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="quantity">Quantity</Label>
                                            <Input 
                                            id="quantity" 
                                            type="number" 
                                            placeholder="1"
                                            min="1"
                                            value={quantity} 
                                            onChange={e => setQuantity(parseInt(e.target.value, 10) || 1)}
                                            disabled={!selectedStock || loading}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span>Estimated Cost:</span>
                                            <span className="font-semibold text-foreground">{selectedStock ? formatCurrency(quantity * selectedStock.price, selectedStock.currency) : formatCurrency(0, 'INR')}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button variant="outline" className="text-red-600 border-red-600/50 hover:bg-red-600/10 hover:text-red-700" onClick={() => handleTrade('Sell')} disabled={!selectedStock || loading}>Sell</Button>
                                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => handleTrade('Buy')} disabled={!selectedStock || loading}>Buy</Button>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="portfolio">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Asset</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Qty</TableHead>
                                                <TableHead className="text-right">Value</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Cash</TableCell>
                                                <TableCell>Currency</TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell className="text-right">{formatCurrency(portfolio.cash, 'INR')}</TableCell>
                                            </TableRow>
                                            {Object.entries(portfolio.stocks).map(([ticker, qty]) => {
                                                if (!qty || qty === 0) return null;
                                                const stock = stockCache[ticker as StockSymbol];
                                                const value = stock ? (stock.price * qty) : 0;
                                                return (
                                                    <TableRow key={ticker}>
                                                        <TableCell className="font-medium">{ticker}</TableCell>
                                                        <TableCell>Stock</TableCell>
                                                        <TableCell>{qty}</TableCell>
                                                        <TableCell className="text-right">
                                                            {stock ? formatCurrency(value, stock.currency) : <Loader2 className="h-4 w-4 animate-spin ml-auto" />}
                                                        </TableCell>
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
                                                <TableHead>Ticker</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead className="text-right">Qty</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tradeHistory.slice(0,10).map((trade, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{trade.ticker}</TableCell>
                                                    <TableCell><Badge variant={trade.type === 'Buy' ? 'default' : 'destructive'} className={trade.type === 'Buy' ? 'bg-emerald-600' : 'bg-red-600'}>{trade.type}</Badge></TableCell>
                                                    <TableCell className="text-right">{trade.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                            {tradeHistory.length === 0 && (
                                                 <TableRow>
                                                    <TableCell colSpan={3} className="h-24 text-center">
                                                        No trade history.
                                                    </TableCell>
                                                </TableRow>
                                            )}
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

    