"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animes, genres, getAnimeImage } from "@/lib/catalogue-utils";

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<"VO" | "VF" | "VF & VO" | "">("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const animesPerPage = 54;

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredAnimes = animes.filter(anime => {
    // Filtre par terme de recherche (titre ET id)
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = anime.title.toLowerCase().includes(searchTermLower) || 
                         anime.id.toLowerCase().includes(searchTermLower);
    
    // Filtre par langue si sélectionné
    const matchesLanguage = !languageFilter || anime.language === languageFilter || anime.language === "VF & VO";
    
    // Filtre par genres - l'anime doit avoir TOUS les genres sélectionnés (ET logique)
    const matchesGenres = selectedGenres.length === 0 || 
      (anime.genres && selectedGenres.every(selectedGenre => anime.genres!.includes(selectedGenre)));
    
    return matchesSearch && matchesLanguage && matchesGenres;
  });

  // Calculs de pagination
  const totalPages = Math.ceil(filteredAnimes.length / animesPerPage);
  const startIndex = (currentPage - 1) * animesPerPage;
  const endIndex = startIndex + animesPerPage;
  const currentAnimes = filteredAnimes.slice(startIndex, endIndex);

  // Réinitialiser à la page 1 quand les filtres changent
  const resetToPageOne = () => {
    setCurrentPage(1);
  };

  // Effet pour réinitialiser la page quand les filtres changent
  useEffect(() => {
    resetToPageOne();
  }, [searchTerm, selectedGenres, languageFilter]);

  // Effet pour scroll vers le haut quand on change de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 10) {
      // Si 10 pages ou moins, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages comme dans l'image
      if (currentPage <= 5) {
        // Début: 1,2,3,4,5,6,...,total-1,total
        for (let i = 1; i <= 6; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 4) {
        // Fin: 1,2,...,total-5,total-4,total-3,total-2,total-1,total
        pages.push(1);
        pages.push(2);
        pages.push("...");
        for (let i = totalPages - 5; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu: 1,2,...,current-2,current-1,current,current+1,current+2,...,total-1,total
        pages.push(1);
        pages.push(2);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Catalogue</h1>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-pink-500" />
                </div>
                <Input
                  type="search"
                  placeholder="Rechercher un anime..."
                  className="bg-[#0a0d14]/70 border-white/10 pl-10 text-sm text-gray-200 rounded-md focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex-shrink-0">
                <Button 
                  variant="outline" 
                  className={`border-white/10 text-white h-12 px-6 transition-colors hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white ${
                    showFilters 
                      ? "bg-blue-500 border-blue-500 text-white" 
                      : ""
                  }`}
                  onClick={toggleFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Genres - Affichés seulement si showFilters est true */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 mb-8">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedGenres.includes(genre)
                        ? "bg-blue-500 text-white"
                        : "bg-[#151a2a] text-gray-300 hover:!bg-blue-500 hover:!text-white"
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations sur les résultats */}
          <div className="mb-6 text-gray-400 text-sm">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAnimes.length)} sur {filteredAnimes.length} animés
            {totalPages > 1 && ` (Page ${currentPage} sur ${totalPages})`}
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
            {currentAnimes.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                imageUrl={getAnimeImage(anime.id)}
                type={anime.type}
                language={anime.language}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              {/* Numéros de pages */}
              <div className="flex space-x-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (typeof page === 'number') {
                        setCurrentPage(page);
                      }
                    }}
                    disabled={page === "..."}
                    className={`w-10 h-10 text-sm font-medium rounded-md border transition-colors ${
                      page === currentPage
                        ? 'bg-blue-500 text-white border-blue-500'
                        : page === "..."
                        ? 'bg-transparent text-gray-400 border-transparent cursor-default'
                        : 'bg-[#1a1f35] text-white border-white/10 hover:bg-[#2a2f45] hover:border-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
