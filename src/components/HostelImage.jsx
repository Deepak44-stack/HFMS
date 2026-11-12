import { useState } from "react";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";

// DEMO IMAGE - replace with real photo.
// Keep this flag true while the catalogue uses stock photography.
export const SHOW_SAMPLE_PHOTO_LABEL = true;

export function HostelImage({ src, alt, className, showSampleLabel = false, ...props }) {
  const [failed, setFailed] = useState(!src);
  const isDemo = typeof src === "string" && src.includes("images.unsplash.com");

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-[#e5e7e6]", className)}>
      {failed ? (
        <div className="flex h-full w-full items-center justify-center text-[#8b9694]" aria-label="No hostel photo">
          <House className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          {...props}
        />
      )}
      {isDemo && SHOW_SAMPLE_PHOTO_LABEL && showSampleLabel && !failed && (
        <span className="absolute bottom-2 left-2 bg-ink/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[.12em] text-white">
          Sample photo
        </span>
      )}
    </div>
  );
}
