'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <nav className="w-56 bg-ink text-parchment-100 flex flex-col p-4 gap-2 shrink-0 border-l border-parchment-300/20">
        <div className="font-serif text-base font-bold mb-4 border-b border-parchment-300/20 pb-2">
          ניהול תלמוד ישראל
        </div>
        <Link href="/admin" className="font-sans hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-200 hover:text-parchment-100 transition-colors">
          לוח בקרה
        </Link>
        <Link href="/admin/dafs/new" className="font-sans hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-200 hover:text-parchment-100 transition-colors">
          + דף חדש
        </Link>
        <Link href="/admin/sedarim/new" className="font-sans hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-200 hover:text-parchment-100 transition-colors">
          + סדר חדש
        </Link>
        <Link href="/admin/sources" className="font-sans hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-200 hover:text-parchment-100 transition-colors">
          ספריית מקורות
        </Link>
        <Link href="/admin/sources/new" className="font-sans hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-200 hover:text-parchment-100 transition-colors">
          + מקור חדש
        </Link>
        <div className="flex-1" />
        <button
          onClick={handleLogout}
          className="font-sans text-right hover:bg-parchment-300/10 rounded px-3 py-2 text-sm text-parchment-300/60 hover:text-parchment-100 transition-colors"
        >
          יציאה
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-parchment-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
