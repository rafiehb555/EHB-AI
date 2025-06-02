export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({
      status: 'operational',
      version: '1.0.0',
      tools: [
        { name: 'FileReader', description: 'Read file contents' },
        { name: 'FileWriter', description: 'Write content to files' },
        { name: 'ContractAnalyzer', description: 'Analyze smart contracts' },
        { name: 'ComponentGenerator', description: 'Generate React components' }
      ]
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 