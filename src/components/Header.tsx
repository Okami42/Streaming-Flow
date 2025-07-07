"use client";

import { Search, User, History, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const isSeriesSection = pathname.startsWith("/series");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-2 bg-gradient-to-b from-[#030711]/90 to-transparent backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Navigation gauche */}
        <div className="flex items-center space-x-6 md:space-x-10">
          <Link 
            href={isSeriesSection ? "/series" : "/"}
            className={cn(
              "text-white hover:text-white/80 transition-colors text-base md:text-lg font-medium drop-shadow-md",
              (isSeriesSection ? pathname === "/series" : pathname === "/") && "text-white"
            )}
          >
            Accueil
          </Link>
          <Link 
            href={isSeriesSection ? "/series/top-10" : "/top-10"}
            className={cn(
              "text-white hover:text-white/80 transition-colors text-base md:text-lg font-medium hidden sm:inline drop-shadow-md",
              (isSeriesSection ? pathname === "/series/top-10" : pathname === "/top-10") && "text-white"
            )}
          >
            Top 10
          </Link>
          <Link 
            href={isSeriesSection ? "/series/catalogue" : "/catalogue"}
            className={cn(
              "text-white hover:text-white/80 transition-colors text-base md:text-lg font-medium drop-shadow-md",
              (isSeriesSection ? pathname === "/series/catalogue" : pathname === "/catalogue") && "text-white"
            )}
          >
            Catalogue
          </Link>
        </div>

        {/* Éléments de droite */}
        <div className="flex items-center space-x-4">
          {/* Bouton de recherche avec cadre */}
          <Link 
            href={isSeriesSection ? "/series/catalogue" : "/catalogue"}
            className="relative bg-black/40 backdrop-blur-sm rounded-md flex items-center justify-center h-10 px-3 sm:px-4 hover:bg-black/60 transition-colors shadow-md"
          >
            <Search className="h-5 w-5 text-white" />
            <span className="text-white text-base hidden sm:inline ml-2">Rechercher</span>
          </Link>

          {/* Menu burger avec dropdown */}
          <div className="relative" ref={menuRef}>
            <button 
              className="bg-black/40 backdrop-blur-sm rounded-md flex items-center justify-center h-10 w-10 hover:bg-black/60 transition-colors shadow-md"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="flex flex-col space-y-1.5">
                <span className="w-5 h-0.5 bg-white"></span>
                <span className="w-5 h-0.5 bg-white"></span>
                <span className="w-5 h-0.5 bg-white"></span>
              </div>
            </button>
            
            {/* Menu déroulant */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#141414] rounded-md shadow-lg overflow-hidden z-50 border border-gray-700">
                <div className="py-1">
                  <Link 
                    href="/profil" 
                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-[#252525] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3 text-white/70" />
                    <span>Profil</span>
                  </Link>
                  <Link 
                    href="/profil?tab=history" 
                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-[#252525] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <History className="h-4 w-4 mr-3 text-white/70" />
                    <span>Historique</span>
                  </Link>
                  <Link 
                    href="/profil?tab=favorites" 
                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-[#252525] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Star className="h-4 w-4 mr-3 text-white/70" />
                    <span>Favoris</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

