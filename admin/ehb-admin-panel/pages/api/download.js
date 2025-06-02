// Next.js API route for file download
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy download logic
    res.status(200).json({ success: true, fileUrl: '/downloads/dummy-file.txt' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 