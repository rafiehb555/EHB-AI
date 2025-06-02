import { updatePhase } from '../../../services/phase.service';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { phaseId } = req.query;
    const { name, description, startDate, endDate } = req.body;
    if (!phaseId) {
      return res.status(400).json({ error: 'Missing phaseId', success: false });
    }
    if (!name && !description && !startDate && !endDate) {
      return res.status(400).json({ error: 'No update fields provided', success: false });
    }
    try {
      const update = {};
      if (name) update.name = name;
      if (description) update.description = description;
      if (startDate) update.startDate = startDate;
      if (endDate) update.endDate = endDate;
      const phase = await updatePhase(phaseId, update);
      if (!phase) {
        return res.status(404).json({ error: 'Phase not found', success: false });
      }
      res.status(200).json({ phase, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 