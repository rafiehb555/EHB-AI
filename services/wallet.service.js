import dbConnect from '../lib/mongodb';
import Wallet from '../models/Wallet';

export async function getOrCreateWallet(userId) {
  await dbConnect();
  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = await Wallet.create({ userId });
  }
  return wallet;
}

export async function setAddress(userId, type, address) {
  await dbConnect();
  const update = {};
  update[`addresses.${type}`] = address;
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $set: update },
    { new: true, upsert: true }
  );
  return wallet;
}

export async function getAddress(userId, type) {
  await dbConnect();
  const wallet = await Wallet.findOne({ userId });
  return wallet ? wallet.addresses[type] : null;
}

export async function addToken(userId, token) {
  await dbConnect();
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $push: { tokens: token } },
    { new: true, upsert: true }
  );
  return wallet;
}

export async function updateTokenBalance(userId, tokenAddress, balance) {
  await dbConnect();
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) return null;
  const token = wallet.tokens.find(t => t.address === tokenAddress);
  if (token) {
    token.balance = balance;
    await wallet.save();
  }
  return wallet;
}

export async function getWallet(userId) {
  await dbConnect();
  return await Wallet.findOne({ userId });
}

export async function transfer(userId, type, to, amount) {
  // Yeh sirf ek stub hai, yahan aap blockchain integration ya logic add kar sakte hain
  return { userId, type, to, amount, success: true, message: 'Transfer simulated (blockchain logic yahan add karein)' };
} 