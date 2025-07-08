"use client";

import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Sparkles, Star, Play, Film, History } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import ContentSection from "@/components/ContentSection";
import { useHistory } from "@/context/history-context";
import { calculateProgress, getRelativeTime, formatTimeExtended } from "@/lib/history";
import { seriesData } from "@/lib/seriesData";

// Fonction pour extraire l'ID de la série à partir de l'ID de l'historique
const extractSeriesId = (historyId: string): string => {
  // Liste des séries connues avec des tirets dans leur ID
  const knownSeriesWithHyphens = ["game-of-thrones", "breaking-bad", "squid-game", "stranger-things", "the-boys", "blade-runner-2049", "adventure-time", "top-gun-maverick", "the-batman"];
  
  // Vérifier d'abord si l'ID correspond à une série connue avec des tirets
  const matchedSeries = knownSeriesWithHyphens.find(id => historyId.startsWith(id));
  if (matchedSeries) {
    return matchedSeries;
  }
  
  // Si aucun ID connu n'est trouvé, retourner la partie avant le premier tiret
  return historyId.split('-')[0];
};

// Fonction pour obtenir l'image de la série à partir de l'ID de la série
const getSeriesImage = (seriesId: string): string => {
  const series = seriesData.find(s => s.id === seriesId);
  return series ? series.imageUrl : '/placeholder-image.jpg';
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
  
  // Filtrer l'historique pour éviter les duplications
  const filteredHistory = React.useMemo(() => {
    // Utiliser un Map pour stocker les entrées uniques par ID de série/film
    const uniqueEntries = new Map();
    
    watchHistory.forEach(item => {
      const seriesId = extractSeriesId(item.id);
      
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
  
  // Données temporaires pour les séries et films (à remplacer par de vraies données par la suite)
  const featuredSeries = {
    id: "breaking-bad",
    title: "Breaking Bad",
    description: "Un professeur de chimie atteint d'un cancer du poumon inopérable se lance dans la fabrication et la vente de méthamphétamine pour assurer l'avenir financier de sa famille.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    genres: ["Drame", "Crime", "Thriller"]
  };
  
  // Exemples de séries populaires
  const popularSeries = [
    {
      id: "game-of-thrones",
      title: "Game of Thrones",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "8 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "stranger-things",
      title: "Stranger Things",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "4 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-boys",
      title: "The Boys",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "3 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-witcher",
      title: "The Witcher",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "peaky-blinders",
      title: "Peaky Blinders",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "6 saisons",
      type: "Série",
      language: "VF"
    }
  ];
  
  // Exemples de films récents
  const recentFilms = [
    {
      id: "dune",
      title: "Dune",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h35",
      type: "Film",
      language: "VF"
    },
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
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h43",
      type: "Film",
      language: "VF"
    },
    {
      id: "everything-everywhere",
      title: "Everything Everywhere All at Once",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
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
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h55",
      type: "Film",
      language: "VF"
    },
    {
      id: "pulp-fiction",
      title: "Pulp Fiction",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h34",
      type: "Film",
      language: "VF"
    },
    {
      id: "shawshank-redemption",
      title: "Les Évadés",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h22",
      type: "Film",
      language: "VF"
    },
    {
      id: "fight-club",
      title: "Fight Club",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h19",
      type: "Film",
      language: "VF"
    },
    {
      id: "matrix",
      title: "Matrix",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
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
        {/* Hero section avec okastreamtextbanner.png */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <CustomImage
              src="/picture/okastreamtextbanner.png"
              alt="Séries et Films"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-transparent to-transparent" />

            {/* Animated particle effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="stars-container">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
            </div>
          </div>

          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
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
                        href={`/series/${extractSeriesId(item.id)}/watch/${item.episodeInfo.episode}${item.episodeInfo.season ? `?season=${item.episodeInfo.season}` : ''}${item.progress > 0 ? `&time=${item.progress}` : ''}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getSeriesImage(extractSeriesId(item.id))}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="140px"
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
                        href={`/series/${extractSeriesId(item.id)}/watch/${item.episodeInfo.episode}${item.episodeInfo.season ? `?season=${item.episodeInfo.season}` : ''}${item.progress > 0 ? `&time=${item.progress}` : ''}`}
                        className="block"
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20 group">
                          <CustomImage
                            src={getSeriesImage(extractSeriesId(item.id))}
                            alt={item.title}
                            fill={true}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
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

      <Footer />
    </div>
  );
} 