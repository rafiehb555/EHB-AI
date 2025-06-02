import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { name } = req.query;
  const contractsDir = path.join(process.cwd(), 'contracts');
  const filePath = path.join(contractsDir, `${name}.sol`);
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Not Found', message: `Contract ${name} not found` });
      }
      const content = fs.readFileSync(filePath, 'utf8');
      const stats = fs.statSync(filePath);
      res.json({ name, content, size: stats.size, created: stats.birthtime, modified: stats.mtime });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'Bad Request', message: 'Contract content is required' });
      }
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Not Found', message: `Contract ${name} not found` });
      }
      fs.writeFileSync(filePath, content);
      const stats = fs.statSync(filePath);
      res.json({ success: true, name, size: stats.size, created: stats.birthtime, modified: stats.mtime });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 