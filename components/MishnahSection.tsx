import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section>
      <p className="text-[10px] font-sans uppercase tracking-widest text-mishnah/60 mb-5 text-center">
        משנה
      </p>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id}>
            <p className="hebrew-text text-xl font-serif leading-loose text-ink">{entry.text}</p>
            {lang === 'en' && (
              <p className="english-text text-sm leading-relaxed" dir="ltr">{entry.he}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
