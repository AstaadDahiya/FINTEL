
'use server';

/**
 * @fileOverview Provides AI-powered insights combining sentiment and quantitative analysis for trading decisions.
 *
 * - getAiPoweredInsights - A function that retrieves AI-powered insights for a given stock ticker.
 * - AIPoweredInsightsInput - The input type for the getAiPoweredInsights function.
 * - AIPoweredInsightsOutput - The return type for the getAiPoweredInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredInsightsInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
});
export type AIPoweredInsightsInput = z.infer<typeof AIPoweredInsightsInputSchema>;

const AIPoweredInsightsOutputSchema = z.object({
  sentimentAnalysis: z
    .string()
    .describe(
      'Sentiment analysis of the stock based on latest news and social media content.'
    ),
  sentimentScore: z
    .number()
    .describe(
      'A sentiment score for the stock, from 0 (very bearish) to 100 (very bullish), based on news and social media.'
    ),
  quantitativeAnalysis: z
    .string()
    .describe('Quantitative analysis of the stock.'),
  forecastReasoning: z
    .string()
    .describe(
      'Explanation of the forecast reasoning, considering if the stock will go up or down.'
    ),
});
export type AIPoweredInsightsOutput = z.infer<typeof AIPoweredInsightsOutputSchema>;

export async function getAiPoweredInsights(input: AIPoweredInsightsInput): Promise<AIPoweredInsightsOutput> {
  return aiPoweredInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredInsightsPrompt',
  input: {schema: AIPoweredInsightsInputSchema},
  output: {schema: AIPoweredInsightsOutputSchema},
  prompt: `You are an expert financial analyst AI. Your task is to provide AI-powered insights for a given stock ticker.

  For the stock ticker {{{ticker}}}, perform the following:
  1.  **Sentiment Analysis**: Analyze the latest news articles and social media content to determine the current sentiment. Summarize your findings.
  2.  **Sentiment Score**: Based on the sentiment analysis, provide a score from 0 (very bearish) to 100 (very bullish).
  3.  **Quantitative Analysis**: Provide a brief quantitative analysis of the stock's recent performance.
  4.  **Forecast and Reasoning**: Based on all the above information, provide a forecast on whether the stock is likely to go up or down. Explain the reasoning for your forecast in a clear and transparent manner.
  `,
});

const aiPoweredInsightsFlow = ai.defineFlow(
  {
    name: 'aiPoweredInsightsFlow',
    inputSchema: AIPoweredInsightsInputSchema,
    outputSchema: AIPoweredInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
