import path from 'path';
import CompanyKnowledgeAgent from '../../agents/CompanyKnowledgeAgent';

let lastFetched = null;
let lastInfo = null;
let isFetching = false;

const INTERVAL_MS = 60 * 60 * 1000; // 1 hour

async function autoFetchCompanyInfo() {
  if (isFetching) return;
  isFetching = true;
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OpenAI API key not set in environment variables.');
    const projectRoot = process.cwd();
    const agent = new CompanyKnowledgeAgent(projectRoot);
    agent.setOpenAIKey(apiKey);
    lastInfo = await agent.fetchCompanyOverview();
    lastFetched = new Date();
  } catch (error) {
    lastInfo = `Error: ${error.message}`;
    lastFetched = new Date();
  } finally {
    isFetching = false;
  }
}

// Start auto-fetching on server start
if (typeof global !== 'undefined' && !global.__companyInfoAutoFetchStarted) {
  autoFetchCompanyInfo();
  setInterval(autoFetchCompanyInfo, INTERVAL_MS);
  global.__companyInfoAutoFetchStarted = true;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  res.status(200).json({ lastFetched, info: lastInfo });
} 