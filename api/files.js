import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..', 'public');

console.log('API files.js loaded');
console.log('Current directory:', __dirname);
console.log('Base directory:', baseDir);

function getFiles(dir, prefix = '') {
  let results = [];
  try {
    console.log('Reading directory:', dir);
    const list = fs.readdirSync(dir, { withFileTypes: true });
    console.log('Found items:', list.length);
    
    for (const file of list) {
      if (file.isDirectory()) {
        const subDir = path.join(dir, file.name);
        console.log('Entering subdirectory:', subDir);
        results = results.concat(getFiles(subDir, path.join(prefix, file.name)));
      } else if (file.name.endsWith('.md')) {
        const filePath = path.join(prefix, file.name).replace(/\\/g, '/');
        console.log('Found markdown file:', filePath);
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error('Error reading directory:', dir, error);
  }
  return results;
}

export default function handler(req, res) {
  console.log('API request received at /api/files');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  
  try {
    const files = getFiles(baseDir);
    console.log('Found files:', files);
    res.status(200).json(files);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ 
      error: 'Failed to read files', 
      details: error.message,
      stack: error.stack
    });
  }
} 