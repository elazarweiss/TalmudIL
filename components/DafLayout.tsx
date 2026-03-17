'use client';
import type { DafData } from '@/types/daf';
import DafHeader from './DafHeader';
import MishnahSection from './MishnahSection';
import GemaraSection from './GemaraSection';
import TosafotSection from './TosafotSection';
import RashiSection from './RashiSection';

interface DafLayoutProps {
  data: DafData;
  sederLabel: string;
  tractateLabel: string;
  lang: 'he' | 'en';
  onLangToggle: () => void;
}

export default function DafLayout({ data, sederLabel, tractateLabel, lang, onLangToggle }: DafLayoutProps) {
  return (
    <div className="daf-folio-sheet">
      <DafHeader
        seder={data.seder}
        tractate={data.tractate}
        daf={data.daf}
        sederLabel={sederLabel}
        tractateLabel={tractateLabel}
        lang={lang}
        onLangToggle={onLangToggle}
      />
      <div className="daf-folio-body">
        <div className="daf-folio-main">
          <MishnahSection entries={data.mishnah} lang={lang} />
          <GemaraSection entries={data.gemara} lang={lang} />
        </div>
        <div className="daf-folio-left">
          <TosafotSection entries={data.tosafot} lang={lang} />
        </div>
        <div className="daf-folio-right">
          <RashiSection entries={data.rashi} lang={lang} />
        </div>
        {lang === 'en' && (
          <div className="daf-folio-bottom">
            <p>Mishnah — Core Dilemma · Gemara — Historical Voices · Tosafot — Legal Rulings · Rashi — Public Commentary</p>
          </div>
        )}
      </div>
    </div>
  );
}
