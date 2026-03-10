import type { TosafotEntry } from '@/types/daf';

interface TosafotSectionProps {
  entries: TosafotEntry[];
}

export default function TosafotSection({ entries }: TosafotSectionProps) {
  return (
    <section>
      <h2 className="section-title text-tosafot">
        <span className="border-b-2 border-tosafot pb-0.5">תוספות</span>
      </h2>
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-tosafot-light rounded p-3 border border-tosafot/20">
            <p className="font-bold text-tosafot text-sm mb-0.5">{entry.title}</p>
            <p className="text-xs font-sans text-gray-500 mb-2 italic" dir="ltr">
              {entry.caseRef}
            </p>
            <p className="hebrew-text text-sm">{entry.text}</p>
            <p className="english-text text-xs" dir="ltr">{entry.he}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
