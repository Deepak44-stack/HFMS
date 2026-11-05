import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useApp } from "@/context/AppContext";

export function Footer() {
  const { t } = useApp();
  const links = [
    { to: "/about", label: t("footer.about") },
    { to: "/faq", label: t("footer.faq") },
    { to: "/contact", label: t("footer.contact") },
  ];
  return (
    <footer className="mt-20 bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-3 text-sm text-white/75">{t("footer.tagline")}</p>
          </div>

          <p className="flex max-w-md items-start gap-3 rounded-xl bg-white/10 p-4 text-sm font-medium">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
            {t("footer.trust")}
          </p>

          <nav aria-label="Footer" className="flex gap-6 text-sm font-semibold">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded py-2 text-white/90 underline-offset-4 hover:text-white hover:underline">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-white/15 pt-5 text-xs text-white/70">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
