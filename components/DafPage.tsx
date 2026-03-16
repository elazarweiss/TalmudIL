'use client';

import { useState } from 'react';
import type { DafData } from '@/types/daf';
import DafHeader from './DafHeader';
import TosafotSection from './TosafotSection';
import RashiSection from './RashiSection';

interface DafPageProps {
  data: DafData;
  sederLabel: string;
  tractateLabel: string;
}

export default function DafPage({ data, sederLabel, tractateLabel }: DafPageProps) {
  const [lang, setLang] = useState<'he' | 'en'>('en');

  // Split Gemara: first entry appears above the Mishnah box, rest appear below.
  // This replicates the classic Talmud folio layout where the Mishnah is
  // an inset box embedded within the flowing Gemara text column.
  const gemaraBefore = data.gemara.slice(0, 1);
  const gemaraAfter  = data.gemara.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <DafHeader
        seder={data.seder}
        tractate={data.tractate}
        daf={data.daf}
        sederLabel={sederLabel}
        tractateLabel={tractateLabel}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'he' : 'en'))}
      />

      {/*
        Three-column Talmud grid (RTL):
        HTML order: Tosafot | Center (Gemara → Mishnah inset → Gemara) | Rashi
        In RTL, columns flow right→left visually:
          Visual right (col 1): Tosafot
          Visual center (col 2): Gemara wrapping around Mishnah inset
          Visual left  (col 3): Rashi
      */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[22%_52%_26%] gap-0 border-2 border-border bg-parchment-100 shadow-md">

          {/* Column 1 (Visual Right in RTL): Tosafot */}
          <div className="daf-column border-b md:border-b-0 md:border-l border-border px-4 py-5 bg-tosafot-light">
            <TosafotSection entries={data.tosafot} lang={lang} />
          </div>

          {/* Column 2 (Visual Center): Gemara flowing around the Mishnah inset */}
          <div className="daf-column border-b md:border-b-0 px-4 py-5 bg-white/70">

            {/* Gemara label */}
            <p className="text-[10px] font-sans uppercase tracking-widest text-gemara/60 mb-3">גמרא</p>

            {/* Gemara entries ABOVE the Mishnah box */}
            <div className="space-y-4">
              {gemaraBefore.map((entry) => (
                <div key={entry.id} className="border-r-4 border-gemara/40 pr-4">
                  <p className="font-serif font-bold text-gemara text-base mb-2 leading-snug">{entry.speaker}</p>
                  <p className="hebrew-text text-ink">{entry.text}</p>
                  {lang === 'en' && (
                    <p className="english-text" dir="ltr">{entry.he}</p>
                  )}
                  {lang === 'en' && entry.source && (
                    <p className="font-display italic text-[13px] text-gray-400 mt-2" dir="ltr">
                      — {entry.source}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Mishnah box — framed inset, centered in the column */}
            <div className="w-[78%] mx-auto border-2 border-mishnah/50 bg-mishnah-light p-4 my-5">
              <p className="text-center text-[9px] font-sans uppercase tracking-widest text-mishnah/60 mb-3">משנה</p>
              <div className="space-y-3">
                {data.mishnah.map((entry) => (
                  <div key={entry.id}>
                    <p className="hebrew-text text-sm text-ink">{entry.text}</p>
                    {lang === 'en' && (
                      <p className="english-text text-xs" dir="ltr">{entry.he}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gemara entries BELOW the Mishnah box */}
            <div className="space-y-4">
              {gemaraAfter.map((entry) => (
                <div key={entry.id} className="border-r-4 border-gemara/40 pr-4">
                  <p className="font-serif font-bold text-gemara text-base mb-2 leading-snug">{entry.speaker}</p>
                  <p className="hebrew-text text-ink">{entry.text}</p>
                  {lang === 'en' && (
                    <p className="english-text" dir="ltr">{entry.he}</p>
                  )}
                  {lang === 'en' && entry.source && (
                    <p className="font-display italic text-[13px] text-gray-400 mt-2" dir="ltr">
                      — {entry.source}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 (Visual Left in RTL): Rashi */}
          <div className="daf-column px-4 py-5 bg-rashi-light">
            <RashiSection entries={data.rashi} lang={lang} />
          </div>

        </div>

        {/* Footer legend */}
        {lang === 'en' && (
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs font-sans text-gray-500" dir="ltr">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-mishnah inline-block" />
              Mishnah — Core Dilemma
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gemara inline-block" />
              Gemara — Historical Voices
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-tosafot inline-block" />
              Tosafot — Legal Rulings
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rashi inline-block" />
              Rashi — Public Commentary
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
