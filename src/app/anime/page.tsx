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
  language: "VOSTFR" | "VF";
}

// Conversion des données pour garantir la compatibilité des types
const typedTuesdayReleases = tuesdayReleases.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedRecentEpisodes = recentEpisodes.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedRecentScans = recentScans.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedClassics = classics.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedHidden = hidden.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

// Fonction pour obtenir l'image de l'anime à partir de l'ID de l'anime
const getAnimeImage = (historyId: string): string => {
  // Extraire l'ID de base de l'anime à partir de l'ID d'historique
  // Format typique: "anime-id-s1e1" ou "anime-id-1"
  const parts = historyId.split('-');
  let animeId = parts[0]; // Par défaut, prendre la première partie
  
  // Vérifier si l'ID pourrait contenir des tirets (comme "solo-leveling")
  const potentialAnimeIds = [];
  // Essayer différentes combinaisons pour les animes avec tirets
  if (parts.length > 1) {
    potentialAnimeIds.push(`${parts[0]}-${parts[1]}`); // ex: "solo-leveling"
    if (parts.length > 2) {
      potentialAnimeIds.push(`${parts[0]}-${parts[1]}-${parts[2]}`); // ex: "demon-slayer"
    }
  }
  
  // Chercher d'abord avec les IDs potentiels qui contiennent des tirets
  for (const potentialId of potentialAnimeIds) {
    const anime = getAnimeById(potentialId);
    if (anime) {
      return anime.imageUrl;
    }
  }
  
  // Si aucune correspondance n'est trouvée, essayer avec l'ID simple
  const anime = getAnimeById(animeId);
  return anime ? anime.imageUrl : '/placeholder-image.jpg';
};

// Fonction auxiliaire pour extraire l'ID d'anime à partir d'un ID d'historique
const getAnimeIdFromHistoryId = (historyId: string): string => {
  const parts = historyId.split('-');
  
  // Vérifier si l'ID pourrait contenir des tirets (comme "solo-leveling")
  if (parts.length > 1) {
    // Essayer avec le format "solo-leveling"
    const potentialId = `${parts[0]}-${parts[1]}`;
    const anime = getAnimeById(potentialId);
    if (anime) {
      return potentialId;
    }
    
    // Essayer avec le format à trois parties si disponible
    if (parts.length > 2) {
      const potentialId3 = `${parts[0]}-${parts[1]}-${parts[2]}`;
      const anime3 = getAnimeById(potentialId3);
      if (anime3) {
        return potentialId3;
      }
    }
  }
  
  // Par défaut, retourner la première partie
  return parts[0];
};

export default function AnimePage() {
  // Utiliser le hook d'historique pour accéder aux derniers épisodes regardés
  const { watchHistory } = useHistory();
  
  // Filtrer l'historique pour les animes uniquement et éviter les duplications
  const filteredAnimeHistory = React.useMemo(() => {
    // Utiliser un Map pour stocker les entrées uniques par ID d'anime
    const uniqueEntries = new Map();
    
    watchHistory.forEach(item => {
      // Vérifier si l'élément correspond à un anime connu
      const animeId = getAnimeIdFromHistoryId(item.id);
      const matchingAnime = getAnimeById(animeId);
      
      // Si nous trouvons une correspondance, c'est un anime que nous voulons afficher
      if (matchingAnime) {
        // Si cet anime n'est pas encore dans notre Map, ou si cette entrée est plus récente
        if (!uniqueEntries.has(animeId) || 
            new Date(item.lastWatchedAt) > new Date(uniqueEntries.get(animeId).lastWatchedAt)) {
          uniqueEntries.set(animeId, item);
        }
      }
    });
    
    // Convertir la Map en tableau et trier par date
    return Array.from(uniqueEntries.values()).sort((a, b) => 
      new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime()
    );
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
                          S{item.episodeInfo.season} E{item.episodeInfo.episode}
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
                          S{item.episodeInfo.season} E{item.episodeInfo.episode} - {item.episodeInfo.title}
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