import fs from 'fs';
import path from 'path';
import { runAgent } from '../../../agent/index';

export default async function handler(req, res) {
  const componentsDir = path.join(process.cwd(), 'components');
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
        return res.json({ components: [] });
      }
      const files = fs.readdirSync(componentsDir);
      const components = files.filter(file => file.endsWith('.jsx') || file.endsWith('.tsx')).map(file => {
        const stats = fs.statSync(path.join(componentsDir, file));
        return {
          name: file.replace(/\.(jsx|tsx)$/, ''),
          path: `/components/${file}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      });
      res.json({ components });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, outputDir = 'components' } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: 'Bad Request', message: 'Component name and description are required' });
      }
      const input = JSON.stringify({ name, description, outputDir });
      const result = await runAgent(`Generate a React component using the ComponentGenerator tool with the following specifications: ${input}`);
      const componentPath = path.join(process.cwd(), outputDir, `${name}.jsx`);
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf8');
        const stats = fs.statSync(componentPath);
        res.status(201).json({
          success: true,
          component: {
            name,
            path: `/${outputDir}/${name}.jsx`,
            content,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          },
          message: `Component ${name} created successfully`
        });
      } else {
        res.status(500).json({ error: 'Component Creation Failed', message: 'The component file was not created', agentResult: result });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 