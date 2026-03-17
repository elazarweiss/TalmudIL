import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="mb-2">
      <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink/40 mb-3 text-center">מ  ש  נ  ה</p>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="hebrew-text text-2xl leading-relaxed text-ink">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-sm leading-relaxed mt-1" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
