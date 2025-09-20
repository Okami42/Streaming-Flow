"use client";

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Shield, Plus, Trash2, Edit, ExternalLink, FileText, Search, X } from 'lucide-react';

interface AnimeEpisodeInfo {
  animeName: string;
  animeId: string;
  folder: string;
  seasons: {
    [season: string]: {
      vf?: string[];
      vostfr?: string[];
    };
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [allAnimes, setAllAnimes] = useState<AnimeEpisodeInfo[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeEpisodeInfo | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'vf' | 'vostfr'>('vostfr');
  const [newEpisodeUrl, setNewEpisodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const ADMIN_PASSWORD = 'okami2025';

  useEffect(() => {
    if (isAuthenticated) {
      loadAllAnimes();
    }
  }, [isAuthenticated]);

  const loadAllAnimes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/real-episodes');
      if (response.ok) {
        const animes = await response.json();
        setAllAnimes(animes);
      }
    } catch (error) {
      console.error('Erreur chargement animes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setError('');
    setSelectedAnime(null);
  };

  const handleAnimeSelect = (anime: AnimeEpisodeInfo) => {
    setSelectedAnime(anime);
    setSelectedSeason(Object.keys(anime.seasons)[0] || '');
    setSelectedLanguage('vostfr');
    setNewEpisodeUrl('');
  };

  const handleAddEpisode = async () => {
    if (!selectedAnime || !selectedSeason || !newEpisodeUrl.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('/api/admin/real-episodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animeId: selectedAnime.animeId,
          season: selectedSeason,
          language: selectedLanguage,
          episodeUrl: newEpisodeUrl.trim(),
          adminPassword: ADMIN_PASSWORD
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Épisode ajouté avec succès ! (${result.episodeCount} épisodes au total)`);
        setNewEpisodeUrl('');
        // Recharger les données
        await loadAllAnimes();
        // Remettre l'anime sélectionné
        const updatedAnime = allAnimes.find(a => a.animeId === selectedAnime.animeId);
        if (updatedAnime) {
          setSelectedAnime(updatedAnime);
        }
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      alert('Erreur de connexion');
    }
  };

  const handleDeleteEpisode = async (episodeIndex: number) => {
    if (!selectedAnime || !selectedSeason) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cet épisode ?')) {
      try {
        const response = await fetch('/api/admin/real-episodes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            animeId: selectedAnime.animeId,
            season: selectedSeason,
            language: selectedLanguage,
            episodeIndex,
            adminPassword: ADMIN_PASSWORD
          })
        });

        if (response.ok) {
          alert('Épisode supprimé avec succès !');
          // Recharger les données
          await loadAllAnimes();
          const updatedAnime = allAnimes.find(a => a.animeId === selectedAnime.animeId);
          if (updatedAnime) {
            setSelectedAnime(updatedAnime);
          }
        } else {
          const error = await response.json();
          alert(`Erreur: ${error.error}`);
        }
      } catch (error) {
        alert('Erreur de connexion');
      }
    }
  };

  const getCurrentEpisodes = (): string[] => {
    if (!selectedAnime || !selectedSeason) return [];
    return selectedAnime.seasons[selectedSeason]?.[selectedLanguage] || [];
  };

  const getFilteredAnimes = (): AnimeEpisodeInfo[] => {
    if (!searchQuery.trim()) return allAnimes;
    
    const query = searchQuery.toLowerCase().trim();
    return allAnimes.filter(anime => 
      anime.animeName.toLowerCase().includes(query) ||
      anime.animeId.toLowerCase().includes(query)
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#030711] via-[#0c1222] to-[#030711] flex items-center justify-center">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Administration</h1>
            <p className="text-slate-400">Gestion des épisodes d'animes</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Mot de passe administrateur"
                className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030711] via-[#0c1222] to-[#030711]">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Panel Admin - Gestion des Épisodes</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des animes */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-green-400" />
              Animes disponibles
              <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-full">
                {getFilteredAnimes().length}{allAnimes.length !== getFilteredAnimes().length ? `/${allAnimes.length}` : ''}
              </span>
            </h2>

            {/* Barre de recherche */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    clearSearch();
                  }
                }}
                placeholder="Rechercher un anime... (Échap pour effacer)"
                className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse bg-slate-700 rounded h-12"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {getFilteredAnimes().length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-2xl mb-2">🔍</div>
                    <p className="text-sm">
                      {searchQuery.trim() ? 'Aucun anime trouvé' : 'Aucun anime disponible'}
                    </p>
                    {searchQuery.trim() && (
                      <button
                        onClick={clearSearch}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Effacer la recherche
                      </button>
                    )}
                  </div>
                ) : (
                  getFilteredAnimes().map((anime) => (
                    <button
                      key={anime.animeId}
                      onClick={() => handleAnimeSelect(anime)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedAnime?.animeId === anime.animeId
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="font-medium">
                        {searchQuery.trim() ? (
                          // Mettre en surbrillance le terme recherché
                          <span dangerouslySetInnerHTML={{
                            __html: anime.animeName.replace(
                              new RegExp(`(${searchQuery.trim()})`, 'gi'),
                              '<mark class="bg-yellow-400 text-black px-1 rounded">$1</mark>'
                            )
                          }} />
                        ) : (
                          anime.animeName
                        )}
                      </div>
                      <div className="text-sm opacity-75">
                        {anime.folder} • {Object.keys(anime.seasons).length} saison(s)
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="h-6 w-6 text-blue-400" />
              Ajouter un épisode
            </h2>

            {selectedAnime ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Anime sélectionné
                  </label>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-white font-medium">{selectedAnime.animeName}</div>
                    <div className="text-slate-400 text-sm">{selectedAnime.animeId}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Saison
                  </label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full py-3 px-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {Object.keys(selectedAnime.seasons).map(season => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Langue
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedLanguage('vostfr')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                        selectedLanguage === 'vostfr'
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                      }`}
                    >
                      VOSTFR
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('vf')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                        selectedLanguage === 'vf'
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                      }`}
                    >
                      VF
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Lien de l'épisode
                  </label>
                  <input
                    type="url"
                    value={newEpisodeUrl}
                    onChange={(e) => setNewEpisodeUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full py-3 px-4 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleAddEpisode}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Ajouter l'épisode
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <div className="text-2xl mb-2">👈</div>
                <p>Sélectionnez un anime pour commencer</p>
              </div>
            )}
          </div>

          {/* Liste des épisodes */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Edit className="h-6 w-6 text-yellow-400" />
              Épisodes existants
            </h2>

            {selectedAnime && selectedSeason ? (
              <div className="space-y-4">
                <div className="text-slate-300 text-sm">
                  <div><strong>Anime:</strong> {selectedAnime.animeName}</div>
                  <div><strong>Saison:</strong> {selectedSeason}</div>
                  <div><strong>Langue:</strong> {selectedLanguage.toUpperCase()}</div>
                  <div><strong>Épisodes:</strong> {getCurrentEpisodes().length}</div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getCurrentEpisodes().map((episode, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                            Ep. {index + 1}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            selectedLanguage === 'vostfr' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-green-600 text-white'
                          }`}>
                            {selectedLanguage.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm truncate">
                          {episode}
                        </div>
                      </div>
                      <div className="flex gap-1 ml-3">
                        <button
                          onClick={() => window.open(episode, '_blank')}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                          title="Ouvrir le lien"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEpisode(index)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {getCurrentEpisodes().length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <div className="text-2xl mb-2">📭</div>
                    <p>Aucun épisode pour cette configuration</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <div className="text-2xl mb-2">🎯</div>
                <p>Sélectionnez un anime et une saison</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}