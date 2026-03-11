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
  const [lang, setLang] = useState<Lang>('en');
  const t = getT(lang);

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" dir="ltr">
      {/* Header */}
      <header className="bg-gray-900 text-gray-100 px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-gray-800">
        <span className="font-bold text-sm tracking-wide">{t.adminTitle}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang((l) => (l === 'en' ? 'he' : 'en'))}
            className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors border border-gray-700"
          >
            {t.switchLang}
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-gray-900 text-gray-100 shrink-0 overflow-hidden flex flex-col border-r border-gray-800">
          <SidebarTree
            sedarim={sedarim}
            view={view}
            onViewChange={onViewChange}
            lang={lang}
          />
        </aside>

        <main className="flex-1 bg-gray-50 overflow-y-auto">
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
