import React from "react";
import { notFound } from "next/navigation";
import { seriesData } from "@/lib/seriesData";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Episode } from "@/lib/types";

export default function WatchPage({ params }: { params: { id: string; episodeId: string } }) {
  const series = seriesData.find((item) => item.id === params.id);

  if (!series) {
    notFound();
  }

  const episodeId = parseInt(params.episodeId);
  const episode = series.episodes.find((ep: Episode) => ep.id === episodeId);

  if (!episode) {
    notFound();
  }

  // Déterminer l'épisode précédent et suivant
  const prevEpisode = series.episodes.find((ep: Episode) => ep.id === episodeId - 1);
  const nextEpisode = series.episodes.find((ep: Episode) => ep.id === episodeId + 1);

  // Calculer le nombre total d'épisodes
  const totalEpisodes = series.episodes.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Titre et navigation */}
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href={`/series/${series.id}`}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à {series.title}</span>
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {series.type === "Série" 
                  ? `${series.title} - Épisode ${episode.id}: ${episode.title}`
                  : `${series.title}`
                }
              </h1>
            </div>
            {series.type === "Série" && (
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">
                  Épisode {episode.id} / {totalEpisodes}
                </div>
                <div className="flex gap-2">
                  {prevEpisode ? (
                    <Link href={`/series/${series.id}/watch/${prevEpisode.id}`}>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Précédent
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" className="border-white/20 text-white opacity-50" disabled>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Précédent
                    </Button>
                  )}
                  {nextEpisode ? (
                    <Link href={`/series/${series.id}/watch/${nextEpisode.id}`}>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        Suivant
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" className="bg-gray-700 text-white opacity-50" disabled>
                      Suivant
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lecteur vidéo */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6 shadow-2xl">
            <div className="w-full h-full">
              {episode.videoUrl.includes('dood.wf') ? (
                <iframe 
                  src={episode.videoUrl}
                  className="w-full h-full" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts"
                  referrerPolicy="no-referrer"
                ></iframe>
              ) : episode.videoUrl.includes('filemoon.sx') ? (
                <iframe 
                  src={episode.videoUrl}
                  className="w-full h-full" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-forms"
                  referrerPolicy="no-referrer"
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="mb-4">Lecteur vidéo simulé</div>
                    <p className="text-sm text-gray-400 mb-2">URL de la vidéo:</p>
                    <code className="bg-gray-800 px-2 py-1 rounded text-xs">
                      {episode.videoUrl}
                    </code>
                  </div>
                </div>
              )}
            </div>
            
            {/* Étiquette du lecteur */}
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded-bl">
              {episode.videoUrl.includes('filemoon.sx') ? 'FILEMOON VOSTFR' : 
               episode.videoUrl.includes('dood.wf') ? 'LECTEUR DOODSTREAM' : 
               'LECTEUR VIDÉO'}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ThumbsUp className="h-4 w-4 mr-2" />
              J'aime
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <MessageSquare className="h-4 w-4 mr-2" />
              Commenter
            </Button>
          </div>

          {/* Informations */}
          <div className="bg-[#0f172a] rounded-xl p-6 mb-8 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Informations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Titre</p>
                <p className="text-white">{series.title}</p>
              </div>
              {series.type === "Série" && (
                <div>
                  <p className="text-gray-400 text-sm">Épisode</p>
                  <p className="text-white">{episode.id} - {episode.title}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-sm">Année</p>
                <p className="text-white">{series.year}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Studio</p>
                <p className="text-white">{series.studio}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Langue</p>
                <p className="text-white">{series.language}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Genres</p>
                <p className="text-white">{series.genres.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Section commentaires (simulée) */}
          <div className="bg-[#0f172a] rounded-xl p-6 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Commentaires</h2>
            <div className="p-8 text-center text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Les commentaires seront disponibles prochainement.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 