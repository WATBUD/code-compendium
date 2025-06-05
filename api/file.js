import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

export default function handler(req, res) {
  const { path: filePath } = req.query;

  if (!filePath) {
    return res.status(400).json({ error: 'Missing path parameter' });
  }

  // Ensure the path is safe and within the project directory
  const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const fullPath = path.join(baseDir, safePath);

  // Verify the file exists and is a markdown file
  if (!fullPath.endsWith('.md')) {
    return res.status(400).json({ error: 'Only markdown files are allowed' });
  }

  try {
    const data = fs.readFileSync(fullPath, 'utf8');
    res.status(200).send(data);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(404).json({ error: 'File not found' });
  }
} 