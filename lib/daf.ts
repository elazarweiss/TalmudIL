import { readFile } from 'fs/promises';
import path from 'path';
import type { DafData } from '@/types/daf';

export async function getDafData(
  seder: string,
  tractate: string,
  daf: string
): Promise<DafData> {
  const filePath = path.join(
    process.cwd(),
    'data',
    'sedarim',
    seder,
    tractate,
    `${daf}.json`
  );
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as DafData;
}
