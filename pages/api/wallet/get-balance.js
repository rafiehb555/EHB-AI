import { getWallet } from '../../../services/wallet.service';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId, type } = req.query;
    if (!userId || !type) {
      return res.status(400).json({ error: 'Missing userId or type', success: false });
    }
    try {
      const wallet = await getWallet(userId);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found', success: false });
      }
      // Filter tokens by type
      const tokens = wallet.tokens.filter(t => t.type === type);
      res.status(200).json({ userId, type, tokens, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 