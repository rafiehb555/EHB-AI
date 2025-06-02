import { runQuery } from '../../../services/db.service';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { collection, method, args = [] } = req.body;
    if (!collection || !method) {
      return res.status(400).json({ error: 'Missing collection or method', success: false });
    }
    try {
      const result = await runQuery(collection, method, ...args);
      res.status(200).json({ result, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 