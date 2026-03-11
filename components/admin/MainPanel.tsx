'use client';

import { useState, useEffect } from 'react';
import type { Seder, DafData } from '@/types/daf';
import type { ViewState } from '@/types/admin';
import DafEditor from './DafEditor';
import { NewSederForm, NewTractateForm, NewDafForm, EditSederPanel } from './InlineForms';

interface MainPanelProps {
  sedarim: Seder[];
  view: ViewState;
  onViewChange: (v: ViewState) => void;
  onSedarimChange: () => void;
}

export default function MainPanel({
  sedarim,
  view,
  onViewChange,
  onSedarimChange,
}: MainPanelProps) {
  if (view.type === 'welcome') {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center space-y-2">
          <p className="text-2xl font-light">TalmudIL Admin</p>
          <p className="text-sm">Select a daf from the sidebar to begin editing.</p>
        </div>
      </div>
    );
  }

  if (view.type === 'new-seder') {
    return (
      <div className="p-6 max-w-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">New Seder</h2>
        <NewSederForm
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">New Tractate</h2>
        <NewTractateForm
          sederId={view.sederId}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Seder</h2>
        <EditSederPanel
          sederId={view.sederId}
          sedarim={sedarim}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">New Daf</h2>
        <NewDafForm
          sedarim={sedarim}
          sederId={view.sederId}
          tractateId={view.tractateId}
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
    return <DafEditorPanel seder={view.seder} tractate={view.tractate} daf={view.daf} />;
  }

  return null;
}

function DafEditorPanel({
  seder,
  tractate,
  daf,
}: {
  seder: string;
  tractate: string;
  daf: string;
}) {
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
      .catch(() => setError('Failed to load daf'));
  }, [seder, tractate, daf]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  if (!data) {
    return <div className="p-6 text-gray-400">Loading…</div>;
  }

  return (
    <div className="p-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        <span className="text-gray-500 font-normal text-base">{tractate} /</span> {daf}
      </h2>
      <DafEditor initial={data} seder={seder} tractate={tractate} daf={daf} />
    </div>
  );
}
