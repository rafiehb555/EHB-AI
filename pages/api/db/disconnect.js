import { disconnectDB } from '../../../services/db.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const result = await disconnectDB();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 