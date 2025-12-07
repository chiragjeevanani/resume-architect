import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Lazy initialization to ensure environment variables are loaded
let aiInstance: ReturnType<typeof genkit> | null = null;

function getAI() {
  if (!aiInstance) {
    // Get API key from environment variable
    // Next.js automatically loads .env files, so we don't need dotenv
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;

    if (!apiKey) {
      throw new Error('GOOGLE_GENAI_API_KEY environment variable is not set. Please add it to your .env file.');
    }

    aiInstance = genkit({
      plugins: [googleAI({ apiKey })],
      model: 'googleai/gemini-2.5-flash',
    });
  }
  return aiInstance;
}

export const ai = new Proxy({} as ReturnType<typeof genkit>, {
  get(_target, prop) {
    return getAI()[prop as keyof ReturnType<typeof genkit>];
  },
});
