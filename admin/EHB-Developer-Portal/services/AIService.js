/**
 * AI Service for code explanations and other AI-powered features
 * 
 * This service provides methods to interact with AI services like OpenAI or Anthropic
 * for code explanations, suggestions, and other AI-powered features in the application.
 */

// Check if we have access to the OpenAI API key
const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);

/**
 * --- Unified AI Providers Integration ---
 * Below are imports, initializations, and example usage for all supported AI providers.
 * Add your API keys and config in .env.local as needed.
 */

// OpenAI
import OpenAI from 'openai'; // npm install openai
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Anthropic
import { Anthropic } from '@anthropic-ai/sdk'; // npm install @anthropic-ai/sdk
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

// Cohere
import { CohereClient } from '@ai-sdk/cohere';
const cohere = process.env.COHERE_API_KEY ? new CohereClient({ apiKey: process.env.COHERE_API_KEY }) : null;

// Mistral
import { MistralClient } from '@ai-sdk/mistral';
const mistral = process.env.MISTRAL_API_KEY ? new MistralClient({ apiKey: process.env.MISTRAL_API_KEY }) : null;

// Fireworks
import { FireworksClient } from '@ai-sdk/fireworks';
const fireworks = process.env.FIREWORKS_API_KEY ? new FireworksClient({ apiKey: process.env.FIREWORKS_API_KEY }) : null;

// TogetherAI
import { TogetherAIClient } from '@ai-sdk/togetherai';
const togetherai = process.env.TOGETHERAI_API_KEY ? new TogetherAIClient({ apiKey: process.env.TOGETHERAI_API_KEY }) : null;

// DeepSeek
import { DeepSeekClient } from '@ai-sdk/deepseek';
const deepseek = process.env.DEEPSEEK_API_KEY ? new DeepSeekClient({ apiKey: process.env.DEEPSEEK_API_KEY }) : null;

// Cerebras
import { CerebrasClient } from '@ai-sdk/cerebras';
const cerebras = process.env.CEREBRAS_API_KEY ? new CerebrasClient({ apiKey: process.env.CEREBRAS_API_KEY }) : null;

// Perplexity
import { PerplexityClient } from '@ai-sdk/perplexity';
const perplexity = process.env.PERPLEXITY_API_KEY ? new PerplexityClient({ apiKey: process.env.PERPLEXITY_API_KEY }) : null;

// Ollama
import { OllamaClient } from 'ollama-ai-provider';
const ollama = process.env.OLLAMA_API_KEY ? new OllamaClient({ apiKey: process.env.OLLAMA_API_KEY }) : null;

// ChromeAI
import { ChromeAIClient } from 'chrome-ai';
const chromeai = process.env.CHROMEAI_API_KEY ? new ChromeAIClient({ apiKey: process.env.CHROMEAI_API_KEY }) : null;

// Luma
import { LumaClient } from '@ai-sdk/luma';
const luma = process.env.LUMA_API_KEY ? new LumaClient({ apiKey: process.env.LUMA_API_KEY }) : null;

// DeepInfra
import { DeepInfraClient } from '@ai-sdk/deepinfra';
const deepinfra = process.env.DEEPINFRA_API_KEY ? new DeepInfraClient({ apiKey: process.env.DEEPINFRA_API_KEY }) : null;

// Fal
import { FalClient } from '@ai-sdk/fal';
const fal = process.env.FAL_API_KEY ? new FalClient({ apiKey: process.env.FAL_API_KEY }) : null;

// Groq
import { GroqClient } from '@ai-sdk/groq';
const groq = process.env.GROQ_API_KEY ? new GroqClient({ apiKey: process.env.GROQ_API_KEY }) : null;

// Amazon Bedrock
import { AmazonBedrockClient } from '@ai-sdk/amazon-bedrock';
const bedrock = process.env.BEDROCK_API_KEY ? new AmazonBedrockClient({ apiKey: process.env.BEDROCK_API_KEY }) : null;

