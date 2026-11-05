import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        primary: { DEFAULT: "rgb(var(--primary) / <alpha-value>)", foreground: "rgb(var(--primary-foreground) / <alpha-value>)", dark: "rgb(var(--primary-dark) / <alpha-value>)", soft: "rgb(var(--primary-soft) / <alpha-value>)" },
        accent: { DEFAULT: "rgb(var(--accent) / <alpha-value>)", foreground: "rgb(var(--accent-foreground) / <alpha-value>)", soft: "rgb(var(--accent-soft) / <alpha-value>)" },
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: { DEFAULT: "rgb(var(--muted) / <alpha-value>)", foreground: "rgb(var(--muted) / <alpha-value>)" },
        line: "rgb(var(--line) / <alpha-value>)",
        success: { DEFAULT: "rgb(var(--success) / <alpha-value>)", soft: "rgb(var(--success-soft) / <alpha-value>)" },
        warning: { DEFAULT: "rgb(var(--warning) / <alpha-value>)", soft: "rgb(var(--warning-soft) / <alpha-value>)" },
        error: { DEFAULT: "rgb(var(--error) / <alpha-value>)", soft: "rgb(var(--error-soft) / <alpha-value>)" },
      },
      borderRadius: { DEFAULT: "10px", lg: "12px", md: "9px", sm: "7px", xl: "16px", "2xl": "18px" },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Devanagari"', "system-ui", "sans-serif"],
        display: ["Fraunces", '"Noto Sans Devanagari"', "Georgia", "serif"],
        nepali: ['"Noto Sans Devanagari"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(18,46,43,.04), 0 5px 18px rgba(18,46,43,.05)",
        lift: "0 2px 5px rgba(18,46,43,.06), 0 14px 30px rgba(18,46,43,.10)",
      },
      transitionDuration: { 150: "150ms", 200: "200ms" },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "dropdown-in": { from: { opacity: 0, transform: "translateY(-4px) scale(.98)" }, to: { opacity: 1, transform: "none" } },
      },
      animation: { "dropdown-in": "dropdown-in 150ms ease-out" },
    },
  },
  plugins: [animate],
};
