import { AssemblyAI } from 'assemblyai';

if (!process.env.ASSEMBLYAI_API_KEY) {
  throw new Error('Missing ASSEMBLYAI_API_KEY environment variable');
}

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY
});

export default client; 