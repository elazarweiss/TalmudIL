'use client';
import { useState } from 'react';
import type { DafData } from '@/types/daf';
import DafLayout from './DafLayout';

interface DafPageProps {
  data: DafData;
  sederLabel: string;
  tractateLabel: string;
}

export default function DafPage({ data, sederLabel, tractateLabel }: DafPageProps) {
  const [lang, setLang] = useState<'he' | 'en'>('en');

  return (
    <div className="min-h-screen">
      <DafLayout
        data={data}
        sederLabel={sederLabel}
        tractateLabel={tractateLabel}
        lang={lang}
        onLangToggle={() => setLang((l) => (l === 'en' ? 'he' : 'en'))}
      />
    </div>
  );
}
