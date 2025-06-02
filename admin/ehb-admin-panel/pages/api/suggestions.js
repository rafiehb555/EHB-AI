// Next.js API route for suggestions data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy suggestions data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, user: 'John Smith', suggestion: 'Add dark mode support', status: 'pending', createdAt: '2023-05-01' },
      { id: 2, user: 'Sarah Johnson', suggestion: 'Export analytics as CSV', status: 'reviewing', createdAt: '2023-05-02' },
      { id: 3, user: 'Michael Lee', suggestion: 'Integrate with Slack', status: 'implemented', createdAt: '2023-05-03' },
      { id: 4, user: 'Emma Wilson', suggestion: 'Add 2FA for login', status: 'pending', createdAt: '2023-05-04' },
      { id: 5, user: 'Robert Brown', suggestion: 'Show system uptime on dashboard', status: 'implemented', createdAt: '2023-05-05' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 