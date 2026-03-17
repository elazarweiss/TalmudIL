import type { RashiEntry } from '@/types/daf';

interface RashiSectionProps {
  entries: RashiEntry[];
  lang: 'he' | 'en';
}

export default function RashiSection({ entries, lang }: RashiSectionProps) {
  return (
    <section>
      <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink/35 mb-3">ר  ש  &quot;  י</p>
      <div className="divide-y divide-border/30">
        {entries.map((entry) => (
          <div key={entry.id} className="py-3 first:pt-0">
            <p className="font-serif font-bold text-sm text-ink leading-snug mb-0.5">{entry.author}</p>
            {lang === 'en' && (
              <p className="font-display italic text-[11px] text-ink/40 mb-1.5" dir="ltr">{entry.source}</p>
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
