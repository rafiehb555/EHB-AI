import { createPhase } from '../../../services/phase.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phaseId, name, description, startDate, endDate } = req.body;
    if (!phaseId || !name) {
      return res.status(400).json({ error: 'Missing required fields', success: false });
    }
    try {
      const phase = await createPhase({ phaseId, name, description, startDate, endDate });
      res.status(201).json({ phase, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 