import React from "react";
import { getAnimeByIdAsync, getAllAnimesAsync } from "@/lib/animeData";
import { getEnrichedAnimeById } from "@/lib/enhancedAnimeData";
import { ultraFastEnrichAnime } from "@/lib/realAutoImport";
import { getSeriesById } from "@/lib/seriesData";
import { redirect } from "next/navigation";
import AnimePageClient from "./AnimePageClient";
import { extractSeriesId } from "@/lib/utils";
import type { Anime } from "@/lib/animeData";
import { getAnimeImage } from "@/lib/catalogue-utils";


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

interface CataloguePageProps {
  params: Promise<{ id: string }>;
}

export default async function CataloguePage({ params }: CataloguePageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;
  const id = rawId;

  // 🚀 OPTIMISATION: Redirections rapides
  if (filmIds.includes(id)) {
    redirect(`/series/${id}`);
  }

  // 🚀 OPTIMISATION: Essayer la recherche série comme fallback
  const series = getSeriesById(id);
  if (series) {
    redirect(`/series/${id}`);
  }

  // Interroger la DB / le local de base
  let anime = await getAnimeByIdAsync(specialAnimeIds[id] || id);

  // Fallback similar search si pas trouvé avec l'ID exact
  if (!anime) {
    const allAnimes = await getAllAnimesAsync();
    anime = allAnimes.find(a => 
      a.id.toLowerCase().includes(id.toLowerCase()) || 
      id.toLowerCase().includes(a.id.toLowerCase())
    );
  }

  if (!anime) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white">Anime non trouvé</h1>
          <p className="text-gray-400 mt-4">Cet anime n'existe pas dans notre catalogue.</p>
        </div>
      </div>
    );
  }

  // Récupérer l'image du catalogue si disponible
  const catalogueImage = getAnimeImage(id);
  if (catalogueImage && catalogueImage !== "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg") {
    anime = { ...anime, imageUrl: catalogueImage };
  }

  // 1. Essayer de charger depuis les fichiers JS publics avec auto-import en arrière-plan
  // On ne le fait pas côté serveur directement pour éviter de bloquer le rendu
  // et éviter les erreurs de chemin sur Vercel
  // Le client s'en chargera via AnimePageClient et le cache local

  return <AnimePageClient anime={anime} />;
}
