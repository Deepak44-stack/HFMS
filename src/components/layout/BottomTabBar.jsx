import { NavLink } from "react-router-dom";
import { Home, Search, Heart, User, LayoutDashboard } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function BottomTabBar() {
  const { t, favorites, account } = useApp();
  const tabs = [
    { to: "/", label: t("nav.home"), icon: Home, end: true },
    { to: "/search", label: t("nav.search"), icon: Search },
    { to: "/favorites", label: t("nav.saved"), icon: Heart, badge: favorites.length },
    account ? { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard } : { to: "/login", label: t("nav.profile"), icon: User },
  ];
  return (
    <nav
      aria-label={t("nav.menu")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, end, badge }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn("relative flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold", isActive ? "text-primary" : "text-muted")
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("relative flex h-7 w-12 items-center justify-center rounded-full", isActive && "bg-primary-soft")}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {badge > 0 && (
                      <span className="absolute -right-0.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                        {badge}
                      </span>
                    )}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
