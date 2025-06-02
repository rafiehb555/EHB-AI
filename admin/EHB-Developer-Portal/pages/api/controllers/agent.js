import { runAgent } from '../../../../agent/index.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
    try {
      const result = await runAgent(input);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 