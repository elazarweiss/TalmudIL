import type { GemaraEntry } from '@/types/daf';

interface GemaraSectionProps {
  entries: GemaraEntry[];
  lang: 'he' | 'en';
}

export default function GemaraSection({ entries, lang }: GemaraSectionProps) {
  return (
    <section className="mt-4">
      <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink/35 mb-3">ג  מ  ר  א</p>
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id}>
            <span className="font-serif font-bold text-ink/80 text-base leading-snug">{entry.speaker} — </span>
            <p className="hebrew-text text-xl text-ink">{entry.text}</p>
            {lang === 'en' && <p className="english-text" dir="ltr">{entry.he}</p>}
            {lang === 'en' && entry.source && (
              <p className="font-display italic text-[12px] text-ink/40 mt-1" dir="ltr">— {entry.source}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
