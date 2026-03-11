'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewSederPage() {
  const router = useRouter();
  const [form, setForm] = useState({ id: '', hebrewName: '', englishName: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/sedarim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating seder');
    }
    setSaving(false);
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Seder</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-lg space-y-4">
        <Field label="ID (slug)" hint="e.g. religion-and-state">
          <input
            className="input"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            required
            dir="ltr"
          />
        </Field>
        <Field label="Hebrew Name">
          <input
            className="input"
            value={form.hebrewName}
            onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
            required
            dir="rtl"
          />
        </Field>
        <Field label="English Name">
          <input
            className="input"
            value={form.englishName}
            onChange={(e) => setForm({ ...form, englishName: e.target.value })}
            required
            dir="ltr"
          />
        </Field>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Seder'}
        </button>
      </form>
    </AdminLayout>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {hint && <span className="text-gray-400 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
