// Next.js API route for logout
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy logout logic
    res.status(200).json({ success: true, message: 'User logged out (dummy)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 