"use client";

import React from "react";
import SeriesFooter from "@/components/SeriesFooter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Sparkles, Star, Play, Film, History } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import ContentSection from "@/components/ContentSection";
import { useHistory } from "@/context/history-context";
import { calculateProgress, getRelativeTime, formatTimeExtended } from "@/lib/history";
import { seriesData } from "@/lib/seriesData";
import { Content } from "@/lib/types";

// Fonction pour obtenir l'image de la série à partir de l'ID de la série
const getSeriesImage = (historyId: string): string => {
  // Extraire l'ID de base de la série à partir de l'ID d'historique
  // Format typique: "series-id-s1e1" ou "series-id-1"
  const parts = historyId.split('-');
  let seriesId = parts[0]; // Par défaut, prendre la première partie
  
  // Vérifier si l'ID pourrait contenir des tirets (comme "game-of-thrones")
  const potentialSeriesIds = [];
  // Essayer différentes combinaisons pour les séries avec tirets
  if (parts.length > 1) {
    potentialSeriesIds.push(`${parts[0]}-${parts[1]}`); // ex: "game-of-thrones"
    if (parts.length > 2) {
      potentialSeriesIds.push(`${parts[0]}-${parts[1]}-${parts[2]}`); // ex: "lord-of-rings"
    }
  }
  
  // Chercher d'abord avec les IDs potentiels qui contiennent des tirets
  for (const potentialId of potentialSeriesIds) {
    const series = seriesData.find(s => s.id === potentialId);
    if (series) {
      return series.imageUrl;
    }
  }
  
  // Si aucune correspondance n'est trouvée, essayer avec l'ID simple
  const series = seriesData.find(s => s.id === seriesId);
  return series ? series.imageUrl : '/placeholder-image.jpg';
};

// Fonction auxiliaire pour extraire l'ID de série à partir d'un ID d'historique
const getSeriesIdFromHistoryId = (historyId: string): string => {
  const parts = historyId.split('-');
  
  // Vérifier si l'ID pourrait contenir des tirets (comme "game-of-thrones")
  if (parts.length > 1) {
    // Essayer avec le format "game-of-thrones"
    const potentialId = `${parts[0]}-${parts[1]}`;
    const series = seriesData.find(s => s.id === potentialId);
    if (series) {
      return potentialId;
    }
    
    // Essayer avec le format à trois parties si disponible
    if (parts.length > 2) {
      const potentialId3 = `${parts[0]}-${parts[1]}-${parts[2]}`;
      const series3 = seriesData.find(s => s.id === potentialId3);
      if (series3) {
        return potentialId3;
      }
    }
  }
  
  // Par défaut, retourner la première partie
  return parts[0];
};

// Styles pour l'animation des étoiles
const starStyles = `
  @keyframes twinkle {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .stars-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 4s infinite;
  }

  .star:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .star:nth-child(2) {
    top: 30%;
    left: 40%;
    animation-delay: 1s;
  }

  .star:nth-child(3) {
    top: 15%;
    left: 60%;
    animation-delay: 2s;
  }

  .star:nth-child(4) {
    top: 40%;
    left: 80%;
    animation-delay: 3s;
  }

  .star:nth-child(5) {
    top: 60%;
    left: 20%;
    animation-delay: 2.5s;
  }

  .star:nth-child(6) {
    top: 75%;
    left: 50%;
    animation-delay: 1.5s;
  }

  .star:nth-child(7) {
    top: 80%;
    left: 70%;
    animation-delay: 0.5s;
  }

  .star:nth-child(8) {
    top: 10%;
    left: 90%;
    animation-delay: 3.5s;
  }
`;

