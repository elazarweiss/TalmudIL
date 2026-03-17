import type { GemaraEntry } from '@/types/daf';

interface GemaraSectionProps {
  entries: GemaraEntry[];
  lang: 'he' | 'en';
}

export default function GemaraSection({ entries, lang }: GemaraSectionProps) {
  return (
    <section>
      <p className="text-[10px] font-sans uppercase tracking-widest text-gemara/60 mb-3">גמרא</p>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-gemara/40 pr-4">
            <p className="font-serif font-bold text-gemara text-sm mb-2 leading-snug">{entry.speaker}</p>
            <p className="hebrew-text text-sm text-ink">{entry.text}</p>
            {lang === 'en' && <p className="english-text" dir="ltr">{entry.he}</p>}
            {lang === 'en' && entry.source && (
              <p className="font-display italic text-[13px] text-gray-400 mt-2" dir="ltr">
                — {entry.source}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
