import Link from 'next/link';
import { getMetadata } from '@/lib/metadata';

interface DafHeaderProps {
  seder: string;
  tractate: string;
  daf: string;
}

export default async function DafHeader({ seder, tractate, daf }: DafHeaderProps) {
  const metadata = await getMetadata();
  const sederObj = metadata.sedarim.find((s) => s.id === seder);
  const tractateObj = sederObj?.tractates.find((t) => t.id === tractate);

  const sederLabel = sederObj?.hebrewName ?? seder;
  const tractateLabel = tractateObj?.hebrewName ?? tractate;

  return (
    <header className="border-b-2 border-border bg-parchment-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-1 relative">
        {/* Platform title */}
        <h1 className="text-2xl font-black tracking-tight text-ink">
          תלמוד ישראל
        </h1>
        <p className="text-xs font-sans text-gray-500 tracking-widest uppercase" dir="ltr">
          The Israeli Constitutional Talmud
        </p>

        {/* Admin link */}
        <Link
          href={`/admin/dafs/${seder}/${tractate}/${daf}`}
          className="absolute left-0 top-0 text-xs font-sans text-gray-400 hover:text-gray-600 transition-colors"
          dir="ltr"
        >
          ✎ edit
        </Link>

        {/* Seder / Tractate / Daf */}
        <div className="mt-2 flex items-center gap-3 text-sm font-sans text-gray-600">
          <span className="font-semibold text-mishnah">{sederLabel}</span>
          <span className="text-border">·</span>
          <span className="font-bold text-lg text-ink">
            מסכת {tractateLabel}
          </span>
          <span className="text-border">·</span>
          <span className="font-semibold">דף {daf}</span>
        </div>
      </div>
    </header>
  );
}
