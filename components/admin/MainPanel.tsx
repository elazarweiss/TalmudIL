'use client';

import { useState, useEffect } from 'react';
import type { Seder, DafData } from '@/types/daf';
import type { ViewState } from '@/types/admin';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';
import DafEditor from './DafEditor';
import { NewSederForm, NewTractateForm, NewDafForm, EditSederPanel } from './InlineForms';

interface MainPanelProps {
  sedarim: Seder[];
  view: ViewState;
  onViewChange: (v: ViewState) => void;
  onSedarimChange: () => void;
  lang: Lang;
}

export default function MainPanel({
  sedarim,
  view,
  onViewChange,
  onSedarimChange,
  lang,
}: MainPanelProps) {
  const t = getT(lang);

  if (view.type === 'welcome') {
    return (
      <div className="flex items-center justify-center h-full text-ink/40">
        <div className="text-center space-y-2">
          <p className="font-serif text-2xl font-light">{t.welcomeTitle}</p>
          <p className="font-sans text-sm">{t.welcomeSubtitle}</p>
        </div>
      </div>
    );
  }

  if (view.type === 'new-seder') {
    return (
      <div className="p-6 max-w-lg">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">{t.newSederTitle}</h2>
        <NewSederForm
          lang={lang}
          onSuccess={() => {
            onSedarimChange();
            onViewChange({ type: 'welcome' });
          }}
          onCancel={() => onViewChange({ type: 'welcome' })}
        />
      </div>
    );
  }

  if (view.type === 'new-tractate') {
    return (
      <div className="p-6 max-w-lg">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">{t.newTractateTitle}</h2>
        <NewTractateForm
          sederId={view.sederId}
          lang={lang}
          onSuccess={() => {
            onSedarimChange();
            onViewChange({ type: 'welcome' });
          }}
          onCancel={() => onViewChange({ type: 'welcome' })}
        />
      </div>
    );
  }

  if (view.type === 'edit-seder') {
    return (
      <div className="p-6 max-w-lg">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">{t.editSederTitle}</h2>
        <EditSederPanel
          sederId={view.sederId}
          sedarim={sedarim}
          lang={lang}
          onSuccess={() => {
            onSedarimChange();
            onViewChange({ type: 'welcome' });
          }}
          onCancel={() => onViewChange({ type: 'welcome' })}
          onDelete={() => {
            onSedarimChange();
            onViewChange({ type: 'welcome' });
          }}
        />
      </div>
    );
  }

  if (view.type === 'new-daf') {
    return (
      <div className="p-6 max-w-lg">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">{t.newDafTitle}</h2>
        <NewDafForm
          sedarim={sedarim}
          sederId={view.sederId}
          tractateId={view.tractateId}
          lang={lang}
          onSuccess={(seder, tractate, daf) => {
            onSedarimChange();
            onViewChange({ type: 'daf', seder, tractate, daf });
          }}
          onCancel={() => onViewChange({ type: 'welcome' })}
        />
      </div>
    );
  }

  if (view.type === 'daf') {
    return (
      <DafEditorPanel
        seder={view.seder}
        tractate={view.tractate}
        daf={view.daf}
        lang={lang}
      />
    );
  }

  return null;
}

function DafEditorPanel({
  seder,
  tractate,
  daf,
  lang,
}: {
  seder: string;
  tractate: string;
  daf: string;
  lang: Lang;
}) {
  const t = getT(lang);
  const [data, setData] = useState<DafData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setData(null);
    setError('');
    fetch(`/api/admin/dafs/${seder}/${tractate}/${daf}`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setData)
      .catch(() => setError(t.loadFailed));
  }, [seder, tractate, daf, t.loadFailed]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  if (!data) {
    return <div className="p-6 font-sans text-ink/40">{t.loading}</div>;
  }

  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="font-serif text-xl font-bold text-ink mb-4">
        <span className="font-sans text-ink/50 font-normal text-base">{tractate} /</span> {daf}
      </h2>
      <DafEditor initial={data} seder={seder} tractate={tractate} daf={daf} lang={lang} />
    </div>
  );
}
