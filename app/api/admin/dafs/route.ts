import { NextResponse } from 'next/server';
import { listAllDafs, saveDafData } from '@/lib/daf';
import { getMetadata, saveMetadata } from '@/lib/metadata';
import type { DafData } from '@/types/daf';

export async function GET() {
  const dafs = await listAllDafs();
  return NextResponse.json(dafs);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.seder || !body.tractate || !body.daf) {
    return NextResponse.json({ error: 'seder, tractate, daf required' }, { status: 400 });
  }

  const { seder, tractate, daf } = body as { seder: string; tractate: string; daf: string };

  // Validate seder/tractate exist in metadata
  const metadata = await getMetadata();
  const sederObj = metadata.sedarim.find((s) => s.id === seder);
  if (!sederObj) return NextResponse.json({ error: 'Seder not found' }, { status: 404 });
  const tractateObj = sederObj.tractates.find((t) => t.id === tractate);
  if (!tractateObj) return NextResponse.json({ error: 'Tractate not found' }, { status: 404 });
  if (tractateObj.dafs.includes(daf)) {
    return NextResponse.json({ error: 'Daf already exists' }, { status: 409 });
  }

  // Create blank daf JSON
  const blank: DafData = {
    seder,
    tractate,
    daf,
    mishnah: [],
    gemara: [],
    tosafot: [],
    rashi: [],
  };
  await saveDafData(seder, tractate, daf, blank);

  // Register in metadata
  tractateObj.dafs.push(daf);
  await saveMetadata(metadata);

  return NextResponse.json(blank, { status: 201 });
}
