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
  sentimentAnalysis: z.string().describe('Sentiment analysis of the stock.'),
  sentimentScore: z.number().describe('A sentiment score for the stock, from 0 (very bearish) to 100 (very bullish).'),
  quantitativeAnalysis: z.string().describe('Quantitative analysis of the stock.'),
  forecastReasoning: z.string().describe('Explanation of the forecast reasoning.'),
});
export type AIPoweredInsightsOutput = z.infer<typeof AIPoweredInsightsOutputSchema>;

export async function getAiPoweredInsights(input: AIPoweredInsightsInput): Promise<AIPoweredInsightsOutput> {
  return aiPoweredInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredInsightsPrompt',
  input: {schema: AIPoweredInsightsInputSchema},
  output: {schema: AIPoweredInsightsOutputSchema},
  prompt: `You are an AI assistant providing insights for stock trading.

  Provide a sentiment analysis and quantitative analysis for the stock ticker: {{{ticker}}}.
  Also provide a sentiment score from 0 (very bearish) to 100 (very bullish).
  Explain the forecast reasoning based on these analyses, focusing on transparency so the user understands the rationale behind the forecast.
  Please provide a detailed explanation of forecast reasoning. 
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
