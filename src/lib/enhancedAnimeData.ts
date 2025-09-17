import { animes, getAnimeById, getAnimesByGenre, Anime } from './animeData';
import { enrichAnimeWithRealEpisodes, enrichMultipleAnimes, ultraFastEnrichAnime, ultraFastEnrichMultiple } from './realAutoImport';

/**
 * Version enrichie des fonctions animeData avec auto-import ultra-rapide
 */

/**
 * Obtient un anime par ID avec auto-enrichissement ultra-rapide
 */
export async function getEnrichedAnimeById(id: string): Promise<Anime | undefined> {
  const anime = getAnimeById(id);
  if (!anime) return undefined;
  
  return await ultraFastEnrichAnime(anime);
}

/**
 * Obtient tous les animes avec auto-enrichissement ultra-rapide
 */
export async function getAllEnrichedAnimes(): Promise<Anime[]> {
  return await ultraFastEnrichMultiple(animes);
}

/**
 * Obtient les animes par genre avec auto-enrichissement ultra-rapide
 */
export async function getEnrichedAnimesByGenre(genre: string): Promise<Anime[]> {
  const genreAnimes = getAnimesByGenre(genre);
  return await ultraFastEnrichMultiple(genreAnimes);
}

/**
 * Version synchrone pour les cas où l'auto-import n'est pas nécessaire
 * (utilisez pour les listes, previews, etc.)
 */
export const getBasicAnimes = () => animes;
export const getBasicAnimeById = getAnimeById;
export const getBasicAnimesByGenre = getAnimesByGenre;

/**
 * Hook React personnalisé pour utiliser facilement l'auto-import
 */
export function useEnrichedAnime(animeId: string | null) {
  // Cette fonction devrait être utilisée dans un custom hook React
  // Exemple d'utilisation dans un composant :
  /*
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!animeId) return;
    
    const loadAnime = async () => {
      setLoading(true);
      try {
        const enrichedAnime = await getEnrichedAnimeById(animeId);
        setAnime(enrichedAnime || null);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [animeId]);

  return { anime, loading };
  */
}

/**
 * Utilitaire pour pré-charger certains animes populaires
 */
export async function preloadPopularAnimes(animeIds: string[]): Promise<Anime[]> {
  console.log(`🚀 Pré-chargement de ${animeIds.length} animes populaires...`);
  
  const animes = animeIds
    .map(id => getAnimeById(id))
    .filter((anime): anime is Anime => anime !== undefined);
  
  const enriched = await ultraFastEnrichMultiple(animes);
  
  console.log(`✅ Pré-chargement terminé`);
  return enriched;
}

/**
 * Exemple d'utilisation dans une page
 */
export const EXAMPLE_USAGE = `
// Dans votre composant React :

import { getEnrichedAnimeById, getAllEnrichedAnimes } from '@/lib/enhancedAnimeData';

// Pour une page de détail d'anime :
export default async function AnimePage({ params }: { params: { id: string } }) {
  const anime = await getEnrichedAnimeById(params.id);
  
  if (!anime) {
    return <div>Anime non trouvé</div>;
  }
  
  return (
    <div>
      <h1>{anime.title}</h1>
      {anime.seasons?.map(season => (
        <div key={season.seasonNumber}>
          <h2>{season.title}</h2>
          <p>{season.episodes.length} épisodes</p>
        </div>
      ))}
    </div>
  );
}

// Pour une page de liste (côté client) :
'use client';

import { useEffect, useState } from 'react';
import { getAllEnrichedAnimes } from '@/lib/enhancedAnimeData';

export default function AnimeListPage() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimes = async () => {
      try {
        const enrichedAnimes = await getAllEnrichedAnimes();
        setAnimes(enrichedAnimes);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimes();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {animes.map(anime => (
        <div key={anime.id}>
          <h3>{anime.title}</h3>
          <p>{anime.seasons?.length || 0} saison(s)</p>
        </div>
      ))}
    </div>
  );
}
`;

// Export par défaut pour faciliter les imports
export default {
  getEnrichedAnimeById,
  getAllEnrichedAnimes,
  getEnrichedAnimesByGenre,
  preloadPopularAnimes,
  // Versions basiques pour les cas simples
  getBasicAnimes,
  getBasicAnimeById,
  getBasicAnimesByGenre
}; 