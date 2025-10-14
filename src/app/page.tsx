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
import { getAnimeById, animes as allAnimes } from "@/lib/animeData";
import { getAnimeImage as getCatalogueImage } from "@/lib/catalogue-utils";
import SEOContent from "@/components/SEOContent";

<meta name="google-site-verification" content="rKNH9kNMrDDh5zM-jzGRD6j1ji4czTHFHhWy95TuKgY" />

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
    const catalogueImage = getCatalogueImage(animeId);
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
  
  // Vérifier si l'ID contient un indicateur d'épisode
  const seasonEpisodePattern = /-s\d+e\d+$/;
  const episodePattern = /-e\d+$/;
  
  let baseId = historyId;
  
  // Supprimer le pattern de saison et d'épisode s'il existe
  if (seasonEpisodePattern.test(historyId)) {
    baseId = historyId.replace(seasonEpisodePattern, '');
  } else if (episodePattern.test(historyId)) {
    baseId = historyId.replace(episodePattern, '');
  }
  
  // PRIORITÉ 1: Vérifier si l'ID existe dans le catalogue (plus fiable)
  const catalogueImage = getCatalogueImage(baseId);
  if (catalogueImage && catalogueImage !== "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg") {
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
      const catalogueImage = getCatalogueImage(potentialId);
      if (catalogueImage && catalogueImage !== "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg") {
        return potentialId;
      }
      
      // Puis vérifier animeData
      const testAnime = getAnimeById(potentialId);
      if (testAnime) {
        return potentialId;
      }
    }
  }
  
  // Par défaut, retourner l'ID de base
  return baseId;
};

