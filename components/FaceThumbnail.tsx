"use client";

import { useEffect, useState } from "react";

export function FaceThumbnail({
  storageKey,
  fallbackSrc,
  alt = "Face scan",
  className = "w-full h-full object-cover",
}: {
  storageKey?: string;
  fallbackSrc: string;
  alt?: string;
  className?: string;
}) {
  const [src, setSrc] = useState(fallbackSrc);

  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored && stored.startsWith("data:image/")) {
          setSrc(stored);
        }
      } catch {
        // Ignore storage access errors
      }
    }
  }, [storageKey]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
