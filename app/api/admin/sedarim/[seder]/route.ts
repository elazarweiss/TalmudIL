import { NextResponse } from 'next/server';
import { getMetadata, saveMetadata } from '@/lib/metadata';

interface Params {
  params: { seder: string };
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const metadata = await getMetadata();
  const idx = metadata.sedarim.findIndex((s) => s.id === params.seder);
  if (idx < 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (body.hebrewName) metadata.sedarim[idx].hebrewName = body.hebrewName;
  if (body.englishName) metadata.sedarim[idx].englishName = body.englishName;
  await saveMetadata(metadata);

  return NextResponse.json(metadata.sedarim[idx]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const metadata = await getMetadata();
  const idx = metadata.sedarim.findIndex((s) => s.id === params.seder);
  if (idx < 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  metadata.sedarim.splice(idx, 1);
  await saveMetadata(metadata);

  return NextResponse.json({ ok: true });
}
