// Next.js API route for AI agent
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy AI agent logic
    const { task } = req.body;
    res.status(200).json({ result: `AI Agent (dummy) completed task: ${task}` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 