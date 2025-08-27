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
    ],
  },
];

export const getModuleBySlug = (slug: string): LearningModule | undefined => {
  return learningModules.find(module => module.slug === slug);
};