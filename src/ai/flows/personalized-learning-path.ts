'use server';

/**
 * @fileOverview Recommends the next most relevant learning module based on user progress and quiz scores.
 *
 * - getPersonalizedLearningPath - A function that recommends the next learning module.
 * - PersonalizedLearningPathInput - The input type for the getPersonalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the getPersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  userProgress: z
    .string()
    .describe("The user's current learning progress, as a JSON string."),
  quizScores: z
    .string()
    .describe("The user's quiz scores for each module, as a JSON string."),
  availableModules: z
    .string()
    .describe('A list of available learning modules, as a JSON string.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  recommendedModule: z
    .string()
    .describe('The name of the recommended learning module.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the module recommendation.'),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

export async function getPersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI-powered learning assistant that recommends the next most relevant learning module for a user based on their progress and quiz scores.

  Here is the user's current learning progress:
  {{userProgress}}

  Here are the user's quiz scores for each module:
  {{quizScores}}

  Here is a list of available learning modules:
  {{availableModules}}

  Based on this information, recommend the next most relevant learning module for the user and explain your reasoning. Be specific about which modules would be most helpful.
`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
