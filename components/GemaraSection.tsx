import type { GemaraEntry } from '@/types/daf';

interface GemaraSectionProps {
  entries: GemaraEntry[];
  lang: 'he' | 'en';
}

export default function GemaraSection({ entries, lang }: GemaraSectionProps) {
  return (
    <section className="mb-6">
      <div className="flex items-baseline gap-3 mb-6 pb-2 border-b border-gemara/30">
        <h2 className="section-title text-gemara mb-0 pb-0 border-0">גמרא</h2>
        {lang === 'en' && (
          <span className="font-display italic text-gemara/60 text-base" dir="ltr">
            Historical Voices
          </span>
        )}
      </div>
      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-gemara/40 pr-4">
            <p className="font-serif font-bold text-gemara text-lg mb-2 leading-snug">{entry.speaker}</p>
            <p className="hebrew-text text-ink">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text" dir="ltr">{entry.he}</p>
            )}
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
