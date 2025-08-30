
'use server';

import { format } from 'date-fns';

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    data: { date: string, price: number }[];
    dayHigh?: number;
    dayLow?: number;
    yearHigh?: number;
    yearLow?: number;
    currency: 'USD' | 'INR';
}

// --- Mock Indian Stock Data ---
function generateMockHistory(basePrice: number) {
    const data = [];
    let currentValue = basePrice;
    for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const fluctuation = (Math.random() - 0.5) * 0.03; // up to 1.5% change
        currentValue *= (1 + fluctuation);
         if (i === 0) {
            currentValue = basePrice;
        }
        data.push({
            date: format(date, 'yyyy-MM-dd'),
            price: parseFloat(currentValue.toFixed(2)),
        });
    }
    return data;
}

async function fetchIndianStockDataMock(ticker: string): Promise<StockData | null> {
    const mockPrice = parseFloat((Math.random() * (4000 - 500) + 500).toFixed(2));
    const mockPrevClose = mockPrice * (1 + (Math.random() - 0.5) * 0.05);
    const change = mockPrice - mockPrevClose;
    const changePercent = (change / mockPrevClose) * 100;
    
    // Use a hash of the ticker to create a somewhat consistent but random name
    const nameHash = ticker.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mockNames = ['Reliance Industries', 'Tata Consultancy', 'HDFC Bank', 'Infosys Ltd', 'ICICI Bank'];
    
    const mockData: StockData = {
        symbol: ticker,
        name: `${mockNames[nameHash % mockNames.length]} (Mock)`,
        price: mockPrice,
        change: change,
        changePercent: changePercent,
        data: generateMockHistory(mockPrice),
        dayHigh: mockPrice * 1.02,
        dayLow: mockPrice * 0.98,
        yearHigh: mockPrice * 1.5,
        yearLow: mockPrice * 0.8,
        currency: 'INR',
    };
    return Promise.resolve(mockData);
}


// --- Alpha Vantage API Functions ---
const ALPHA_VANTAGE_API_KEYS = (process.env.ALPHA_VANTAGE_API_KEYS || '').split(',').filter(key => key);

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

async function fetchAlphaVantageStockData(ticker: string): Promise<StockData | 'rate-limited' | 'no-key' | null> {
    if (ALPHA_VANTAGE_API_KEYS.length === 0 || !ALPHA_VANTAGE_API_KEYS[0]) {
        console.error("No Alpha Vantage API keys found in .env file (ALPHA_VANTAGE_API_KEYS). Please obtain a free key from https://www.alphavantage.co/support/#api-key");
        return 'no-key';
    }

    for (const apiKey of ALPHA_VANTAGE_API_KEYS) {
        try {
            const quotePromise = fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`);
            const timeSeriesPromise = fetch(`${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&apikey=${apiKey}`);
            const overviewPromise = fetch(`${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`);

            const [quoteRes, timeSeriesRes, overviewRes] = await Promise.all([quotePromise, timeSeriesPromise, overviewPromise]);
            
            if (!quoteRes.ok || !timeSeriesRes.ok || !overviewRes.ok) {
                 console.error(`Alpha Vantage API request failed with key ...${apiKey.slice(-4)}`, { quote: quoteRes.status, series: timeSeriesRes.status, overview: overviewRes.status });
                 continue; // Try next key
            }
            
            const quoteData = await quoteRes.json();
            const timeSeriesData = await timeSeriesRes.json();
            const overviewData = await overviewRes.json();
            
            if (quoteData.Note?.includes('limit') || timeSeriesData.Note?.includes('limit') || overviewData.Note?.includes('limit') || quoteData.Information?.includes('limit')) {
                console.warn(`Alpha Vantage API limit reached for key: ...${apiKey.slice(-4)}. Trying next key.`);
                continue; // This key is rate-limited, try the next one
            }

            const globalQuote = quoteData['Global Quote'];
            
            if (!globalQuote || Object.keys(globalQuote).length === 0) {
                 console.log(`No global quote for ${ticker} with key ...${apiKey.slice(-4)}. Assuming invalid ticker.`);
                 return null; // Return null (not-found) if we get a response but no data
            }
            
            const dailySeries = timeSeriesData['Time Series (Daily)'];

            const formattedData = dailySeries ? Object.entries(dailySeries)
                .map(([date, values]: [string, any]) => ({
                    date,
                    price: parseFloat(values['4. close']),
                }))
                .reverse()
                .slice(-30) : [];

            const stockInfo: StockData = {
                symbol: globalQuote['01. symbol'],
                name: overviewData.Name || globalQuote['01. symbol'], 
                price: parseFloat(globalQuote['05. price']),
                change: parseFloat(globalQuote['09. change']),
                changePercent: parseFloat(globalQuote['10. change percent'].replace('%', '')),
                data: formattedData,
                dayHigh: parseFloat(globalQuote['03. high']),
                dayLow: parseFloat(globalQuote['04. low']),
                yearHigh: parseFloat(overviewData['52WeekHigh']),
                yearLow: parseFloat(overviewData['52WeekLow']),
                currency: 'USD',
            };
            
            return stockInfo; // Success! Return the data.

        } catch (error) {
            console.error(`Error fetching Alpha Vantage stock data for ${ticker} with key ...${apiKey.slice(-4)}:`, error);
            // This is likely a network error, not a key issue. Don't continue, just fail.
            return null; 
        }
    }
    
    // If the loop completes without returning, it means all keys were rate-limited
    console.error(`All ${ALPHA_VANTAGE_API_KEYS.length} Alpha Vantage API keys are rate-limited.`);
    return 'rate-limited';
}


// --- Main Fetch Function ---
const cache = new Map<string, { data: StockData | 'rate-limited' | 'no-key' | null, timestamp: number }>();
const CACHE_DURATION_SUCCESS = 5 * 60 * 1000; // 5 minutes
const CACHE_DURATION_FAILURE = 1 * 60 * 1000; // 1 minute for failures/rate-limits

export async function fetchStockData(ticker: string): Promise<StockData | 'rate-limited' | 'not-found' | 'no-key' | null> {
    const now = Date.now();
    const tickerKey = ticker.toUpperCase();
    const cachedItem = cache.get(tickerKey);

    if (cachedItem && (now - cachedItem.timestamp) < (cachedItem.data ? CACHE_DURATION_SUCCESS : CACHE_DURATION_FAILURE)) {
        if (cachedItem.data === null) return 'not-found';
        return cachedItem.data;
    }

    const isIndianStock = tickerKey.endsWith('.NS') || tickerKey.endsWith('.BSE');
    
    let stockData: StockData | 'rate-limited' | 'no-key' | null = null;
    
    try {
        if (isIndianStock) {
            stockData = await fetchIndianStockDataMock(tickerKey);
        } else {
            stockData = await fetchAlphaVantageStockData(tickerKey);
        }
    } catch (error) {
        console.error(`Failed to fetch data for ${tickerKey}`, error);
        stockData = null; 
    }

    if (stockData === 'rate-limited') {
        cache.set(tickerKey, { data: 'rate-limited', timestamp: now });
        return 'rate-limited';
    }
    
    if (stockData === 'no-key') {
        cache.set(tickerKey, { data: 'no-key', timestamp: now });
        return 'no-key';
    }

    if (stockData) {
        cache.set(tickerKey, { data: stockData, timestamp: now });
        return stockData;
    }
    
    cache.set(tickerKey, { data: null, timestamp: now });
    return 'not-found';
}
