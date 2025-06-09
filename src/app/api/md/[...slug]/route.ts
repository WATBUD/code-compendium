import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function GET(req: Request, { params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];
  const filePath = path.join(CONTENT_DIR, ...slug);
  if (!filePath.endsWith('.md')) {
    return NextResponse.json({ error: 'Only markdown files allowed' }, { status: 400 });
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
} 