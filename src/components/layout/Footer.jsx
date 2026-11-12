import { Link } from "react-router-dom";
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
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-3 text-sm text-white/75">{t("footer.tagline")}</p>
          </div>
          <address className="not-italic text-sm leading-7 text-white/75">
            <strong className="block text-white">Visit or call</strong>
            Kathmandu Valley, Nepal<br />
            +977 9800000000<br />
            hello@hfms.com
          </address>
          <nav aria-label="Footer" className="flex flex-col items-start gap-1 text-sm font-semibold">
            {links.map((l) => <Link key={l.to} to={l.to} className="py-1 text-white/75 underline-offset-4 hover:text-white hover:underline">{l.label}</Link>)}
          </nav>
        </div>
        <p className="mt-8 border-t border-white/15 pt-5 text-xs text-white/70">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