export default function SeriesPage() {
  // Utiliser le hook d'historique pour accéder aux derniers épisodes regardés
  const { watchHistory } = useHistory();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  // Featured series for the carousel from seriesData
  const featuredSeries = React.useMemo(() => {
    return [
      seriesData.find(item => item.id === "squid-game"),
      seriesData.find(item => item.id === "game-of-thrones"),
      seriesData.find(item => item.id === "breaking-bad"),
      seriesData.find(item => item.id === "the-boys"),
      seriesData.find(item => item.id === "euphoria")
    ].filter((item): item is Content => Boolean(item));
  }, []);
  
  // Auto-rotate carousel
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSeries.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [featuredSeries.length]);
  
  // Filtrer l'historique pour éviter les duplications
  const filteredHistory = React.useMemo(() => {
    // Utiliser un Map pour stocker les entrées uniques par ID de série/film
    const uniqueEntries = new Map();
    
    watchHistory.forEach(item => {
      // Extraire l'ID de base de la série à partir de l'ID d'historique
      const parts = item.id.split('-');
      let seriesId = parts[0]; // Par défaut, prendre la première partie
      
      // Vérifier si l'ID pourrait contenir des tirets (comme "game-of-thrones")
      if (parts.length > 1) {
        // Essayer avec le format "game-of-thrones"
        const potentialId = `${parts[0]}-${parts[1]}`;
        const series = seriesData.find(s => s.id === potentialId);
        if (series) {
          seriesId = potentialId;
        }
        
        // Essayer avec le format à trois parties si disponible
        if (parts.length > 2) {
          const potentialId3 = `${parts[0]}-${parts[1]}-${parts[2]}`;
          const series3 = seriesData.find(s => s.id === potentialId3);
          if (series3) {
            seriesId = potentialId3;
          }
        }
      }
      
      // Si cette série/film n'est pas encore dans notre Map, ou si cette entrée est plus récente
      if (!uniqueEntries.has(seriesId) || 
          new Date(item.lastWatchedAt) > new Date(uniqueEntries.get(seriesId).lastWatchedAt)) {
        uniqueEntries.set(seriesId, item);
      }
    });
    
    // Convertir la Map en tableau et trier par date
    return Array.from(uniqueEntries.values()).sort((a, b) => 
      new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime()
    );
  }, [watchHistory]);
  
  // Récupérer les 5 derniers épisodes regardés (ou moins s'il y en a moins)
  const recentlyWatched = filteredHistory.slice(0, 5);
  
  // Exemples de séries populaires
  const popularSeries = [
    {
      id: "game-of-thrones",
      title: "Game of Thrones",
      imageUrl: "https://fr.web.img5.acsta.net/pictures/23/01/03/14/13/0717778.jpg",
      time: "8 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "stranger-things",
      title: "Stranger Things",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_.jpg",
      time: "4 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-boys",
      title: "The Boys",
      imageUrl: "https://preview.redd.it/2kzjj8l0om391.jpg?width=1080&crop=smart&auto=webp&s=ed395a06a8e56d954a7d9d0904db51064b01bcd9",
      time: "4 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-witcher",
      title: "The Witcher",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMTQ5MDU5MTktMDZkMy00NDU1LWIxM2UtODg5OGFiNmRhNDBjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      time: "2 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "peaky-blinders",
      title: "Peaky Blinders",
      imageUrl: "https://medias.boutique.lab.arte.tv/prod/10878_vod_thumb_82796.jpg",
      time: "6 saisons",
      type: "Série",
      language: "VF"
    }
  ];
  
  // Exemples de films récents
  const recentFilms = [
    {
      id: "the-batman",
      title: "The Batman",
      imageUrl: "https://fr.web.img6.acsta.net/pictures/22/02/16/17/42/3125788.jpg",
      time: "2h56",
      type: "Film",
      language: "VF"
    },
    {
      id: "top-gun-maverick",
      title: "Top Gun: Maverick",
      imageUrl: "https://fr.web.img4.acsta.net/pictures/22/03/29/15/12/0827894.jpg",
      time: "2h10",
      type: "Film",
      language: "VF"
    },
    {
      id: "no-time-to-die",
      title: "No Time to Die",
      imageUrl: "https://play-lh.googleusercontent.com/KHagyirtj9vkyR3blrdw-TFADcSFYh4pBJQHQTz2YbT_vSGwweA4SIh7jZWvHB7jj2W16lOVow-yUer0qTI",
      time: "2h43",
      type: "Film",
      language: "VF"
    },
    {
      id: "everything-everywhere",
      title: "Everything Everywhere All at Once",
      imageUrl: "https://www.ecranlarge.com/content/uploads/2022/08/6nufhbqf1ujvh6sm1eumd86njz2-393.jpg",
      time: "2h19",
      type: "Film",
      language: "VF"
    }
  ];
  
  // Exemples de films classiques
  const classicFilms = [
    {
      id: "the-godfather",
      title: "Le Parrain",
      imageUrl: "https://cinemalegyptis.org/app/uploads/sites/2/2022/09/LE-PARRAIN-aff.jpg",
      time: "2h55",
      type: "Film",
      language: "VF"
    },
    {
      id: "shawshank-redemption",
      title: "Les Évadés",
      imageUrl: "https://cinecdote.com/images/da84e44c50e624360de87060dfb8ca43.jpg",
      time: "2h22",
      type: "Film",
      language: "VF"
    },
    {
      id: "fight-club",
      title: "Fight Club",
      imageUrl: "https://storage.googleapis.com/pod_public/1300/262697.jpg",
      time: "2h19",
      type: "Film",
      language: "VF"
    },
    {
      id: "matrix",
      title: "Matrix",
      imageUrl: "https://fr.web.img4.acsta.net/c_310_420/medias/04/34/49/043449_af.jpg",
      time: "2h16",
      type: "Film",
      language: "VF"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: starStyles }} />
      <Header />

      <main className="flex-grow">
        {/* Dynamic Hero Carousel */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full overflow-hidden">
          {/* Desktop version - unchanged */}
          <div className="hidden md:block w-full h-full">
            {featuredSeries.map((series, index) => (
              <div 
                key={`desktop-${series.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <CustomImage
                    src={series.bannerUrl || series.imageUrl}
                    alt={series.title}
                    fill
                    priority={true}
                    unoptimized={true}
                    className="object-cover object-center scale-110 transform transition-transform duration-10000 ease-in-out"
                    style={{ transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)' }}
                    sizes="100vw"
                  />

                  {/* Overlay gradients - removed blur */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/60 to-transparent" />
                  
                  {/* Removed pattern overlay */}
                </div>
                
                {/* Content - enhanced with better positioning and styling */}
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-6 md:px-8">
                    <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
                      {/* Remove the info bar above the title */}
                      
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-6 text-white leading-tight">
                        {series.title}
                      </h1>
                      
                      {/* Rating and genre info in the style of the reference image */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center bg-black/50 px-3 py-1 rounded-full">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-white font-medium">{series.rating}/10</span>
                        </div>
                        
                        {series.genres.slice(0, 2).map((genre: string, idx: number) => (
                          <span key={genre} className="text-white px-3 py-1 bg-black/50 rounded-full">
                            {genre}
                          </span>
                        ))}
                        
                        <span className="text-white px-3 py-1 bg-black/50 rounded-full">
                          {series.type === "Film" ? (series.runtime || "2h00") : `${series.seasons} saisons`}
                        </span>
                      </div>
                      
                      <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 line-clamp-3 md:line-clamp-4 max-w-3xl">
                        {series.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                        {series.genres.slice(0, 4).map((genre: string) => (
                          <span key={genre} className="text-xs md:text-sm px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors duration-300">
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <Link href={`/series/${series.id}`}>
                          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 px-4 py-2 h-auto text-sm">
                            <Play className="h-4 w-4 mr-2" /> Regarder
                          </Button>
                        </Link>
                        <Link href={`/series/${series.id}`}>
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
            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredSeries.length) % featuredSeries.length)}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all duration-300 backdrop-blur-sm"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredSeries.length)}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Mobile version - styled like the second image */}
          <div className="md:hidden w-full h-full pt-16">
            {featuredSeries.map((series, index) => (
              <div 
                key={`mobile-${series.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Background image - full height for mobile */}
                <div className="absolute inset-0">
                  <CustomImage
                    src={series.bannerUrl || series.imageUrl}
                    alt={series.title}
                    fill
                    priority={true}
                    unoptimized={true}
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                  
                  {/* Dark overlay for better text visibility - removed blur effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>
                
                {/* Content positioned at the bottom for mobile */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 pb-10">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {series.title}
                    </h1>
                    
                    {/* Age rating badge if available */}
                    <div className="flex items-center justify-center gap-3 mb-3">
                      {series.rating && (
                        <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded">
                          {series.rating >= 16 ? "16+" : "13+"}
                        </span>
                      )}
                      
                      {/* Rating with star */}
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">{series.rating}/10</span>
                      </div>
                      
                      {/* Duration/Seasons */}
                      <span className="text-white text-sm">
                        {series.type === "Film" ? (series.runtime || "2h56") : `${series.seasons} saisons`}
                      </span>
                    </div>
                    
                    {/* Genres with slashes between them */}
                    <div className="mb-4 text-sm text-white/90">
                      {series.genres.slice(0, 3).join(" / ")}
                    </div>
                    
                    {/* Single "Voir la fiche" button */}
                    <Link href={`/series/${series.id}`} className="inline-block">
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
            <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
              {featuredSeries.map((_, index) => (
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
          </div>
          
          {/* Bottom glow effect - enhanced */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20 opacity-80"></div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Reprendre ma lecture */}
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            {/* Mobile view: Title and content on same line */}
            <div className="flex flex-col md:hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-500" />
                  <h2 className="text-xl font-bold text-white">Reprendre ma lecture</h2>
                </div>
                {recentlyWatched.length > 0 && (
                  <Link href="/series/history" className="text-xs text-blue-400 hover:text-blue-300">
                    Voir tout
                  </Link>
                )}
              </div>
              
              {recentlyWatched.length > 0 ? (
                <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
                  {recentlyWatched.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-[140px]">
                      <Link 
                        href={`/series/${getSeriesIdFromHistoryId(item.id)}/watch/${item.episodeInfo.episode}${item.episodeInfo.season ? `?season=${item.episodeInfo.season}` : ''}${item.progress > 0 ? `&time=${item.progress}` : ''}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getSeriesImage(item.id)}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="140px"
                            loading="eager"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Progress bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${calculateProgress(item)}%` }}
                            ></div>
                          </div>
                          
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
                  <p className="text-gray-400 text-sm">Vous n'avez pas encore regardé de séries</p>
                </div>
              )}
            </div>
            
            {/* Desktop view: Original layout */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-bold text-white">Reprendre ma lecture</h2>
              </div>
              
              {recentlyWatched.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recentlyWatched.map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <Link 
                        href={`/series/${getSeriesIdFromHistoryId(item.id)}/watch/${item.episodeInfo.episode}${item.episodeInfo.season ? `?season=${item.episodeInfo.season}` : ''}${item.progress > 0 ? `&time=${item.progress}` : ''}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getSeriesImage(item.id)}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="eager"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                          
                          {/* Progress bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${calculateProgress(item)}%` }}
                            ></div>
                          </div>
                          
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
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{getRelativeTime(item.lastWatchedAt)}</span>
                          <span className="text-xs text-blue-400">{formatTimeExtended(item.progress)} / {formatTimeExtended(item.duration)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Vous n'avez pas encore regardé de séries</p>
                  <Link href="/series/catalogue" className="mt-4 inline-block">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Découvrir des séries
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sections avec fonds dégradés */}
          <div className="space-y-10">
            <ContentSection
              title="Séries Populaires"
              icon={<Film className="h-5 w-5 text-blue-500" />}
              items={popularSeries as any}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Films Récents"
              icon={<Clock className="h-5 w-5 text-purple-500" />}
              items={recentFilms as any}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Films Classiques"
              icon={<Star className="h-5 w-5 text-yellow-500" />}
              items={classicFilms as any}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />
          </div>

          {/* Section Newsletter/Promo */}
          <div className="mt-16 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Ne manquez aucune nouvelle sortie
              </h2>
              <p className="text-gray-300 mb-6">
                Restez informé des dernières sorties de séries et films ! Suivez-nous sur nos réseaux sociaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/series-films"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#5865F2] to-[#404EED] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Rejoindre Discord
                </a>
                <a
                  href="https://twitter.com/series_films"
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

      <SeriesFooter />
    </div>
  );
} 