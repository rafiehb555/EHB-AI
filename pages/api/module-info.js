import path from 'path';
import CompanyKnowledgeAgent from '../../agents/CompanyKnowledgeAgent';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment variables.' });
  }

  const { module } = req.query;
  if (!module) {
    return res.status(400).json({ error: 'Module name is required as a query parameter (?module=ModuleName).' });
  }

  try {
    const projectRoot = process.cwd();
    const agent = new CompanyKnowledgeAgent(projectRoot);
    agent.setOpenAIKey(apiKey);
    const info = await agent.fetchModuleInfo(module);
    res.status(200).json({ info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 