import type { TosafotEntry } from '@/types/daf';

interface TosafotSectionProps {
  entries: TosafotEntry[];
  lang: 'he' | 'en';
}

export default function TosafotSection({ entries, lang }: TosafotSectionProps) {
  return (
    <section>
      <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink/35 mb-3">ת  ו  ס  פ  ו  ת</p>
      <div className="divide-y divide-border/30">
        {entries.map((entry) => (
          <div key={entry.id} className="py-1.5 first:pt-0">
            <p className="font-serif font-bold text-xs text-ink leading-tight mb-0.5">{entry.title}</p>
            {lang === 'en' && (
              <p className="font-sans text-[9px] tracking-widest uppercase text-ink/35 mb-1" dir="ltr">{entry.caseRef}</p>
            )}
            <p className="hebrew-text text-xs leading-tight text-ink/85">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-xs mt-0.5" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
