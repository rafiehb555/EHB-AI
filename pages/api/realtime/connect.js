import { connectUser } from '../../../services/realtime.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId', success: false });
    }
    try {
      const result = await connectUser(userId);
      res.status(200).json({ result, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 