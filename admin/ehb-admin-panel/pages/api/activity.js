// Next.js API route for recent activity data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy activity data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, user: 'John Smith', action: 'Logged in', timestamp: '2023-05-10T09:00:00Z' },
      { id: 2, user: 'Sarah Johnson', action: 'Created new product', timestamp: '2023-05-10T09:15:00Z' },
      { id: 3, user: 'Michael Lee', action: 'Updated profile', timestamp: '2023-05-10T09:30:00Z' },
      { id: 4, user: 'Emma Wilson', action: 'Submitted feedback', timestamp: '2023-05-10T09:45:00Z' },
      { id: 5, user: 'Robert Brown', action: 'Logged out', timestamp: '2023-05-10T10:00:00Z' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 