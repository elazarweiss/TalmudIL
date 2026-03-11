import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { Metadata } from '@/types/daf';

const metadataPath = path.join(process.cwd(), 'data', 'metadata.json');

export async function getMetadata(): Promise<Metadata> {
  const raw = await readFile(metadataPath, 'utf-8');
  return JSON.parse(raw) as Metadata;
}

export async function saveMetadata(data: Metadata): Promise<void> {
  await writeFile(metadataPath, JSON.stringify(data, null, 2), 'utf-8');
}
