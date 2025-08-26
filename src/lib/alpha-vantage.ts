'use server';

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    data: { date: string, price: number }[];
}

const API_KEYS = (process.env.ALPHA_VANTAGE_API_KEYS || '').split(',').filter(Boolean);
let currentKeyIndex = 0;

const getApiKey = () => {
    if (API_KEYS.length === 0) {
        console.error("No Alpha Vantage API keys found in .env file (ALPHA_VANTAGE_API_KEYS)");
        return null;
    }
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

const BASE_URL = 'https://www.alphavantage.co/query';

// Simple in-memory cache with expiration
const cache = new Map<string, { data: StockData, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchStockData(ticker: string): Promise<StockData | null> {
    const now = Date.now();
    const cachedItem = cache.get(ticker);

    if (cachedItem && (now - cachedItem.timestamp) < CACHE_DURATION) {
        return cachedItem.data;
    }

    try {
        const apiKey = getApiKey();
        if (!apiKey) return null;

        const quotePromise = fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`);
        const timeSeriesPromise = fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`);

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
            if (quoteData.Note || timeSeriesData.Note) {
                console.warn(`Alpha Vantage API limit likely reached for ticker: ${ticker}`);
                if (cachedItem) return cachedItem.data;
                return null;
            }
            console.warn(`No data found for ticker: ${ticker}`, { quoteData, timeSeriesData });
            return null;
        }

        const formattedData = Object.entries(dailySeries)
            .map(([date, values]: [string, any]) => ({
                date,
                price: parseFloat(values['4. close']),
            }))
            .reverse()
            .slice(-30);

        const stockInfo: StockData = {
            symbol: globalQuote['01. symbol'],
            name: "Unknown", 
            price: parseFloat(globalQuote['05. price']),
            change: parseFloat(globalQuote['09. change']),
            changePercent: parseFloat(globalQuote['10. change percent'].replace('%', '')),
            data: formattedData,
        };

        try {
            const overviewRes = await fetch(`${BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`);
            if (overviewRes.ok) {
                const overviewData = await overviewRes.json();
                if (overviewData.Name) {
                    stockInfo.name = overviewData.Name;
                }
            }
        } catch (nameError) {
            console.error("Could not fetch company name", nameError);
        }
        
        cache.set(ticker, { data: stockInfo, timestamp: now });
        return stockInfo;

    } catch (error) {
        console.error(`Error fetching stock data for ${ticker}:`, error);
        return null;
    }
}
