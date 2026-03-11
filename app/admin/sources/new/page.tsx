'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SourceType } from '@/types/daf';

const SOURCE_TYPES: SourceType[] = ['book', 'article', 'ruling', 'law', 'speech', 'letter'];

export default function NewSourcePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: '',
    author: '',
    title: '',
    year: '',
    type: 'book' as SourceType,
    originalText: '',
    englishTranslation: '',
    verified: false,
    notes: '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    });
    if (res.ok) {
      router.push('/admin/sources');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating source');
    }
    setSaving(false);
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Source</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">ID (slug)</label>
            <input className="input" value={form.id} onChange={(e) => set('id', e.target.value)} required dir="ltr" placeholder="e.g. herzl-altneuland-1902" />
          </div>
          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={(e) => set('type', e.target.value)}>
              {SOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Author</label>
          <input className="input" value={form.author} onChange={(e) => set('author', e.target.value)} required />
        </div>
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div>
          <label className="label">Year</label>
          <input className="input w-32" type="number" value={form.year} onChange={(e) => set('year', e.target.value)} dir="ltr" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Original Text (Hebrew)</label>
            <textarea className="input h-32 text-sm" value={form.originalText} onChange={(e) => set('originalText', e.target.value)} dir="rtl" />
          </div>
          <div>
            <label className="label">English Translation</label>
            <textarea className="input h-32 text-sm" value={form.englishTranslation} onChange={(e) => set('englishTranslation', e.target.value)} dir="ltr" />
          </div>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea className="input h-20 text-sm" value={form.notes} onChange={(e) => set('notes', e.target.value)} dir="ltr" />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={form.verified} onChange={(e) => set('verified', e.target.checked)} />
          Verified against primary source
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" disabled={saving} className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
          {saving ? 'Creating…' : 'Create Source'}
        </button>
      </form>
    </AdminLayout>
  );
}
