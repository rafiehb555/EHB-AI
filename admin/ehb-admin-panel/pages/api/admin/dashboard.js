// Next.js API route for admin dashboard data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy data (replace with real DB logic as needed)
    res.status(200).json({
      stats: {
        totalUsers: 4256,
        totalRevenue: 2345678.90,
        systemHealth: 98.7,
        apiRequests: 1567890,
        franchises: 18,
        aiInteractions: 89567
      },
      userGrowth: [
        { name: 'Jan', sellers: 245, buyers: 1200, franchise: 8 },
        { name: 'Feb', sellers: 285, buyers: 1350, franchise: 10 },
        { name: 'Mar', sellers: 310, buyers: 1500, franchise: 12 },
        { name: 'Apr', sellers: 340, buyers: 1650, franchise: 14 },
        { name: 'May', sellers: 380, buyers: 1800, franchise: 15 },
        { name: 'Jun', sellers: 410, buyers: 1950, franchise: 17 },
        { name: 'Jul', sellers: 450, buyers: 2100, franchise: 18 }
      ],
      revenueDistribution: [
        { name: 'Seller Fees', value: 35 },
        { name: 'Buyer Premium', value: 28 },
        { name: 'Franchise License', value: 22 },
        { name: 'AI Services', value: 15 }
      ],
      systemPerformance: [
        { name: '00:00', cpu: 35, memory: 50, queries: 220 },
        { name: '04:00', cpu: 28, memory: 45, queries: 180 },
        { name: '08:00', cpu: 60, memory: 70, queries: 560 },
        { name: '12:00', cpu: 85, memory: 85, queries: 780 },
        { name: '16:00', cpu: 95, memory: 90, queries: 830 },
        { name: '20:00', cpu: 70, memory: 75, queries: 650 },
        { name: '23:59', cpu: 45, memory: 60, queries: 380 }
      ],
      recentLogs: [
        { id: 1, timestamp: '2023-05-18 14:23:45', level: 'ERROR', message: 'Failed database connection attempt', service: 'db-connector' },
        { id: 2, timestamp: '2023-05-18 14:22:12', level: 'INFO', message: 'User authentication successful', service: 'auth-service' },
        { id: 3, timestamp: '2023-05-18 14:20:05', level: 'WARNING', message: 'High CPU usage detected', service: 'monitoring' },
        { id: 4, timestamp: '2023-05-18 14:18:32', level: 'INFO', message: 'Scheduled backup completed', service: 'backup-service' },
        { id: 5, timestamp: '2023-05-18 14:15:19', level: 'ERROR', message: 'Payment processing failed', service: 'payment-gateway' }
      ]
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 