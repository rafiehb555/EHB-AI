import { getAgents } from '../../../services/agent.service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const agents = await getAgents();
      res.status(200).json({ agents, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 