import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const WalletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  history: [TransactionSchema],
});

export default mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema); 