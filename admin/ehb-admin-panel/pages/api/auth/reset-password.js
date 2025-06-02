// Next.js API route for password reset
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy password reset logic
    const { email } = req.body;
    res.status(200).json({ success: true, message: `Password reset link sent to ${email} (dummy)` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 