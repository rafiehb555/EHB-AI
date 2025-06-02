import { runAgent } from '../../../../agent/index.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { contractPath } = req.body;
    if (!contractPath) {
      return res.status(400).json({ error: 'Contract path is required' });
    }
    try {
      const input = `Analyze the smart contract at ${contractPath} for security vulnerabilities`;
      const result = await runAgent(input);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 