import { deletePhase } from '../../../services/phase.service';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { phaseId } = req.query;
    if (!phaseId) {
      return res.status(400).json({ error: 'Missing phaseId', success: false });
    }
    try {
      const phase = await deletePhase(phaseId);
      if (!phase) {
        return res.status(404).json({ error: 'Phase not found', success: false });
      }
      res.status(200).json({ message: 'Phase deleted', phase, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 