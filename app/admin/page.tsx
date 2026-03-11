import AdminLayout from '@/components/admin/AdminLayout';
import { getMetadata } from '@/lib/metadata';
import Link from 'next/link';

export default async function AdminDashboard() {
  const metadata = await getMetadata();

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {metadata.sedarim.length === 0 ? (
        <p className="text-gray-500">
          No sedarim yet.{' '}
          <Link href="/admin/sedarim/new" className="text-blue-600 underline">
            Create one
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-6">
          {metadata.sedarim.map((seder) => (
            <div key={seder.id} className="bg-white rounded shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-bold">{seder.hebrewName}</h2>
                  <p className="text-sm text-gray-500">{seder.englishName} · {seder.id}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/sedarim/${seder.id}`}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                  >
                    Edit Seder
                  </Link>
                  <Link
                    href={`/admin/sedarim/${seder.id}/tractates/new`}
                    className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded"
                  >
                    + Tractate
                  </Link>
                </div>
              </div>

              {seder.tractates.length === 0 ? (
                <p className="text-sm text-gray-400">No tractates yet.</p>
              ) : (
                <div className="space-y-2">
                  {seder.tractates.map((tractate) => (
                    <div key={tractate.id} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {tractate.hebrewName}{' '}
                          <span className="text-gray-400 text-sm">({tractate.englishName})</span>
                        </span>
                        <Link
                          href="/admin/dafs/new"
                          className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-2 py-1 rounded"
                        >
                          + Daf
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tractate.dafs.map((daf) => (
                          <Link
                            key={daf}
                            href={`/admin/dafs/${seder.id}/${tractate.id}/${daf}`}
                            className="text-sm bg-yellow-50 hover:bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-200"
                          >
                            {daf}
                          </Link>
                        ))}
                        {tractate.dafs.length === 0 && (
                          <span className="text-xs text-gray-400">No dafs yet.</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
