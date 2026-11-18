import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export const NOTE_EXTENSIONS = ['.md', '.html'];
export const isNoteFile = (name: string) => NOTE_EXTENSIONS.some((ext) => name.endsWith(ext));

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
  const nodes: TreeNode[] = items.map((name) => {
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

  // Folders first, then files; each group sorted by name.
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  });
}

export function getStaticContent() {
  const files = getAllFiles(CONTENT_DIR);
  const contents: Record<string, string> = {};
  const tree = buildTree(CONTENT_DIR);

  for (const file of files) {
    if (isNoteFile(file)) {
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