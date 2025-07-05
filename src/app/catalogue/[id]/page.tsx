import AnimePageClient from "./AnimePageClient";
import { ErrorBoundary } from 'react-error-boundary';
import { getAnimeById } from "@/lib/animeData";
import { notFound } from "next/navigation";
import React from "react";

// Composant d'erreur séparé dans un fichier à part pour éviter l'erreur
function MyFallbackComponent({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#030711] text-white">
      <h1 className="text-xl font-bold text-red-500 mb-4">Une erreur est survenue</h1>
      <p className="mb-4 text-gray-300">{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: any;
  searchParams?: any;
}

interface RouteParams {
  id: string;
}

export default async function AnimePage({ params }: PageProps) {
  // Utiliser les paramètres directement
  const id = params.id;
  
  // Récupérer l'anime par son ID (getAnimeById gère déjà le cas de solo-leveling-2)
  const anime = getAnimeById(id);

  if (!anime) {
    return notFound();
  }

  return (
    <div>
      <AnimePageClient anime={anime} />
    </div>
  );
}
