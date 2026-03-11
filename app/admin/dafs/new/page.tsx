'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Seder, Tractate } from '@/types/daf';

export default function NewDafPage() {
  const router = useRouter();
  const [sedarim, setSedarim] = useState<Seder[]>([]);
  const [selectedSeder, setSelectedSeder] = useState('');
  const [selectedTractate, setSelectedTractate] = useState('');
  const [daf, setDaf] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/sedarim').then((r) => r.json()).then(setSedarim);
  }, []);

  const tractates: Tractate[] =
    sedarim.find((s) => s.id === selectedSeder)?.tractates ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/dafs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seder: selectedSeder, tractate: selectedTractate, daf }),
    });
    if (res.ok) {
      router.push(`/admin/dafs/${selectedSeder}/${selectedTractate}/${daf}`);
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating daf');
    }
    setSaving(false);
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Daf</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seder</label>
          <select
            className="input"
            value={selectedSeder}
            onChange={(e) => { setSelectedSeder(e.target.value); setSelectedTractate(''); }}
            required
          >
            <option value="">Select a seder…</option>
            {sedarim.map((s) => (
              <option key={s.id} value={s.id}>{s.englishName} — {s.hebrewName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tractate</label>
          <select
            className="input"
            value={selectedTractate}
            onChange={(e) => setSelectedTractate(e.target.value)}
            required
            disabled={!selectedSeder}
          >
            <option value="">Select a tractate…</option>
            {tractates.map((t) => (
              <option key={t.id} value={t.id}>{t.englishName} — {t.hebrewName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Daf ID</label>
          <input
            className="input"
            value={daf}
            onChange={(e) => setDaf(e.target.value)}
            required
            dir="ltr"
            placeholder="e.g. 1a, 2b"
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Daf'}
        </button>
      </form>
    </AdminLayout>
  );
}
