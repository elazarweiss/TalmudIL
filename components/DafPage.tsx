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
    <div className="min-h-screen">
      <div className="daf-sheet">
        <DafHeader
          seder={data.seder}
          tractate={data.tractate}
          daf={data.daf}
          sederLabel={sederLabel}
          tractateLabel={tractateLabel}
          lang={lang}
          onLangToggle={() => setLang((l) => (l === 'en' ? 'he' : 'en'))}
        />
        <div className="daf-body">
          <div className="main-sugya">
            <MishnahSection entries={data.mishnah} lang={lang} />
            <GemaraSection entries={data.gemara} lang={lang} />
          </div>
          <div className="left-gloss">
            <TosafotSection entries={data.tosafot} lang={lang} />
          </div>
          <div className="right-gloss">
            <RashiSection entries={data.rashi} lang={lang} />
          </div>
          {lang === 'en' && (
            <div className="bottom-gloss">
              <p className="font-sans text-xs text-ink/40 text-center" dir="ltr">
                Mishnah — Core Dilemma · Gemara — Historical Voices · Tosafot — Legal Rulings · Rashi — Public Commentary
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
