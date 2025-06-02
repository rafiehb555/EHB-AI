import { createAgent } from '../../../services/agent.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { agentId, name, description, type } = req.body;
    if (!agentId || !name || !type) {
      return res.status(400).json({ error: 'Missing required fields', success: false });
    }
    try {
      const agent = await createAgent({ agentId, name, description, type });
      res.status(201).json({ agent, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 