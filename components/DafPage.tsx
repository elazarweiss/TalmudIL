'use client';

import { useState } from 'react';
import type { DafData } from '@/types/daf';
import DafHeader from './DafHeader';
import MishnahSection from './MishnahSection';
import GemaraSection from './GemaraSection';
import TosafotSection from './TosafotSection';
import RashiSection from './RashiSection';

interface DafPageProps {
  data: DafData;
  sederLabel: string;
  tractateLabel: string;
}

export default function DafPage({ data, sederLabel, tractateLabel }: DafPageProps) {
  const [lang, setLang] = useState<'he' | 'en'>('en');

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
        HTML order: Tosafot | Center (Mishnah+Gemara) | Rashi
        In RTL, columns flow right→left visually:
          Visual right (col 1): Tosafot
          Visual center (col 2): Mishnah + Gemara
          Visual left  (col 3): Rashi
      */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[22%_52%_26%] gap-0 border border-border/50 bg-parchment-100 rounded shadow-sm">

          {/* Column 1 (Visual Right in RTL): Tosafot — legal commentaries */}
          <div className="daf-column border-b md:border-b-0 md:border-l border-border/40 px-5 py-8 bg-parchment-50">
            <TosafotSection entries={data.tosafot} lang={lang} />
          </div>

          {/* Column 2 (Visual Center): Mishnah + Gemara — primary text */}
          <div className="daf-column border-b md:border-b-0 px-8 py-8 bg-white/70">
            <MishnahSection entries={data.mishnah} lang={lang} />
            <div className="border-t border-border/40 my-8" />
            <GemaraSection entries={data.gemara} lang={lang} />
          </div>

          {/* Column 3 (Visual Left in RTL): Rashi — commentary */}
          <div className="daf-column px-5 py-8 bg-parchment-50">
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
