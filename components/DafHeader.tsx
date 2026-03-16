import Link from 'next/link';

interface DafHeaderProps {
  seder: string;
  tractate: string;
  daf: string;
  sederLabel: string;
  tractateLabel: string;
  lang: 'he' | 'en';
  onLangToggle: () => void;
}

export default function DafHeader({
  seder,
  tractate,
  daf,
  sederLabel,
  tractateLabel,
  lang,
  onLangToggle,
}: DafHeaderProps) {
  return (
    <header className="border-b border-border/60 bg-parchment-100 px-6 py-5">
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

        {/* Language toggle */}
        <button
          onClick={onLangToggle}
          className="absolute right-0 top-0 text-xs font-sans text-gray-500 hover:text-gray-800 border border-gray-300 rounded px-2 py-0.5 bg-white/60 hover:bg-white transition-colors"
          dir="ltr"
        >
          {lang === 'en' ? 'עברית בלבד' : 'English'}
        </button>

        {/* Seder / Tractate / Daf */}
        <div className="mt-2 flex items-center gap-3 text-sm font-sans text-gray-600">
          <span className="font-semibold text-mishnah">{sederLabel}</span>
          <span className="text-border">·</span>
          <span className="font-semibold text-ink">
            מסכת {tractateLabel}
          </span>
          <span className="text-border">·</span>
          <span className="font-semibold">דף {daf}</span>
        </div>
      </div>
    </header>
  );
}
