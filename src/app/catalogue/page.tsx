"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animes, genres, getAnimeImage } from "@/lib/catalogue-utils";

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<"VO" | "VF" | "VF & VO" | "">("");
  const [showFilters, setShowFilters] = useState(false);

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
    // Filtre par terme de recherche
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par langue si sélectionné
    const matchesLanguage = !languageFilter || anime.language === languageFilter || anime.language === "VF & VO";
    
    // Filtre par genres - l'anime doit avoir TOUS les genres sélectionnés (ET logique)
    const matchesGenres = selectedGenres.length === 0 || 
      (anime.genres && selectedGenres.every(selectedGenre => anime.genres!.includes(selectedGenre)));
    
    return matchesSearch && matchesLanguage && matchesGenres;
  });

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

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredAnimes.map((anime) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
