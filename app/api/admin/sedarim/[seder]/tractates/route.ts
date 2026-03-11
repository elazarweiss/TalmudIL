import { NextResponse } from 'next/server';
import { getMetadata, saveMetadata } from '@/lib/metadata';
import { mkdir } from 'fs/promises';
import path from 'path';
import type { Tractate } from '@/types/daf';

interface Params {
  params: { seder: string };
}

export async function POST(request: Request, { params }: Params) {
  const body = await request.json().catch(() => null);
  if (!body || !body.id || !body.hebrewName || !body.englishName) {
    return NextResponse.json({ error: 'id, hebrewName, englishName required' }, { status: 400 });
  }

  const metadata = await getMetadata();
  const seder = metadata.sedarim.find((s) => s.id === params.seder);
  if (!seder) return NextResponse.json({ error: 'Seder not found' }, { status: 404 });

  if (seder.tractates.find((t) => t.id === body.id)) {
    return NextResponse.json({ error: 'Tractate already exists' }, { status: 409 });
  }

  const newTractate: Tractate = {
    id: body.id,
    hebrewName: body.hebrewName,
    englishName: body.englishName,
    dafs: [],
  };
  seder.tractates.push(newTractate);
  await saveMetadata(metadata);

  // Create the directory on disk
  const dir = path.join(process.cwd(), 'data', 'sedarim', params.seder, body.id);
  await mkdir(dir, { recursive: true });

  return NextResponse.json(newTractate, { status: 201 });
}
