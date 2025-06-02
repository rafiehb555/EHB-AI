import { updateAgent } from '../../../services/agent.service';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { agentId } = req.query;
    const { name, description, type } = req.body;
    if (!agentId) {
      return res.status(400).json({ error: 'Missing agentId', success: false });
    }
    if (!name && !description && !type) {
      return res.status(400).json({ error: 'No update fields provided', success: false });
    }
    try {
      const update = {};
      if (name) update.name = name;
      if (description) update.description = description;
      if (type) update.type = type;
      const agent = await updateAgent(agentId, update);
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