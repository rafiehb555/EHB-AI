// Next.js API route for analytics data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy analytics data (replace with real DB logic as needed)
    res.status(200).json({
      userMetrics: {
        totalUsers: 4256,
        activeUsers: 3980,
        userGrowth: 12.5,
        usersByRole: {
          admin: 5,
          seller: 1200,
          buyer: 2800,
          franchise: 51
        },
        geoDistribution: [
          { region: 'Asia', count: 2100 },
          { region: 'Europe', count: 900 },
          { region: 'North America', count: 800 },
          { region: 'Other', count: 456 }
        ]
      },
      systemMetrics: {
        uptime: '99.98%',
        avgResponseTime: 120,
        errorRate: 0.2,
        cpuUsage: 65,
        memoryUsage: 72
      },
      businessMetrics: {
        totalRevenue: 2345678.90,
        monthlyRevenue: 195000,
        topProducts: [
          { name: 'AI SaaS', revenue: 120000 },
          { name: 'Marketplace', revenue: 50000 },
          { name: 'Franchise', revenue: 25000 }
        ]
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 