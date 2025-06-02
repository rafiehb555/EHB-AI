// Next.js API route for feedback data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy feedback data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, user: 'John Smith', message: 'Great dashboard!', rating: 5, createdAt: '2023-05-01' },
      { id: 2, user: 'Sarah Johnson', message: 'Needs more analytics.', rating: 3, createdAt: '2023-05-02' },
      { id: 3, user: 'Michael Lee', message: 'Love the new UI.', rating: 4, createdAt: '2023-05-03' },
      { id: 4, user: 'Emma Wilson', message: 'Found a bug in user management.', rating: 2, createdAt: '2023-05-04' },
      { id: 5, user: 'Robert Brown', message: 'Fast and responsive!', rating: 5, createdAt: '2023-05-05' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 