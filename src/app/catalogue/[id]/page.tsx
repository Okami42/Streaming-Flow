import { getAnimeById, getAllAnimes } from "@/lib/animeData";
import { getSeriesById } from "@/lib/seriesData";
import { notFound, redirect } from "next/navigation";
import React from "react";
import AnimePageClient from "./AnimePageClient";
import { extractSeriesId } from "@/lib/utils";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

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
  // Ajouter d'autres mappings si nécessaire
};

export default async function CataloguePage({ params }: PageProps) {
  // Utiliser les paramètres directement
  const rawId = params.id;
  
  // Log pour déboguer
  console.log("Catalogue page - ID reçu:", rawId);
  
  // Utiliser extractSeriesId pour s'assurer que l'ID est correctement extrait
  const id = extractSeriesId(rawId);
  
  console.log("Catalogue page - ID extrait:", id);
  
  // Vérifier si c'est un ID spécial qui nécessite un traitement particulier
  if (specialAnimeIds[id]) {
    console.log(`Catalogue page - Cas spécial pour ${id}`);
    const anime = getAnimeById(specialAnimeIds[id]);
    if (anime) {
      return (
        <div>
          <AnimePageClient anime={anime} />
        </div>
      );
    }
  }
  
  // D'abord, essayer de récupérer un anime
  const anime = getAnimeById(id);
  console.log("Catalogue page - Anime trouvé:", anime ? "oui" : "non");
  
  if (anime) {
    return (
      <div>
        <AnimePageClient anime={anime} />
      </div>
    );
  }
  
  // Essayer de trouver un anime avec un ID similaire
  const allAnimes = getAllAnimes();
  const similarAnime = allAnimes.find(a => 
    a.id.toLowerCase().includes(id.toLowerCase()) || 
    id.toLowerCase().includes(a.id.toLowerCase())
  );
  
  if (similarAnime) {
    console.log(`Catalogue page - Anime similaire trouvé: ${similarAnime.id}`);
    return (
      <div>
        <AnimePageClient anime={similarAnime} />
      </div>
    );
  }
  
  // Ensuite, vérifier si c'est une série ou un film
  const series = getSeriesById(id);
  console.log("Catalogue page - Série trouvée:", series ? "oui" : "non");
  
  if (series) {
    // Si c'est Top Gun Maverick, rediriger vers la page des séries
    if (id === "top-gun-maverick") {
      console.log("Catalogue page - Redirection de Top Gun Maverick vers /series");
      return redirect(`/series/${id}`);
    }
    
    // Pour les autres séries/films, rediriger vers la page de série
    console.log("Catalogue page - Redirection vers /series");
    return redirect(`/series/${id}`);
  }
  
  // Si aucun contenu n'est trouvé, afficher une page 404
  console.log("Catalogue page - Contenu non trouvé, affichage 404");
  return notFound();
}
