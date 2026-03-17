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

  // Split gemara: first entry above Mishnah, rest below (Vilna layout approximation)
  const gemaraBefore = data.gemara.slice(0, 1);
  const gemaraAfter = data.gemara.slice(1);

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
        Single-row, three-column Talmud folio (RTL):
        Visual right (col 1): Tosafot  — marginal gloss
        Visual center (col 2): Gemara before → Mishnah inset → Gemara after
        Visual left  (col 3): Rashi   — marginal gloss
      */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[22%_54%_24%] border border-border/60 shadow-sm">

          {/* Tosafot — visual RIGHT in RTL, col-1 */}
          <div className="px-4 py-6 border-b md:border-b-0 md:border-l border-border/50 order-3 md:order-none">
            <TosafotSection entries={data.tosafot} lang={lang} />
          </div>

          {/* Center column: Gemara wraps around Mishnah */}
          <div className="px-6 py-6 order-1 md:order-none">
            {gemaraBefore.length > 0 && (
              <GemaraSection entries={gemaraBefore} lang={lang} />
            )}
            <MishnahSection entries={data.mishnah} lang={lang} />
            {gemaraAfter.length > 0 && (
              <GemaraSection entries={gemaraAfter} lang={lang} />
            )}
          </div>

          {/* Rashi — visual LEFT in RTL, col-3 */}
          <div className="px-4 py-6 border-b md:border-b-0 md:border-r border-border/50 order-4 md:order-none">
            <RashiSection entries={data.rashi} lang={lang} />
          </div>

        </div>

        {/* Footer legend */}
        {lang === 'en' && (
          <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs font-sans text-gray-500" dir="ltr">
            <span>Mishnah — Core Dilemma</span>
            <span>·</span>
            <span>Gemara — Historical Voices</span>
            <span>·</span>
            <span>Tosafot — Legal Rulings</span>
            <span>·</span>
            <span>Rashi — Public Commentary</span>
          </div>
        )}
      </main>
    </div>
  );
}
