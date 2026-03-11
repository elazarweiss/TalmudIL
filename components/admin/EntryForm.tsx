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
        <label className="block text-xs text-gray-500 mb-1">{heLabel}</label>
        <textarea
          className="w-full h-32 resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:outline-none"
          value={heValue}
          onChange={(e) => onHeChange(e.target.value)}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">{enLabel}</label>
        <textarea
          className="w-full h-32 resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:outline-none"
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
      <span className="text-xs font-mono text-gray-400">{id}</span>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => onVerifiedChange(e.target.checked)}
          />
          {verifiedLabel}
        </label>
        <button type="button" onClick={onDelete} className="text-xs text-red-500 hover:underline">
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
    <div className="rounded-lg border border-gray-200 border-l-4 border-l-yellow-500 bg-white shadow-sm p-4 space-y-3">
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
    <div className="rounded-lg border border-gray-200 border-l-4 border-l-orange-400 bg-white shadow-sm p-4 space-y-3">
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
          <label className="block text-xs text-gray-500 mb-1">{t.speakerHebrew}</label>
          <input
            className="input text-sm"
            value={entry.speaker}
            onChange={(e) => onChange({ ...entry, speaker: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.source}</label>
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
    <div className="rounded-lg border border-gray-200 border-l-4 border-l-blue-400 bg-white shadow-sm p-4 space-y-3">
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
          <label className="block text-xs text-gray-500 mb-1">{t.titleHebrew}</label>
          <input
            className="input text-sm"
            value={entry.title}
            onChange={(e) => onChange({ ...entry, title: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.caseRef}</label>
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
    <div className="rounded-lg border border-gray-200 border-l-4 border-l-amber-500 bg-white shadow-sm p-4 space-y-3">
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
          <label className="block text-xs text-gray-500 mb-1">{t.author}</label>
          <input
            className="input text-sm"
            value={entry.author}
            onChange={(e) => onChange({ ...entry, author: e.target.value })}
            dir="rtl"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t.source}</label>
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
