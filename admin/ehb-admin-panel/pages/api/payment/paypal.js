// Next.js API route for PayPal payment
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy PayPal payment logic
    res.status(200).json({ success: true, message: 'PayPal payment processed (dummy)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 