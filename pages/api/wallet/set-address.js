import { setAddress } from '../../../services/wallet.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.query;
    const { type, address } = req.body;
    if (!userId || !type) {
      return res.status(400).json({ error: 'Missing userId or type', success: false });
    }
    try {
      const wallet = await setAddress(userId, type, address);
      res.status(200).json({ userId, type, address: wallet.addresses[type], success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 