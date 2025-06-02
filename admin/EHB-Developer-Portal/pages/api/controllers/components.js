import { runAgent } from '../../../../agent/index.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    try {
      const input = `Generate a React component with the following details:\nName: ${name}\nDescription: ${description}`;
      const result = await runAgent(input);
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 