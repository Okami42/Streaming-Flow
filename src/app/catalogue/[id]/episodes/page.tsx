import React from "react";
import { notFound } from "next/navigation";
import { getAnimeByIdAsync } from "@/lib/animeData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getSeasonTitle, getFilmSeasonIndex } from "@/lib/filmTitles";
import SeasonSelector from "./SeasonSelector";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ season?: string }>;
}

export default async function AnimeEpisodesPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const animeId = resolvedParams.id;
  const seasonParam = resolvedSearchParams?.season;
  
  // Interroger la DB en priorité pour avoir la base
  let anime = await getAnimeByIdAsync(animeId);
  
  if (!anime) {
    notFound();
  }

  // 1. Essayer d'enrichir avec les fichiers publics (anime_episodes_js) en priorité
  try {
    const { ultraFastEnrichAnime } = await import("@/lib/realAutoImport");
    const enrichedAnime = await ultraFastEnrichAnime(anime);
    if (enrichedAnime && enrichedAnime.seasons && enrichedAnime.seasons.length > 0) {
      anime = enrichedAnime;
    }
  } catch (error) {
    console.error("Erreur lors de l'enrichissement de l'anime:", error);
  }

  // Déterminer la saison sélectionnée initialement
  let initialSeason: number | string = 1;
  if (seasonParam) {
    initialSeason = isNaN(Number(seasonParam)) ? seasonParam : Number(seasonParam);
  } else if (anime.seasons && anime.seasons.length === 1) {
    const onlySeason = anime.seasons[0];
    if (String(onlySeason.seasonNumber) === 'Film' || String(onlySeason.title).toLowerCase().includes('film')) {
      initialSeason = 'Film';
    }
  }

  // Déterminer si l'anime a plusieurs saisons
  const hasMultipleSeasons = anime.seasons && anime.seasons.length > 1;

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <SeasonSelector 
            anime={anime} 
            animeId={animeId} 
            initialSeason={initialSeason} 
            hasMultipleSeasons={hasMultipleSeasons} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 