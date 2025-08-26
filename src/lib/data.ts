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
    slug: 'introduction-to-stocks',
    title: 'Introduction to Stocks',
    description: 'Understand what stocks are and why companies issue them.',
    content: [
      {
        title: 'What is a Stock?',
        text: 'A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. This entitles the owner of the stock to a proportion of the corporation\'s assets and profits equal to how much stock they own. Units of stock are called "shares."',
      },
      {
        title: 'Why Do Companies Issue Stock?',
        text: 'Companies issue stock to raise capital to grow their business. By selling ownership stakes, they can fund new projects, expand operations, or pay off debt without having to take out loans. For investors, buying stock is a way to potentially grow their wealth.',
      },
      {
        title: 'Types of Stocks',
        text: 'The two main types of stock are common stock and preferred stock. Common stockholders have voting rights, while preferred stockholders generally do not. However, preferred stockholders have a higher claim on assets and earnings, receiving dividends before common stockholders.',
      },
    ],
    quiz: [
      {
        question: 'What does a stock represent?',
        options: ['A loan to a company', 'Ownership in a company', 'A company\'s debt', 'A government bond'],
        correctAnswer: 'Ownership in a company',
        explanation: 'A stock represents a share of ownership in a corporation, entitling you to a portion of its assets and profits.',
      },
      {
        question: 'Why do companies issue stock?',
        options: ['To give away money', 'To reduce their number of owners', 'To raise capital for growth', 'To comply with government regulations'],
        correctAnswer: 'To raise capital for growth',
        explanation: 'Companies sell stock to raise funds for various business activities like expansion, research, and development.',
      },
    ],
  },
  {
    slug: 'what-is-an-etf',
    title: 'What is an ETF?',
    description: 'Learn about Exchange-Traded Funds and their benefits.',
    content: [
      {
        title: 'Defining ETFs',
        text: 'An Exchange-Traded Fund (ETF) is a type of investment fund and exchange-traded product. ETFs are traded on stock exchanges, much like stocks. An ETF holds assets such as stocks, commodities, or bonds and generally operates with an arbitrage mechanism designed to keep it trading close to its net asset value.',
      },
      {
        title: 'Diversification with ETFs',
        text: 'One of the main advantages of ETFs is diversification. Because an ETF can hold many different assets, it allows you to invest in a wide range of companies or sectors with a single purchase, reducing your risk compared to buying individual stocks.',
      },
    ],
    quiz: [
      {
        question: 'What is a key benefit of an ETF?',
        options: ['Guaranteed high returns', 'Diversification', 'Voting rights in all held companies', 'Fixed dividend payments'],
        correctAnswer: 'Diversification',
        explanation: 'ETFs provide instant diversification by holding a basket of different assets, which helps spread out and reduce investment risk.',
      },
    ],
  },
  {
    slug: 'reading-stock-charts',
    title: 'Reading Stock Charts',
    description: 'A beginner\'s guide to understanding stock charts and key indicators.',
    content: [
      {
        title: 'Candlestick Charts',
        text: 'Candlestick charts are a popular way to visualize price movements. Each "candle" shows the open, high, low, and close prices for a specific time period. The color of the candle indicates whether the price went up or down.',
      },
      {
        title: 'Moving Averages',
        text: 'A moving average (MA) is a widely used indicator in technical analysis that helps smooth out price action by filtering out the "noise" from random short-term price fluctuations. It is a trend-following, or lagging, indicator because it is based on past prices.',
      },
    ],
    quiz: [
      {
        question: 'What does a green candlestick typically indicate?',
        options: ['The price closed lower than it opened', 'The price did not change', 'The price closed higher than it opened', 'The stock is about to be delisted'],
        correctAnswer: 'The price closed higher than it opened',
        explanation: 'A green (or white/hollow) candlestick usually means the closing price was higher than the opening price for that period, indicating upward price movement.',
      },
    ],
  },
    {
    slug: "risk-management",
    title: "Risk Management",
    description: "Learn strategies to manage risk in your investment portfolio.",
    content: [
        {
            title: "Understanding Risk",
            text: "Investment risk is the probability of incurring losses relative to the expected return on any particular investment. In simple terms, it's the chance that an investment's actual return will be different than expected."
        },
        {
            title: "Stop-Loss Orders",
            text: "A stop-loss order is an order placed with a broker to buy or sell a specific stock once the stock reaches a certain price. A stop-loss is designed to limit an investor's loss on a security position."
        }
    ],
    quiz: [
        {
            question: "What is the primary purpose of a stop-loss order?",
            options: ["To guarantee a profit", "To limit potential losses", "To buy more shares automatically", "To get market news"],
            correctAnswer: "To limit potential losses",
            explanation: "A stop-loss order is a risk management tool used to automatically sell a stock if it falls to a predetermined price, thereby limiting the investor's loss."
        }
    ]
  },
  {
    slug: "building-a-portfolio",
    title: "Building a Portfolio",
    description: "Steps to build a diversified investment portfolio.",
    content: [
        {
            title: "Asset Allocation",
            text: "Asset allocation is an investment strategy that aims to balance risk and reward by apportioning a portfolio's assets according to an individual's goals, risk tolerance, and investment horizon."
        },
        {
            title: "Rebalancing",
            text: "Rebalancing is the process of realigning the weightings of a portfolio of assets. Rebalancing involves periodically buying or selling assets in a portfolio to maintain an original or desired level of asset allocation or risk."
        }
    ],
    quiz: [
        {
            question: "What is asset allocation?",
            options: ["Picking only one stock", "Balancing risk and reward by dividing investments", "Selling all assets at once", "Predicting the market's future"],
            correctAnswer: "Balancing risk and reward by dividing investments",
            explanation: "Asset allocation involves spreading your investments across various asset classes (like stocks, bonds, and cash) to balance risk and reward based on your personal financial situation."
        }
    ]
  }
];

export const getModuleBySlug = (slug: string) => learningModules.find(module => module.slug === slug);
