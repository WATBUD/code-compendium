import fs from 'fs';
import path from 'path';

const baseDir = process.cwd();
const ignoreDirs = ['.git', 'node_modules'];

function getFiles(dir, prefix = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  list.forEach(file => {
    if (file.isDirectory()) {
      if (!ignoreDirs.includes(file.name)) {
        results = results.concat(getFiles(path.join(dir, file.name), path.join(prefix, file.name)));
      }
    } else {
      if (file.name.toLowerCase().endsWith('.md')) {
        results.push(path.join(prefix, file.name).replace(/\\/g, '/'));
      }
    }
  });
  return results;
}

export default function handler(req, res) {
  const files = getFiles(baseDir);
  res.status(200).json(files);
} 