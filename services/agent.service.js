import dbConnect from '../lib/mongodb';
import Agent from '../models/Agent';

export async function createAgent({ agentId, name, description, type }) {
  await dbConnect();
  const agent = await Agent.create({ agentId, name, description, type });
  return agent;
}

export async function getAgent(agentId) {
  await dbConnect();
  return await Agent.findOne({ agentId });
}

export async function getAgents() {
  await dbConnect();
  return await Agent.find();
}

export async function updateAgent(agentId, update) {
  await dbConnect();
  return await Agent.findOneAndUpdate({ agentId }, update, { new: true });
}

export async function deleteAgent(agentId) {
  await dbConnect();
  return await Agent.findOneAndDelete({ agentId });
} 