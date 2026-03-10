import type { MishnahEntry } from '@/types/daf';

interface MishnahSectionProps {
  entries: MishnahEntry[];
}

export default function MishnahSection({ entries }: MishnahSectionProps) {
  return (
    <section className="mb-6">
      <h2
        className="section-title text-mishnah border-mishnah"
        style={{ borderColor: 'var(--tw-prose-hr, #5c3d1e)' }}
      >
        <span className="border-b-2 border-mishnah pb-0.5">משנה</span>
      </h2>
      <div className="space-y-5">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-mishnah-light rounded p-3 border border-mishnah/20">
            <p className="hebrew-text text-mishnah font-medium">{entry.text}</p>
            <p className="english-text" dir="ltr">{entry.he}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
