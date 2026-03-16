import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="section-title text-mishnah border-mishnah">
        <span className="border-b-2 border-mishnah pb-0.5">משנה</span>
      </h2>
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-mishnah/70 pr-4 py-1">
            <p className="hebrew-text text-mishnah font-medium">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
