import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getStaticContent } from '@/app/lib/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const staticContent = getStaticContent();

function searchInFile(filePath: string, searchTerm: string): { path: string; content: string[] } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const matches: string[] = [];

    lines.forEach((line) => {
      if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
        matches.push(line.trim());
      }
    });

    if (matches.length > 0) {
      const relativePath = path.relative(CONTENT_DIR, filePath);
      return {
        path: relativePath,
        content: matches
      };
    }

    return { path: '', content: [] };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return { path: '', content: [] };
  }
}

function walkDir(dir: string, searchTerm: string): { path: string; content: string[] }[] {
  let results: { path: string; content: string[] }[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath, searchTerm));
    } else if (file.endsWith('.md') || file.endsWith('.sol')) {
      const fileResults = searchInFile(filePath, searchTerm);
      if (fileResults.content.length > 0) {
        results.push(fileResults);
      }
    }
  }

  return results;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = Object.entries(staticContent.contents)
    .map(([path, content]) => {
      const lines = content.split('\n');
      const matches = lines.filter(line => 
        line.toLowerCase().includes(query.toLowerCase())
      );
      
      if (matches.length > 0) {
        return {
          path,
          content: matches
        };
      }
      return null;
    })
    .filter((result): result is { path: string; content: string[] } => result !== null);

  return NextResponse.json({ results });
} 