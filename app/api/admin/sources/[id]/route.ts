import { NextResponse } from 'next/server';
import { getSourceById, saveSource, deleteSource } from '@/lib/sources';
import type { Source } from '@/types/daf';

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const source = await getSourceById(params.id);
  if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(source);
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json().catch(() => null) as Partial<Source> | null;
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  const existing = await getSourceById(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated: Source = { ...existing, ...body, id: params.id };
  await saveSource(updated);

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  const existing = await getSourceById(params.id);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await deleteSource(params.id);
  return NextResponse.json({ ok: true });
}
