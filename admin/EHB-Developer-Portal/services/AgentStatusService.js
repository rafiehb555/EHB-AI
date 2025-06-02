import { AIProviders } from './AIService';

export async function getAgentStatusList() {
  const statusList = [];

  for (const [name, instance] of Object.entries(AIProviders)) {
    let status = 'unknown';
    let message = '';
    try {
      if (!instance) {
        status = 'not_configured';
        message = 'API key or config missing';
      } else {
        // Try a lightweight call if possible (e.g. list models, dummy prompt)
        // For now, just mark as working if instance exists
        status = 'working';
      }
    } catch (err) {
      status = 'error';
      message = err.message;
    }
    statusList.push({ name, status, message });
  }

  return statusList;
} 