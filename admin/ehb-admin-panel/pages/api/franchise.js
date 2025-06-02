// Next.js API route for franchise data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy franchise data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, name: 'Karachi Central', owner: 'Ali Raza', status: 'active', createdAt: '2023-04-01' },
      { id: 2, name: 'Lahore East', owner: 'Sara Khan', status: 'pending', createdAt: '2023-04-10' },
      { id: 3, name: 'Islamabad North', owner: 'Usman Tariq', status: 'active', createdAt: '2023-04-15' },
      { id: 4, name: 'Peshawar South', owner: 'Ayesha Malik', status: 'inactive', createdAt: '2023-04-20' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 