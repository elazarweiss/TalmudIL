import type { RashiEntry } from '@/types/daf';

interface RashiSectionProps {
  entries: RashiEntry[];
  lang: 'he' | 'en';
}

export default function RashiSection({ entries, lang }: RashiSectionProps) {
  return (
    <section>
      <p className="text-[10px] font-sans uppercase tracking-widest text-rashi/60 mb-3">רש&quot;י</p>
      <div className="space-y-4">
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
