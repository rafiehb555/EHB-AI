import mongoose from 'mongoose';

const RealtimeMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.RealtimeMessage || mongoose.model('RealtimeMessage', RealtimeMessageSchema); 