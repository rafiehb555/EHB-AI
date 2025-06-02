// Next.js API route for admin users data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy users data (replace with real DB logic as needed)
    res.status(200).json([
      { id: 1, name: 'John Smith', email: 'john@example.com', role: 'seller', status: 'active', createdAt: '2023-01-15' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'buyer', status: 'active', createdAt: '2023-02-20' },
      { id: 3, name: 'Michael Lee', email: 'michael@example.com', role: 'franchise', status: 'active', createdAt: '2023-01-10' },
      { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'buyer', status: 'inactive', createdAt: '2023-03-05' },
      { id: 5, name: 'Robert Brown', email: 'robert@example.com', role: 'seller', status: 'active', createdAt: '2023-02-25' },
      { id: 6, name: 'Jennifer Lopez', email: 'jennifer@example.com', role: 'buyer', status: 'active', createdAt: '2023-04-10' },
      { id: 7, name: 'David Miller', email: 'david@example.com', role: 'franchise', status: 'active', createdAt: '2023-03-18' },
      { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'buyer', status: 'active', createdAt: '2023-04-22' },
      { id: 9, name: 'James Taylor', email: 'james@example.com', role: 'seller', status: 'inactive', createdAt: '2023-02-12' },
      { id: 10, name: 'Patricia Martin', email: 'patricia@example.com', role: 'buyer', status: 'active', createdAt: '2023-05-01' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 