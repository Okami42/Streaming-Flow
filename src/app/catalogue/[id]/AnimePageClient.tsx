"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomImage from "@/components/ui/custom-image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Heart, Info, List, Play, Share2, Star } from "lucide-react";
import { useHistory } from "@/context/history-context";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Type pour l'anime passé en prop
interface Anime {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  year: number;
  type: string;
  status: string;
  genres: string[];
  rating: number;
  episodes: Array<{
    number: number;
    title: string;
    duration: number;
    sibnetVostfrId: string;
    sibnetVfId: string;
  }>;
}

export default function AnimePageClient({ anime }: { anime: Anime | undefined }) {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<"vostfr" | "vf">("vostfr");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const { addToWatchHistory } = useHistory();
  const pathname = usePathname();

  const episode = anime?.episodes?.find(ep => ep.number === selectedEpisode);

  // Simuler le visionnage en ajoutant l'entrée à l'historique
  useEffect(() => {
    if (anime && episode) {
      // On ne le fait qu'une fois au chargement
      const timer = setTimeout(() => {
        addToWatchHistory({
          id: `${anime.id}-s1e${episode.number}`,
          title: anime.title,
          imageUrl: anime.imageUrl,
          lastWatchedAt: new Date().toISOString(),
          progress: Math.floor(episode.duration * 0.3), // Simuler 30% de progression
          duration: episode.duration,
          episodeInfo: {
            season: 1,
            episode: episode.number,
            title: episode.title,
          },
          type: "Anime"
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [anime, episode, selectedEpisode, addToWatchHistory]);

  if (!anime) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-white">Anime non trouvé</h1>
            <p className="text-gray-400 mt-4">Cet anime n'existe pas dans notre catalogue.</p>
            <Link href="/catalogue">
              <Button className="mt-8">Retour au catalogue</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const videoId = selectedLanguage === "vostfr"
    ? episode?.sibnetVostfrId
    : episode?.sibnetVfId;
    
  // Définir des sources mp4 fictives pour l'exemple
  const mp4Source = selectedLanguage === "vostfr"
    ? `https://storage-anime.com/welcome-demon-school-teacher/s1e${selectedEpisode}-vostfr.mp4`
    : `https://storage-anime.com/welcome-demon-school-teacher/s1e${selectedEpisode}-vf.mp4`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden">
          <CustomImage
            src={anime.bannerUrl}
            alt={anime.title}
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          {/* Anime info header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-48 flex-shrink-0">
              <div className="relative aspect-[3/4] w-full h-auto overflow-hidden rounded-lg border-2 border-white/10 shadow-lg">
                <CustomImage
                  src={anime.imageUrl}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 hover:bg-white/5"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isFollowing ? "Suivi ✓" : "Suivre"}
                </Button>
                <Button
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center border-white/10 hover:bg-white/5"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-pink-500 text-pink-500" : ""}`} />
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {anime.title}
              </h1>
              <h2 className="text-sm text-gray-400 mb-4">
                {anime.originalTitle} ({anime.year})
              </h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{anime.rating}/10</span>
                </div>
                <div>{anime.type}</div>
                <div>{anime.status}</div>
              </div>

              <div className="relative">
                <p className={`text-gray-300 text-sm md:text-base ${!showInfo && "line-clamp-3"}`}>
                  {anime.description}
                </p>
                {!showInfo && (
                  <button
                    className="absolute bottom-0 right-0 bg-gradient-to-l from-[#030711] via-[#030711]/90 to-transparent px-2 text-sm text-blue-400"
                    onClick={() => setShowInfo(true)}
                  >
                    Voir plus
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 mt-6">
                <Button
                  className="theme-button"
                  onClick={() => {
                    document.getElementById("player-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Regarder
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5">
                  <Info className="mr-2 h-4 w-4" />
                  Infos
                </Button>
              </div>
            </div>
          </div>

          {/* Player section */}
          <div id="player-section" className="mb-12">
            <Tabs
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as "vostfr" | "vf")}
              className="mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Épisode {selectedEpisode}: {episode?.title}</h2>
                <TabsList className="bg-[#151a2a] border border-white/10">
                  <TabsTrigger
                    value="vostfr"
                    className="data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    VOSTFR
                  </TabsTrigger>
                  <TabsTrigger
                    value="vf"
                    className="data-[state=active]:bg-[#1a1f35] data-[state=active]:text-white"
                  >
                    VF
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="vostfr" className="mt-2">
                <div className="bg-black rounded-md overflow-hidden aspect-video w-full">
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    {selectedEpisode === 1 ? (
                      <iframe 
                        src="https://video.sibnet.ru/shell.php?videoid=5742388"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        allow="autoplay; fullscreen" 
                        allowFullScreen 
                        className="absolute inset-0 w-full h-full"
                      ></iframe>
                    ) : (
                      <video 
                        src={mp4Source} 
                        controls 
                        className="absolute inset-0 w-full h-full"
                        poster={anime.bannerUrl}
                      ></video>
                    )}
                  </div>
                </div>
                
                {/* Liens directs et alternatives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#151a2a] p-4 rounded-md mt-4">
                  <a 
                    href={`https://animationdigitalnetwork.fr/video/welcome-demon-school-teacher/episode-${selectedEpisode}-vostf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-blue-600 px-2 py-0.5 rounded text-xs mr-2">ADN</span>
                    Voir sur ADN (Officiel)
                  </a>
                  <a 
                    href="https://www.crunchyroll.com/series/welcome-to-demon-school-iruma-kun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-orange-600 px-2 py-0.5 rounded text-xs mr-2">CR</span>
                    Voir sur Crunchyroll
                  </a>
                  <a 
                    href={`https://video.sibnet.ru/video${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-gray-600 px-2 py-0.5 rounded text-xs mr-2">SB</span>
                    Ouvrir sur Sibnet
                  </a>
                  <a 
                    href="https://ok.ru/video/welcome-demon-school-teacher-ep1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-yellow-600 px-2 py-0.5 rounded text-xs mr-2">OK</span>
                    Voir sur OK.ru
                  </a>
                </div>
              </TabsContent>

              <TabsContent value="vf" className="mt-2">
                <div className="bg-black rounded-md overflow-hidden aspect-video w-full">
                  <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    <video 
                      src={mp4Source} 
                      controls 
                      className="absolute inset-0 w-full h-full"
                      poster={anime.bannerUrl}
                    ></video>
                  </div>
                </div>
                
                {/* Liens directs et alternatives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#151a2a] p-4 rounded-md mt-4">
                  <a 
                    href={`https://animationdigitalnetwork.fr/video/welcome-demon-school-teacher/episode-${selectedEpisode}-vf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-blue-600 px-2 py-0.5 rounded text-xs mr-2">ADN</span>
                    Voir sur ADN (Officiel)
                  </a>
                  <a 
                    href="https://www.crunchyroll.com/series/welcome-to-demon-school-iruma-kun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-orange-600 px-2 py-0.5 rounded text-xs mr-2">CR</span>
                    Voir sur Crunchyroll
                  </a>
                  <a 
                    href={`https://video.sibnet.ru/video${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-gray-600 px-2 py-0.5 rounded text-xs mr-2">SB</span>
                    Ouvrir sur Sibnet
                  </a>
                  <a 
                    href="https://ok.ru/video/welcome-demon-school-teacher-ep1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-white rounded-md transition-colors"
                  >
                    <span className="bg-yellow-600 px-2 py-0.5 rounded text-xs mr-2">OK</span>
                    Voir sur OK.ru
                  </a>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                disabled={selectedEpisode <= 1}
                onClick={() => setSelectedEpisode(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Épisode précédent
              </Button>

              <div className="flex items-center">
                <div className="px-4 py-2 bg-[#151a2a] rounded-md text-white">
                  {selectedEpisode} / {anime.episodes.length}
                </div>
              </div>

              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/5"
                disabled={selectedEpisode >= anime.episodes.length}
                onClick={() => setSelectedEpisode(prev => Math.min(anime.episodes.length, prev + 1))}
              >
                Épisode suivant
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Episodes list */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                <List className="inline-block mr-2 h-5 w-5" />
                Liste des épisodes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {anime.episodes.map((ep) => (
                <button
                  key={ep.number}
                  className={`p-4 rounded-md border text-left transition-all ${
                    selectedEpisode === ep.number
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-white/10 bg-[#151a2a] hover:bg-[#1a1f35]"
                  }`}
                  onClick={() => setSelectedEpisode(ep.number)}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-semibold text-white">Épisode {ep.number}</div>
                    <div className="text-xs text-gray-400">24:00</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-300 truncate">{ep.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations (placeholder) */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#151a2a] rounded-md mb-2"></div>
                  <div className="h-4 bg-[#151a2a] rounded mb-1"></div>
                  <div className="h-3 bg-[#151a2a] rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 