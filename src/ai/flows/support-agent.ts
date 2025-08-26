'use server';

/**
 * @fileOverview A help and support AI agent for the FINTEL application.
 *
 * - getSupportResponse - A function that provides a conversational response to user queries.
 * - SupportAgentInput - The input type for the getSupportResponse function.
 * - SupportAgentOutput - The return type for the getSupportResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SupportAgentInputSchema = z.object({
  query: z.string().describe('The user\'s question or message.'),
});
export type SupportAgentInput = z.infer<typeof SupportAgentInputSchema>;

const SupportAgentOutputSchema = z.string().describe("The AI agent's response.");
export type SupportAgentOutput = z.infer<typeof SupportAgentOutputSchema>;

export async function getSupportResponse(
  input: SupportAgentInput
): Promise<SupportAgentOutput> {
  return supportAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supportAgentPrompt',
  input: {schema: SupportAgentInputSchema},
  output: {schema: SupportAgentOutputSchema},
  prompt: `You are a friendly and helpful AI support agent for "FINTEL", an application designed to help users learn about stock trading.

Your goal is to answer user questions about how to use the app. Be concise and clear in your explanations.

Here are the core features of the FINTEL app you should be knowledgeable about:
- **Learning Modules**: Interactive modules covering stock market fundamentals. Users can take quizzes to check their knowledge.
- **Trading Simulator**: A risk-free environment where users can practice trading with virtual money using delayed real-world market data.
- **AI-Powered Insights**: A tool that provides sentiment analysis, quantitative analysis, and a forecast for stocks.
- **User Onboarding**: Users sign up and log in to have a personalized experience.
- **Progress Dashboard**: Shows learning progress and virtual portfolio performance.

When a user asks a question, provide a helpful response based on these features.

User query: {{{query}}}
`,
});

const supportAgentFlow = ai.defineFlow(
  {
    name: 'supportAgentFlow',
    inputSchema: SupportAgentInputSchema,
    outputSchema: SupportAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
