import { NextResponse } from 'next/server';
import { getDafData, saveDafData, deleteDafData } from '@/lib/daf';
import { getMetadata, saveMetadata } from '@/lib/metadata';
import type { DafData } from '@/types/daf';

interface Params {
  params: { seder: string; tractate: string; daf: string };
}

export async function GET(_request: Request, { params }: Params) {
  try {
    const data = await getDafData(params.seder, params.tractate, params.daf);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json().catch(() => null) as DafData | null;
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  await saveDafData(params.seder, params.tractate, params.daf, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await deleteDafData(params.seder, params.tractate, params.daf);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Remove from metadata
  const metadata = await getMetadata();
  const seder = metadata.sedarim.find((s) => s.id === params.seder);
  if (seder) {
    const tractate = seder.tractates.find((t) => t.id === params.tractate);
    if (tractate) {
      tractate.dafs = tractate.dafs.filter((d) => d !== params.daf);
      await saveMetadata(metadata);
    }
  }

  return NextResponse.json({ ok: true });
}