// Azure OpenAI
import { AzureClient } from '@ai-sdk/azure';
const azure = process.env.AZURE_OPENAI_KEY ? new AzureClient({ apiKey: process.env.AZURE_OPENAI_KEY }) : null;

// xAI Grok
import { XAIClient } from '@ai-sdk/xai';
const xai = process.env.XAI_API_KEY ? new XAIClient({ apiKey: process.env.XAI_API_KEY }) : null;

// --- Example unified interface ---
export const AIProviders = {
  openai,
  anthropic,
  cohere,
  mistral,
  fireworks,
  togetherai,
  deepseek,
  cerebras,
  perplexity,
  ollama,
  chromeai,
  luma,
  deepinfra,
  fal,
  groq,
  bedrock,
  azure,
  xai,
};

/**
 * Example: Generate text/completion from a specific provider
 * Usage: await generateWithProvider('openai', { prompt: 'Hello world' })
 */
export async function generateWithProvider(provider, options) {
  switch (provider) {
    case 'openai':
      if (!openai) throw new Error('OpenAI not configured');
      return await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: options.prompt }],
      });
    case 'anthropic':
      if (!anthropic) throw new Error('Anthropic not configured');
      return await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1024,
        messages: [{ role: 'user', content: options.prompt }],
      });
    // Add similar cases for other providers as needed
    default:
      throw new Error('Provider not supported or not configured');
  }
}

/**
 * Get a code explanation from the AI service
 * @param {string} code - The code to explain
 * @param {string} language - The programming language of the code
 * @param {string} context - Additional context about the code or what the user is trying to achieve
 * @returns {Promise<string>} - The explanation from the AI
 */
export async function getCodeExplanation(code, language = 'javascript', context = '') {
  try {
    // If we're in the browser, make an API call to our backend endpoint
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/ai/explain-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          context
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.explanation;
    } 
    // If we're on the server, we can call the OpenAI API directly
    else {
      // This is a fallback for server-side rendering or testing
      // In a real implementation, you would make a direct call to the AI service
      // using the appropriate API key
      return "This is a placeholder for the AI explanation that would be generated server-side.";
    }
  } catch (error) {
    console.error('Error getting code explanation:', error);
    return "Sorry, I couldn't generate an explanation for this code right now. Please try again later.";
  }
}

/**
 * Generate code suggestions or improvements
 * @param {string} code - The current code
 * @param {string} prompt - What the user is trying to achieve or fix
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The suggested code improvements
 */
export async function getCodeSuggestions(code, prompt, language = 'javascript') {
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/ai/suggest-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          prompt,
          language
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.suggestions;
    } else {
      return "This is a placeholder for the AI code suggestions that would be generated server-side.";
    }
  } catch (error) {
    console.error('Error getting code suggestions:', error);
    return "Sorry, I couldn't generate code suggestions right now. Please try again later.";
  }
}

/**
 * Debug code and find potential issues
 * @param {string} code - The code to debug
 * @param {string} error - Any error message the user encountered
 * @param {string} language - The programming language
 * @returns {Promise<object>} - The debugging results with identified issues and suggestions
 */
export async function debugCode(code, error = '', language = 'javascript') {
  try {
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/ai/debug-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          error,
          language
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.debugResults;
    } else {
      return {
        issues: ["This is a placeholder for AI-detected issues"],
        suggestions: ["This is a placeholder for AI debugging suggestions"]
      };
    }
  } catch (error) {
    console.error('Error debugging code:', error);
    return {
      issues: ["Sorry, I couldn't debug this code right now."],
      suggestions: ["Please try again later."]
    };
  }
}

/**
 * Check if the AI service is available and configured
 * @returns {boolean} - Whether the AI service is available
 */
export function isAIServiceAvailable() {
  // In a real implementation, this would check for API keys and service availability
  return hasOpenAIKey || process.env.ANTHROPIC_API_KEY;
}

// Node-only providers (like Google VertexAI) have been moved to AIService.server.js for backend/API use only.