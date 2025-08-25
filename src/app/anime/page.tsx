"use client";

import React from "react";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import {
  classics,
  hidden,
  recentEpisodes,
  recentScans,
  tuesdayReleases
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Plus, Sparkles, Star, Play, History } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import { useHistory } from "@/context/history-context";
import { calculateProgress, getRelativeTime, formatTimeExtended } from "@/lib/history";
import { getAnimeById } from "@/lib/animeData";
import { getAnimeImage as getCatalogueImage } from "@/app/catalogue/page";

// Définir un type pour les éléments intrinsèques personnalisés
interface CustomElements {
  [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}

// Type pour les éléments de contenu compatible avec ContentSection
interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  time?: string;
  type: "Anime" | "Scans";
  language: "VF & VO";
}

// Conversion des données pour garantir la compatibilité des types
const typedTuesdayReleases = tuesdayReleases.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VF & VO"
}));

const typedRecentEpisodes = recentEpisodes.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VF & VO"
}));

const typedRecentScans = recentScans.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VF & VO"
}));

const typedClassics = classics.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VF & VO"
}));

const typedHidden = hidden.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VF & VO"
}));

// Fonction pour obtenir l'image de l'anime à partir de l'ID de l'anime
const getAnimeImage = (historyId: string): string => {
  // Utiliser la même fonction que pour extraire l'ID
  const animeId = getAnimeIdFromHistoryId(historyId);
  
  // Récupérer l'anime correspondant
  const anime = getAnimeById(animeId);
  
  // Si l'anime a une image dans animeData, l'utiliser
  if (anime && anime.imageUrl) {
    return anime.imageUrl;
  }
  
  // Sinon, utiliser l'image du catalogue comme fallback
  if (animeId) {
    console.log(`🔍 Tentative de récupération image catalogue pour: ${animeId}`);
    const catalogueImage = getCatalogueImage(animeId);
    console.log(`🔍 Image catalogue trouvée: ${catalogueImage}`);
    if (catalogueImage) {
      return catalogueImage;
    }
  }
  
  // Image par défaut si aucune trouvée
  return '/placeholder-image.jpg';
};

// Fonction auxiliaire pour extraire l'ID d'anime à partir d'un ID d'historique
const getAnimeIdFromHistoryId = (historyId: string): string => {
  // Format typique: "anime-id-s1e1" ou "anime-id-e1"
  // On doit extraire uniquement l'ID de l'anime, pas le numéro d'épisode
  
  console.log(`🔍 getAnimeIdFromHistoryId - historyId: ${historyId}`);
  
  // Vérifier si l'ID contient un indicateur d'épisode
  const seasonEpisodePattern = /-s\d+e\d+$/;
  const episodePattern = /-e\d+$/;
  
  let baseId = historyId;
  
  // Supprimer le pattern de saison et d'épisode s'il existe
  if (seasonEpisodePattern.test(historyId)) {
    baseId = historyId.replace(seasonEpisodePattern, '');
    console.log(`🔍 getAnimeIdFromHistoryId - pattern saison détecté, baseId: ${baseId}`);
  } else if (episodePattern.test(historyId)) {
    baseId = historyId.replace(episodePattern, '');
    console.log(`🔍 getAnimeIdFromHistoryId - pattern épisode détecté, baseId: ${baseId}`);
  }
  
  // PRIORITÉ 1: Vérifier si l'ID existe dans le catalogue (plus fiable)
  if (getCatalogueImage(baseId)) {
    return baseId;
  }
  
  // PRIORITÉ 2: Essayer l'ID complet dans animeData
  const anime = getAnimeById(baseId);
  if (anime) {
    return baseId;
  }
  
  // Si l'ID complet ne fonctionne pas, essayer les parties progressivement
  const parts = baseId.split('-');
  
  if (parts.length > 1) {
    // Essayer avec toutes les parties possibles, en commençant par le plus long
    for (let i = parts.length; i >= 2; i--) {
      const potentialId = parts.slice(0, i).join('-');
      
      // Vérifier d'abord le catalogue
      if (getCatalogueImage(potentialId)) {
        return potentialId;
      }
      
      // Puis vérifier animeData
      const testAnime = getAnimeById(potentialId);
      if (testAnime) {
        return potentialId;
      }
    }
  }
  
  console.log(`❌ getAnimeIdFromHistoryId - aucun anime trouvé, retourne: ${baseId}`);
  // Par défaut, retourner l'ID de base
  return baseId;
};

