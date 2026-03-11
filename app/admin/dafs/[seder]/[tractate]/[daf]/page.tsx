import AdminLayout from '@/components/admin/AdminLayout';
import DafEditor from '@/components/admin/DafEditor';
import { getDafData } from '@/lib/daf';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: { seder: string; tractate: string; daf: string };
}

export default async function DafEditorPage({ params }: PageProps) {
  let data;
  try {
    data = await getDafData(params.seder, params.tractate, params.daf);
  } catch {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Daf: {params.tractate} {params.daf}
          </h1>
          <p className="text-sm text-gray-500">{params.seder}</p>
        </div>
        <Link
          href={`/daf/${params.seder}/${params.tractate}/${params.daf}`}
          target="_blank"
          className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1.5"
        >
          View Daf ↗
        </Link>
      </div>
      <DafEditor
        initial={data}
        seder={params.seder}
        tractate={params.tractate}
        daf={params.daf}
      />
    </AdminLayout>
  );
}
