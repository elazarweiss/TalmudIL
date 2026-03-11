'use client';

import { useState } from 'react';
import type {
  DafData,
  MishnahEntry,
  GemaraEntry,
  TosafotEntry,
  RashiEntry,
} from '@/types/daf';
import {
  MishnahForm,
  GemaraForm,
  TosafotForm,
  RashiForm,
} from './EntryForm';

function makeId(prefix: string, list: { id: string }[]) {
  const nums = list
    .map((e) => parseInt(e.id.replace(/\D/g, ''), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${prefix}${next}`;
}

interface SectionProps<T extends { id: string }> {
  title: string;
  entries: T[];
  renderEntry: (entry: T, onChange: (e: T) => void, onDelete: () => void) => React.ReactNode;
  onAdd: () => void;
  onChangeAll: (entries: T[]) => void;
}

function Section<T extends { id: string }>({
  title,
  entries,
  renderEntry,
  onAdd,
  onChangeAll,
}: SectionProps<T>) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border rounded mb-4">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-semibold text-gray-700">{title}</span>
        <span className="text-gray-400 text-sm">{open ? '▲' : '▼'} {entries.length} entries</span>
      </button>

      {open && (
        <div className="p-4 space-y-3">
          {entries.map((entry) =>
            renderEntry(
              entry,
              (updated) => onChangeAll(entries.map((e) => (e.id === entry.id ? updated : e))),
              () => onChangeAll(entries.filter((e) => e.id !== entry.id))
            )
          )}
          <button
            type="button"
            onClick={onAdd}
            className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1.5"
          >
            + Add entry
          </button>
        </div>
      )}
    </div>
  );
}

export default function DafEditor({
  initial,
  seder,
  tractate,
  daf,
}: {
  initial: DafData;
  seder: string;
  tractate: string;
  daf: string;
}) {
  const [data, setData] = useState<DafData>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);
    const res = await fetch(`/api/admin/dafs/${seder}/${tractate}/${daf}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError('Save failed');
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Section<MishnahEntry>
        title="Mishnah"
        entries={data.mishnah}
        onChangeAll={(mishnah) => setData({ ...data, mishnah })}
        onAdd={() =>
          setData({
            ...data,
            mishnah: [
              ...data.mishnah,
              { id: makeId('m', data.mishnah), text: '', he: '', verified: false },
            ],
          })
        }
        renderEntry={(entry, onChange, onDelete) => (
          <MishnahForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} />
        )}
      />

      <Section<GemaraEntry>
        title="Gemara"
        entries={data.gemara}
        onChangeAll={(gemara) => setData({ ...data, gemara })}
        onAdd={() =>
          setData({
            ...data,
            gemara: [
              ...data.gemara,
              {
                id: makeId('g', data.gemara),
                speaker: '',
                text: '',
                he: '',
                source: '',
                verified: false,
              },
            ],
          })
        }
        renderEntry={(entry, onChange, onDelete) => (
          <GemaraForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} />
        )}
      />

      <Section<TosafotEntry>
        title="Tosafot"
        entries={data.tosafot}
        onChangeAll={(tosafot) => setData({ ...data, tosafot })}
        onAdd={() =>
          setData({
            ...data,
            tosafot: [
              ...data.tosafot,
              {
                id: makeId('t', data.tosafot),
                title: '',
                caseRef: '',
                text: '',
                he: '',
                verified: false,
              },
            ],
          })
        }
        renderEntry={(entry, onChange, onDelete) => (
          <TosafotForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} />
        )}
      />

      <Section<RashiEntry>
        title="Rashi"
        entries={data.rashi}
        onChangeAll={(rashi) => setData({ ...data, rashi })}
        onAdd={() =>
          setData({
            ...data,
            rashi: [
              ...data.rashi,
              {
                id: makeId('r', data.rashi),
                author: '',
                source: '',
                text: '',
                he: '',
                verified: false,
              },
            ],
          })
        }
        renderEntry={(entry, onChange, onDelete) => (
          <RashiForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} />
        )}
      />

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white rounded px-5 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Daf'}
        </button>
        {saved && <span className="text-green-600 text-sm">Saved!</span>}
        {error && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </div>
  );
}
