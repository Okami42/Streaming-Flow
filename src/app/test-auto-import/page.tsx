'use client';

import { useState } from 'react';
import { autoLoadEpisodes, enrichAnimeWithRealEpisodes, debugAnimeEpisodes, checkEpisodesAvailability } from '@/lib/realAutoImport';
import { getAnimeById } from '@/lib/animeData';
import type { AnimeSeason } from '@/lib/animeData';

export default function TestAutoImportPage() {
  const [animeId, setAnimeId] = useState('violet-evergarden');
  const [seasons, setSeasons] = useState<AnimeSeason[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // Fonction pour ajouter des logs
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Intercepter les console.log pour les afficher dans l'interface
  const originalLog = console.log;
  console.log = (message: string, ...args: any[]) => {
    originalLog(message, ...args);
    addLog(message);
  };

  const testAutoLoad = async () => {
    setLoading(true);
    setLogs([]);
    setSeasons([]);
    
    try {
      addLog(`🔍 Test d'auto-chargement pour: ${animeId}`);
      
      // Vérifier disponibilité
      const available = await checkEpisodesAvailability(animeId);
      setIsAvailable(available);
      addLog(`📁 Disponibilité: ${available ? '✅' : '❌'}`);
      
      if (available) {
        // Charger les épisodes
        const loadedSeasons = await autoLoadEpisodes(animeId);
        setSeasons(loadedSeasons);
        
        addLog(`✅ ${loadedSeasons.length} saison(s) chargée(s)`);
        loadedSeasons.forEach(season => {
          addLog(`📺 ${season.title}: ${season.episodes.length} épisodes`);
        });
      }
    } catch (error) {
      addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  const testEnrichAnime = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog(`🎯 Test d'enrichissement pour: ${animeId}`);
      
      const anime = getAnimeById(animeId);
      if (!anime) {
        addLog(`❌ Anime non trouvé dans animeData: ${animeId}`);
        return;
      }
      
      addLog(`📚 Anime trouvé: ${anime.title}`);
      
      const enrichedAnime = await enrichAnimeWithRealEpisodes(anime);
      
      if (enrichedAnime.seasons) {
        setSeasons(enrichedAnime.seasons);
        addLog(`✅ Anime enrichi avec ${enrichedAnime.seasons.length} saison(s)`);
      } else {
        addLog(`⚠️ Aucune saison ajoutée`);
      }
    } catch (error) {
      addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  const testDebugAnime = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      await debugAnimeEpisodes(animeId);
    } catch (error) {
      addLog(`❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSeasons([]);
    setIsAvailable(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">🧪 Test Auto-Import Épisodes</h1>
      
      {/* Zone de contrôle */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contrôles</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={animeId}
            onChange={(e) => setAnimeId(e.target.value)}
            placeholder="ID de l'anime (ex: violet-evergarden)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={testAutoLoad}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '⏳' : '🔍'} Auto-Load
          </button>
          
          <button
            onClick={testEnrichAnime}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '⏳' : '🎯'} Enrichir Anime
          </button>
          
          <button
            onClick={testDebugAnime}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? '⏳' : '🔧'} Debug
          </button>
          
          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            🗑️ Clear
          </button>
        </div>
        
        {/* Status */}
        {isAvailable !== null && (
          <div className="mt-4 p-3 rounded-md border">
            <strong>Status:</strong> 
            <span className={`ml-2 ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? '✅ Épisodes disponibles' : '❌ Épisodes non trouvés'}
            </span>
          </div>
        )}
      </div>

      {/* Exemples d'IDs à tester */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📝 IDs d'exemple à tester:</h3>
        <div className="flex flex-wrap gap-2">
          {['violet-evergarden', 'yuyu-hakusho', 'my-dress-up-darling', 'zero-no-tsukaima', 'yuru-yuri'].map(id => (
            <button
              key={id}
              onClick={() => setAnimeId(id)}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-md text-sm"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Résultats des saisons */}
      {seasons.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">📺 Saisons chargées</h2>
          
          {seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                {season.title} ({season.year}) - {season.episodes.length} épisodes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                {season.episodes.slice(0, 12).map((episode, episodeIndex) => (
                  <div key={episodeIndex} className="p-2 bg-gray-50 rounded border">
                    <div className="font-medium">{episode.number}. {episode.title}</div>
                    <div className="text-xs text-gray-600">
                      {episode.sibnetVostfrId && (
                        <div>🇯🇵 VOSTFR: {episode.sibnetVostfrId}</div>
                      )}
                      {episode.sibnetVfId && (
                        <div>🇫🇷 VF: {episode.sibnetVfId}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {season.episodes.length > 12 && (
                <div className="mt-2 text-gray-600 text-sm">
                  ... et {season.episodes.length - 12} autres épisodes
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Logs */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
        <h2 className="text-white font-semibold mb-2">📋 Logs</h2>
        
        <div className="max-h-64 overflow-y-auto space-y-1">
          {logs.length === 0 ? (
            <div className="text-gray-500">Aucun log pour le moment...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 