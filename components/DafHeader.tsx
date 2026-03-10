interface DafHeaderProps {
  seder: string;
  tractate: string;
  daf: string;
}

const sederLabels: Record<string, string> = {
  'religion-and-state': 'דת ומדינה',
};

const tractateLabels: Record<string, string> = {
  shabbat: 'שבת',
};

export default function DafHeader({ seder, tractate, daf }: DafHeaderProps) {
  const sederLabel = sederLabels[seder] ?? seder;
  const tractateLabel = tractateLabels[tractate] ?? tractate;

  return (
    <header className="border-b-2 border-border bg-parchment-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-1">
        {/* Platform title */}
        <h1 className="text-2xl font-black tracking-tight text-ink">
          תלמוד ישראל
        </h1>
        <p className="text-xs font-sans text-gray-500 tracking-widest uppercase" dir="ltr">
          The Israeli Constitutional Talmud
        </p>

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
