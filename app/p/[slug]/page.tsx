import { notFound } from 'next/navigation';

import { ButtonLink, Panel, ProductNav } from '@/components/ui';
import { getTrialBySlug } from '@/lib/participant/current';

export default async function ProofLinkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trial = await getTrialBySlug(slug);

  if (!trial) notFound();

  return (
    <main>
      <ProductNav />
      <section className="mx-auto max-w-3xl px-5 py-12">
        <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[#6D4AFF]">{trial.trial_days}-day proof</p>
        <h1 className="mt-4 text-[38px] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">Does this actually work on your skin?</h1>
        <Panel className="mt-8 p-6">
          <h2 className="text-2xl font-extrabold">{trial.product_name}</h2>
          <p className="mt-3 text-[#666666]">A simple ProofLink for measuring visible skincare changes with YouCam Skin AI.</p>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <span>Day 1 baseline</span>
            <span>Use product</span>
            <span>Day {trial.trial_days} follow-up</span>
          </div>
        </Panel>
        <ButtonLink className="mt-8" href={`/p/${trial.slug}/start`}>Join this Proof -&gt;</ButtonLink>
        <p className="mt-4 text-sm text-[#666666]">No account required · ~30 sec baseline</p>
      </section>
    </main>
  );
}
