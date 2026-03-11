import { readFile, writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import type { DafData, DafRef } from '@/types/daf';
import { getMetadata } from '@/lib/metadata';

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

export async function saveDafData(
  seder: string,
  tractate: string,
  daf: string,
  data: DafData
): Promise<void> {
  const dir = path.join(process.cwd(), 'data', 'sedarim', seder, tractate);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${daf}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function deleteDafData(
  seder: string,
  tractate: string,
  daf: string
): Promise<void> {
  const filePath = path.join(
    process.cwd(),
    'data',
    'sedarim',
    seder,
    tractate,
    `${daf}.json`
  );
  await unlink(filePath);
}

export async function listAllDafs(): Promise<DafRef[]> {
  const metadata = await getMetadata();
  const refs: DafRef[] = [];
  for (const seder of metadata.sedarim) {
    for (const tractate of seder.tractates) {
      for (const daf of tractate.dafs) {
        refs.push({ seder: seder.id, tractate: tractate.id, daf });
      }
    }
  }
  return refs;
}
