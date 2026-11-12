import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, GitCompareArrows, LogIn, LayoutDashboard, LogOut, Bell, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const linkClass = ({ isActive }) =>
  cn(
    "relative inline-flex h-10 items-center gap-2 border-b-2 border-transparent px-3 text-sm font-semibold hover:text-primary",
    isActive ? "border-accent text-primary" : "text-ink"
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
  const { t, favorites, account, signOut, notifications } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuth = pathname === "/login" || pathname === "/register";
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur">
      <div className="page-container flex h-[76px] items-center gap-3">
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
          {account && <NavLink to="/inquiries" className={linkClass}><Bell className="hidden h-4 w-4 lg:block" aria-hidden="true" /> Notifications{notifications.some((n) => !n.read) && <span className="h-2 w-2 rounded-full bg-accent" />}</NavLink>}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageToggle />
          {account ? <><Button asChild variant="ghost" size="sm" className="hidden h-10 sm:inline-flex"><Link to="/profile"><User className="h-4 w-4" /> Profile</Link></Button><Button variant="outline" size="sm" className="hidden h-10 sm:inline-flex" onClick={() => { signOut(); navigate("/login"); }}><LogOut className="h-4 w-4" /> Log out</Button></> : !isAuth && <Button asChild size="sm" className="hidden h-10 sm:inline-flex"><Link to="/login"><LogIn className="h-4 w-4" aria-hidden="true" /> {t("nav.login")}</Link></Button>}
        </div>
      </div>
    </header>
  );
}
