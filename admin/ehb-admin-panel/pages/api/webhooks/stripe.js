// Next.js API route for Stripe webhook
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy webhook logic
    res.status(200).json({ received: true, event: req.body });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 