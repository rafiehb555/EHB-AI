import { AIProviders, generateWithProvider } from '../../../services/AIService';
import { getAgentStatusList } from '../../../services/AgentStatusService';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  // Get working agents only
  const statusList = await getAgentStatusList();
  const workingAgents = statusList.filter(a => a.status === 'working').map(a => a.name);

  const results = await Promise.all(
    workingAgents.map(async (provider) => {
      try {
        const result = await generateWithProvider(provider, { prompt });
        return { provider, result };
      } catch (err) {
        return { provider, error: err.message };
      }
    })
  );

  res.status(200).json({ results });
} 