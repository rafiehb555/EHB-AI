import mongoose from 'mongoose';

const UpgradeHistorySchema = new mongoose.Schema({
  fromLevel: { type: Number, required: true },
  toLevel: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  cost: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
});

const SQLLevelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  currentLevel: { type: Number, default: 1 },
  progress: { type: Number, default: 0 }, // Progress percentage to next level
  upgradeHistory: [UpgradeHistorySchema],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.models.SQLLevel || mongoose.model('SQLLevel', SQLLevelSchema); 