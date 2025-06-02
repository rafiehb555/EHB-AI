// Next.js API route for onboarding users data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Dummy onboarding users data (replace with real DB logic as needed)
    res.status(200).json([
      { userId: 'user-123', name: 'John Doe', role: 'seller', onboardingCompleted: true, completedAt: '2025-05-08T12:00:00Z' },
      { userId: 'user-456', name: 'Jane Smith', role: 'franchise', onboardingCompleted: false, completedAt: null },
      { userId: 'user-789', name: 'Alex Johnson', role: 'buyer', onboardingCompleted: true, completedAt: '2025-05-09T15:30:00Z' }
    ]);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 