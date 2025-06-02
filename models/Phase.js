import mongoose from 'mongoose';

const PhaseSchema = new mongoose.Schema({
  phaseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

export default mongoose.models.Phase || mongoose.model('Phase', PhaseSchema); 