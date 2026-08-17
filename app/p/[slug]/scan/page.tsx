import { ScanClient } from './scan-client';

export default async function ScanPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const scanType = type === 'followup' ? 'followup' : 'baseline';

  return (
    <main>
      <ScanClient scanType={scanType} />
    </main>
  );
}
