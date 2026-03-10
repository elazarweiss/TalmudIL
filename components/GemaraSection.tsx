import type { GemaraEntry } from '@/types/daf';

interface GemaraSectionProps {
  entries: GemaraEntry[];
}

export default function GemaraSection({ entries }: GemaraSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="section-title text-gemara">
        <span className="border-b-2 border-gemara pb-0.5">גמרא</span>
      </h2>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="border-r-4 border-gemara/60 pr-3">
            <p className="speaker-label text-gemara">{entry.speaker}</p>
            <p className="hebrew-text">{entry.text}</p>
            <p className="english-text" dir="ltr">{entry.he}</p>
            <p className="source-label" dir="ltr">{entry.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
