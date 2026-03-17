import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
  lang: 'he' | 'en';
}

export default function MishnahSection({ entries, lang }: MishnahSectionProps) {
  return (
    <section className="mb-4">
      {/* Outer ornamental frame */}
      <div className="border border-ink/20 bg-parchment-50 px-5 py-4 mx-2 relative">
        {/* Double inner rule — traditional box look */}
        <div className="absolute inset-[3px] border border-ink/10 pointer-events-none" />
        <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-ink/40 mb-4 text-center">מ  ש  נ  ה</p>
        <div className="space-y-4 relative z-10">
          {entries.map((entry) => (
            <div key={entry.id}>
              <p className="hebrew-text text-xl leading-relaxed text-ink">{entry.text}</p>
              {lang === 'en' && (
                <p className="english-text text-sm leading-relaxed mt-2" dir="ltr">{entry.he}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
