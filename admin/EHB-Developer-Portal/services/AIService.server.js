// AIService.server.js
// Node.js-only AI providers (for backend/API use only)

// Google Vertex AI
import { VertexAI } from '@google-cloud/vertexai';

export function getVertexAI() {
  if (process.env.GOOGLE_VERTEX_PROJECT && process.env.GOOGLE_VERTEX_LOCATION) {
    return new VertexAI({ project: process.env.GOOGLE_VERTEX_PROJECT, location: process.env.GOOGLE_VERTEX_LOCATION });
  }
  return null;
}
// Add other Node-only providers here as needed 