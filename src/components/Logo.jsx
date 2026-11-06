import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** House-with-pin mark: roof = shelter, saffron dot = the verified location. */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="rgb(var(--primary-dark))" />
      <path d="M8 20.5 20 10l12 10.5" fill="none" stroke="rgb(var(--surface))" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 19.5V29h15v-9.5" fill="none" stroke="rgb(var(--surface))" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="23.5" r="3.2" fill="rgb(var(--primary-soft))" />
    </svg>
  );
}

export function Logo({ light = false, className }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 rounded-lg", className)} aria-label="HFMS home">
      <LogoMark />
      <span className="leading-none">
        <span className={cn("block font-display text-xl font-bold tracking-tight", light ? "text-white" : "text-primary-dark")}>HFMS</span>
      </span>
    </Link>
  );
}