export default function AnimePage() {
  // Utiliser le hook d'historique pour accéder aux derniers épisodes regardés
  const { watchHistory, clearHistory } = useHistory();
  
  // Fonction pour effacer uniquement l'historique des animes
  const clearAnimeHistory = () => {
    const confirmed = window.confirm("Voulez-vous vraiment effacer tout l'historique des animes ?");
    if (confirmed) {
      clearHistory();
    }
  };

  // Filtrer l'historique pour les animes uniquement et éviter les duplications
  const filteredAnimeHistory = React.useMemo(() => {
    // Trier d'abord par date (le plus récent en premier)
    const sortedHistory = [...watchHistory].sort((a, b) => 
      new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime()
    );
    
    // Filtrer les entrées d'anime valides
    const validEntries = sortedHistory.filter(item => {
      const baseAnimeId = getAnimeIdFromHistoryId(item.id);
      const anime = getAnimeById(baseAnimeId);
      return !!anime;
    });
    
    // Utiliser un Set pour suivre les animes déjà vus
    const seenAnimes = new Set();
    
    // Filtrer les doublons en gardant uniquement la première occurrence (la plus récente)
    return validEntries.filter(item => {
      // Extraire l'ID de base de l'anime
      const baseAnimeId = getAnimeIdFromHistoryId(item.id);
      
      // Si cet anime a déjà été vu, ignorer cette entrée
      if (seenAnimes.has(baseAnimeId)) {
        return false;
      }
      
      // Sinon, marquer cet anime comme vu et garder cette entrée
      seenAnimes.add(baseAnimeId);
      return true;
    });
  }, [watchHistory]);
  
  // Récupérer les 5 derniers épisodes regardés (ou moins s'il y en a moins)
  const recentlyWatched = filteredAnimeHistory.slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <HeroSection />

        <div className="container mx-auto px-4 py-8">
          {/* Reprendre ma lecture */}
          <div className="mb-6 sm:mb-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            <div className="flex items-center gap-2 sm:gap-2 mb-3 sm:mb-4">
              <History className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
              <h2 className="text-sm sm:text-base md:text-xl font-bold text-white">
                <span className="inline sm:hidden">Reprendre</span>
                <span className="hidden sm:inline">Reprendre ma lecture</span>
              </h2>
              
              {recentlyWatched.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAnimeHistory}
                  className="ml-auto text-xs text-gray-400 hover:text-white"
                >
                  Effacer
                </Button>
              )}
            </div>
            
            {/* Mobile view */}
            <div className="flex flex-col md:hidden">
              {recentlyWatched.length > 0 ? (
                <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
                  {recentlyWatched.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-[140px]">
                      <Link 
                        href={`/catalogue/${getAnimeIdFromHistoryId(item.id)}?season=${item.episodeInfo.season}&episode=${item.episodeInfo.episode}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getAnimeImage(item.id)}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="140px"
                            loading="eager"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-blue-500/80 p-2 rounded-full">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="mt-2">
                        <h3 className="text-xs font-medium text-white line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-1">
                          S{item.episodeInfo.season} E{item.episodeInfo.episode} - {item.episodeInfo.title || ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm">Vous n'avez pas encore regardé d'anime</p>
                  <Link href="/anime/catalogue" className="mt-2 inline-block">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 text-xs">
                      Découvrir des animes
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Desktop view */}
            <div className="hidden md:block">
              {recentlyWatched.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentlyWatched.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <Link 
                        href={`/catalogue/${getAnimeIdFromHistoryId(item.id)}?season=${item.episodeInfo.season}&episode=${item.episodeInfo.episode}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getAnimeImage(item.id)}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="eager"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-blue-500/80 p-3 rounded-full">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-white line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-400">
                          S{item.episodeInfo.season} E{item.episodeInfo.episode} - {item.episodeInfo.title || ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Vous n'avez pas encore regardé d'anime</p>
                  <Link href="/anime/catalogue" className="mt-4 inline-block">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Découvrir des animes
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sections with gradient backgrounds to create depth */}
          <div className="space-y-10">
            <ContentSection
              title="Sorties du Mardi"
              icon={<CalendarDays className="h-5 w-5 text-pink-500" />}
              items={typedTuesdayReleases}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Derniers Épisodes Ajoutés"
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              items={typedRecentEpisodes}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Derniers Scans Ajoutés"
              icon={<Plus className="h-5 w-5 text-green-500" />}
              items={typedRecentScans}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Les Classiques"
              icon={<Star className="h-5 w-5 text-yellow-500" />}
              items={typedClassics}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Découvrez des Pépites"
              icon={<Sparkles className="h-5 w-5 text-purple-500" />}
              items={typedHidden}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />
          </div>

          {/* Newsletter/Promo section */}
          <div className="mt-16 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Restez à jour avec les dernières sorties
              </h2>
              <p className="text-gray-300 mb-6">
                Ne manquez jamais une sortie d'épisode ou de chapitre ! Suivez-nous sur Discord et Twitter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/23cqMGEEqJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#5865F2] to-[#404EED] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Rejoindre Discord
                </a>
                <a
                  href="https://twitter.com/OkastreamFr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#1D9BF0] to-[#1A8CD8] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Suivre sur Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 