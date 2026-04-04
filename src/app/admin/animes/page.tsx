"use client";

import React, { useState } from 'react';
import { Anime } from '@/lib/animeData';
import { getAllAnimesAsync } from '@/lib/animeData';
import { getAnimeImage } from '@/lib/catalogue-utils';
import AddAnimeForm from '@/components/admin/AddAnimeForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, List, ArrowLeft, Settings, Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function AdminAnimesPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 24;
  
  React.useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await getAllAnimesAsync();
        setAnimes(data);
      } catch (e) {
        console.error("Erreur de chargement des animes", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimes();
  }, []);

  const filteredAnimes = animes.filter(anime => {
    const query = searchQuery.toLowerCase();
    return (
      anime.title.toLowerCase().includes(query) ||
      (anime.originalTitle && anime.originalTitle.toLowerCase().includes(query))
    );
  });
  
  const totalPages = Math.ceil(filteredAnimes.length / itemsPerPage);
  
  // Reset page to 1 when searching
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const currentAnimes = filteredAnimes.slice().reverse().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#030711] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-2" /> Retour au site
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <List className="text-blue-500" /> Gestion du Catalogue
            </h1>
            <p className="text-gray-400 mt-2">
              Ajoutez manuellement des animes dans le fichier source <code className="bg-gray-900 px-2 py-1 rounded text-xs">animeData.ts</code>.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/admin/planning">
              <Button variant="outline" className="border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10 flex items-center gap-2">
                <Calendar size={18} /> Planning
              </Button>
            </Link>
            <Button 
              onClick={() => setIsAdding(!isAdding)}
              className={`${isAdding ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center gap-2 transition-colors`}
            >
              {isAdding ? 'Voir la liste' : <><PlusCircle size={18} /> Ajouter un Anime</>}
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : isAdding ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AddAnimeForm 
              onSuccess={() => {
                window.location.reload();
              }} 
              onCancel={() => setIsAdding(false)} 
            />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-400">
              <span>{filteredAnimes.length} animes dans la base de données locale.</span>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Rechercher un anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-gray-900 border-gray-800 text-white focus-visible:ring-blue-500 rounded-md"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 select-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentAnimes.map((anime: Anime) => {
                const imageUrl = getAnimeImage(anime.id) || anime.bannerUrl || anime.imageUrl;
                
                // Calculer le nombre d'épisodes (les anciens sont auto-loadés, les nouveaux sont stockés en dur)
                let episodeCount: number | string = "Auto-load";
                if (anime.seasons && anime.seasons.length > 0) {
                  episodeCount = anime.seasons.reduce((acc, s) => acc + (s.episodes?.length || 0), 0);
                } else if (anime.episodes && anime.episodes.length > 0) {
                  episodeCount = anime.episodes.length;
                }

                return (
                  <Link href={`/admin/animes/${anime.id}`} key={anime.id} className="block group">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors h-full flex flex-col">
                      <div className="h-40 bg-gray-800 relative overflow-hidden">
                        {imageUrl ? (
                          <img 
                            src={imageUrl} 
                            alt={anime.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-950">
                            Pas d'image
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-xs px-2 py-1 rounded font-medium">
                          {anime.status}
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="pointer-events-none">
                            <Settings size={16} className="mr-2" />
                            Gérer
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg line-clamp-1" title={anime.title}>{anime.title}</h3>
                        <div className="flex gap-2 text-xs mt-1">
                          <span className="text-gray-400">{anime.year}</span>
                          <span className="text-gray-600">•</span>
                          <span className="text-blue-400">{anime.type}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap mt-3">
                          {anime.genres.slice(0, 3).map(g => (
                            <span key={g} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full">{g}</span>
                          ))}
                          {anime.genres.length > 3 && <span className="text-[10px] text-gray-500">+{anime.genres.length - 3}</span>}
                        </div>
                        <div className="text-xs text-gray-500 border-t border-gray-800 mt-auto pt-3 flex justify-between">
                          <span className="font-medium bg-gray-800 px-2 py-1 rounded text-white/80">
                            {episodeCount} {typeof episodeCount === 'number' ? 'Épisode(s)' : ''}
                          </span>
                          <span className="py-1">⭐ {anime.rating}/10</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 py-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} />
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show pages around current page
                    let pageNum = currentPage;
                    if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    
                    if (pageNum < 1 || pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className={`w-9 h-9 ${currentPage === pageNum ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
