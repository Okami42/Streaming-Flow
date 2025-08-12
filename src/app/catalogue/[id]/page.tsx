"use client";

import React, { useEffect, useState } from "react";
import { getAnimeById, getAllAnimes } from "@/lib/animeData";
import { getEnrichedAnimeById } from "@/lib/enhancedAnimeData";
import { getSeriesById } from "@/lib/seriesData";
import { useParams } from "next/navigation";
import AnimePageClient from "./AnimePageClient";
import { extractSeriesId } from "@/lib/utils";
import type { Anime } from "@/lib/animeData";

// Liste des mappings d'ID spéciaux pour les animes qui ont des problèmes
const specialAnimeIds: Record<string, string> = {
  "solo-leveling": "solo-leveling",
  "kuroko-no-basket": "kuroko-no-basket",
  "jujutsu-kaisen": "jujutsu-kaisen",
  "vinland-saga": "vinland-saga",
  "demon-slayer": "demon-slayer",
  "death-note": "death-note",
  "akudama-drive": "akudama-drive",
  "frieren": "frieren",
  "classroom-of-the-elite": "classroom-of-the-elite",
  "attack-on-titan": "attack-on-titan"
};

// Liste des ID de films qui doivent être redirigés vers /series
const filmIds: string[] = [
  "the-batman",
  "top-gun-maverick",
  "dune",
  "blade-runner-2049",
  "pulp-fiction"
];

// Cache pour éviter les recalculs
const animeCache = new Map<string, Anime>();

export default function CataloguePage() {
  const params = useParams();
  const rawId = params.id as string;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const loadAnime = async () => {
      try {
        // Utiliser l'ID directement sans extraction
        const id = rawId;
        console.log("🚀 Chargement rapide pour:", id);
        
        // 🎯 OPTIMISATION 1: Vérifier le cache d'abord
        if (animeCache.has(id)) {
          console.log("💨 Cache hit pour:", id);
          setAnime(animeCache.get(id)!);
          return;
        }
        
        // 🎯 OPTIMISATION 2: Redirections rapides
        if (filmIds.includes(id)) {
          window.location.href = `/series/${id}`;
          return;
        }
        
        // 🎯 OPTIMISATION 3: Chargement immédiat + enrichissement parallèle
        const basicAnime = getAnimeById(specialAnimeIds[id] || id);
        
        if (basicAnime) {
          // Affichage IMMÉDIAT de l'anime de base
          setAnime(basicAnime);
          animeCache.set(id, basicAnime);
          
          // Enrichissement en parallèle (async, sans attendre)
          getEnrichedAnimeById(specialAnimeIds[id] || id).then(enrichedAnime => {
            if (enrichedAnime && enrichedAnime !== basicAnime) {
              console.log("🎯 Enrichissement terminé pour:", id);
              setAnime(enrichedAnime);
              animeCache.set(id, enrichedAnime); // Mettre à jour le cache
            }
          }).catch(error => {
            console.log("⚠️ Enrichissement échoué, garde la version de base:", error);
          });
          
          return;
        }
        
        // 🎯 OPTIMISATION 4: Recherche similaire rapide (une seule passe)
        const allAnimes = getAllAnimes();
        const similarAnime = allAnimes.find(a => 
          a.id.toLowerCase().includes(id.toLowerCase()) || 
          id.toLowerCase().includes(a.id.toLowerCase())
        );
        
        if (similarAnime) {
          console.log("🔄 Anime similaire trouvé:", similarAnime.id);
          setAnime(similarAnime);
          animeCache.set(id, similarAnime);
          
          // Enrichissement en parallèle aussi
          getEnrichedAnimeById(similarAnime.id).then(enrichedSimilar => {
            if (enrichedSimilar && enrichedSimilar !== similarAnime) {
              setAnime(enrichedSimilar);
              animeCache.set(id, enrichedSimilar);
            }
          }).catch(error => {
            console.log("⚠️ Enrichissement échoué pour anime similaire:", error);
          });
          
          return;
        }
        
        // 🎯 OPTIMISATION 5: Essayer la recherche série comme fallback
        const series = getSeriesById(id);
        if (series) {
          console.log("📺 Redirection vers série:", id);
          window.location.href = `/series/${id}`;
          return;
        }
        
        // Aucun anime trouvé
        console.log("❌ Aucun anime trouvé pour:", id);
        setNotFound(true);
        
      } catch (error) {
        console.error("❌ Erreur lors du chargement:", error);
        setNotFound(true);
      }
    };

    loadAnime();
  }, [rawId]);

  if (notFound) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white">Anime non trouvé</h1>
          <p className="text-gray-400 mt-4">Cet anime n'existe pas dans notre catalogue.</p>
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return <AnimePageClient anime={anime} />;
}
