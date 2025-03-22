import { notFound } from "next/navigation";
import AnimePageClient from "./AnimePageClient";
import { ErrorBoundary } from 'react-error-boundary';
import { getAnimeById } from "@/lib/animeData";

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

export default async function AnimePage({ params }: { params: { id: string } }) {
  // Attendre les paramètres pour résoudre l'avertissement sur params.id
  const { id } = await Promise.resolve(params);
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
