# FINTEL - Invest with Confidence, Learn with Purpose

<p align="center">
  <img src="https://image2url.com/images/1756559873652-b8416d65-7c4a-4d63-b985-7363c190e2c0.png" alt="FINTEL Application Showcase" width="700"/>
</p>

Hey there! Welcome to the FINTEL project repository. FINTEL isn't just another finance app; it's a comprehensive platform designed to empower users on their journey into the world of stock trading. Our mission is to demystify the stock market, making it accessible and understandable for beginners while providing powerful tools for more experienced users. We believe that with the right education and risk-free practice, anyone can learn to invest with confidence.

---

## ✨ Core Features

FINTEL is packed with features that cater to every step of your learning and trading journey.

### 📚 Educational Suite
*   **Interactive Learning Modules:** Dive into curated modules covering everything from the absolute basics of the stock market to advanced topics like portfolio diversification and technical analysis.
*   **Knowledge Quizzes:** After each module, test your understanding with a short quiz to reinforce key concepts and track your progress.
*   **AI-Powered "Next Step":** Not sure what to learn next? Our AI analyzes your progress and quiz scores to recommend the most relevant module to tackle, creating a personalized learning path just for you.

### 📈 Trading & Analysis Tools
*   **Risk-Free Trading Simulator:** Practice your trading strategies with a virtual portfolio and a starting balance of ₹10,000. We use live, real-time data for US stocks (via Alpha Vantage) and realistic mock data for Indian stocks (NSE/BSE).
*   **AI-Powered Insights:** Go beyond the numbers. For any stock, get an AI-generated analysis that includes:
    *   **Sentiment Analysis:** Understand the market mood based on news and social media.
    *   **Quantitative Breakdown:** A simple, AI-driven look at the stock's performance.
    *   **Forecast & Reasoning:** A transparent forecast on whether the stock might go up or down, and why.
*   **Personalized Dashboard:** Your central hub to track your learning progress, average quiz scores, portfolio value, and recent activity at a glance.

### 🤖 Generative AI Tools
*   **Content Summarizer & Translator:** Paste complex financial articles or SEBI documents and let our AI provide a concise, easy-to-understand summary. You can also translate it into various Indian languages like Hindi, Tamil, and Bengali.
*   **AI Support Chatbot:** Have a question about how to use the app? Our friendly AI assistant is available 24/7 to provide instant help and guidance.

### 👤 User Experience
*   **Secure Authentication:** Easy sign-up and login using email/password or Google, powered by Firebase Authentication.
*   **Customizable Profile:** Personalize your account by updating your name, email, and profile picture.
*   **Light & Dark Mode:** Choose your preferred theme for a comfortable viewing experience, day or night.

---

## 🛠️ Tech Stack

FINTEL is built with a modern, robust, and scalable tech stack.

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend & Auth:** [Firebase](https://firebase.google.com/) (Authentication, Storage)
*   **Stock Market Data:** [Alpha Vantage API](https://www.alphavantage.co/)

---

## 🚀 Getting Started

Ready to run the project locally? Follow these simple steps.

### 1. Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/fintel.git
cd fintel
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
This is a crucial step to connect to Firebase and get the live US stock data.

1.  Open the `.env` file in the root of the project.
2.  **Firebase Keys**: Find your Firebase project configuration keys. Go to your Firebase Console, click the gear icon for **Project settings**, and under the **General** tab, scroll down to **Your apps**. Select your web app, and under **Firebase SDK snippet**, choose **Config**. Copy the values into your `.env` file.
3.  **Alpha Vantage Keys**: Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key). Add the key to your `.env` file. You can add multiple keys (separated by a comma) to increase your API request limit.

    Your `.env` file should look like this, with your actual keys filled in:
    ```env
    # .env

    # Alpha Vantage API Keys
    ALPHA_VANTAGE_API_KEYS=YOUR_ALPHA_VANTAGE_KEY_HERE

    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123...
    NEXT_PUBLIC_FIREBASE_APP_ID=1:123...:web:...
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-...
    ```
    > **Note:** The `.gitignore` file is already configured to prevent your `.env` file from being committed to Git.

### 5. Run the Development Server
```bash
npm run dev
```

Your application should now be running on [http://localhost:3000](http://localhost:3000).

---

## ☁️ How to Deploy to Vercel

Deploying your app to Vercel is the perfect way to share it with the world.

### Step 1: Push Your Project to a Git Repository

Before deploying, your project needs to be hosted on a Git provider like GitHub, GitLab, or Bitbucket.

1.  Create a new repository on your preferred Git provider.
2.  Initialize a Git repository in your local project folder: `git init`
3.  Add and commit your files: `git add .` and `git commit -m "Initial commit"`
4.  Push your code to the remote repository: `git remote add origin <your-repo-url>` and `git push -u origin main`

### Step 2: Deploy on Vercel

1.  **Sign Up & Log In**: Go to [vercel.com](https://vercel.com) and create an account. Using your GitHub account is the easiest way.
2.  **Import Project**:
    *   From your Vercel dashboard, click "**Add New...**" > "**Project**".
    *   Connect to your Git account and select the repository for this project.
3.  **Configure Project**: Vercel will automatically detect that you're using Next.js and configure the build settings for you.

### Step 3: Add API Keys (Environment Variables)

This is the most important step for keeping your keys secure. **Never** write your API keys directly in your code.

1.  In the Vercel project configuration screen, expand the "**Environment Variables**" section.
2.  Copy all the key-value pairs from your local `.env` file and add them one by one to Vercel's environment variables. This includes all `NEXT_PUBLIC_FIREBASE_*` keys and your `ALPHA_VANTAGE_API_KEYS`.
3.  Click "**Add**" for each variable.
4.  Click the "**Deploy**" button.

Vercel will build and deploy your application. Your app will now have access to the API keys you provided, but they won't be visible in your public source code.

---

Thanks for checking out FINTEL! If you have any questions or feedback, feel free to open an issue.
