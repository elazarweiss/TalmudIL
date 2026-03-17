import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="mb-1">
      <p className="text-[8px] font-sans uppercase tracking-[0.2em] text-ink/40 mb-1.5 text-center">מ  ש  נ  ה</p>
      <div className="space-y-1.5">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="hebrew-text text-lg leading-snug text-ink">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-xs leading-snug mt-0.5" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
