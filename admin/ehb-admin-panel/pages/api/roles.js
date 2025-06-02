// Next.js API route for roles data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy roles data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, name: 'admin', permissions: ['all'] },
      { id: 2, name: 'seller', permissions: ['products', 'orders', 'dashboard'] },
      { id: 3, name: 'buyer', permissions: ['browse', 'orders', 'dashboard'] },
      { id: 4, name: 'franchise', permissions: ['dashboard', 'users', 'analytics'] }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 