import { getAgent } from '../../../services/agent.service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { agentId } = req.query;
    if (!agentId) {
      return res.status(400).json({ error: 'Missing agentId', success: false });
    }
    try {
      const agent = await getAgent(agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found', success: false });
      }
      res.status(200).json({ agent, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 