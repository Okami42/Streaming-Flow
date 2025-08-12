"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllAnimes } from "@/lib/animeData";
import { recentEpisodes, hidden, recentScans, latestFilms } from "@/lib/data";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  
  useEffect(() => {
    // Ne rien afkficher par défaut
    const query = searchParams.get("q");
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (term: string) => {
    const animes = getAllAnimes();
    // Ajouter les animes de data.ts
    const additionalAnimes = [...recentEpisodes, ...hidden, ...latestFilms]
      .filter(item => item !== null)
      .map(item => ({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      type: item.type || "Anime",
      language: item.language || "VOSTFR"
    }));
    
    if (!term.trim()) {
      setResults([]);
      return;
    }
    
    // Filtrer les animes de animeData.ts
    const filteredAnimes = animes.filter(anime => 
      anime.title.toLowerCase().includes(term.toLowerCase()) ||
      anime.originalTitle?.toLowerCase().includes(term.toLowerCase()) ||
      anime.description.toLowerCase().includes(term.toLowerCase())
    ).map(anime => ({
      id: anime.id,
      title: anime.title,
      imageUrl: anime.imageUrl,
      type: "Anime",
      language: "VOSTFR"
    }));
    
    // Filtrer les animes supplémentaires
    const filteredAdditionalAnimes = additionalAnimes.filter(anime => 
      anime.title.toLowerCase().includes(term.toLowerCase())
    );
    
    // Combiner les résultats et éliminer les doublons
    const combinedResults = [...filteredAnimes];
    
    filteredAdditionalAnimes.forEach(anime => {
      if (!combinedResults.some(item => item.id === anime.id)) {
        combinedResults.push(anime);
      }
    });
    
    setResults(combinedResults);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    performSearch(newTerm);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="search-container max-w-3xl mx-auto mb-10">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-pink-500" />
              </div>
              <Input
                type="search"
                placeholder="Rechercher un anime..."
                className="bg-[#101418] border border-white/10 pl-10 py-6 text-base text-gray-200 rounded-full focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all w-full"
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>
          </div>

          {searchTerm.trim() !== "" && (
            <div className="results-header">
              <h2 className="text-xl font-semibold mb-4">
                {results.length === 0 
                  ? "Aucun résultat trouvé" 
                  : `${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`}
              </h2>
            </div>
          )}

          <div className="results-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {results.map((anime) => (
              <AnimeCard 
                key={anime.id}
                id={anime.id}
                title={anime.title}
                imageUrl={anime.imageUrl}
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
