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
          <div key={entry.id} className="py-3 first:pt-0">
            <p className="font-serif font-bold text-sm text-ink leading-snug mb-1">{entry.title}</p>
            {lang === 'en' && (
              <p className="font-sans text-[9px] tracking-widest uppercase text-ink/35 mb-1.5" dir="ltr">{entry.caseRef}</p>
            )}
            <p className="hebrew-text text-sm leading-snug text-ink/85">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-xs mt-1" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
