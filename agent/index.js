// agent/index.js
// Modern runAgent implementation using the new multi-agent system

import { generateWithProvider } from '../admin/EHB-Developer-Portal/services/AIService.js';

/**
 * runAgent - Unified agent entrypoint for legacy API routes
 * @param {string} input - The prompt or instruction for the agent(s)
 * @returns {Promise<any>} - The result from the AI provider(s)
 */
export async function runAgent(input) {
  // You can customize this to use multi-agent workflow if needed
  // For now, use OpenAI as the default provider
  try {
    const result = await generateWithProvider('openai', { prompt: input });
    return result;
  } catch (err) {
    return { error: err.message };
  }
} 