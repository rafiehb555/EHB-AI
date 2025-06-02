import { runAgent } from '../../../agent/index';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, outputDir } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Bad Request', message: 'Component name and description are required' });
    }
    try {
      const input = `Generate a React component with the following details:\n      Name: ${name}\n      Description: ${description}\n      Output Directory: ${outputDir || 'components'}`;
      const result = await runAgent(input);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 