import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-baseline gap-3 mb-6 pb-2 border-b border-mishnah/30">
        <h2 className="section-title text-mishnah mb-0 pb-0 border-0">משנה</h2>
        {lang === 'en' && (
          <span className="font-display italic text-mishnah/60 text-base" dir="ltr">
            Core Dilemma
          </span>
        )}
      </div>
      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="hebrew-text text-xl font-medium text-ink leading-loose">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text mt-3 leading-relaxed" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
