import { transfer } from '../../../services/wallet.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.query;
    const { type, to, amount } = req.body;
    if (!userId || !type || !to || !amount) {
      return res.status(400).json({ error: 'Missing required fields', success: false });
    }
    try {
      const result = await transfer(userId, type, to, amount);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 