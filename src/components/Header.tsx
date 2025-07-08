"use client";

import { Search, User, History, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const isSeriesSection = pathname?.startsWith("/series") || false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Effet de montage pour s'assurer que tout est correctement chargé côté client
  useEffect(() => {
    setMounted(true);
    
    // Forcer le rendu du header sur mobile
    if (window.innerWidth < 768) {
      // S'assurer que le header est visible
      if (headerRef.current) {
        headerRef.current.style.visibility = 'visible';
        headerRef.current.style.opacity = '1';
      }
      
      // Forcer la recalculation des styles après le premier rendu
      setTimeout(() => {
        if (headerRef.current) {
          headerRef.current.style.transform = 'translateZ(0)';
        }
      }, 100);
    }
  }, []);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    if (mounted) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [mounted]);

  // Gérer la visibilité sur scroll pour mobile
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      if (!headerRef.current) return;
      
      // Assurer que le header reste visible en haut, même après un scroll
      if (window.scrollY > 10) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Si pas encore monté, retourner un placeholder pour éviter le saut de contenu
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 pb-2 h-16"></header>
    );
  }

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 pt-6 pb-2 bg-gradient-to-b from-[#030711]/90 to-transparent backdrop-blur-sm will-change-transform"
      style={{ WebkitBackfaceVisibility: 'hidden' }}
    >
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
      
      {/* Ajouter un style CSS pour assurer que le header reste visible sur mobile */}
      <style jsx>{`
        @media (max-width: 767px) {
          header.scrolled {
            background: rgba(3, 7, 17, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </header>
  );
}

