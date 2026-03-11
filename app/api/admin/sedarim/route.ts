import { NextResponse } from 'next/server';
import { getMetadata, saveMetadata } from '@/lib/metadata';
import type { Seder } from '@/types/daf';

export async function GET() {
  const metadata = await getMetadata();
  return NextResponse.json(metadata.sedarim);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !body.id || !body.hebrewName || !body.englishName) {
    return NextResponse.json({ error: 'id, hebrewName, englishName required' }, { status: 400 });
  }

  const metadata = await getMetadata();
  if (metadata.sedarim.find((s) => s.id === body.id)) {
    return NextResponse.json({ error: 'Seder already exists' }, { status: 409 });
  }

  const newSeder: Seder = {
    id: body.id,
    hebrewName: body.hebrewName,
    englishName: body.englishName,
    tractates: [],
  };
  metadata.sedarim.push(newSeder);
  await saveMetadata(metadata);

  return NextResponse.json(newSeder, { status: 201 });
}
