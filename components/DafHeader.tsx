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
    <header className="bg-parchment-100 px-6 pt-6 pb-4 relative">
      <div className="max-w-[1440px] mx-auto relative">

        {/* Corner: daf number (top-right, like a real folio) */}
        <div className="absolute right-0 top-0 text-right">
          <span className="font-serif font-bold text-2xl text-ink/70">{daf}</span>
          <p className="text-[10px] font-sans uppercase tracking-widest text-ink/40 mt-0.5" dir="ltr">דף</p>
        </div>

        {/* Corner: edit link (top-left) */}
        <Link
          href={`/admin/dafs/${seder}/${tractate}/${daf}`}
          className="absolute left-0 top-0 text-xs text-ink/30 hover:text-ink/60 font-sans transition-colors"
          dir="ltr"
        >
          ✎ edit
        </Link>

        {/* Language toggle */}
        <button
          onClick={onLangToggle}
          className="absolute left-0 top-6 text-xs font-sans text-ink/40 hover:text-ink/70 border border-border/60 px-2 py-0.5 transition-colors"
          dir="ltr"
        >
          {lang === 'en' ? 'עברית בלבד' : 'English'}
        </button>

        {/* Central title block */}
        <div className="text-center pt-2 pb-5">
          <h1 className="font-serif text-5xl font-black text-ink leading-tight tracking-tight">תלמוד ישראל</h1>
          <p className="font-display italic text-sm text-ink/50 mt-1 tracking-wide" dir="ltr">The Israeli Constitutional Talmud</p>

          {/* Ornamental rule */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="flex-1 max-w-[120px] h-px bg-border/60" />
            <div className="text-sm font-serif font-semibold text-ink/70 tracking-wide">
              {sederLabel} · מסכת {tractateLabel} · דף {daf}
            </div>
            <span className="flex-1 max-w-[120px] h-px bg-border/60" />
          </div>
        </div>

        {/* Bottom rule — transition into folio body */}
        <div className="border-t-2 border-double border-border/80" />
      </div>
    </header>
  );
}
