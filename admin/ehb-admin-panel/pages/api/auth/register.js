// Next.js API route for user registration
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy registration logic
    const { email, password } = req.body;
    res.status(201).json({ success: true, user: { email, role: 'user' }, message: 'User registered (dummy)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 