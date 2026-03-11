import { NextResponse } from 'next/server';
import { getSources, saveSource } from '@/lib/sources';
import type { Source } from '@/types/daf';

export async function GET() {
  const sources = await getSources();
  return NextResponse.json(sources);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Source | null;
  if (!body || !body.id || !body.author || !body.title) {
    return NextResponse.json({ error: 'id, author, title required' }, { status: 400 });
  }

  const existing = await getSources();
  if (existing.find((s) => s.id === body.id)) {
    return NextResponse.json({ error: 'Source already exists' }, { status: 409 });
  }

  const source: Source = {
    id: body.id,
    author: body.author,
    title: body.title,
    year: body.year ?? 0,
    type: body.type ?? 'book',
    originalText: body.originalText ?? '',
    englishTranslation: body.englishTranslation ?? '',
    verified: body.verified ?? false,
    notes: body.notes ?? '',
  };
  await saveSource(source);

  return NextResponse.json(source, { status: 201 });
}
