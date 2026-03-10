import { notFound } from 'next/navigation';
import { getDafData } from '@/lib/daf';
import DafPage from '@/components/DafPage';

interface PageProps {
  params: {
    seder: string;
    tractate: string;
    daf: string;
  };
}

export async function generateStaticParams() {
  return [
    { seder: 'religion-and-state', tractate: 'shabbat', daf: '1a' },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const sederLabels: Record<string, string> = {
    'religion-and-state': 'דת ומדינה',
  };
  const tractateLabels: Record<string, string> = {
    shabbat: 'שבת',
  };
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
