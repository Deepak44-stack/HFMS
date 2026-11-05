import { Link, NavLink } from "react-router-dom";
import { Search, Heart, GitCompareArrows, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const linkClass = ({ isActive }) =>
  cn(
    "relative inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold hover:bg-primary-soft",
    isActive ? "text-primary after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[3px] after:rounded-full after:bg-accent" : "text-ink"
  );

function LanguageToggle() {
  const { lang, setLang, t } = useApp();
  const opts = [
    { code: "en", label: "EN" },
    { code: "ne", label: "नेपाली" },
  ];
  return (
    <div role="group" aria-label={t("nav.language")} className="inline-flex rounded-lg border border-line bg-surface p-0.5">
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
          lang={o.code}
          className={cn(
            "h-9 rounded-md px-2.5 text-sm font-semibold",
            lang === o.code ? "bg-primary text-primary-foreground" : "text-muted hover:text-ink"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t, favorites, account, signOut } = useApp();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label={t("nav.menu")} className="ml-2 hidden items-center gap-1 md:flex lg:ml-4">
          <NavLink to="/search" className={linkClass}>
            <Search className="hidden h-4 w-4 lg:block" aria-hidden="true" /> {t("nav.search")}
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            <Heart className="hidden h-4 w-4 lg:block" aria-hidden="true" /> {t("nav.favorites")}
            {favorites.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-foreground">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/compare" className={linkClass}>
            <GitCompareArrows className="hidden h-4 w-4 lg:block" aria-hidden="true" /> {t("nav.compare")}
          </NavLink>
          {account && <NavLink to="/dashboard" className={linkClass}><LayoutDashboard className="hidden h-4 w-4 lg:block" aria-hidden="true" /> Dashboard</NavLink>}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle />
          {account ? <Button variant="outline" size="sm" className="hidden h-10 sm:inline-flex" onClick={signOut}><LogOut className="h-4 w-4" /> Log out</Button> : <Button asChild size="sm" className="hidden h-10 sm:inline-flex"><Link to="/login"><LogIn className="h-4 w-4" aria-hidden="true" /> {t("nav.login")}</Link></Button>}
        </div>
      </div>
    </header>
  );
}
