import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  address: { type: String, required: true },
  type: { type: String, enum: ['ERC20', 'BEP20'], required: true },
  symbol: { type: String },
  balance: { type: String, default: '0' },
}, { _id: false });

const WalletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  addresses: {
    ERC20: { type: String, default: '' },
    BEP20: { type: String, default: '' },
  },
  tokens: [TokenSchema],
}, { timestamps: true });

export default mongoose.models.Wallet || mongoose.model('Wallet', WalletSchema); 