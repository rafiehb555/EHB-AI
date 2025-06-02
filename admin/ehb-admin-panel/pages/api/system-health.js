// Next.js API route for system health data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy system health data (replace with real monitoring logic as needed)
    res.status(200).json({
      status: 'healthy',
      uptime: '99.98%',
      lastRestart: '2023-05-10T02:00:00Z',
      cpuUsage: 63,
      memoryUsage: 71,
      diskSpace: '85%',
      apiResponseTime: 120,
      errorRate: 0.2,
      services: [
        { name: 'Database', status: 'operational' },
        { name: 'API', status: 'operational' },
        { name: 'Auth', status: 'operational' },
        { name: 'AI', status: 'high load' }
      ]
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 