// Next.js API route for login
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy login logic
    const { email, password } = req.body;
    if (email === 'admin@ehb.com' && password === 'password123') {
      res.status(200).json({ success: true, token: 'dummy-jwt-token', user: { email, role: 'admin' } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 