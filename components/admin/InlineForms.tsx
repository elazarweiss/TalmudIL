'use client';

import { useState, useEffect } from 'react';
import type { Seder, Tractate } from '@/types/daf';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{' '}
        {hint && <span className="text-gray-400 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

// ---- New Seder ----
export function NewSederForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
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
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating seder');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Seder'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---- New Tractate ----
export function NewTractateForm({
  sederId,
  onSuccess,
  onCancel,
}: {
  sederId: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ id: '', hebrewName: '', englishName: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(`/api/admin/sedarim/${sederId}/tractates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating tractate');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <p className="text-sm text-gray-500">
        Seder: <span className="font-mono text-blue-700">{sederId}</span>
      </p>
      <Field label="ID (slug)" hint="e.g. shabbat">
        <input
          className="input"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          required
          dir="ltr"
          placeholder="e.g. shabbat"
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
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Tractate'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---- New Daf ----
export function NewDafForm({
  sedarim,
  sederId,
  tractateId,
  onSuccess,
  onCancel,
}: {
  sedarim: Seder[];
  sederId?: string;
  tractateId?: string;
  onSuccess: (seder: string, tractate: string, daf: string) => void;
  onCancel: () => void;
}) {
  const [selectedSeder, setSelectedSeder] = useState(sederId ?? '');
  const [selectedTractate, setSelectedTractate] = useState(tractateId ?? '');
  const [daf, setDaf] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const tractates: Tractate[] =
    sedarim.find((s) => s.id === selectedSeder)?.tractates ?? [];

  // Keep tractate in sync when seder changes
  useEffect(() => {
    if (!tractateId) setSelectedTractate('');
  }, [selectedSeder, tractateId]);

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
      onSuccess(selectedSeder, selectedTractate, daf);
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error creating daf');
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <Field label="Seder">
        <select
          className="input"
          value={selectedSeder}
          onChange={(e) => {
            setSelectedSeder(e.target.value);
            setSelectedTractate('');
          }}
          required
        >
          <option value="">Select a seder…</option>
          {sedarim.map((s) => (
            <option key={s.id} value={s.id}>
              {s.englishName} — {s.hebrewName}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tractate">
        <select
          className="input"
          value={selectedTractate}
          onChange={(e) => setSelectedTractate(e.target.value)}
          required
          disabled={!selectedSeder}
        >
          <option value="">Select a tractate…</option>
          {tractates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.englishName} — {t.hebrewName}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Daf ID" hint="e.g. 1a, 2b">
        <input
          className="input"
          value={daf}
          onChange={(e) => setDaf(e.target.value)}
          required
          dir="ltr"
          placeholder="e.g. 1a, 2b"
        />
      </Field>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Daf'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ---- Edit Seder ----
export function EditSederPanel({
  sederId,
  sedarim,
  onSuccess,
  onCancel,
  onDelete,
}: {
  sederId: string;
  sedarim: Seder[];
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const seder = sedarim.find((s) => s.id === sederId);
  const [form, setForm] = useState({
    hebrewName: seder?.hebrewName ?? '',
    englishName: seder?.englishName ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Sync form when seder data loads
  useEffect(() => {
    if (seder) {
      setForm({ hebrewName: seder.hebrewName, englishName: seder.englishName });
    }
  }, [seder]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await fetch(`/api/admin/sedarim/${sederId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error ?? 'Error saving');
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm('Delete this seder and all its tractates?')) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/sedarim/${sederId}`, { method: 'DELETE' });
    if (res.ok) {
      onDelete();
    } else {
      setError('Error deleting');
      setDeleting(false);
    }
  }

  if (!seder) {
    return <p className="text-gray-400 text-sm">Seder not found.</p>;
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded shadow p-6 space-y-4">
      <p className="text-sm text-gray-500">
        ID: <span className="font-mono text-blue-700">{sederId}</span>
      </p>
      <Field label="Hebrew Name">
        <input
          className="input"
          value={form.hebrewName}
          onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
          dir="rtl"
          required
        />
      </Field>
      <Field label="English Name">
        <input
          className="input"
          value={form.englishName}
          onChange={(e) => setForm({ ...form, englishName: e.target.value })}
          dir="ltr"
          required
        />
      </Field>
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
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto bg-red-100 text-red-700 rounded px-4 py-2 text-sm font-medium hover:bg-red-200 disabled:opacity-50"
        >
          {deleting ? 'Deleting…' : 'Delete Seder'}
        </button>
      </div>
    </form>
  );
}
