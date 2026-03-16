import type { RashiEntry } from '@/types/daf';

interface RashiSectionProps {
  entries: RashiEntry[];
  lang: 'he' | 'en';
}

export default function RashiSection({ entries, lang }: RashiSectionProps) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-6 pb-2 border-b border-rashi/30">
        <h2 className="section-title text-rashi mb-0 pb-0 border-0">רש&quot;י</h2>
        {lang === 'en' && (
          <span className="font-display italic text-rashi/60 text-base" dir="ltr">
            Commentary
          </span>
        )}
      </div>
      <div className="space-y-7">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-rashi/40 pr-4">
            <p className="font-serif font-bold text-rashi text-sm leading-snug mb-0.5">{entry.author}</p>
            {lang === 'en' && (
              <p className="font-display italic text-[12px] text-gray-400 mb-2" dir="ltr">
                {entry.source}
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
