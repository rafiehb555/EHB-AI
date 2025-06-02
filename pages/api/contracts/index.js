import fs from 'fs';
import path from 'path';

function getERC20Template(contractName, options = {}) {
  // ... (template logic, can be imported or copied from legacy)
  return `// ERC20 contract template for ${contractName}`;
}
function getERC721Template(contractName, options = {}) {
  return `// ERC721 contract template for ${contractName}`;
}
function getERC1155Template(contractName, options = {}) {
  return `// ERC1155 contract template for ${contractName}`;
}
function getCustomTemplate(contractName, options = {}) {
  return `// Custom contract template for ${contractName}`;
}

export default function handler(req, res) {
  const contractsDir = path.join(process.cwd(), 'contracts');
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir, { recursive: true });
        return res.json({ contracts: [] });
      }
      const files = fs.readdirSync(contractsDir);
      const contracts = files.filter(file => file.endsWith('.sol')).map(file => {
        const stats = fs.statSync(path.join(contractsDir, file));
        return {
          name: file.replace('.sol', ''),
          path: `/contracts/${file}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      });
      res.json({ contracts });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, type = 'custom', options = {} } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Bad Request', message: 'Contract name is required' });
      }
      const filePath = path.join(contractsDir, `${name}.sol`);
      if (fs.existsSync(filePath)) {
        return res.status(409).json({ error: 'Conflict', message: `Contract ${name} already exists` });
      }
      if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir, { recursive: true });
      }
      let templateContent = '';
      switch (type.toLowerCase()) {
        case 'erc20': templateContent = getERC20Template(name, options); break;
        case 'erc721': templateContent = getERC721Template(name, options); break;
        case 'erc1155': templateContent = getERC1155Template(name, options); break;
        case 'custom': default: templateContent = getCustomTemplate(name, options); break;
      }
      fs.writeFileSync(filePath, templateContent);
      const stats = fs.statSync(filePath);
      res.status(201).json({
        success: true,
        contract: {
          name,
          path: `/contracts/${name}.sol`,
          content: templateContent,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          type
        },
        message: `Contract ${name} created successfully`
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 