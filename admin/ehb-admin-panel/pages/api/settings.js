// Next.js API route for settings data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy settings data (replace with real DB logic as needed)
    res.status(200).json({
      theme: 'light',
      notificationsEnabled: true,
      language: 'en',
      timezone: 'Asia/Karachi',
      itemsPerPage: 20,
      adminEmail: 'admin@ehb.com',
      maintenanceMode: false
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 