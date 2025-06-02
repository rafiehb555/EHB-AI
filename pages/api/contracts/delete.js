import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Bad Request', message: 'Contract name is required' });
    }
    const contractsDir = path.join(process.cwd(), 'contracts');
    const filePath = path.join(contractsDir, `${name}.sol`);
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Not Found', message: `Contract ${name} not found` });
      }
      fs.unlinkSync(filePath);
      res.json({ success: true, message: `Contract ${name} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 