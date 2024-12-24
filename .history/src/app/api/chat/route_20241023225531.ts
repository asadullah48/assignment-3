import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { streamText, CoreMessage, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-pro-latest'),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}