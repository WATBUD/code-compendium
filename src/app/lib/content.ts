import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'content');

type TreeNode = {
  type: 'file' | 'folder';
  name: string;
  path: string;
  fullPath?: string;
  children?: TreeNode[];
};

export function getAllFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function buildTree(dir: string): TreeNode[] {
  const items = readdirSync(dir);
  return items.map((name) => {
    const fullPath = join(dir, name);
    const relPath = fullPath.replace(CONTENT_DIR, '').replace(/^\//, '');
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      return {
        type: 'folder',
        name,
        path: relPath,
        children: buildTree(fullPath),
      };
    } else {
      return {
        type: 'file',
        name,
        path: relPath,
      };
    }
  });
}

export function getStaticContent() {
  const files = getAllFiles(CONTENT_DIR);
  const contents: Record<string, string> = {};
  const tree = buildTree(CONTENT_DIR);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const relativePath = file.replace(CONTENT_DIR, '').replace(/^\//, '');
      const content = readFileSync(file, 'utf-8');
      contents[relativePath] = content;
    }
  }

  return {
    contents,
    tree
  };
} 