import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  agentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String },
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema); 