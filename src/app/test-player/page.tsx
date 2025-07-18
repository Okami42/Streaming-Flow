"use client";

import React, { useState } from "react";
import EnhancedHLSPlayer from "@/components/ui/enhanced-hls-player";

export default function TestPlayerPage() {
  const [currentSource, setCurrentSource] = useState<string>("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Liste des flux de test
  const testStreams = [
    {
      name: "Mux Test Stream (stable)",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    },
    {
      name: "Bbb 30s (stable)",
      url: "https://test-streams.mux.dev/x36xhzz/url_0/193039199_mp4_h264_aac_hd_7.m3u8"
    },
    {
      name: "Apple Advanced Stream (peut causer des désynchronisations)",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8"
    },
    {
      name: "Sintel Trailer (4k, peut causer des désynchronisations)",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    }
  ];

  const handleSourceChange = (url: string) => {
    setCurrentSource(url);
    setErrorMessage(null);
    setIsReady(false);
  };

  const handleError = (error: any) => {
    console.error("Erreur de lecture:", error);
    setErrorMessage(`Erreur: ${error.message || "Problème de lecture inconnu"}`);
  };

  const handleReady = () => {
    setIsReady(true);
    setErrorMessage(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Test du Lecteur HLS Amélioré</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sélectionner un flux de test:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {testStreams.map((stream) => (
            <button
              key={stream.url}
              onClick={() => handleSourceChange(stream.url)}
              className={`p-3 rounded-lg transition-colors ${
                currentSource === stream.url
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white"
              }`}
            >
              {stream.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">URL personnalisée:</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentSource}
            onChange={(e) => setCurrentSource(e.target.value)}
            className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            placeholder="Entrez l'URL d'un flux HLS (m3u8)"
          />
          <button
            onClick={() => handleSourceChange(currentSource)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Charger
          </button>
        </div>
      </div>
      
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      
      {isReady && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Lecteur prêt ! La lecture peut commencer.
        </div>
      )}
      
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-xl">
        <EnhancedHLSPlayer
          src={currentSource}
          className="w-full h-full"
          autoPlay={true}
          onError={handleError}
          onReady={handleReady}
        />
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">À propos du lecteur amélioré</h2>
        <p className="mb-3">
          Ce lecteur HLS intègre plusieurs mécanismes pour détecter et corriger automatiquement les problèmes de synchronisation audio/vidéo :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Détection automatique des décalages entre l'audio et la vidéo</li>
          <li>Ajustement dynamique de la vitesse de lecture pour compenser les désynchronisations</li>
          <li>Rechargement intelligent des segments en cas de problème</li>
          <li>Configuration optimisée des buffers pour une lecture fluide</li>
          <li>Gestion avancée des erreurs de chargement</li>
        </ul>
      </div>
    </div>
  );
}
