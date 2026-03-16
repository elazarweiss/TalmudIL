import type { TosafotEntry } from '@/types/daf';

interface TosafotSectionProps {
  entries: TosafotEntry[];
  lang: 'he' | 'en';
}

export default function TosafotSection({ entries, lang }: TosafotSectionProps) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-6 pb-2 border-b border-tosafot/30">
        <h2 className="section-title text-tosafot mb-0 pb-0 border-0">תוספות</h2>
        {lang === 'en' && (
          <span className="font-display italic text-tosafot/60 text-base" dir="ltr">
            Legal Rulings
          </span>
        )}
      </div>
      <div className="space-y-7">
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
