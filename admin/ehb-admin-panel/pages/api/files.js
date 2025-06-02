// Next.js API route for files data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy files data (replace with real file listing logic as needed)
    res.status(200).json([
      { id: 1, name: 'report.pdf', type: 'pdf', size: '2MB', uploadedAt: '2023-05-01' },
      { id: 2, name: 'invoice.xlsx', type: 'excel', size: '500KB', uploadedAt: '2023-05-02' },
      { id: 3, name: 'profile.jpg', type: 'image', size: '1.2MB', uploadedAt: '2023-05-03' },
      { id: 4, name: 'backup.zip', type: 'zip', size: '10MB', uploadedAt: '2023-05-04' },
      { id: 5, name: 'presentation.pptx', type: 'ppt', size: '3MB', uploadedAt: '2023-05-05' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 