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
        const isHidden = localStorage.getItem("pruv_hide_photos") === "true";
        if (isHidden) {
          setSrc(fallbackSrc);
          return;
        }

        const stored = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
        if (stored && (stored.startsWith("data:image/") || stored.startsWith("http") || stored.startsWith("/"))) {
          setSrc(stored);
        }
      } catch {
        // Ignore storage access errors
      }
    }
  }, [storageKey, fallbackSrc]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
