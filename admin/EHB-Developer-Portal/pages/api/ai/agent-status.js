import { superviseAgents } from '../../../services/AgentSupervisor';

export default async function handler(req, res) {
  const report = await superviseAgents(true);
  res.status(200).json({ agents: report });
} 