import dbConnect from '../lib/mongodb';
import Phase from '../models/Phase';

export async function createPhase({ phaseId, name, description, startDate, endDate }) {
  await dbConnect();
  const phase = await Phase.create({ phaseId, name, description, startDate, endDate });
  return phase;
}

export async function getPhase(phaseId) {
  await dbConnect();
  return await Phase.findOne({ phaseId });
}

export async function getPhases() {
  await dbConnect();
  return await Phase.find();
}

export async function updatePhase(phaseId, update) {
  await dbConnect();
  return await Phase.findOneAndUpdate({ phaseId }, update, { new: true });
}

export async function deletePhase(phaseId) {
  await dbConnect();
  return await Phase.findOneAndDelete({ phaseId });
} 