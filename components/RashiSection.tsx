import type { RashiEntry } from '@/types/daf';

interface RashiSectionProps {
  entries: RashiEntry[];
  lang: 'he' | 'en';
}

export default function RashiSection({ entries, lang }: RashiSectionProps) {
  return (
    <section>
      <h2 className="section-title text-rashi">
        <span className="border-b-2 border-rashi pb-0.5">רש&quot;י</span>
      </h2>
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-rashi/70 pr-4 py-1">
            <p className="font-bold text-rashi text-sm mb-0.5">{entry.author}</p>
            {lang === 'en' && (
              <p className="text-xs font-sans text-gray-500 mb-2 italic" dir="ltr">
                {entry.source}
              </p>
            )}
            <p className="hebrew-text text-sm">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-xs" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
