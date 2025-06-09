import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function walk(dir: string): any {
  const files = fs.readdirSync(dir);
  return files.map((name) => {
    const fullPath = path.join(dir, name);
    const relPath = path.relative(CONTENT_DIR, fullPath);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      return {
        type: 'folder',
        name,
        path: relPath,
        children: walk(fullPath),
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

export async function GET() {
  const tree = walk(CONTENT_DIR);
  return NextResponse.json(tree);
} 