export default function Home() {
  // Utiliser le hook d'historique pour accéder aux derniers épisodes regardés
  const { watchHistory, clearHistory } = useHistory();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  // Featured animes for the carousel with custom banner images
  const featuredAnimes = React.useMemo(() => {
    const carouselBanners = {
      "dandadan": "https://4kwallpapers.com/images/wallpapers/dandadan-key-art-1920x1080-19468.jpg",
      "kaiju-n8": "https://4kwallpapers.com/images/wallpapers/kaiju-no-8-anime-series-3840x2160-18663.jpg", 
      "rent-a-girlfriend": "https://m.media-amazon.com/images/S/pv-target-images/4cddabccdb517240ec6ba1ae70b79e980572b00935698aa84173fb88314b16de.jpg",
      "frieren": "https://4kwallpapers.com/images/wallpapers/frieren-beyond-3840x2160-15146.jpg",
      "one-piece": "https://leclaireur.fnac.com/wp-content/uploads/2024/06/one-piece-001.jpg"
    };

    return [
      allAnimes.find(anime => anime.id === "dandadan"),
      allAnimes.find(anime => anime.id === "kaiju-n8"),
      allAnimes.find(anime => anime.id === "rent-a-girlfriend"),
      allAnimes.find(anime => anime.id === "frieren"),
      allAnimes.find(anime => anime.id === "one-piece")
    ].filter((anime): anime is NonNullable<typeof anime> => Boolean(anime))
     .map(anime => ({
       ...anime,
       bannerUrl: carouselBanners[anime.id as keyof typeof carouselBanners] || anime.bannerUrl
     }));
  }, []);
  
  // Progress bar state
  const [progress, setProgress] = React.useState(0);
  const slideInterval = 6000; // 5 secondes entre chaque animé
  
  // Auto-rotate carousel avec barre de progression continue
  React.useEffect(() => {
    if (featuredAnimes.length === 0) return;
    
    let progressTimer: NodeJS.Timeout;
    let slideTimer: NodeJS.Timeout;
    
    // Reset progress au début de chaque nouveau slide
    setProgress(0);
    
    const updateProgress = () => {
      const increment = 100 / (slideInterval / 50); // Mise à jour toutes les 50ms
      
      progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) { // À 95% on prépare le changement
            return 100;
          }
          return prev + increment;
        });
      }, 50);
    };
    
    // Timer pour changer de slide après exactement 7 secondes
    slideTimer = setTimeout(() => {
      setCurrentSlide(prev => {
        const next = (prev + 1) % featuredAnimes.length;
        console.log(`Changement: slide ${prev} → slide ${next}`);
        return next;
      });
    }, slideInterval);
    
    updateProgress();
    
    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (slideTimer) clearTimeout(slideTimer);
    };
  }, [currentSlide, featuredAnimes.length]);
  

  
  // Navigation directe via les barres de progression
  const handleProgressClick = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Touch/Swipe functionality for mobile
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  // Minimum distance required to trigger swipe (réduit pour plus de sensibilité)
  const minSwipeDistance = 20;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left = next slide
      handleProgressClick((currentSlide + 1) % featuredAnimes.length);
    } else if (isRightSwipe) {
      // Swipe right = previous slide
      handleProgressClick((currentSlide - 1 + featuredAnimes.length) % featuredAnimes.length);
    }
  };
  
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
        {/* Dynamic Hero Carousel */}
        <div 
          className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop version */}
          <div className="hidden md:block w-full h-full">
            {featuredAnimes.map((anime, index) => (
              <div 
                key={`desktop-${anime.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <CustomImage
                    src={anime.bannerUrl || anime.imageUrl}
                    alt={anime.title}
                    fill
                    priority={true}
                    unoptimized={true}
                    className="object-cover object-center scale-110 transform transition-transform duration-10000 ease-in-out"
                    style={{ transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)' }}
                    sizes="100vw"
                  />

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/60 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-6 md:px-8">
                    <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 text-white leading-tight">
                        {anime.title}
                      </h1>
                      
                      {/* Rating and genre info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center bg-black/50 px-3 py-1 rounded-full">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-white font-medium">{anime.rating}/10</span>
                        </div>
                        
                        {anime.genres.slice(0, 2).map((genre: string) => (
                          <span key={genre} className="text-white px-3 py-1 bg-black/50 rounded-full">
                            {genre}
                          </span>
                        ))}
                        
                        <span className="text-white px-3 py-1 bg-black/50 rounded-full">
                          {anime.type}
                        </span>
                      </div>
                      
                      <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 line-clamp-3 md:line-clamp-4 max-w-3xl">
                        {anime.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                        {anime.genres.slice(0, 4).map((genre: string) => (
                          <span key={genre} className="text-xs md:text-sm px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300">
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <Link href={`/catalogue/${anime.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-4 py-2 h-auto text-sm">
                            <Play className="h-4 w-4 mr-2" /> Regarder
                          </Button>
                        </Link>
                        <Link href={`/catalogue/${anime.id}`}>
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-4 py-2 h-auto text-sm">
                            <Plus className="h-4 w-4 mr-2" /> Détails
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Prev/Next buttons for desktop */}
            {featuredAnimes.length > 1 && (
              <>
                <button 
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm"
                  onClick={() => handleProgressClick((currentSlide - 1 + featuredAnimes.length) % featuredAnimes.length)}
                  aria-label="Previous slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                
                <button 
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm"
                  onClick={() => handleProgressClick((currentSlide + 1) % featuredAnimes.length)}
                  aria-label="Next slide"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
          
          {/* Mobile version */}
          <div className="md:hidden w-full h-full pt-16">
            {featuredAnimes.map((anime, index) => (
              <div 
                key={`mobile-${anime.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Background image - full height for mobile */}
                <div className="absolute inset-0">
                  <CustomImage
                    src={anime.bannerUrl || anime.imageUrl}
                    alt={anime.title}
                    fill
                    priority={true}
                    unoptimized={true}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  
                  {/* Dark overlay for better text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>
                
                {/* Content positioned at the bottom for mobile */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 pb-10">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {anime.title}
                    </h1>
                    
                    {/* Age rating badge if available */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded">
                        {anime.rating >= 8 ? "Populaire" : "Tendance"}
                      </span>
                      
                      {/* Rating with star */}
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">{anime.rating}/10</span>
                      </div>
                      
                      {/* Type */}
                      <span className="text-white text-sm">
                        {anime.type}
                      </span>
                    </div>
                    
                    {/* Genres with slashes between them */}
                    <div className="mb-4 text-sm text-white/90">
                      {anime.genres.slice(0, 3).join(" / ")}
                    </div>
                    
                    {/* Single "Voir la fiche" button */}
                    <Link href={`/catalogue/${anime.id}`} className="inline-block">
                      <Button variant="outline" className="border-white/30 bg-black/40 text-white hover:bg-white/10 px-5 py-2 h-auto text-sm rounded-full">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Voir la fiche
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Mobile navigation dots */}
            {featuredAnimes.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
                {featuredAnimes.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/30"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Progress Bar - Style Crunchyroll - Desktop only */}
          <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
            {/* Container des barres de progression - centré et plus petit */}
            <div className="flex gap-1 px-4 pb-4 w-[28rem]">
              {featuredAnimes.map((_, index) => (
                <button
                  key={`progress-${index}`}
                  className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all duration-200"
                  onClick={() => handleProgressClick(index)}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white'
                        : index < currentSlide
                        ? 'bg-blue-500'
                        : 'bg-white/20'
                    }`}
                    style={{
                      width: index === currentSlide ? `${progress}%` :
                             index < currentSlide ? '100%' : '0%'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent z-20 opacity-80"></div>
        </div>

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
                  <Link href="/catalogue" className="mt-2 inline-block">
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
                  <Link href="/catalogue" className="mt-4 inline-block">
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

      {/* Contenu SEO pour le référencement */}
      <div className="hidden">
        <SEOContent />
      </div>

      <Footer />
    </div>
  );
}
