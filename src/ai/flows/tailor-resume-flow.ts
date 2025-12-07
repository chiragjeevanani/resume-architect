'use server';
/**
 * @fileOverview A Genkit flow for tailoring resume content based on a job role.
 *
 * This file defines the `tailorResume` flow, which takes a job role and
 * returns AI-generated content for a resume, including a summary, skills list,
 * and experience bullet points.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { TailorResumeInput, TailorResumeOutput } from '@/lib/types';
import { TailorResumeInputSchema, TailorResumeOutputSchema } from '@/lib/types';

// Lazy initialization of prompt and flow to ensure environment variables are loaded
let tailorResumePrompt: ReturnType<typeof ai.definePrompt> | null = null;
let tailorResumeFlow: ReturnType<typeof ai.defineFlow> | null = null;

function getTailorResumePrompt() {
  if (!tailorResumePrompt) {
    tailorResumePrompt = ai.definePrompt({
      name: 'tailorResumePrompt',
      input: { schema: TailorResumeInputSchema },
      output: { schema: TailorResumeOutputSchema },
      prompt: `You are a professional resume writer and career coach. Your task is to generate key sections of a resume for a client based on their target job role.

Job Role: {{{jobRole}}}

Generate the following content, ensuring it is highly relevant, professional, and optimized for Applicant Tracking Systems (ATS):

1.  **Summary:** A compelling professional summary (3-4 sentences) written in the first person.
2.  **Skills:** A list of the 8-10 most important hard and soft skills for this role.
3.  **Experience Bullet Points:** Three distinct and impactful bullet points for a work experience section. Each bullet point should start with a strong action verb and quantify achievements where possible.

Provide the output in the requested JSON format.`,
    });
  }
  return tailorResumePrompt;
}

function getTailorResumeFlow() {
  if (!tailorResumeFlow) {
    tailorResumeFlow = ai.defineFlow(
      {
        name: 'tailorResumeFlow',
        inputSchema: TailorResumeInputSchema,
        outputSchema: TailorResumeOutputSchema,
      },
      async (input) => {
        const { output } = await getTailorResumePrompt()(input);
        return output!;
      }
    );
  }
  return tailorResumeFlow;
}

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return getTailorResumeFlow()(input);
}
