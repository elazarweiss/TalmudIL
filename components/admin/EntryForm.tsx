'use client';

import type {
  MishnahEntry,
  GemaraEntry,
  TosafotEntry,
  RashiEntry,
} from '@/types/daf';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';
import SourcePicker from './SourcePicker';

// ---- Generic bilingual textarea pair ----
function BilingualFields({
  heLabel,
  enLabel,
  heValue,
  enValue,
  onHeChange,
  onEnChange,
}: {
  heLabel: string;
  enLabel: string;
  heValue: string;
  enValue: string;
  onHeChange: (v: string) => void;
  onEnChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block font-sans text-xs text-ink/60 mb-1">{heLabel}</label>
        <textarea
          className="w-full h-32 resize-y rounded-md border border-border bg-parchment-50 px-3 py-2 text-sm focus:border-mishnah focus:ring-1 focus:ring-mishnah/30 focus:outline-none"
          value={heValue}
          onChange={(e) => onHeChange(e.target.value)}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block font-sans text-xs text-ink/60 mb-1">{enLabel}</label>
        <textarea
          className="w-full h-32 resize-y rounded-md border border-border bg-parchment-50 px-3 py-2 text-sm focus:border-mishnah focus:ring-1 focus:ring-mishnah/30 focus:outline-none"
          value={enValue}
          onChange={(e) => onEnChange(e.target.value)}
          dir="ltr"
        />
      </div>
    </div>
  );
}

function CardHeader({
  id,
  verified,
  verifiedLabel,
  deleteLabel,
  onVerifiedChange,
  onDelete,
}: {
  id: string;
  verified: boolean;
  verifiedLabel: string;
  deleteLabel: string;
  onVerifiedChange: (v: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-sans text-xs font-mono text-ink/40">{id}</span>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1 font-sans text-xs text-ink/60 cursor-pointer">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => onVerifiedChange(e.target.checked)}
          />
          {verifiedLabel}
        </label>
        <button type="button" onClick={onDelete} className="font-sans text-xs text-red-600/70 hover:text-red-700 hover:underline">
          {deleteLabel}
        </button>
      </div>
    </div>
  );
}

// ---- Mishnah ----
export function MishnahForm({
  entry,
  onChange,
  onDelete,
  lang,
}: {
  entry: MishnahEntry;
  onChange: (e: MishnahEntry) => void;
  onDelete: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  return (
    <div className="rounded-lg border border-border border-l-4 border-l-mishnah bg-parchment-50 shadow-sm p-4 space-y-3">
      <CardHeader
        id={entry.id}
        verified={entry.verified ?? false}
        verifiedLabel={t.verified}
        deleteLabel={t.delete}
        onVerifiedChange={(v) => onChange({ ...entry, verified: v })}
        onDelete={onDelete}
      />
      <BilingualFields
        heLabel={t.hebrewText}
        enLabel={t.englishTranslation}
        heValue={entry.text}
        enValue={entry.he}
        onHeChange={(v) => onChange({ ...entry, text: v })}
        onEnChange={(v) => onChange({ ...entry, he: v })}
      />
      <SourcePicker
        sourceId={entry.sourceId}
        onChange={(id) => onChange({ ...entry, sourceId: id })}
        lang={lang}
      />
    </div>
  );
}

// ---- Gemara ----
export function GemaraForm({
  entry,
  onChange,
  onDelete,
  lang,
}: {
  entry: GemaraEntry;
  onChange: (e: GemaraEntry) => void;
  onDelete: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  return (
    <div className="rounded-lg border border-border border-l-4 border-l-gemara bg-parchment-50 shadow-sm p-4 space-y-3">
      <CardHeader
        id={entry.id}
        verified={entry.verified ?? false}
        verifiedLabel={t.verified}
        deleteLabel={t.delete}
        onVerifiedChange={(v) => onChange({ ...entry, verified: v })}
        onDelete={onDelete}
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.speakerHebrew}</label>
          <input
            className="input text-sm"
            value={entry.speaker}
            onChange={(e) => onChange({ ...entry, speaker: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.source}</label>
          <input
            className="input text-sm"
            value={entry.source}
            onChange={(e) => onChange({ ...entry, source: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>
      <BilingualFields
        heLabel={t.hebrewQuote}
        enLabel={t.englishTranslation}
        heValue={entry.text}
        enValue={entry.he}
        onHeChange={(v) => onChange({ ...entry, text: v })}
        onEnChange={(v) => onChange({ ...entry, he: v })}
      />
      <SourcePicker
        sourceId={entry.sourceId}
        onChange={(id) => onChange({ ...entry, sourceId: id })}
        lang={lang}
      />
    </div>
  );
}

// ---- Tosafot ----
export function TosafotForm({
  entry,
  onChange,
  onDelete,
  lang,
}: {
  entry: TosafotEntry;
  onChange: (e: TosafotEntry) => void;
  onDelete: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  return (
    <div className="rounded-lg border border-border border-l-4 border-l-tosafot bg-parchment-50 shadow-sm p-4 space-y-3">
      <CardHeader
        id={entry.id}
        verified={entry.verified ?? false}
        verifiedLabel={t.verified}
        deleteLabel={t.delete}
        onVerifiedChange={(v) => onChange({ ...entry, verified: v })}
        onDelete={onDelete}
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.titleHebrew}</label>
          <input
            className="input text-sm"
            value={entry.title}
            onChange={(e) => onChange({ ...entry, title: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.caseRef}</label>
          <input
            className="input text-sm"
            value={entry.caseRef}
            onChange={(e) => onChange({ ...entry, caseRef: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>
      <BilingualFields
        heLabel={t.hebrewText}
        enLabel={t.englishTranslation}
        heValue={entry.text}
        enValue={entry.he}
        onHeChange={(v) => onChange({ ...entry, text: v })}
        onEnChange={(v) => onChange({ ...entry, he: v })}
      />
      <SourcePicker
        sourceId={entry.sourceId}
        onChange={(id) => onChange({ ...entry, sourceId: id })}
        lang={lang}
      />
    </div>
  );
}

// ---- Rashi ----
export function RashiForm({
  entry,
  onChange,
  onDelete,
  lang,
}: {
  entry: RashiEntry;
  onChange: (e: RashiEntry) => void;
  onDelete: () => void;
  lang: Lang;
}) {
  const t = getT(lang);
  return (
    <div className="rounded-lg border border-border border-l-4 border-l-rashi bg-parchment-50 shadow-sm p-4 space-y-3">
      <CardHeader
        id={entry.id}
        verified={entry.verified ?? false}
        verifiedLabel={t.verified}
        deleteLabel={t.delete}
        onVerifiedChange={(v) => onChange({ ...entry, verified: v })}
        onDelete={onDelete}
      />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.author}</label>
          <input
            className="input text-sm"
            value={entry.author}
            onChange={(e) => onChange({ ...entry, author: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-ink/60 mb-1">{t.source}</label>
          <input
            className="input text-sm"
            value={entry.source}
            onChange={(e) => onChange({ ...entry, source: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>
      <BilingualFields
        heLabel={t.hebrewText}
        enLabel={t.englishTranslation}
        heValue={entry.text}
        enValue={entry.he}
        onHeChange={(v) => onChange({ ...entry, text: v })}
        onEnChange={(v) => onChange({ ...entry, he: v })}
      />
      <SourcePicker
        sourceId={entry.sourceId}
        onChange={(id) => onChange({ ...entry, sourceId: id })}
        lang={lang}
      />
    </div>
  );
}
