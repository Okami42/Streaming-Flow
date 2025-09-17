"use client";

import { Search, User, History, Star, LogIn, LogOut, LayoutGrid, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import AuthModal from "@/components/ui/auth-modal";
import { animes, getAnimeImage } from "@/lib/catalogue-utils";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isSeriesSection = pathname?.startsWith("/series") || false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

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
      // Fermer seulement les résultats si on clique en dehors, garder la barre ouverte
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }
    
    if (mounted) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [mounted]);

  // Logique de recherche
  const performSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    // Utiliser les données du catalogue uniquement
    const searchTermLower = term.toLowerCase();
    const filteredAnimes = animes.filter(anime => 
      anime.title.toLowerCase().includes(searchTermLower) ||
      anime.id.toLowerCase().includes(searchTermLower)
    ).map(anime => ({
      id: anime.id,
      title: anime.title,
      imageUrl: anime.imageUrl || getAnimeImage(anime.id),
      type: anime.type,
      language: anime.language
    }));

    // Limiter à 8 résultats pour l'affichage
    setSearchResults(filteredAnimes.slice(0, 8));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    performSearch(newTerm);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (animeId: string) => {
    router.push(`/catalogue/${animeId}`);
    setSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

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
    <>
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 pt-6 pb-2 bg-gradient-to-b from-[#030711]/90 to-transparent will-change-transform"
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
          {/* Catalogue visible uniquement sur desktop */}
          <Link 
            href={isSeriesSection ? "/series/catalogue" : "/catalogue"}
            className={cn(
              "text-white hover:text-white/80 transition-colors text-base md:text-lg font-medium drop-shadow-md hidden md:inline",
              (isSeriesSection ? pathname === "/series/catalogue" : pathname === "/catalogue") && "text-white"
            )}
          >
            Catalogue
          </Link>
        </div>

        {/* Éléments de droite */}
        <div className="flex items-center space-x-4">
          {/* Barre de recherche ou bouton */}
          <div className="relative search-container">
            {searchOpen ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchTerm.trim()) {
                      performSearch(searchTerm);
                    }
                  }}
                  placeholder="Rechercher..."
                  className="w-48 md:w-80 bg-black/60 border border-blue-500/50 rounded-full pl-10 pr-10 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="relative bg-black/40 rounded-md flex items-center justify-center h-10 px-3 sm:px-4 hover:bg-black/60 transition-colors shadow-md"
              >
                <Search className="h-5 w-5 text-white" />
                <span className="text-white text-base ml-2">Rechercher</span>
              </button>
            )}

            {/* Dropdown des résultats */}
            {searchOpen && searchTerm.trim() !== "" && searchResults.length > 0 && (
              <div className="absolute top-full left-0 md:right-0 md:left-auto mt-2 w-80 md:w-96 bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl max-h-80 overflow-y-auto z-50">
                {searchResults.map((anime) => (
                  <button
                    key={anime.id}
                    onClick={() => handleResultClick(anime.id)}
                    className="w-full flex items-center px-4 py-3 hover:bg-white/10 transition-colors text-left first:rounded-t-lg last:rounded-b-lg"
                  >
                    <img
                      src={anime.imageUrl}
                      alt={anime.title}
                      className="w-12 h-16 object-cover rounded mr-3 flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <h3 className="text-white font-medium text-sm mb-1">{anime.title}</h3>
                      <p className="text-gray-400 text-xs">{anime.type} • {anime.language}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bouton de connexion / Profil utilisateur */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm hidden md:inline">
                {user.username}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-md flex items-center justify-center h-10 px-3 sm:px-4 transition-colors shadow-md"
            >
              <LogIn className="h-5 w-5 text-white" />
              <span className="text-white text-base hidden sm:inline ml-2">Connexion</span>
            </button>
          )}

          {/* Menu burger avec dropdown */}
          <div className="relative" ref={menuRef}>
            <button 
              className="bg-black/40 rounded-md flex items-center justify-center h-10 w-10 hover:bg-black/60 transition-colors shadow-md"
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
                  {/* Catalogue visible uniquement sur mobile */}
                  <Link 
                    href={isSeriesSection ? "/series/catalogue" : "/catalogue"}
                    className="flex items-center px-4 py-3 text-sm text-white hover:bg-[#252525] transition-colors md:hidden"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LayoutGrid className="h-4 w-4 mr-3 text-white/70" />
                    <span>Catalogue</span>
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
                  
                  {/* Option de déconnexion si connecté */}
                  {isAuthenticated && user && (
                    <>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#252525] transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-white/70" />
                        <span>Déconnexion</span>
                      </button>
                    </>
                  )}
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

    
      {/* Modal d'authentification - en dehors du header */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
}

