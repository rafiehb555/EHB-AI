import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Bad Request', message: 'Component name is required' });
    }
    const componentsDir = path.join(process.cwd(), 'components');
    let filePath;
    if (fs.existsSync(path.join(componentsDir, `${name}.jsx`))) {
      filePath = path.join(componentsDir, `${name}.jsx`);
    } else if (fs.existsSync(path.join(componentsDir, `${name}.tsx`))) {
      filePath = path.join(componentsDir, `${name}.tsx`);
    } else {
      filePath = null;
    }
    try {
      if (!filePath) {
        return res.status(404).json({ error: 'Not Found', message: `Component ${name} not found` });
      }
      fs.unlinkSync(filePath);
      res.json({ success: true, message: `Component ${name} deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 