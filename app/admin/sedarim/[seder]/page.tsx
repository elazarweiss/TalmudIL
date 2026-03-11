'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { Seder } from '@/types/daf';

export default function EditSederPage() {
  const params = useParams<{ seder: string }>();
  const router = useRouter();
  const [form, setForm] = useState({ hebrewName: '', englishName: '' });
  const [seder, setSeder] = useState<Seder | null>(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch('/api/admin/sedarim')
      .then((r) => r.json())
      .then((sedarim: Seder[]) => {
        const found = sedarim.find((s) => s.id === params.seder);
        if (found) {
          setSeder(found);
          setForm({ hebrewName: found.hebrewName, englishName: found.englishName });
        }
      });
  }, [params.seder]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(`/api/admin/sedarim/${params.seder}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error saving');
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this seder and all its tractates?')) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/sedarim/${params.seder}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Error deleting');
      setDeleting(false);
    }
  }

  if (!seder) return <AdminLayout><p className="text-gray-400">Loading…</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Seder: {seder.id}</h1>
      <form onSubmit={handleSave} className="bg-white rounded shadow p-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hebrew Name</label>
          <input
            className="input"
            value={form.hebrewName}
            onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
            dir="rtl"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">English Name</label>
          <input
            className="input"
            value={form.englishName}
            onChange={(e) => setForm({ ...form, englishName: e.target.value })}
            dir="ltr"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-100 text-red-700 rounded px-4 py-2 text-sm font-medium hover:bg-red-200 disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete Seder'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
