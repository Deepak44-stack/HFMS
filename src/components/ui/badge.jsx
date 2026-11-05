import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        default: "bg-primary-soft text-primary-dark",
        verified: "bg-primary text-primary-foreground",
        accent: "bg-accent-soft text-[#7a4b00]",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-[#8a5a00]",
        error: "bg-error-soft text-error",
        outline: "border border-line bg-surface text-ink",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
