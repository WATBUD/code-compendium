import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();

export default function handler(req, res) {
  const { path: filePath } = req.query;

  if (!filePath) {
    return res.status(400).send('Missing path parameter');
  }

  const fullPath = path.join(baseDir, filePath);
  if (!fullPath.startsWith(baseDir)) {
    return res.status(403).send('Access denied');
  }

  try {
    const data = fs.readFileSync(fullPath, 'utf8');
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send('File not found');
  }
} 