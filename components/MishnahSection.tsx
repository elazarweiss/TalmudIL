import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="border-2 border-mishnah/50 bg-mishnah-light p-4 mb-6">
      <p className="text-center text-[10px] font-sans uppercase tracking-widest text-mishnah/60 mb-3">משנה</p>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="hebrew-text text-ink leading-loose">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text mt-3 leading-relaxed" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
