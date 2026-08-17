import { ProductNav } from '@/components/ui';

export default function PrivacyPage() {
  return (
    <main>
      <ProductNav />
      <section className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="text-[38px] font-extrabold leading-none tracking-[-0.02em] sm:text-5xl">Privacy</h1>
        <p className="mt-6 leading-8 text-[#666666]">Pruv sends your scan image to Perfect Corp. through YouCam Skin AI for analysis. Pruv does not store raw face images in Supabase and does not send face images to OpenRouter.</p>
        <p className="mt-4 leading-8 text-[#666666]">Pruv stores structured scan scores, scan metadata, trial state, and explicitly published receipt metrics. Public Proof Receipts do not include participant tokens, raw photos, or internal YouCam task ids.</p>
      </section>
    </main>
  );
}
