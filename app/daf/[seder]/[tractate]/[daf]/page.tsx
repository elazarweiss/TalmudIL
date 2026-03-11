import { notFound } from 'next/navigation';
import { getDafData, listAllDafs } from '@/lib/daf';
import DafPage from '@/components/DafPage';
import { getMetadata } from '@/lib/metadata';

interface PageProps {
  params: {
    seder: string;
    tractate: string;
    daf: string;
  };
}

export async function generateStaticParams() {
  return await listAllDafs();
}

export async function generateMetadata({ params }: PageProps) {
  const metadata = await getMetadata();
  const sederLabels: Record<string, string> = Object.fromEntries(
    metadata.sedarim.map((s) => [s.id, s.hebrewName])
  );
  const tractateLabels: Record<string, string> = Object.fromEntries(
    metadata.sedarim.flatMap((s) => s.tractates.map((t) => [t.id, t.hebrewName]))
  );
  const sederLabel = sederLabels[params.seder] ?? params.seder;
  const tractateLabel = tractateLabels[params.tractate] ?? params.tractate;
  return {
    title: `${tractateLabel} דף ${params.daf} — ${sederLabel} | תלמוד ישראל`,
  };
}

export default async function DafRoute({ params }: PageProps) {
  let data;
  try {
    data = await getDafData(params.seder, params.tractate, params.daf);
  } catch {
    notFound();
  }

  return <DafPage data={data} />;
}
