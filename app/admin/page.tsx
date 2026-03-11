'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Seder } from '@/types/daf';
import type { ViewState } from '@/types/admin';
import AdminShell from '@/components/admin/AdminShell';

export default function AdminPage() {
  const [sedarim, setSedarim] = useState<Seder[]>([]);
  const [view, setView] = useState<ViewState>({ type: 'welcome' });

  const fetchSedarim = useCallback(() => {
    fetch('/api/admin/sedarim')
      .then((r) => r.json())
      .then(setSedarim)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchSedarim();
  }, [fetchSedarim]);

  return (
    <AdminShell
      sedarim={sedarim}
      view={view}
      onViewChange={setView}
      onSedarimChange={fetchSedarim}
    />
  );
}
