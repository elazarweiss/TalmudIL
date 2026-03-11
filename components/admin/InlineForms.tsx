'use client';

import { useState, useEffect } from 'react';
import type { Seder, Tractate } from '@/types/daf';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';

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
  lang,
}: {
  onSuccess: () => void;
  onCancel: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
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
      setError(data.error ?? t.errorSeder);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <Field label={t.idSlug} hint={t.idHintSeder}>
        <input
          className="input"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          required
          dir="ltr"
        />
      </Field>
      <Field label={t.hebrewName}>
        <input
          className="input"
          value={form.hebrewName}
          onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
          required
          dir="rtl"
        />
      </Field>
      <Field label={t.englishName}>
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
          {saving ? t.saving : t.createSeder}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {t.cancel}
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
  lang,
}: {
  sederId: string;
  onSuccess: () => void;
  onCancel: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
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
      setError(data.error ?? t.errorTractate);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <p className="text-sm text-gray-500">
        {t.sederLabel}: <span className="font-mono text-blue-700">{sederId}</span>
      </p>
      <Field label={t.idSlug} hint={t.idHintTractate}>
        <input
          className="input"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          required
          dir="ltr"
          placeholder={t.idHintTractate}
        />
      </Field>
      <Field label={t.hebrewName}>
        <input
          className="input"
          value={form.hebrewName}
          onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
          required
          dir="rtl"
        />
      </Field>
      <Field label={t.englishName}>
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
          {saving ? t.saving : t.createTractate}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {t.cancel}
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
  lang,
}: {
  sedarim: Seder[];
  sederId?: string;
  tractateId?: string;
  onSuccess: (seder: string, tractate: string, daf: string) => void;
  onCancel: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  const [selectedSeder, setSelectedSeder] = useState(sederId ?? '');
  const [selectedTractate, setSelectedTractate] = useState(tractateId ?? '');
  const [daf, setDaf] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const tractates: Tractate[] =
    sedarim.find((s) => s.id === selectedSeder)?.tractates ?? [];

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
      setError(data.error ?? t.errorDaf);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
      <Field label={t.sederLabel}>
        <select
          className="input"
          value={selectedSeder}
          onChange={(e) => {
            setSelectedSeder(e.target.value);
            setSelectedTractate('');
          }}
          required
        >
          <option value="">{t.selectSeder}</option>
          {sedarim.map((s) => (
            <option key={s.id} value={s.id}>
              {s.englishName} — {s.hebrewName}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.tractateLabel}>
        <select
          className="input"
          value={selectedTractate}
          onChange={(e) => setSelectedTractate(e.target.value)}
          required
          disabled={!selectedSeder}
        >
          <option value="">{t.selectTractate}</option>
          {tractates.map((t2) => (
            <option key={t2.id} value={t2.id}>
              {t2.englishName} — {t2.hebrewName}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.dafId} hint={t.idHintDaf}>
        <input
          className="input"
          value={daf}
          onChange={(e) => setDaf(e.target.value)}
          required
          dir="ltr"
          placeholder={t.idHintDaf}
        />
      </Field>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? t.saving : t.createDaf}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {t.cancel}
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
  lang,
}: {
  sederId: string;
  sedarim: Seder[];
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  const seder = sedarim.find((s) => s.id === sederId);
  const [form, setForm] = useState({
    hebrewName: seder?.hebrewName ?? '',
    englishName: seder?.englishName ?? '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      setError(data.error ?? t.errorSave);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm(t.confirmDelete)) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/sedarim/${sederId}`, { method: 'DELETE' });
    if (res.ok) {
      onDelete();
    } else {
      setError(t.errorDelete);
      setDeleting(false);
    }
  }

  if (!seder) {
    return <p className="text-gray-400 text-sm">{t.sederNotFound}</p>;
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded shadow p-6 space-y-4">
      <p className="text-sm text-gray-500">
        ID: <span className="font-mono text-blue-700">{sederId}</span>
      </p>
      <Field label={t.hebrewName}>
        <input
          className="input"
          value={form.hebrewName}
          onChange={(e) => setForm({ ...form, hebrewName: e.target.value })}
          dir="rtl"
          required
        />
      </Field>
      <Field label={t.englishName}>
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
          {saving ? t.saving : t.save}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 text-gray-700 rounded px-4 py-2 text-sm font-medium hover:bg-gray-200"
        >
          {t.cancel}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto bg-red-100 text-red-700 rounded px-4 py-2 text-sm font-medium hover:bg-red-200 disabled:opacity-50"
        >
          {deleting ? t.deleting : t.deleteSeder}
        </button>
      </div>
    </form>
  );
}
