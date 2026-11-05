import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BottomTabBar } from "./BottomTabBar";

export function Layout() {
  const { pathname } = useLocation();
  // The auth screen is a focused task: keep chrome light but still navigable.
  const isAuth = pathname === "/login" || pathname === "/register";
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      {!isAuth && <Footer />}
      {isAuth && <div className="hidden md:block"><Footer /></div>}
      <BottomTabBar />
      <ScrollRestoration />
    </div>
  );
}
