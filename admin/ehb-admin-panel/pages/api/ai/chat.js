// Next.js API route for AI chat
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy AI chat logic
    const { message } = req.body;
    res.status(200).json({ reply: `AI (dummy): You said: ${message}` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 