// Next.js API route for notifications data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy notifications data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, type: 'info', message: 'System update scheduled for tonight.', read: false, createdAt: '2023-05-10' },
      { id: 2, type: 'warning', message: 'High CPU usage detected.', read: true, createdAt: '2023-05-09' },
      { id: 3, type: 'success', message: 'Backup completed successfully.', read: false, createdAt: '2023-05-08' },
      { id: 4, type: 'error', message: 'Payment gateway error.', read: true, createdAt: '2023-05-07' },
      { id: 5, type: 'info', message: 'New user registered.', read: false, createdAt: '2023-05-06' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 