import * as React from "react";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full h-11 rounded-lg border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-muted focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn(fieldClass, className)} {...props} />
));
Input.displayName = "Input";

/** Native select styled to match shadcn inputs (keeps the mobile picker). */
const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select ref={ref} className={cn(fieldClass, "appearance-none bg-no-repeat pr-9", className)}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235d6c6c' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      backgroundPosition: "right 12px center",
    }}
    {...props}>
    {children}
  </select>
));
Select.displayName = "Select";

const Label = ({ className, ...props }) => (
  <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />
);

export { Input, Select, Label };
