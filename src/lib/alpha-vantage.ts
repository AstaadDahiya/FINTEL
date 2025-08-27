'use server';

import { format, subDays } from 'date-fns';

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    data: { date: string, price: number }[];
}

// --- Indian API Functions ---
const INDIAN_API_BASE_URL = 'https://stock.indianapi.in/api/v1/';
const INDIAN_API_KEY = process.env.INDIAN_API_KEY;

async function fetchIndianStockData(ticker: string): Promise<StockData | null> {
    if (!INDIAN_API_KEY) {
        console.error("Indian API key not found in .env file (INDIAN_API_KEY)");
        return null;
    }
    
    const symbol = ticker.replace(/\.(NS|BSE)$/, '');

    try {
        const today = new Date();
        const fromDate = format(subDays(today, 60), 'yyyy-MM-dd');
        const toDate = format(today, 'yyyy-MM-dd');
        
        const quotePromise = fetch(`${INDIAN_API_BASE_URL}get_stock_quote?api_key=${INDIAN_API_KEY}&symbol=${symbol}`);
        const historicalPromise = fetch(`${INDIAN_API_BASE_URL}get_daily_historical_data?api_key=${INDIAN_API_KEY}&symbol=${symbol}&from_date=${fromDate}&to_date=${toDate}`);

        const [quoteRes, historicalRes] = await Promise.all([quotePromise, historicalPromise]);

        if (!quoteRes.ok || !historicalRes.ok) {
            console.error(`Indian API request failed for ${ticker}`, { quoteStatus: quoteRes.status, historicalStatus: historicalRes.status });
            return null;
        }

        const quoteJson = await quoteRes.json();
        const historicalJson = await historicalRes.json();
        
        if (!quoteJson.success || !historicalJson.success || !quoteJson.data || !historicalJson.data) {
             console.warn(`No data found for Indian ticker: ${ticker}`, { quoteJson, historicalJson });
            return null;
        }
        
        const quoteData = quoteJson.data;
        const historicalData = historicalJson.data;

        const formattedData = historicalData.map((item: any) => ({
            date: format(new Date(item.date), 'yyyy-MM-dd'),
            price: parseFloat(item.close),
        })).reverse();
        
        const price = parseFloat(quoteData.current_price);
        const prevClose = parseFloat(quoteData.previous_close);
        const change = price - prevClose;
        const changePercent = (change / prevClose) * 100;
        
        const stockInfo: StockData = {
            symbol: ticker,
            name: quoteData.company_name,
            price,
            change,
            changePercent,
            data: formattedData,
        };

        return stockInfo;

    } catch (error) {
        console.error(`Error fetching Indian stock data for ${ticker}:`, error);
        return null;
    }
}


// --- Alpha Vantage API Functions ---
const ALPHA_VANTAGE_API_KEYS = (process.env.ALPHA_VANTAGE_API_KEYS || '').split(',').filter(Boolean);
let currentKeyIndex = 0;

const getAlphaVantageApiKey = () => {
    if (ALPHA_VANTAGE_API_KEYS.length === 0) {
        console.warn("No Alpha Vantage API keys found in .env file (ALPHA_VANTAGE_API_KEYS). Some functionalities might be limited.");
        return null;
    }
    const key = ALPHA_VANTAGE_API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % ALPHA_VANTAGE_API_KEYS.length;
    return key;
}

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

async function fetchAlphaVantageStockData(ticker: string): Promise<StockData | null> {
    try {
        const apiKey = getAlphaVantageApiKey();
        if (!apiKey) return null;

        const quotePromise = fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`);
        const timeSeriesPromise = fetch(`${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`);

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
            const overviewRes = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`);
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
        console.error(`Error fetching Alpha Vantage stock data for ${ticker}:`, error);
        return null;
    }
}


// --- Main Fetch Function ---
const cache = new Map<string, { data: StockData, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchStockData(ticker: string): Promise<StockData | null> {
    const now = Date.now();
    const cachedItem = cache.get(ticker);

    if (cachedItem && (now - cachedItem.timestamp) < CACHE_DURATION) {
        return cachedItem.data;
    }

    const isIndianStock = ticker.toUpperCase().endsWith('.NS') || ticker.toUpperCase().endsWith('.BSE');
    
    let stockData: StockData | null = null;
    
    if (isIndianStock) {
        stockData = await fetchIndianStockData(ticker);
    } else {
        stockData = await fetchAlphaVantageStockData(ticker);
    }

    if (stockData) {
        cache.set(ticker, { data: stockData, timestamp: now });
    } else if (cachedItem) {
        // If the API fails, return the cached data if it exists to avoid breaking the UI
        return cachedItem.data;
    }

    return stockData;
}
