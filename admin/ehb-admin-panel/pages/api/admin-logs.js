// Next.js API route for admin logs data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy admin logs data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, timestamp: '2023-05-18 14:23:45', level: 'ERROR', message: 'Failed database connection attempt', service: 'db-connector' },
      { id: 2, timestamp: '2023-05-18 14:22:12', level: 'INFO', message: 'User authentication successful', service: 'auth-service' },
      { id: 3, timestamp: '2023-05-18 14:20:05', level: 'WARNING', message: 'High CPU usage detected', service: 'monitoring' },
      { id: 4, timestamp: '2023-05-18 14:18:32', level: 'INFO', message: 'Scheduled backup completed', service: 'backup-service' },
      { id: 5, timestamp: '2023-05-18 14:15:19', level: 'ERROR', message: 'Payment processing failed', service: 'payment-gateway' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 