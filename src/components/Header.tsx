"use client";

import { Search, History, Bell } from "lucide-react";
import CustomImage from "./ui/custom-image";
import Link from "next/link";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";
import { useHistory } from "@/context/history-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import HistoryList from "./HistoryList";

export default function Header() {
  const pathname = usePathname();
  const { history } = useHistory();

  return (
    <header className="bg-[#030711]/80 backdrop-blur-md border-b border-white/5 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group primary-glow">
          <CustomImage
            src="https://ext.same-assets.com/3594695544/130113366.png"
            alt="Anime Flow Logo"
            width={120}
            height={40}
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/3 hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-pink-500" />
          </div>
          <Input
            type="search"
            placeholder="RECHERCHER..."
            className="bg-[#0a0d14]/70 border-white/10 pl-10 text-sm text-gray-200 rounded-md focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all"
          />
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-8 mr-4">
            <NavLink href="/catalogue" active={pathname === "/catalogue"}>
              Catalogue
            </NavLink>
            <NavLink href="/planning" active={pathname === "/planning"}>
              Planning
            </NavLink>
            <NavLink href="/aide" active={pathname === "/aide"}>
              Aide
            </NavLink>
            <NavLink href="/profil" active={pathname === "/profil"}>
              Profil
            </NavLink>
          </nav>

          {/* History dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 bg-[#151a2a] hover:bg-[#1e263f] p-2 rounded-md border border-white/5 transition-colors relative">
              <History className="h-4 w-4 text-white/70" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-500 rounded-full" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#151a2a] border border-white/10 text-white rounded-md p-4 shadow-xl w-[350px] max-h-[400px] overflow-y-auto">
              <div className="mb-2 pb-2 border-b border-white/5">
                <h3 className="text-sm font-semibold">Historique</h3>
              </div>
              <HistoryList />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <button className="flex items-center gap-1 bg-[#151a2a] hover:bg-[#1e263f] p-2 rounded-md border border-white/5 transition-colors">
            <Bell className="h-4 w-4 text-white/70" />
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />
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

function NavLink({ href, active, children }: NavLinkProps) {
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
}
