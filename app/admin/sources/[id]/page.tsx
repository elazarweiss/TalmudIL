'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Source, SourceType } from '@/types/daf';

const SOURCE_TYPES: SourceType[] = ['book', 'article', 'ruling', 'law', 'speech', 'letter'];

export default function EditSourcePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Source | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/sources/${params.id}`)
      .then((r) => r.json())
      .then((s: Source) => setForm(s));
  }, [params.id]);

  function set(key: keyof Source, value: string | boolean | number) {
    setForm((f) => f ? { ...f, [key]: value } : f);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError('');
    const res = await fetch(`/api/admin/sources/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin/sources');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error saving');
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this source?')) return;
    setDeleting(true);
    await fetch(`/api/admin/sources/${params.id}`, { method: 'DELETE' });
    router.push('/admin/sources');
  }

  if (!form) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Source: {params.id}</h1>
      <form onSubmit={handleSave} className="bg-white rounded shadow p-6 max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={(e) => set('type', e.target.value as SourceType)}>
              {SOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Year</label>
            <input className="input" type="number" value={form.year} onChange={(e) => set('year', Number(e.target.value))} dir="ltr" />
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Original Text (Hebrew)</label>
            <textarea className="input h-40 text-sm" value={form.originalText} onChange={(e) => set('originalText', e.target.value)} dir="rtl" />
          </div>
          <div>
            <label className="label">English Translation</label>
            <textarea className="input h-40 text-sm" value={form.englishTranslation} onChange={(e) => set('englishTranslation', e.target.value)} dir="ltr" />
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
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Source'}
          </button>
          <button type="button" onClick={handleDelete} disabled={deleting} className="bg-red-100 text-red-700 rounded px-4 py-2 text-sm font-medium hover:bg-red-200 disabled:opacity-50">
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
