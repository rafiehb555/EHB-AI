import mongoose from 'mongoose';

const RealtimeConnectionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['connected', 'disconnected'], default: 'connected' },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.RealtimeConnection || mongoose.model('RealtimeConnection', RealtimeConnectionSchema); 