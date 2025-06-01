import { connectToDB } from '@/lib/db';
import User from '@/models/User';

const MOCK_USER_ID = '6657e1f1f1f1f1f1f1f1f1f1'; // Replace with real user id in production

export async function GET() {
  try {
    await connectToDB();
    const user = await User.findOne({ _id: MOCK_USER_ID });
    if (!user) throw new Error('User not found');
    return Response.json({ user });
  } catch (e) {
    // fallback mock data
    const user = {
      id: 1,
      name: 'EHB User',
      email: 'user@ehb.com',
      role: 'admin',
      phone: '123-456-7890',
      address: '123 EHB Street',
    };
    return Response.json({ user });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const updates = await req.json();
    const user = await User.findOneAndUpdate({ _id: MOCK_USER_ID }, updates, { new: true });
    return Response.json({ user });
  } catch (e) {
    // fallback mock
    const updates = await req.json();
    const user = {
      id: 1,
      name: updates.name || 'EHB User',
      email: updates.email || 'user@ehb.com',
      role: 'admin',
      phone: updates.phone || '123-456-7890',
      address: updates.address || '123 EHB Street',
    };
    return Response.json({ user });
  }
} 