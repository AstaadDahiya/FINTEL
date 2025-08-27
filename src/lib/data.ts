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
    slug: 'stock-market-basics',
    title: 'Stock Market Basics',
    description: 'Grasp the fundamentals of the stock market, from what stocks are to how they are traded.',
    content: [
      {
        title: 'What is a Stock?',
        text: 'A stock (also known as equity) represents a share of ownership in a company. When you purchase a stock, you become a part-owner of that corporation, entitling you to a portion of its assets and profits. The value of your stock will fluctuate based on the company\'s performance and overall market sentiment.',
      },
      {
        title: 'How are Stocks Traded?',
        text: 'Stocks are traded on exchanges like the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE) in India. These are marketplaces where buyers and sellers come together to trade shares. All trading is done electronically through brokers during specific market hours, typically 9:15 AM to 3:30 PM IST.',
      },
      {
        title: 'Understanding Market Orders and Limit Orders',
        text: 'A "market order" is an instruction to buy or sell a stock at the best available current price. It guarantees execution but not the price. A "limit order" is an instruction to buy or sell a stock at a specific price or better. It gives you control over the price but does not guarantee that the order will be executed.',
      },
       {
        title: 'What are SEBI regulations?',
        text: 'The Securities and Exchange Board of India (SEBI) is the regulator for the securities and commodity market in India. SEBI regulations are designed to protect the interests of investors in securities and to promote the development of, and to regulate the securities market. Key regulations cover insider trading, takeovers, and mutual funds.',
      }
    ],
    quiz: [
      {
        question: 'What does owning a stock signify?',
        options: ['You have loaned money to the company', 'You are a part-owner of the company', 'You are employed by the company', 'You are a creditor of the company'],
        correctAnswer: 'You are a part-owner of the company',
        explanation: 'Owning a stock, or equity, means you hold a piece of ownership in the company and have a claim on its assets and earnings.',
      },
      {
        question: 'What is the primary difference between a market order and a limit order?',
        options: ['Market orders are for buying, limit orders are for selling', 'Market orders guarantee a price, limit orders guarantee execution', 'Market orders guarantee execution, limit orders guarantee a price', 'There is no difference'],
        correctAnswer: 'Market orders guarantee execution, limit orders guarantee a price',
        explanation: 'A market order executes immediately at the current market price, while a limit order only executes if the stock reaches your specified price or better.',
      },
       {
        question: 'What is the main purpose of SEBI?',
        options: ['To maximize profits for companies', 'To regulate the securities market and protect investors', 'To provide stock recommendations', 'To manage the national budget'],
        correctAnswer: 'To regulate the securities market and protect investors',
        explanation: 'SEBI\'s primary role is to ensure the Indian securities market is fair, transparent, and efficient, and to protect the interests of investors.',
      }
    ],
  },
   {
    slug: 'risk-assessment-techniques',
    title: 'Risk Assessment Techniques',
    description: 'Learn how investors use data to measure and understand investment risk.',
    content: [
      {
        title: 'What is Investment Risk?',
        text: 'Investment risk is the probability or likelihood of incurring losses relative to the expected return on any particular investment. In simple terms, it is a measure of the level of uncertainty of achieving the returns as per the expectations. This simulation uses delayed data, which is perfect for learning these concepts without real-world financial risk.',
      },
      {
        title: 'Beta: Measuring Volatility',
        text: 'Beta measures a stock\'s volatility in relation to the overall market. A beta greater than 1 indicates the stock is more volatile than the market, while a beta less than 1 means it is less volatile. A beta of 1 means the stock moves in line with the market. For example, a stock with a beta of 1.2 is theoretically 20% more volatile than the market.',
      },
      {
        title: 'Standard Deviation: Gauging Price Fluctuation',
        text: 'Standard deviation is a statistical measure of the dispersion of a security\'s returns. A high standard deviation indicates that the stock\'s price has fluctuated significantly, suggesting higher volatility and risk. A low standard deviation implies the price has been more stable.',
      },
      {
        title: 'Value at Risk (VaR)',
        text: 'Value at Risk (VaR) is a statistic that quantifies the extent of possible financial losses within a firm, portfolio, or position over a specific time frame. For example, a VaR of 1 lakh at 5% probability means there is a 5% chance that the portfolio could lose more than 1 lakh in a given day.',
      },
    ],
    quiz: [
      {
        question: 'A stock with a beta of 0.8 is expected to be:',
        options: ['80% more volatile than the market', 'As volatile as the market', '20% less volatile than the market', 'Completely risk-free'],
        correctAnswer: '20% less volatile than the market',
        explanation: 'A beta below 1 indicates that the stock is theoretically less volatile than the overall market. A beta of 0.8 suggests it moves 20% less than the market.',
      },
      {
        question: 'What does a high standard deviation for a stock imply?',
        options: ['The stock is guaranteed to go up', 'The stock price is very stable', 'The stock has experienced wide price swings and is more volatile', 'The stock is a market leader'],
        correctAnswer: 'The stock has experienced wide price swings and is more volatile',
        explanation: 'Standard deviation measures the historical volatility of a stock. A higher value means the price has been less consistent, indicating higher risk.',
      },
       {
        question: 'What does a 5% VaR of 10,000 INR mean?',
        options: ['You will lose exactly 10,000 INR', 'You have a 5% chance of losing more than 10,000 INR', 'You will gain 10,000 INR', 'You have a 95% chance of losing 10,000 INR'],
        correctAnswer: 'You have a 5% chance of losing more than 10,000 INR',
        explanation: 'VaR measures potential loss. A 5% VaR of 10,000 INR indicates the statistical probability of losing more than that amount is 5% over the specified timeframe.',
      }
    ],
  },
    {
    slug: 'algorithmic-trading-hft',
    title: 'Algorithmic Trading & HFT',
    description: 'A high-level overview of automated and high-frequency trading.',
    content: [
      {
        title: 'What is Algorithmic Trading?',
        text: 'Algorithmic trading (or "algo trading") uses computer programs to execute trades based on a predefined set of rules. These rules can be based on timing, price, quantity, or any mathematical model. It allows for trades to be executed at a speed and frequency that is impossible for a human trader.',
      },
      {
        title: 'High-Frequency Trading (HFT)',
        text: 'High-Frequency Trading is a type of algorithmic trading characterized by extremely high speeds, high turnover rates, and high order-to-trade ratios. HFT firms use powerful computers and complex algorithms to analyze markets and execute a large number of orders in fractions of a second.',
      },
      {
        title: 'Pros and Cons of Algo Trading',
        text: 'Pros include increased market liquidity, faster trade execution, and the removal of human emotion from trading decisions. Cons include the potential for large-scale errors if an algorithm is flawed, creating "flash crashes," and the high cost of technology, which creates a high barrier to entry.',
      },
       {
        title: 'Impact on Indian Markets',
        text: 'In India, algorithmic trading accounts for a significant portion of the total orders placed on the exchanges. SEBI has specific regulations in place to prevent market manipulation and reduce systemic risks associated with high-speed, automated trading systems.',
      },
    ],
    quiz: [
      {
        question: 'What is the primary function of algorithmic trading?',
        options: ['To rely on human intuition for trades', 'To execute trades based on a computer program\'s predefined rules', 'To manually place a few large trades per day', 'To predict the market with 100% accuracy'],
        correctAnswer: 'To execute trades based on a computer program\'s predefined rules',
        explanation: 'Algo trading automates the execution of trading strategies by using computer programs to enter orders based on a set of instructions.',
      },
      {
        question: 'What is a major advantage of algorithmic trading?',
        options: ['It guarantees profits', 'It adds a human touch to trading', 'It can execute trades at very high speeds and remove emotion', 'It is very simple and requires no setup'],
        correctAnswer: 'It can execute trades at very high speeds and remove emotion',
        explanation: 'One of the key benefits of algo trading is its ability to process information and execute trades far faster than any human, while also sticking strictly to its programmed logic without emotional bias.',
      },
       {
        question: 'What characterizes High-Frequency Trading (HFT)?',
        options: ['Slow, long-term investments', 'A small number of large trades', 'Extremely high speed and high volume of trades', 'A focus on fundamental analysis'],
        correctAnswer: 'Extremely high speed and high volume of trades',
        explanation: 'HFT is a subset of algorithmic trading that involves executing a very large number of orders at extremely high speeds, often in microseconds.',
      }
    ],
  },
  {
    slug: 'portfolio-diversification',
    title: 'Portfolio Diversification',
    description: 'Learn the importance of spreading investments to reduce risk.',
    content: [
      {
        title: 'The "Don\'t Put All Your Eggs in One Basket" Principle',
        text: 'Portfolio diversification is a risk management strategy that involves investing in a variety of assets. The goal is that if one investment performs poorly, the impact on your overall portfolio will be minimized, as other assets may perform better. Using delayed data in a simulator is a great way to practice this.',
      },
      {
        title: 'Asset Correlation',
        text: 'Correlation measures how two securities move in relation to each other. A well-diversified portfolio includes assets with low or negative correlation. For example, when stocks go down, bonds might go up (negative correlation). Investing in both can help stabilize your portfolio\'s value.',
      },
      {
        title: 'Methods of Diversification',
        text: 'You can diversify across different asset classes (stocks, bonds, commodities), across different sectors (e.g., technology, healthcare, finance), and across different geographies (domestic and international stocks). Exchange-Traded Funds (ETFs) are an excellent tool for achieving instant diversification.',
      },
      {
        title: 'Rebalancing Your Portfolio',
        text: 'Rebalancing is the process of realigning the weightings of a portfolio of assets. Rebalancing involves periodically buying or selling assets in a portfolio to maintain an original or desired level of asset allocation or risk. For instance, if stocks have performed well, their weighting in your portfolio might increase, so you would sell some stocks to bring the allocation back in line.',
      }
    ],
    quiz: [
      {
        question: 'What is the main goal of portfolio diversification?',
        options: ['To maximize profits by concentrating on one stock', 'To reduce overall portfolio risk', 'To make trading more complicated', 'To guarantee that no investment will lose money'],
        correctAnswer: 'To reduce overall portfolio risk',
        explanation: 'By spreading investments across various assets, diversification aims to smooth out unsystematic risk events in a portfolio so that the positive performance of some investments neutralizes the negative performance of others.',
      },
      {
        question: 'For the best diversification, you should look for assets with:',
        options: ['High correlation', 'The same level of risk', 'Low or negative correlation', 'Identical returns'],
        correctAnswer: 'Low or negative correlation',
        explanation: 'Assets that are not highly correlated are less likely to move in the same direction at the same time, which is the key to effective risk reduction through diversification.',
      },
       {
        question: 'What is portfolio rebalancing?',
        options: ['Selling all your investments', 'Buying more of your best-performing asset', 'Periodically adjusting your portfolio to its original asset allocation', 'Only investing once a year'],
        correctAnswer: 'Periodically adjusting your portfolio to its original asset allocation',
        explanation: 'Rebalancing is crucial for maintaining your desired risk level and ensuring your portfolio does not become over-concentrated in one area.',
      }
    ],
  },
  {
    slug: 'technical-analysis',
    title: 'Technical Analysis',
    description: 'Learn to analyze statistical trends from trading activity, such as price movement and volume.',
    content: [
      {
        title: 'Introduction to Technical Analysis',
        text: 'Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume. Unlike fundamental analysts who attempt to evaluate a security\'s intrinsic value, technical analysts focus on patterns of price movements, trading signals and various other analytical charting tools to evaluate a security\'s strength or weakness.',
      },
      {
        title: 'Support and Resistance',
        text: 'Support and resistance are two of the most basic and important concepts in technical analysis. Support is the price level at which demand is thought to be strong enough to prevent the price from falling further. Resistance is the price level at which selling is thought to be strong enough to prevent the price from rising further. These levels are key because they represent the points where the psychological battle between buyers (bulls) and sellers (bears) is most intense.',
      },
      {
        title: 'Moving Averages',
        text: 'A moving average is a widely used indicator in technical analysis that helps smooth out price action by filtering out the "noise" from random short-term price fluctuations. It is a trend-following, or lagging, indicator because it is based on past prices. The two basic and commonly used moving averages are the simple moving average (SMA) and the exponential moving average (EMA).',
      },
    ],
    quiz: [
      {
        question: 'What is the primary focus of technical analysis?',
        options: ['A company\'s financial health', 'The intrinsic value of a stock', 'Price patterns and trading volume', 'The global economic outlook'],
        correctAnswer: 'Price patterns and trading volume',
        explanation: 'Technical analysis is based on the idea that all relevant information is already reflected in a stock\'s price and trading volume, which can be analyzed to predict future movements.',
      },
      {
        question: 'What does a "resistance" level indicate?',
        options: ['A price level where buying is expected to be strong', 'A price level where selling is expected to be strong', 'The lowest price a stock has ever reached', 'The ideal price to buy a stock'],
        correctAnswer: 'A price level where selling is expected to be strong',
        explanation: 'Resistance is a price ceiling where selling pressure is expected to be strong enough to prevent the price from rising further.',
      },
    ],
  },
  {
    slug: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    description: 'Dive into the method of measuring a security’s intrinsic value by examining related economic and financial factors.',
    content: [
      {
        title: 'What is Fundamental Analysis?',
        text: 'Fundamental analysis is a method of evaluating a security in an attempt to measure its intrinsic value, by examining related economic, financial, and other qualitative and quantitative factors. The end goal is to produce a quantitative value that an investor can compare with a security\'s current price, thus indicating whether the security is undervalued or overvalued.',
      },
      {
        title: 'Key Metrics: P/E Ratio and EPS',
        text: 'The Price-to-Earnings (P/E) ratio is a key metric for valuation, calculated as the stock price per share divided by the annual earnings per share (EPS). A high P/E could mean that a stock\'s price is high relative to earnings and possibly overvalued. Earnings Per Share (EPS) is the portion of a company\'s profit allocated to each outstanding share of common stock, serving as an indicator of a company\'s profitability.',
      },
      {
        title: 'Reading a Balance Sheet',
        text: 'A balance sheet is a financial statement that reports a company\'s assets, liabilities, and shareholder equity at a specific point in time. It provides a snapshot of what a company owns and owes, as well as the amount invested by shareholders. The fundamental accounting equation is: Assets = Liabilities + Shareholder Equity.',
      },
    ],
    quiz: [
      {
        question: 'What is the main goal of fundamental analysis?',
        options: ['To identify short-term chart patterns', 'To determine a security\'s intrinsic value', 'To follow market trends blindly', 'To trade as frequently as possible'],
        correctAnswer: 'To determine a security\'s intrinsic value',
        explanation: 'Fundamental analysis focuses on determining if a stock is fairly valued, overvalued, or undervalued by analyzing the company\'s financial health and economic conditions.',
      },
      {
        question: 'A high P/E ratio might suggest that a stock is:',
        options: ['Undervalued', 'Fairly valued', 'Overvalued', 'A risk-free investment'],
        correctAnswer: 'Overvalued',
        explanation: 'A high P/E ratio often indicates that investors are expecting higher earnings growth in the future compared to the overall market, but it can also suggest that the stock is overvalued.',
      },
    ],
  },
  {
    slug: 'advanced-options-trading',
    title: 'Advanced Options Trading',
    description: 'Explore complex strategies for options trading, including spreads and combinations.',
    content: [
      {
        title: 'What are Options?',
        text: 'Options are financial instruments that are derivatives based on the value of underlying securities such as stocks. An options contract offers the buyer the opportunity to buy or sell—depending on the type of contract they hold—the underlying asset. Unlike futures, the holder is not required to buy or sell the asset if they decide against it.',
      },
      {
        title: 'Calls and Puts',
        text: 'A "call" option gives the holder the right to buy an asset at a stated price within a specific timeframe. A "put" option gives the holder the right to sell an asset at a stated price within a specific timeframe. You buy calls when you are bullish on a stock and buy puts when you are bearish.',
      },
      {
        title: 'Understanding Spreads',
        text: 'An options spread is a strategy that involves buying and selling multiple options on the same underlying asset. This is done to reduce risk, but it also caps the potential profit. A common example is a "bull call spread," where you buy a call option at a certain strike price and simultaneously sell a call option with a higher strike price but the same expiration date.',
      },
    ],
    quiz: [
      {
        question: 'When would an investor typically buy a call option?',
        options: ['When they expect the stock price to fall', 'When they expect the stock price to rise', 'When they expect the stock price to stay flat', 'When they want to short a stock'],
        correctAnswer: 'When they expect the stock price to rise',
        explanation: 'A call option grants the right to buy a stock at a specific price, so it becomes profitable if the stock\'s market price rises above that strike price.',
      },
      {
        question: 'What is the primary purpose of an options spread strategy?',
        options: ['To maximize potential profit', 'To simplify the trading process', 'To reduce the cost and risk of an options position', 'To hold an option for a longer time'],
        correctAnswer: 'To reduce the cost and risk of an options position',
        explanation: 'By simultaneously buying and selling options, spreads can lower the net cost and define the maximum possible loss, which is a key risk management technique.',
      },
    ],
  },
];

export const getModuleBySlug = (slug: string): LearningModule | undefined => {
  return learningModules.find(module => module.slug === slug);
};
