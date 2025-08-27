export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface LearningModule {
  slug: string;
  title: string;
  description: string;
  content: {
    title: string;
    text: string;
  }[];
  quiz: QuizQuestion[];
}

export const learningModules: LearningModule[] = [
  {
    slug: 'introduction-to-indian-stocks',
    title: 'Introduction to Indian Stocks',
    description: 'Understand stocks in the context of the Indian market, regulated by SEBI.',
    content: [
      {
        title: 'What is a Stock?',
        text: 'A stock (also known as equity) is a security that represents ownership in a company. When you buy a stock of a company listed on an Indian exchange like the NSE or BSE, you own a small piece of that company. This entitles you to a portion of its assets and profits.',
      },
      {
        title: 'Why Do Companies Issue Stock?',
        text: 'Companies in India issue stock to raise capital for growth, such as for new projects or to expand operations. By selling ownership stakes on exchanges like the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE), they can raise funds from a wide pool of investors.',
      },
      {
        title: 'The Role of SEBI',
        text: 'The Securities and Exchange Board of India (SEBI) is the regulator for the securities and commodity market in India. Its primary role is to protect the interests of investors in securities and to promote the development of, and to regulate the securities market.',
      },
      {
        title: 'Types of Stocks in India',
        text: 'Stocks are broadly categorized by market capitalization: Large-cap (top 100 companies), Mid-cap (101st to 250th company), and Small-cap (251st company onwards). These classifications help investors gauge the risk and growth potential of a stock.'
      }
    ],
    quiz: [
      {
        question: 'What does a stock represent?',
        options: ['A loan to a company', 'Ownership in a company', 'A company\'s debt', 'A government bond'],
        correctAnswer: 'Ownership in a company',
        explanation: 'A stock represents a share of ownership in a corporation, entitling you to a portion of its assets and profits.',
      },
      {
        question: 'Which body regulates the Indian stock market?',
        options: ['Reserve Bank of India (RBI)', 'Ministry of Finance', 'Securities and Exchange Board of India (SEBI)', 'National Stock Exchange (NSE)'],
        correctAnswer: 'Securities and Exchange Board of India (SEBI)',
        explanation: 'SEBI is the primary regulatory body for the stock market in India, responsible for protecting investors and regulating market activities.',
      },
       {
        question: 'Which of these is a major Indian stock exchange?',
        options: ['NASDAQ', 'London Stock Exchange', 'Bombay Stock Exchange (BSE)', 'Tokyo Stock Exchange'],
        correctAnswer: 'Bombay Stock Exchange (BSE)',
        explanation: 'The Bombay Stock Exchange (BSE) and the National Stock Exchange (NSE) are the two major stock exchanges in India.'
      }
    ],
  },
  {
    slug: 'what-is-an-etf-india',
    title: 'ETFs in India',
    description: 'Learn about Exchange-Traded Funds available on Indian exchanges.',
    content: [
      {
        title: 'Defining ETFs in India',
        text: 'An Exchange-Traded Fund (ETF) is a basket of securities that trades on an exchange, just like a stock. In India, ETFs can track indices like the NIFTY 50 or SENSEX, or they can be based on sectors, commodities like gold, or other assets.',
      },
      {
        title: 'Diversification with ETFs',
        text: 'ETFs are a popular tool for diversification. By buying a single NIFTY 50 ETF unit, you get exposure to the 50 largest companies on the NSE. This is generally less risky than buying shares of just one or two companies. All ETFs must be approved by SEBI.',
      },
      {
        title: 'Gold ETFs vs. Physical Gold',
        text: 'Gold ETFs are units representing physical gold which may be in paper or dematerialized form. One Gold ETF unit is equal to 1 gram of gold and is backed by physical gold of very high purity. They offer a way to invest in gold without the hassle of storage and security.'
      }
    ],
    quiz: [
      {
        question: 'An ETF tracking the NIFTY 50 gives you exposure to what?',
        options: ['50 different commodities', 'The 50 largest companies on the NSE', '50 government bonds', '50 international companies'],
        correctAnswer: 'The 50 largest companies on the NSE',
        explanation: 'A NIFTY 50 ETF is designed to mirror the performance of the NIFTY 50 index, which consists of the 50 largest and most liquid stocks on the National Stock Exchange.',
      },
      {
        question: 'How are ETFs traded?',
        options: ['Directly from the fund house', 'Through a special government portal', 'On a stock exchange like a regular stock', 'Only through financial advisors'],
        correctAnswer: 'On a stock exchange like a regular stock',
        explanation: 'ETFs are listed and traded on stock exchanges (like the NSE and BSE in India) throughout the trading day, just like individual stocks.'
      }
    ],
  },
  {
    slug: 'sebi-and-investor-protection',
    title: 'SEBI and Investor Protection',
    description: 'Understand the role of SEBI in protecting investors.',
    content: [
        {
            title: "What is SEBI?",
            text: "The Securities and Exchange Board of India (SEBI) was established in 1992 as a statutory body to regulate the Indian securities market. Its main objectives are to protect investor interests, promote the development of the securities market, and regulate it."
        },
        {
            title: "How SEBI Protects Investors",
            text: "SEBI protects investors through various measures, including ensuring market transparency, preventing insider trading, and regulating intermediaries like brokers and mutual funds. It also runs investor awareness programs to educate investors about their rights and the risks involved in the market."
        },
        {
            title: "Demat Accounts",
            text: "In India, SEBI mandates that shares must be held in a dematerialized or 'Demat' account. This electronic format reduces the risk of theft, forgery, and damage associated with physical share certificates and makes trading more efficient."
        },
        {
          title: "Circuit Breakers",
          text: "SEBI implements circuit breakers to curb excessive volatility and panic selling in the market. If a major index like the SENSEX or NIFTY falls by a certain percentage (10%, 15%, or 20%), trading is halted for a specific period to allow the market to cool down."
        }
    ],
    quiz: [
        {
            question: "What is the primary role of SEBI?",
            options: ["To set interest rates", "To print currency", "To protect investors and regulate the market", "To directly manage companies"],
            correctAnswer: "To protect investors and regulate the market",
            explanation: "SEBI's main purpose is to safeguard the interests of investors and ensure the healthy development and regulation of the Indian securities market."
        },
        {
            question: "What is a Demat account used for?",
            options: ["Storing physical cash", "Holding shares in an electronic format", "A type of savings account", "Paying taxes"],
            correctAnswer: "Holding shares in an electronic format",
            explanation: "A Demat account holds stocks, bonds, and other securities in a digital, dematerialized form, which is a SEBI requirement for trading."
        },
        {
          question: "What is the purpose of a circuit breaker in the stock market?",
          options: ["To increase trading speed", "To halt trading during major price drops", "To guarantee profits for investors", "To select which stocks can be traded"],
          correctAnswer: "To halt trading during major price drops",
          explanation: "Circuit breakers are a SEBI-mandated tool to temporarily stop trading during periods of extreme market volatility, preventing panic selling."
        }
    ]
  },
  {
    slug: "risk-management-india",
    title: "Risk Management in India",
    description: "Learn SEBI-mandated strategies to manage risk in your portfolio.",
    content: [
        {
            title: "Understanding Risk",
            text: "Investment risk is the probability of incurring losses. SEBI has introduced several frameworks, like the Risk-o-meter for mutual funds, to help investors understand the level of risk in different investment products."
        },
        {
            title: "Stop-Loss Orders",
            text: "A stop-loss order is an order placed with a broker to sell a security when it reaches a certain price. It's a key tool for risk management. In India, exchanges like NSE and BSE support various order types, including stop-loss orders, to help investors limit potential losses."
        },
        {
          title: "Diversification",
          text: "Diversification is the strategy of spreading your investments across various financial instruments, industries, and other categories to reduce risk. The idea is that if one investment performs poorly, the others may offset those losses. Don't put all your eggs in one basket."
        }
    ],
    quiz: [
        {
            question: "What is the 'Risk-o-meter' used for in India?",
            options: ["To measure market volatility", "To indicate the level of risk in a mutual fund scheme", "To calculate potential returns", "To track your portfolio's performance"],
            correctAnswer: "To indicate the level of risk in a mutual fund scheme",
            explanation: "SEBI mandates the Risk-o-meter for mutual funds to provide investors with a simple, visual indication of the risk associated with a particular scheme."
        },
        {
          question: "What does a stop-loss order do?",
          options: ["Guarantees a profit", "Automatically sells a stock if it drops to a specific price", "Prevents a stock from being sold", "Buys a stock when it reaches a low price"],
          correctAnswer: "Automatically sells a stock if it drops to a specific price",
          explanation: "A stop-loss order is a crucial risk management tool that automatically triggers a sale to limit your losses if a stock's price falls to your predetermined level."
        }
    ]
  },
  {
    slug: "building-a-portfolio-india",
    title: "Building a Portfolio in India",
    description: "Steps to build a diversified investment portfolio in the Indian market.",
    content: [
        {
            title: "Asset Allocation",
            text: "Asset allocation means diversifying your investments across different asset classes like equities (stocks), debt (bonds), gold, and real estate to balance risk and reward according to your financial goals and risk tolerance."
        },
        {
            title: "Rebalancing Your Portfolio",
            text: "Rebalancing is the process of realigning the weights of the asset classes in your portfolio. For example, if stocks have performed well and now represent a larger portion of your portfolio than intended, you might sell some stocks and buy other assets to return to your target allocation."
        },
        {
          title: "Consider Your Time Horizon",
          text: "Your investment time horizon is the length of time you expect to hold an investment before you need the money. If you have a longer time horizon (e.g., for retirement), you might be able to take on more risk with equities. For shorter-term goals, less volatile investments like debt funds may be more suitable."
        }
    ],
    quiz: [
        {
            question: "What is the main goal of asset allocation?",
            options: ["To invest in only one asset class", "To balance risk and reward by diversifying", "To guarantee high profits", "To avoid all risk"],
            correctAnswer: "To balance risk and reward by diversifying",
            explanation: "Asset allocation is a strategy to spread your investments across various categories to manage risk while aiming for returns that align with your goals."
        },
        {
          question: "Why is it important to rebalance your portfolio?",
          options: ["To chase the best performing stocks", "To sell all your losing investments", "To maintain your desired asset allocation and risk level", "To avoid paying taxes"],
          correctAnswer: "To maintain your desired asset allocation and risk level",
          explanation: "Rebalancing brings your portfolio back to its original target asset allocation, preventing you from becoming over-exposed to any single asset class."
        }
    ]
  },
  {
    slug: 'fundamental-analysis-india',
    title: 'Fundamental Analysis in India',
    description: 'Learn to evaluate stocks based on their financial health and market position.',
    content: [
      {
        title: 'What is Fundamental Analysis?',
        text: 'Fundamental analysis is a method of evaluating a security in an attempt to measure its intrinsic value, by examining related economic, financial, and other qualitative and quantitative factors. Key metrics include the Price-to-Earnings (P/E) ratio and Price-to-Book (P/B) ratio.',
      },
      {
        title: 'Reading Financial Statements',
        text: 'Analysts use financial statements like the Profit & Loss (P&L) statement and the Balance Sheet to gauge a company\'s health. The P&L shows profitability over a period, while the Balance Sheet provides a snapshot of its assets and liabilities at a single point in time.',
      },
      {
        title: 'Key Ratios to Watch',
        text: 'Besides P/E and P/B, other important ratios include Debt-to-Equity (D/E), which measures a company\'s financial leverage, and Return on Equity (ROE), which indicates how efficiently it generates profits from shareholder investments. These are available in a company\'s quarterly reports.'
      }
    ],
    quiz: [
      {
        question: 'What does a high P/E ratio typically suggest?',
        options: ['The stock is undervalued', 'The company is not profitable', 'Investors expect higher future earnings growth', 'The company has a lot of debt'],
        correctAnswer: 'Investors expect higher future earnings growth',
        explanation: 'A high P/E ratio often indicates that investors are willing to pay a higher price for each unit of current earnings, usually in anticipation of future growth.',
      },
      {
        question: 'Which financial statement shows a company\'s financial position at a specific point in time?',
        options: ['Profit & Loss Statement', 'Cash Flow Statement', 'Balance Sheet', 'Annual Report'],
        correctAnswer: 'Balance Sheet',
        explanation: 'The Balance Sheet provides a snapshot of a company\'s assets, liabilities, and shareholders\' equity at a particular date.',
      },
      {
        question: 'A low Debt-to-Equity (D/E) ratio usually indicates what?',
        options: ['The company relies heavily on debt', 'The company is likely to go bankrupt', 'The company is financed more by equity than debt', 'The company is not growing'],
        correctAnswer: 'The company is financed more by equity than debt',
        explanation: 'A lower D/E ratio indicates lower risk and a more financially stable company that is not heavily burdened by debt payments.'
      }
    ],
  },
  {
    slug: 'technical-analysis-india',
    title: 'Technical Analysis for Beginners',
    description: 'An introduction to using charts and patterns to forecast price movements.',
    content: [
      {
        title: 'Understanding Candlestick Charts',
        text: 'Candlestick charts are a popular tool in technical analysis, showing the high, low, open, and closing prices for a security for a specific period. Patterns like "Doji" or "Engulfing" can signal potential price reversals or continuations.',
      },
      {
        title: 'Key Technical Indicators',
        text: 'Indicators help traders analyze price movements. Moving Averages smooth out price data to identify trend direction. The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements, often used to identify overbought or oversold conditions.',
      },
      {
        title: 'Support and Resistance',
        text: 'Support is a price level where a downtrend can be expected to pause due to a concentration of demand. Resistance is the opposite; it\'s a price level where an uptrend may pause. Identifying these levels is a key part of technical analysis.'
      }
    ],
    quiz: [
      {
        question: 'What is the primary focus of technical analysis?',
        options: ['A company\'s financial health', 'Economic trends', 'Chart patterns and market statistics', 'Management effectiveness'],
        correctAnswer: 'Chart patterns and market statistics',
        explanation: 'Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume.',
      },
      {
        question: 'An RSI reading above 70 typically suggests what?',
        options: ['The stock is undervalued', 'The stock may be overbought', 'A strong downtrend', 'Low trading volume'],
        correctAnswer: 'The stock may be overbought',
        explanation: 'The Relative Strength Index (RSI) is a momentum indicator. A reading of 70 or above is often considered to indicate an overbought or overvalued condition.',
      },
      {
        question: 'What is a "support" level in technical analysis?',
        options: ['The highest price a stock has ever reached', 'A price level where selling pressure is expected to be strong', 'A price level where buying interest may be strong enough to stop a downtrend', 'A government-guaranteed price'],
        correctAnswer: 'A price level where buying interest may be strong enough to stop a downtrend',
        explanation: 'Support is a price point on a chart where a stock is unlikely to fall below, as buying pressure is expected to overcome selling pressure.'
      }
    ],
  },
  {
    slug: 'mutual-funds-india',
    title: 'Investing in Mutual Funds',
    description: 'Discover the world of mutual funds and Systematic Investment Plans (SIPs).',
    content: [
      {
        title: 'What is a Mutual Fund?',
        text: 'A mutual fund is a professionally managed investment fund that pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. In India, all mutual funds are regulated by SEBI.',
      },
      {
        title: 'Systematic Investment Plans (SIPs)',
        text: 'A Systematic Investment Plan (SIP) is a facility offered by mutual funds to investors, allowing them to invest a fixed amount of money at regular intervals. SIPs help in rupee cost averaging and instill a disciplined approach to investing.',
      },
      {
        title: 'AMFI\'s Role',
        text: 'The Association of Mutual Funds in India (AMFI) is dedicated to developing the Indian Mutual Fund Industry on professional, healthy, and ethical lines and to enhance and maintain standards in all areas with a view to protecting and promoting the interests of mutual funds and their unitholders.',
      },
      {
        title: 'Understanding Expense Ratios',
        text: 'The expense ratio is an annual fee that all mutual funds charge their shareholders. It expresses the percentage of assets deducted each fiscal year for fund expenses, including management fees, administrative fees, and marketing and distribution fees. A lower expense ratio is generally better for the investor.'
      }
    ],
    quiz: [
      {
        question: 'What is the main advantage of a Systematic Investment Plan (SIP)?',
        options: ['It guarantees high returns', 'It allows for a single, large investment', 'It promotes disciplined investing and averages out purchase cost', 'It is completely risk-free'],
        correctAnswer: 'It promotes disciplined investing and averages out purchase cost',
        explanation: 'SIPs encourage a regular investing habit and can lower the average cost of your investment over time through rupee cost averaging.',
      },
      {
        question: 'Who regulates Mutual Funds in India?',
        options: ['Association of Mutual Funds in India (AMFI)', 'Reserve Bank of India (RBI)', 'Securities and Exchange Board of India (SEBI)', 'The individual fund houses'],
        correctAnswer: 'Securities and Exchange Board of India (SEBI)',
        explanation: 'While AMFI is an industry association, SEBI is the statutory body that regulates the entire securities market, including mutual funds, to protect investors.',
      },
       {
        question: 'What is an expense ratio in a mutual fund?',
        options: ['The potential return of the fund', 'The annual fee charged to investors for managing the fund', 'The amount of risk the fund takes', 'A tax paid to the government'],
        correctAnswer: 'The annual fee charged to investors for managing the fund',
        explanation: 'The expense ratio is the yearly cost of running a mutual fund, including management fees and other costs, expressed as a percentage of the fund\'s assets.'
      }
    ],
  }
];

export const getModuleBySlug = (slug: string) => {
    // First, try to find by the new slugs
    let module = learningModules.find(module => module.slug === slug);
    if (module) return module;

    // Fallback for old slugs if they exist in user's progress
    const slugMapping: { [key: string]: string } = {
        'introduction-to-stocks': 'introduction-to-indian-stocks',
        'what-is-an-etf': 'what-is-an-etf-india',
        'reading-stock-charts': 'sebi-and-investor-protection', // An example of re-purposing an old slug
        'risk-management': 'risk-management-india',
        'building-a-portfolio': 'building-a-portfolio-india'
    };
    const newSlug = slugMapping[slug];
    return newSlug ? learningModules.find(m => m.slug === newSlug) : undefined;
};
