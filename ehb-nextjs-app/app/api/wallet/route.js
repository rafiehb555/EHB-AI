import { connectToDB } from '@/lib/db';
import Wallet from '@/models/Wallet';

const MOCK_USER_ID = '6657e1f1f1f1f1f1f1f1f1f1f'; // Replace with real user id in production

export async function GET() {
  try {
    await connectToDB();
    let wallet = await Wallet.findOne({ user: MOCK_USER_ID });
    if (!wallet) {
      wallet = await Wallet.create({ user: MOCK_USER_ID, balance: 1000, history: [] });
    }
    return Response.json({ balance: wallet.balance, history: wallet.history.map((tx, i) => ({ id: tx._id?.toString() || i, ...tx.toObject() })) });
  } catch (e) {
    // fallback mock data
    return Response.json({
      balance: 1000,
      history: [
        { id: 1, type: 'deposit', amount: 1000, date: '2024-06-01' },
        { id: 2, type: 'withdraw', amount: 200, date: '2024-06-02' },
      ],
    });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { type, amount } = await req.json();
    let wallet = await Wallet.findOne({ user: MOCK_USER_ID });
    if (!wallet) {
      wallet = await Wallet.create({ user: MOCK_USER_ID, balance: 1000, history: [] });
    }
    if (type === 'deposit') {
      wallet.balance += amount;
      wallet.history.unshift({ type, amount });
    } else if (type === 'withdraw') {
      if (wallet.balance >= amount) {
        wallet.balance -= amount;
        wallet.history.unshift({ type, amount });
      }
    }
    await wallet.save();
    return Response.json({ balance: wallet.balance, history: wallet.history.map((tx, i) => ({ id: tx._id?.toString() || i, ...tx.toObject() })) });
  } catch (e) {
    // fallback mock
    const { type, amount } = await req.json();
    let balance = 1000;
    let history = [
      { id: 1, type: 'deposit', amount: 1000, date: '2024-06-01' },
      { id: 2, type: 'withdraw', amount: 200, date: '2024-06-02' },
    ];
    if (type === 'deposit') {
      balance += amount;
      history.unshift({ id: 3, type, amount, date: new Date().toISOString() });
    } else if (type === 'withdraw' && balance >= amount) {
      balance -= amount;
      history.unshift({ id: 3, type, amount, date: new Date().toISOString() });
    }
    return Response.json({ balance, history });
  }
} 