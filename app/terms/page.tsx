import { ProductNav } from '@/components/ui';

export default function TermsPage() {
  return (
    <main>
      <ProductNav />
      <section className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="text-[38px] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">Terms</h1>
        <p className="mt-6 leading-8 text-[#666666]">Pruv is a hackathon prototype for personal observational skincare trials. It is not a medical device and does not diagnose skin conditions, prove causation, or recommend treatment.</p>
      </section>
    </main>
  );
}
