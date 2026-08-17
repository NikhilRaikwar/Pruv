'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PrimaryButton, SecondaryLink } from './ui';

export function ReceiptActions() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  async function publish() {
    setLoading(true);
    const response = await fetch('/api/proof-receipts/publish', { method: 'POST' });
    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setPublicUrl(data.publicUrl);
      router.refresh();
    }
  }

  async function copy() {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(`${window.location.origin}${publicUrl}`);
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <PrimaryButton disabled={loading} onClick={publish}>{loading ? 'Publishing...' : 'Publish ProofLink'}</PrimaryButton>
      {publicUrl ? (
        <>
          <PrimaryButton onClick={copy}>Copy ProofLink</PrimaryButton>
          <SecondaryLink href={publicUrl}>Open public link</SecondaryLink>
        </>
      ) : null}
    </div>
  );
}
