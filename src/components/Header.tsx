"use client";

import { Search, History, Bell, Calendar, Video } from "lucide-react";
import CustomImage from "./ui/custom-image";
import Link from "next/link";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";
import HistoryDropdown from "./HistoryDropdown";
import { memo } from "react";

export default function Header() {
  const pathname = usePathname();
  const isSeriesSection = pathname.startsWith("/series");

  return (
    <header className="bg-[#030711]/80 backdrop-blur-md border-b border-white/5 py-3 sm:py-5 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-4">
        {/* Logo */}
        <Link href={isSeriesSection ? "/series" : "/anime"} className="flex items-center group primary-glow sm:mr-6 mr-2">
          <div className="flex items-center gap-2">
            <CustomImage
              src={isSeriesSection ? "/picture/icon_logo_okami.png" : "/picture/logookaviolet.png"}
              alt="Okanime Logo"
              width={180}
              height={60}
              className="h-8 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Search Bar Desktop */}
        <div className="relative w-1/3 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-pink-500" />
          </div>
          <Link href={isSeriesSection ? "/series/search" : "/search"}>
            <Input
              type="search"
              placeholder={isSeriesSection ? "RECHERCHER DES SÉRIES..." : "RECHERCHER DES ANIMÉS..."}
              className="bg-[#101418] border border-white/10 pl-10 text-sm text-gray-200 rounded-full focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all cursor-pointer"
              readOnly
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Navigation pour mobile (icônes seulement) */}
          <nav className="flex md:hidden items-center space-x-4">
            <Link 
              href={isSeriesSection ? "/series/catalogue" : "/catalogue"}
              className={cn(
                "text-xs text-white/90 flex flex-col items-center",
                (isSeriesSection ? pathname === "/series/catalogue" : pathname === "/catalogue") && 
                "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-semibold"
              )}
            >
              <span>Catalogue</span>
            </Link>
            <Link 
              href={isSeriesSection ? "/series/planning" : "/planning"}
              className={cn(
                "text-xs text-white/90 flex flex-col items-center",
                (isSeriesSection ? pathname === "/series/planning" : pathname === "/planning") && 
                "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-semibold"
              )}
            >
              <span>Planning</span>
            </Link>
            <Link 
              href="/profil"
              className={cn(
                "text-xs text-white/90 flex flex-col items-center",
                pathname === "/profil" && 
                "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-semibold"
              )}
            >
              <span>Profil</span>
            </Link>
          </nav>

          {/* Navigation pour desktop */}
          <nav className="hidden md:flex items-center space-x-8 mr-4">
            <NavLink 
              href={isSeriesSection ? "/series/catalogue" : "/catalogue"} 
              active={isSeriesSection ? pathname === "/series/catalogue" : pathname === "/catalogue"}
            >
              Catalogue
            </NavLink>
            <NavLink 
              href={isSeriesSection ? "/series/planning" : "/planning"} 
              active={isSeriesSection ? pathname === "/series/planning" : pathname === "/planning"}
            >
              Planning
            </NavLink>
            <NavLink href="/profil" active={pathname === "/profil"}>
              Profil
            </NavLink>
          </nav>

          {/* History dropdown - composant externe */}
          <HistoryDropdown />

          {/* Notifications */}
          <button className="flex items-center gap-1 bg-[#151a2a] hover:bg-[#1e263f] p-2 rounded-md border border-white/5 transition-colors">
            <Bell className="h-4 w-4 text-white/70" />
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </div>

      {/* Barre de recherche mobile en bas du header */}
      <div className="md:hidden px-2 pb-2 pt-1">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3 w-3 text-pink-500" />
          </div>
          <Link href={isSeriesSection ? "/series/search" : "/search"} className="w-full block">
            <Input
              type="search"
              placeholder={isSeriesSection ? "RECHERCHER..." : "RECHERCHER..."}
              className="bg-[#101418] border border-white/10 pl-8 text-xs h-8 text-gray-200 rounded-full focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all cursor-pointer w-full"
              readOnly
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
type NavLinkProps = {
  href: string;
  active?: boolean;
  children: React.ReactNode;
};

// Optimiser NavLink avec memo pour éviter les re-rendus
const NavLink = memo(function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group nav-link",
        active && "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-semibold"
      )}
    >
      {children}
      <span className={cn(
        "block h-0.5 mt-1 transition-all duration-300",
        active ? "w-full bg-gradient-to-r from-pink-500 to-blue-500" : "w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-blue-500"
      )} />
    </Link>
  );
});

