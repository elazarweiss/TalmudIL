import type { TosafotEntry } from '@/types/daf';

interface TosafotSectionProps {
  entries: TosafotEntry[];
  lang: 'he' | 'en';
}

export default function TosafotSection({ entries, lang }: TosafotSectionProps) {
  return (
    <section>
      <p className="text-[10px] font-sans uppercase tracking-widest text-tosafot/60 mb-3">תוספות</p>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-tosafot/40 pr-4">
            <p className="font-serif font-bold text-tosafot text-sm leading-snug mb-1">{entry.title}</p>
            {lang === 'en' && (
              <p className="font-sans text-[10px] tracking-widest uppercase text-gray-400 mb-2" dir="ltr">
                {entry.caseRef}
              </p>
            )}
            <p className="hebrew-text text-sm text-ink">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-xs" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
