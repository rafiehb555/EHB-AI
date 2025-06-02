import dbConnect from '../lib/mongodb';
import RealtimeConnection from '../models/RealtimeConnection';
import RealtimeMessage from '../models/RealtimeMessage';

export async function connectUser(userId) {
  await dbConnect();
  const conn = await RealtimeConnection.findOneAndUpdate(
    { userId },
    { status: 'connected', lastActive: new Date() },
    { new: true, upsert: true }
  );
  return conn;
}

export async function disconnectUser(userId) {
  await dbConnect();
  const conn = await RealtimeConnection.findOneAndUpdate(
    { userId },
    { status: 'disconnected', lastActive: new Date() },
    { new: true }
  );
  return conn;
}

export async function sendMessage(userId, message) {
  await dbConnect();
  const msg = await RealtimeMessage.create({ userId, message });
  return msg;
}

export async function getMessages(userId, limit = 20) {
  await dbConnect();
  return await RealtimeMessage.find({ userId }).sort({ createdAt: -1 }).limit(limit);
} 