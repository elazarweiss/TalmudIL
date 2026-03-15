'use client';

import { useState } from 'react';
import type {
  DafData,
  MishnahEntry,
  GemaraEntry,
  TosafotEntry,
  RashiEntry,
} from '@/types/daf';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';
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
  entriesLabel: string;
  addLabel: string;
  entries: T[];
  renderEntry: (entry: T, onChange: (e: T) => void, onDelete: () => void) => React.ReactNode;
  onAdd: () => void;
  onChangeAll: (entries: T[]) => void;
  defaultOpen?: boolean;
  summaryBg: string;
  borderAccent: string;
  accentText: string;
}

function Section<T extends { id: string }>({
  title,
  entriesLabel,
  addLabel,
  entries,
  renderEntry,
  onAdd,
  onChangeAll,
  defaultOpen = true,
  summaryBg,
  borderAccent,
  accentText,
}: SectionProps<T>) {
  return (
    <details open={defaultOpen} className={`border rounded mb-4 border-l-4 ${borderAccent}`}>
      <summary className={`flex justify-between items-center px-4 py-3 ${summaryBg} hover:brightness-95 cursor-pointer`}>
        <span className={`font-serif font-semibold ${accentText} flex items-center gap-2`}>
          <svg
            className="accordion-chevron w-3 h-3 opacity-60"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2l4 3-4 3" />
          </svg>
          {title}
        </span>
        <span className={`font-sans text-sm opacity-60 ${accentText}`}>{entries.length} {entriesLabel}</span>
      </summary>

      <div className="p-4 space-y-3 bg-white/40">
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
          className={`font-sans text-sm ${summaryBg} hover:brightness-95 rounded px-3 py-1.5 ${accentText} border ${borderAccent} opacity-80 hover:opacity-100 transition-opacity`}
        >
          {addLabel}
        </button>
      </div>
    </details>
  );
}

export default function DafEditor({
  initial,
  seder,
  tractate,
  daf,
  lang,
}: {
  initial: DafData;
  seder: string;
  tractate: string;
  daf: string;
  lang: Lang;
}) {
  const t = getT(lang);
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
      setError(t.saveFailed);
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Section<MishnahEntry>
        title={t.mishnah}
        entriesLabel={t.entries}
        addLabel={t.addEntry}
        entries={data.mishnah}
        defaultOpen={true}
        summaryBg="bg-mishnah-light"
        borderAccent="border-mishnah"
        accentText="text-mishnah"
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
          <MishnahForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} lang={lang} />
        )}
      />

      <Section<GemaraEntry>
        title={t.gemara}
        entriesLabel={t.entries}
        addLabel={t.addEntry}
        entries={data.gemara}
        defaultOpen={true}
        summaryBg="bg-gemara-light"
        borderAccent="border-gemara"
        accentText="text-gemara"
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
          <GemaraForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} lang={lang} />
        )}
      />

      <Section<TosafotEntry>
        title={t.tosafot}
        entriesLabel={t.entries}
        addLabel={t.addEntry}
        entries={data.tosafot}
        defaultOpen={false}
        summaryBg="bg-tosafot-light"
        borderAccent="border-tosafot"
        accentText="text-tosafot"
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
          <TosafotForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} lang={lang} />
        )}
      />

      <Section<RashiEntry>
        title={t.rashi}
        entriesLabel={t.entries}
        addLabel={t.addEntry}
        entries={data.rashi}
        defaultOpen={false}
        summaryBg="bg-rashi-light"
        borderAccent="border-rashi"
        accentText="text-rashi"
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
          <RashiForm key={entry.id} entry={entry} onChange={onChange} onDelete={onDelete} lang={lang} />
        )}
      />

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="font-sans bg-mishnah text-parchment-100 rounded px-5 py-2 text-sm font-medium hover:bg-mishnah/90 disabled:opacity-50 transition-colors"
        >
          {saving ? t.saving : t.saveDaf}
        </button>
        {saved && <span className="font-sans text-green-700 text-sm">{t.saved}</span>}
        {error && <span className="font-sans text-red-600 text-sm">{error}</span>}
      </div>
    </div>
  );
}
