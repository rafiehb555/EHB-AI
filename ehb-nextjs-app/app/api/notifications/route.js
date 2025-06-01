import { connectToDB } from '@/lib/db';
import Notification from '@/models/Notification';

const MOCK_USER_ID = '6657e1f1f1f1f1f1f1f1f1f1'; // Replace with real user id in production

export async function GET() {
  try {
    await connectToDB();
    const notifications = await Notification.find({ user: MOCK_USER_ID }).sort({ date: -1 });
    return Response.json({ notifications });
  } catch (e) {
    // fallback mock data
    const notifications = [
      { id: 1, message: 'Welcome to EHB!', read: false, date: '2024-06-01' },
      { id: 2, message: 'Your KYC is approved.', read: false, date: '2024-06-02' },
      { id: 3, message: 'Affiliate bonus received.', read: true, date: '2024-06-03' },
    ];
    return Response.json({ notifications });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { id } = await req.json();
    await Notification.findByIdAndUpdate(id, { read: true });
    const notifications = await Notification.find({ user: MOCK_USER_ID }).sort({ date: -1 });
    return Response.json({ notifications });
  } catch (e) {
    // fallback mock
    const { id } = await req.json();
    let notifications = [
      { id: 1, message: 'Welcome to EHB!', read: false, date: '2024-06-01' },
      { id: 2, message: 'Your KYC is approved.', read: false, date: '2024-06-02' },
      { id: 3, message: 'Affiliate bonus received.', read: true, date: '2024-06-03' },
    ];
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return Response.json({ notifications });
  }
} 