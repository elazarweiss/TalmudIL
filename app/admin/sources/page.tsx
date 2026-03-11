import AdminLayout from '@/components/admin/AdminLayout';
import { getSources } from '@/lib/sources';
import Link from 'next/link';

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Source Library</h1>
        <Link
          href="/admin/sources/new"
          className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          + New Source
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Author</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Year</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">Verified</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{source.author}</td>
                <td className="px-4 py-2">{source.title}</td>
                <td className="px-4 py-2">{source.year || '—'}</td>
                <td className="px-4 py-2 capitalize">{source.type}</td>
                <td className="px-4 py-2">
                  {source.verified ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/sources/${source.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {sources.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No sources yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
