// Next.js API route for Stripe payment
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy Stripe payment logic
    res.status(200).json({ success: true, message: 'Payment processed (dummy)' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 