"use client";

import React, { useEffect, useState } from "react";
import { getAnimeById, getAllAnimes } from "@/lib/animeData";
import { getEnrichedAnimeById } from "@/lib/enhancedAnimeData";
import { ultraFastEnrichAnime } from "@/lib/realAutoImport";
import { getSeriesById } from "@/lib/seriesData";
import { useParams } from "next/navigation";
import AnimePageClient from "./AnimePageClient";
import { extractSeriesId } from "@/lib/utils";
import type { Anime } from "@/lib/animeData";

// Fonction pour obtenir l'image d'un anime depuis animeData
const getAnimeImage = (animeId: string): string => {
  const anime = getAllAnimes().find(a => a.id === animeId);
  return anime?.imageUrl || "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg";
};


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

// Cache optimisé pour éviter les recalculs
const animeCache = new Map<string, Anime>();

export default function CataloguePage() {
  const params = useParams();
  const rawId = params.id as string;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const loadAnime = async () => {
      try {
        const id = rawId;
        
        // 🚀 OPTIMISATION 1: Vérifier le cache d'abord
        if (animeCache.has(id)) {
          setAnime(animeCache.get(id)!);
          return;
        }
        
        // 🚀 OPTIMISATION 2: Redirections rapides
        if (filmIds.includes(id)) {
          window.location.href = `/series/${id}`;
          return;
        }
        
        // 🚀 OPTIMISATION 3: Chargement ULTRA-RAPIDE
        const basicAnime = getAnimeById(specialAnimeIds[id] || id);
        
                if (basicAnime) {
          // Récupérer l'image du catalogue si disponible
          const catalogueImage = getAnimeImage(id);
          const animeWithCatalogueImage = {
            ...basicAnime,
            imageUrl: catalogueImage
          };
          
          // Affichage IMMÉDIAT de l'anime de base avec image du catalogue
          setAnime(animeWithCatalogueImage);
          animeCache.set(id, animeWithCatalogueImage);
          
          // Auto-import en arrière-plan (optimisé pour vitesse max)
          setTimeout(async () => {
            try {
              const enrichedAnime = await ultraFastEnrichAnime(basicAnime);
              if (enrichedAnime && enrichedAnime.seasons && enrichedAnime.seasons.length > 0) {
                // Garder l'image du catalogue même après enrichissement
                const catalogueImage = getAnimeImage(id);
                const enrichedAnimeWithCatalogueImage = {
                  ...enrichedAnime,
                  imageUrl: catalogueImage
                };
                setAnime(enrichedAnimeWithCatalogueImage);
                animeCache.set(id, enrichedAnimeWithCatalogueImage);
              }
            } catch (error) {
              // Ignorer les erreurs d'enrichissement
            }
          }, 50); // Délai ultra-minimal
          
          return;
        }
        
        // 🚀 OPTIMISATION 4: Recherche similaire rapide (une seule passe)
        const allAnimes = getAllAnimes();
        const similarAnime = allAnimes.find(a => 
          a.id.toLowerCase().includes(id.toLowerCase()) || 
          id.toLowerCase().includes(a.id.toLowerCase())
        );
        
        if (similarAnime) {
          // Récupérer l'image du catalogue si disponible
          const catalogueImage = getAnimeImage(id);
          const similarAnimeWithCatalogueImage = {
            ...similarAnime,
            imageUrl: catalogueImage
          };
          setAnime(similarAnimeWithCatalogueImage);
          animeCache.set(id, similarAnimeWithCatalogueImage);
          
          // Auto-import pour anime similaire en arrière-plan
          setTimeout(async () => {
            try {
              const enrichedSimilar = await ultraFastEnrichAnime(similarAnime);
              if (enrichedSimilar && enrichedSimilar.seasons && enrichedSimilar.seasons.length > 0) {
              setAnime(enrichedSimilar);
              animeCache.set(id, enrichedSimilar);
              }
            } catch (error) {
              // Ignorer les erreurs
            }
          }, 50);
          
          return;
        }
        
        // 🚀 OPTIMISATION 5: Essayer la recherche série comme fallback
        const series = getSeriesById(id);
        if (series) {
          window.location.href = `/series/${id}`;
          return;
        }
        
        // Aucun anime trouvé
        setNotFound(true);
        
      } catch (error) {
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
    return null; // Pas de loader, affichage instantané
  }

  return <AnimePageClient anime={anime} />;
}
