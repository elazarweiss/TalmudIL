import type { GemaraEntry } from '@/types/daf';

interface GemaraSectionProps {
  entries: GemaraEntry[];
  lang: 'he' | 'en';
}

export default function GemaraSection({ entries, lang }: GemaraSectionProps) {
  return (
    <section className="mt-2">
      <p className="text-[8px] font-sans uppercase tracking-[0.2em] text-ink/35 mb-1">ג  מ  ר  א</p>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id}>
            <span className="font-serif font-bold text-ink/80 text-sm leading-snug">{entry.speaker} — </span>
            <p className="hebrew-text text-base leading-snug text-ink">{entry.text}</p>
            {lang === 'en' && <p className="english-text text-xs leading-snug" dir="ltr">{entry.he}</p>}
            {lang === 'en' && entry.source && (
              <p className="font-display italic text-[10px] text-ink/40 mt-0.5" dir="ltr">— {entry.source}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
