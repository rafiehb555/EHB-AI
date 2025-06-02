import { sendMessage } from '../../../services/realtime.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, message } = req.body;
    if (!userId || !message) {
      return res.status(400).json({ error: 'Missing userId or message', success: false });
    }
    try {
      const result = await sendMessage(userId, message);
      res.status(200).json({ result, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 