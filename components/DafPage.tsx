'use client';

import { useState } from 'react';
import type { DafData } from '@/types/daf';
import DafHeader from './DafHeader';
import TosafotSection from './TosafotSection';
import RashiSection from './RashiSection';
import MishnahSection from './MishnahSection';
import GemaraSection from './GemaraSection';

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
        Two-row, three-column Talmud grid (RTL):
        Visual right (col 1): Tosafot  — spans both rows
        Visual center (col 2): Mishnah (row 1) → Gemara (row 2)
        Visual left  (col 3): Rashi   — spans both rows
      */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[22%_52%_26%] md:grid-rows-[auto_auto] gap-0 border-2 border-border bg-parchment-100 shadow-md">

          {/* Tosafot — visual RIGHT, spans both rows */}
          <div className="order-3 md:order-none md:col-start-1 md:row-start-1 md:row-span-2 bg-tosafot-light px-4 py-5 md:border-l border-border border-b md:border-b-0">
            <TosafotSection entries={data.tosafot} lang={lang} />
          </div>

          {/* Mishnah — center top, visual anchor */}
          <div className="order-1 md:order-none md:col-start-2 md:row-start-1 bg-white px-8 py-8">
            <MishnahSection entries={data.mishnah} lang={lang} />
          </div>

          {/* Rashi — visual LEFT, spans both rows */}
          <div className="order-4 md:order-none md:col-start-3 md:row-start-1 md:row-span-2 bg-rashi-light px-4 py-5 md:border-r border-border border-b md:border-b-0">
            <RashiSection entries={data.rashi} lang={lang} />
          </div>

          {/* Gemara — center bottom, secondary zone */}
          <div className="order-2 md:order-none md:col-start-2 md:row-start-2 bg-gemara-light/40 border-t-2 border-border/40 px-8 py-5">
            <GemaraSection entries={data.gemara} lang={lang} />
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
