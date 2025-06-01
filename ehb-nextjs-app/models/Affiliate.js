import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' }
});

const CommissionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: String, required: true }, // e.g., 'service_purchase', 'level_upgrade'
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
});

const AffiliateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referralCode: { type: String, required: true, unique: true },
  referrals: [ReferralSchema],
  totalEarnings: { type: Number, default: 0 },
  pendingEarnings: { type: Number, default: 0 },
  commissionHistory: [CommissionSchema],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.Affiliate || mongoose.model('Affiliate', AffiliateSchema); 