import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import type { Source, SourceLibrary } from '@/types/daf';

const sourcesPath = path.join(process.cwd(), 'data', 'sources.json');

async function readLibrary(): Promise<SourceLibrary> {
  const raw = await readFile(sourcesPath, 'utf-8');
  return JSON.parse(raw) as SourceLibrary;
}

async function writeLibrary(lib: SourceLibrary): Promise<void> {
  await writeFile(sourcesPath, JSON.stringify(lib, null, 2), 'utf-8');
}

export async function getSources(): Promise<Source[]> {
  const lib = await readLibrary();
  return lib.sources;
}

export async function getSourceById(id: string): Promise<Source | null> {
  const lib = await readLibrary();
  return lib.sources.find((s) => s.id === id) ?? null;
}

export async function saveSource(source: Source): Promise<void> {
  const lib = await readLibrary();
  const idx = lib.sources.findIndex((s) => s.id === source.id);
  if (idx >= 0) {
    lib.sources[idx] = source;
  } else {
    lib.sources.push(source);
  }
  await writeLibrary(lib);
}

export async function deleteSource(id: string): Promise<void> {
  const lib = await readLibrary();
  lib.sources = lib.sources.filter((s) => s.id !== id);
  await writeLibrary(lib);
}
