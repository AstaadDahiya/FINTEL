'use server';

/**
 * @fileOverview An AI agent that summarizes and translates financial text.
 *
 * - processContent - A function that summarizes and translates text.
 * - ContentProcessorInput - The input type for the processContent function.
 * - ContentProcessorOutput - The return type for the processContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentProcessorInputSchema = z.object({
  text: z.string().describe('The text content to be processed.'),
  targetLanguage: z.string().describe('The vernacular language to translate the summary into (e.g., Hindi, Tamil, Bengali).'),
});
export type ContentProcessorInput = z.infer<typeof ContentProcessorInputSchema>;

const ContentProcessorOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the provided text in English."),
  translatedSummary: z.string().describe('The summary translated into the target language.'),
});
export type ContentProcessorOutput = z.infer<typeof ContentProcessorOutputSchema>;

export async function processContent(input: ContentProcessorInput): Promise<ContentProcessorOutput> {
  return contentProcessorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentProcessorPrompt',
  input: {schema: ContentProcessorInputSchema},
  output: {schema: ContentProcessorOutputSchema},
  prompt: `You are an expert financial analyst and linguist. Your task is to process a given text.

First, create a concise, easy-to-understand summary of the following text. The summary should be in English and capture the key points and implications of the material.

Text to process:
{{{text}}}

After creating the summary, translate it into the following language: {{{targetLanguage}}}.

Provide both the English summary and the translated summary in your response.
`,
});

const contentProcessorFlow = ai.defineFlow(
  {
    name: 'contentProcessorFlow',
    inputSchema: ContentProcessorInputSchema,
    outputSchema: ContentProcessorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
