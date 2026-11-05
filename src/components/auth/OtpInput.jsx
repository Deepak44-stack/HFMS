import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Six single-digit boxes with auto-advance, backspace-to-previous and paste support. */
export function OtpInput({ value, onChange, invalid = false, idPrefix = "otp" }) {
  const refs = useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  const setAt = (i, d) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join(""));
  };

  const handleChange = (i, e) => {
    const d = e.target.value.replace(/\D/g, "").slice(-1);
    setAt(i, d);
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
      setAt(i - 1, "");
    }
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex justify-between gap-2 sm:justify-start sm:gap-3" role="group" aria-label="6-digit code">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`${idPrefix}-${i}`}
          ref={(el) => (refs.current[i] = el)}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Digit ${i + 1} of 6`}
          aria-invalid={invalid}
          className={cn(
            "h-14 w-full min-w-0 max-w-14 rounded-xl border bg-surface text-center font-display text-2xl font-semibold text-ink",
            "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            invalid ? "border-error" : d ? "border-primary" : "border-line"
          )}
        />
      ))}
    </div>
  );
}
