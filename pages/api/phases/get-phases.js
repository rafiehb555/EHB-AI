import { getPhases } from '../../../services/phase.service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const phases = await getPhases();
      res.status(200).json({ phases, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 