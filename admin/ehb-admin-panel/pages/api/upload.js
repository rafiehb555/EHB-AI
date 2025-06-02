// Next.js API route for file upload
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy upload logic
    res.status(200).json({ success: true, fileUrl: '/uploads/dummy-file.txt' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 