import { getAgentStatusList } from './AgentStatusService';

export async function superviseAgents(autoFix = true) {
  const statusList = await getAgentStatusList();
  const report = [];

  for (const agent of statusList) {
    if ((agent.status === 'error' || agent.status === 'not_configured') && autoFix) {
      // Try to auto-fix (placeholder: re-init logic can be added here)
      // For now, just mark that auto-fix was attempted
      report.push({ ...agent, autoFixTried: true });
    } else if (agent.status !== 'working') {
      report.push(agent);
    }
  }

  return report;
} 