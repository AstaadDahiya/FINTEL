# FINTEL - Financial Intelligence Application

This is a Next.js starter project for FINTEL, an application designed to help users learn about stock trading, built in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## Running the Application Locally

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your API keys. This file is ignored by Git and should not be committed.
    ```env
    # Get a free key from https://www.alphavantage.co/support/#api-key
    # You can add multiple keys separated by a comma for higher rate limits.
    ALPHA_VANTAGE_API_KEYS=YOUR_ALPHA_VANTAGE_KEY_HERE
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## How to Deploy to Vercel

Deploying your Next.js application to Vercel is a great choice for performance and ease of use.

### Step 1: Push Your Project to a Git Repository

Before deploying, your project needs to be hosted on a Git provider like GitHub, GitLab, or Bitbucket.

1.  Create a new repository on your preferred Git provider.
2.  Initialize a Git repository in your local project folder: `git init`
3.  Add and commit your files: `git add .` and `git commit -m "Initial commit"`
4.  Push your code to the remote repository: `git remote add origin <your-repo-url>` and `git push -u origin main`

### Step 2: Deploy on Vercel

1.  **Sign Up & Log In**: Go to [vercel.com](https://vercel.com) and create an account. Using your GitHub account to sign up is the easiest way.
2.  **Import Project**:
    *   From your Vercel dashboard, click "**Add New...**" > "**Project**".
    *   Connect to your Git account and select the repository for this project.
3.  **Configure Project**: Vercel will automatically detect that you're using Next.js and configure the build settings for you.

### Step 3: Add API Keys (Environment Variables)

This is the most important step for keeping your keys secure. **Never** write your API keys directly in your code.

1.  In the Vercel project configuration screen, expand the "**Environment Variables**" section.
2.  Add your API keys here. For this project, you need `ALPHA_VANTAGE_API_KEYS`.
    *   **Name**: `ALPHA_VANTAGE_API_KEYS`
    *   **Value**: Paste your actual Alpha Vantage API key(s) here.
3.  Click "**Add**" for each variable.
4.  Click the "**Deploy**" button.

Vercel will build and deploy your application. Your app will now have access to the API keys you provided, but they won't be visible in your public source code.
