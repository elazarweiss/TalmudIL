'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Seder } from '@/types/daf';
import type { ViewState } from '@/types/admin';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';
import SidebarTree from './SidebarTree';
import MainPanel from './MainPanel';

interface AdminShellProps {
  sedarim: Seder[];
  view: ViewState;
  onViewChange: (v: ViewState) => void;
  onSedarimChange: () => void;
}

export default function AdminShell({
  sedarim,
  view,
  onViewChange,
  onSedarimChange,
}: AdminShellProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>('he');
  const t = getT(lang);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" dir="rtl">
      {/* Header */}
      <header className="bg-ink text-parchment-100 px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-parchment-300/20">
        <span className="font-serif font-bold text-base">{t.adminTitle}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'he' : 'en'))}
            className="font-sans text-xs text-parchment-300 hover:text-parchment-100 px-3 py-1 rounded-full border border-parchment-300/40 hover:border-parchment-300/80 transition-colors"
          >
            {t.switchLang}
          </button>
          <button
            onClick={handleLogout}
            className="font-sans text-xs text-parchment-300/70 hover:text-parchment-100 px-2 py-1 transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-ink text-parchment-100 shrink-0 overflow-hidden flex flex-col border-l border-parchment-300/20">
          <SidebarTree
            sedarim={sedarim}
            view={view}
            onViewChange={onViewChange}
            lang={lang}
          />
        </aside>

        <main className="flex-1 bg-parchment-50 overflow-y-auto">
          <MainPanel
            sedarim={sedarim}
            view={view}
            onViewChange={onViewChange}
            onSedarimChange={onSedarimChange}
            lang={lang}
          />
        </main>
      </div>
    </div>
  );
}
