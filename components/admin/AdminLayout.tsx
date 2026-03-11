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
    <div className="min-h-screen flex" dir="ltr">
      {/* Sidebar */}
      <nav className="w-56 bg-gray-900 text-gray-100 flex flex-col p-4 gap-2 shrink-0">
        <div className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">
          TalmudIL Admin
        </div>
        <Link href="/admin" className="hover:bg-gray-700 rounded px-3 py-2 text-sm">
          Dashboard
        </Link>
        <Link href="/admin/dafs/new" className="hover:bg-gray-700 rounded px-3 py-2 text-sm">
          + New Daf
        </Link>
        <Link href="/admin/sedarim/new" className="hover:bg-gray-700 rounded px-3 py-2 text-sm">
          + New Seder
        </Link>
        <Link href="/admin/sources" className="hover:bg-gray-700 rounded px-3 py-2 text-sm">
          Source Library
        </Link>
        <Link href="/admin/sources/new" className="hover:bg-gray-700 rounded px-3 py-2 text-sm">
          + New Source
        </Link>
        <div className="flex-1" />
        <button
          onClick={handleLogout}
          className="text-left hover:bg-gray-700 rounded px-3 py-2 text-sm text-gray-400"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
