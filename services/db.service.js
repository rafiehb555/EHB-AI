import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';

export async function connectDB() {
  return await dbConnect();
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    return { success: true, message: 'Disconnected from MongoDB' };
  }
  return { success: false, message: 'No active MongoDB connection' };
}

export async function runQuery(collection, method, ...args) {
  await dbConnect();
  if (!mongoose.connection.db) {
    throw new Error('No active MongoDB connection');
  }
  const col = mongoose.connection.db.collection(collection);
  if (typeof col[method] !== 'function') {
    throw new Error(`Method ${method} not supported on collection`);
  }
  const result = await col[method](...args);
  return result;
} 