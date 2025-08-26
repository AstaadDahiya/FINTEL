
'use server';

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    data: { date: string, price: number }[];
}

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockData(ticker: string): Promise<StockData | null> {
    try {
        const quotePromise = fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`);
        const timeSeriesPromise = fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`);

        const [quoteRes, timeSeriesRes] = await Promise.all([quotePromise, timeSeriesPromise]);

        if (!quoteRes.ok || !timeSeriesRes.ok) {
            console.error("Alpha Vantage API request failed", { status: quoteRes.status, statusText: quoteRes.statusText });
            return null;
        }
        
        const quoteData = await quoteRes.json();
        const timeSeriesData = await timeSeriesRes.json();
        
        const globalQuote = quoteData['Global Quote'];
        const dailySeries = timeSeriesData['Time Series (Daily)'];

        if (!globalQuote || Object.keys(globalQuote).length === 0 || !dailySeries) {
            console.warn(`No data found for ticker: ${ticker}`, { quoteData, timeSeriesData });
            return null;
        }

        const formattedData = Object.entries(dailySeries)
            .map(([date, values]: [string, any]) => ({
                date,
                price: parseFloat(values['4. close']),
            }))
            .reverse()
            .slice(-30); // Get last 30 days for the chart

        const stockInfo: StockData = {
            symbol: globalQuote['01. symbol'],
            name: "Unknown", // AlphaVantage doesn't provide the name in these endpoints
            price: parseFloat(globalQuote['05. price']),
            change: parseFloat(globalQuote['09. change']),
            changePercent: parseFloat(globalQuote['10. change percent'].replace('%', '')),
            data: formattedData,
        };

        // Fetch company name separately
        try {
            const overviewRes = await fetch(`${BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`);
            if (overviewRes.ok) {
                const overviewData = await overviewRes.json();
                if (overviewData.Name) {
                    stockInfo.name = overviewData.Name;
                }
            }
        } catch (nameError) {
            console.error("Could not fetch company name", nameError);
        }
        
        return stockInfo;

    } catch (error) {
        console.error(`Error fetching stock data for ${ticker}:`, error);
        return null;
    }
}
