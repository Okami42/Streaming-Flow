"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Anime, AnimeEpisode, AnimeSeason } from '@/lib/animeData';
import { PlusCircle, Trash2, Save, X, ArrowUp, ArrowDown, DownloadCloud } from 'lucide-react';

export default function EditAnimeForm({ 
  initialAnime, 
  onSuccess 
}: { 
  initialAnime: Anime, 
  onSuccess?: () => void 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auto-import states
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);

  // Initialiser avec les données existantes. Si `seasons` n'existe pas mais `episodes` oui, on l'utilise.
  const [formData, setFormData] = useState<Partial<Anime>>({
    ...initialAnime,
    episodes: initialAnime.episodes || [],
    seasons: initialAnime.seasons || [],
    genres: initialAnime.genres || [],
  });

  const [genreInput, setGenreInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value,
    }));
  };

  const addGenre = () => {
    if (genreInput.trim() && !formData.genres?.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...(prev.genres || []), genreInput.trim()],
      }));
      setGenreInput('');
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres?.filter(g => g !== genreToRemove) || [],
    }));
  };

  // --- Gestion des Saisons et Épisodes (Mode Simplifié) ---
  // Pour une interface générique, on gérera soit des `episodes` (1 seule saison par défaut), 
  // soit des `seasons` si l'anime est déjà multi-saisons.
  // Pour simplifier l'édition, si l'anime a de multiples saisons, on les affiche.

  const addEpisodeToSeason = (seasonIndex: number) => {
    const newSeasons = [...(formData.seasons || [])];
    const targetSeason = newSeasons[seasonIndex];
    const newEp: AnimeEpisode = {
      number: (targetSeason.episodes?.length || 0) + 1,
      title: `Épisode ${(targetSeason.episodes?.length || 0) + 1}`,
    };
    targetSeason.episodes = [...(targetSeason.episodes || []), newEp];
    setFormData(prev => ({ ...prev, seasons: newSeasons }));
  };

  const updateEpisodeInSeason = (seasonIndex: number, episodeIndex: number, field: keyof AnimeEpisode, value: string | number) => {
    const newSeasons = [...(formData.seasons || [])];
    const targetSeason = newSeasons[seasonIndex];
    targetSeason.episodes[episodeIndex] = { ...targetSeason.episodes[episodeIndex], [field]: value };
    setFormData(prev => ({ ...prev, seasons: newSeasons }));
  };

  const removeEpisodeFromSeason = (seasonIndex: number, episodeIndex: number) => {
    const newSeasons = [...(formData.seasons || [])];
    newSeasons[seasonIndex].episodes.splice(episodeIndex, 1);
    // Réajuster les numéros
    newSeasons[seasonIndex].episodes.forEach((ep, i) => { ep.number = i + 1; });
    setFormData(prev => ({ ...prev, seasons: newSeasons }));
  };

  const [bulkConfig, setBulkConfig] = useState<{ [key: number]: { text: string; lang: 'VOSTFR' | 'VF'; show: boolean } }>({});

  const toggleBulk = (seasonIndex: number) => {
    setBulkConfig(prev => ({
      ...prev,
      [seasonIndex]: {
        text: prev[seasonIndex]?.text || '',
        lang: prev[seasonIndex]?.lang || 'VOSTFR',
        show: !prev[seasonIndex]?.show
      }
    }));
  };

  const updateBulkText = (seasonIndex: number, text: string) => {
    setBulkConfig(prev => ({ ...prev, [seasonIndex]: { ...prev[seasonIndex], text } }));
  };

  const updateBulkLang = (seasonIndex: number, lang: 'VOSTFR' | 'VF') => {
    setBulkConfig(prev => ({ ...prev, [seasonIndex]: { ...prev[seasonIndex], lang } }));
  };

  const processBulkLinks = (seasonIndex: number) => {
    const config = bulkConfig[seasonIndex];
    if (!config || !config.text.trim()) return;

    const urlRegex = /(https?:\/\/[^\s"',]+)/g;
    const matches = config.text.match(urlRegex) || [];
    
    if (matches.length === 0) {
      alert("Aucun lien valide trouvé dans le texte.");
      return;
    }

    const newSeasons = [...(formData.seasons || [])];
    const targetSeason = newSeasons[seasonIndex];
    const currentEpisodes = [...(targetSeason.episodes || [])];

    matches.forEach((url) => {
      let field: keyof AnimeEpisode | null = null;
      let value = url;

      if (url.includes('sibnet.ru')) {
        const idMatch = url.match(/videoid=(\d+)/);
        if (idMatch) {
          field = config.lang === 'VOSTFR' ? 'sibnetVostfrId' : 'sibnetVfId';
          value = idMatch[1];
        } else {
           // Sibnet fallback IF it does not contain videoid
           field = config.lang === 'VOSTFR' ? 'sibnetVostfrId' : 'sibnetVfId'; 
        }
      } else if (url.includes('vidmoly')) {
        field = config.lang === 'VOSTFR' ? 'vidmolyUrl' : 'vidmolyVfUrl';
      } else if (url.includes('movearn')) {
        field = config.lang === 'VOSTFR' ? 'movearnUrl' : 'movearnVfUrl';
      } else if (url.includes('sendvid')) {
          const idMatch = url.match(/sendvid\.com\/embed\/([a-zA-Z0-9]+)/) || url.match(/sendvid\.com\/([a-zA-Z0-9]+)/);
          if (idMatch) {
            field = config.lang === 'VOSTFR' ? 'sendvidId' : 'sendvidVfId';
            value = idMatch[1];
          }
      } else {
        // Fallback for m3u8 or unknown
        field = config.lang === 'VOSTFR' ? 'm3u8Url' : 'm3u8VfUrl';
      }

      if (field) {
        const epNumber = currentEpisodes.length + 1;
        const newEp: AnimeEpisode = {
          number: epNumber,
          title: `Épisode ${epNumber}`,
          [field]: value
        };
        currentEpisodes.push(newEp);
      }
    });

    targetSeason.episodes = currentEpisodes;
    setFormData(prev => ({ ...prev, seasons: newSeasons }));
    
    // Fermer et reset
    setBulkConfig(prev => ({ ...prev, [seasonIndex]: { ...config, show: false, text: '' } }));
  };

  const addSeason = () => {
    const newSeason: AnimeSeason = {
      seasonNumber: (formData.seasons?.length || 0) + 1,
      title: `Saison ${(formData.seasons?.length || 0) + 1}`,
      year: formData.year || new Date().getFullYear(),
      episodes: []
    };
    setFormData(prev => ({
      ...prev,
      seasons: [...(prev.seasons || []), newSeason]
    }));
  };

  const updateSeason = (seasonIndex: number, field: keyof AnimeSeason, value: string | number) => {
      const newSeasons = [...(formData.seasons || [])];
      newSeasons[seasonIndex] = { ...newSeasons[seasonIndex], [field]: value };
      setFormData(prev => ({ ...prev, seasons: newSeasons }));
  };

  const removeSeason = (seasonIndex: number) => {
      if(window.confirm("Êtes-vous sûr de vouloir supprimer cette saison et tous ses épisodes ?")) {
          const newSeasons = [...(formData.seasons || [])];
          newSeasons.splice(seasonIndex, 1);
          setFormData(prev => ({ ...prev, seasons: newSeasons }));
      }
  };

  const handleAutoImport = async () => {
    if (!importUrl) {
      alert("Veuillez entrer une URL Anime-Sama (ex: https://anime-sama.to/catalogue/jujutsu-kaisen/)");
      return;
    }
    
    if (!window.confirm("Cette action va écraser les saisons/épisodes actuels avec ceux d'Anime-Sama. Voulez-vous continuer ?")) {
      return;
    }

    setImporting(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/scrape-anime-sama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: importUrl })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de l\'import');
      
      if (data.seasons && data.seasons.length > 0) {
        setFormData(prev => ({
          ...prev,
          seasons: data.seasons,
          episodes: [] // On vide les épisodes simples pour forcer le mode saisons
        }));
        setSuccess(`${data.seasons.length} saison(s) importée(s) avec succès ! N'oubliez pas de sauvegarder.`);
        setImportUrl('');
      } else {
        alert("Aucune saison/épisode trouvé sur cette URL.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.id || !formData.title) {
        throw new Error('Les champs ID et Titre sont obligatoires');
      }

      // Nettoyage générique des données vides
      const cleanedData = JSON.parse(JSON.stringify(formData));
      
      // Cleanup empty links in episodes inside seasons
      if (cleanedData.seasons) {
        cleanedData.seasons.forEach((season: any) => {
          if (season.episodes) {
            season.episodes.forEach((ep: any) => {
              Object.keys(ep).forEach(key => {
                if (ep[key] === '') delete ep[key];
              });
            });
          }
        });
      }

      const res = await fetch(`/api/admin/animes/${initialAnime.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la modification');
      }

      setSuccess('Anime modifié avec succès !');
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full text-white">
      {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 sticky top-0 z-10">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4 sticky top-0 z-10">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">ID (Lecture seule)</label>
            <input disabled type="text" name="id" value={formData.id} className="w-full bg-gray-950/50 text-gray-500 border border-gray-800 rounded px-3 py-2 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Titre *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Titre Original</label>
            <input type="text" name="originalTitle" value={formData.originalTitle} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Année</label>
            <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">URL de l'Image (Miniature)</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">URL de la Bannière</label>
            <input type="text" name="bannerUrl" value={formData.bannerUrl} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Type</label>
            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white">
              <option value="Anime">Anime</option>
              <option value="Film">Film</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Statut</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white">
              <option value="En cours">En cours</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Note (/10)</label>
            <input type="number" step="0.1" max="10" min="0" name="rating" value={formData.rating} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Langue disponible</label>
            <select name="language" value={formData.language} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white">
              <option value="VOSTFR">VOSTFR uniquement</option>
              <option value="VF">VF uniquement</option>
              <option value="VF & VOSTFR">VF & VOSTFR</option>
            </select>
          </div>
        </div>

        {/* Categories / Genres */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Genres</label>
          <div className="flex gap-2">
            <input type="text" value={genreInput} onChange={e => setGenreInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGenre(); } }} placeholder="Action, Aventure..." className="flex-1 bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
            <Button type="button" onClick={addGenre} variant="secondary">Ajouter</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.genres?.map(genre => (
              <span key={genre} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {genre}
                <button type="button" onClick={() => removeGenre(genre)} className="hover:text-white"><X size={14} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Import Automatique Anime-Sama */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5 shadow-inner mt-8 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <DownloadCloud size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-100">Import Automatique depuis Anime-Sama</h3>
              <p className="text-xs text-blue-300/80">Récupère toutes les saisons et épisodes en un clic. Attention : cela remplacera les saisons existantes ci-dessous.</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <input 
              type="url" 
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="https://anime-sama.to/catalogue/jujutsu-kaisen/" 
              className="flex-1 bg-gray-950/80 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" 
            />
            <Button 
              type="button" 
              onClick={handleAutoImport} 
              disabled={importing}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 shadow-lg shadow-blue-600/20"
            >
              {importing ? 'Import en cours...' : 'Importer'}
            </Button>
          </div>
        </div>

        {/* Saisons et Épisodes */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Gestion des Saisons et Épisodes</h3>
            <Button type="button" onClick={addSeason} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <PlusCircle size={16} /> Nouvelle Saison
            </Button>
          </div>

          <div className="space-y-8">
            {formData.seasons?.map((season, seasonIndex) => (
              <div key={seasonIndex} className="bg-gray-950 border border-gray-700 rounded-xl overflow-hidden p-1 shadow-lg">
                <div className="bg-gray-900 border-b border-gray-800 p-4 flex flex-col md:flex-row gap-4 items-center justify-between rounded-t-lg">
                  <div className="flex gap-4 flex-1 w-full">
                    <input type="text" value={season.title} onChange={e => updateSeason(seasonIndex, 'title', e.target.value)} className="bg-gray-950 border border-gray-700 rounded px-3 py-1.5 text-white font-bold max-w-[200px]" placeholder="Nom de la saison" />
                    <input type="number" value={season.seasonNumber} onChange={e => updateSeason(seasonIndex, 'seasonNumber', Number(e.target.value))} className="bg-gray-950 border border-gray-700 rounded px-3 py-1.5 text-white w-20" title="Numéro" />
                  </div>
                  <div className="flex gap-2 flex-wrap w-full md:w-auto">
                    <Button type="button" size="sm" onClick={() => toggleBulk(seasonIndex)} className="bg-purple-600 hover:bg-purple-700">
                      Import Masse
                    </Button>
                    <Button type="button" size="sm" onClick={() => addEpisodeToSeason(seasonIndex)} className="bg-green-600 hover:bg-green-700">
                      + Ajout Épisode
                    </Button>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeSeason(seasonIndex)}>
                      Supprimer Saison
                    </Button>
                  </div>
                </div>

                {bulkConfig[seasonIndex]?.show && (
                  <div className="p-4 bg-purple-900/20 border-b border-purple-500/30">
                    <h4 className="text-sm font-bold text-purple-300 mb-2">Ajout rapide de liens en masse</h4>
                    <p className="text-xs text-gray-400 mb-3">
                      Collez une liste de liens (Sibnet, Vidmoly, Movearn, M3U8...). Ils seront automatiquement analysés et ajoutés comme nouveaux épisodes à la suite des actuels.
                    </p>
                    <div className="flex gap-4 mb-3">
                      <select 
                        value={bulkConfig[seasonIndex].lang} 
                        onChange={(e) => updateBulkLang(seasonIndex, e.target.value as 'VOSTFR' | 'VF')}
                        className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-sm text-white"
                      >
                        <option value="VOSTFR">Liens VOSTFR</option>
                        <option value="VF">Liens VF</option>
                      </select>
                    </div>
                    <textarea 
                      rows={5}
                      value={bulkConfig[seasonIndex].text}
                      onChange={(e) => updateBulkText(seasonIndex, e.target.value)}
                      placeholder="'https://video.sibnet.ru/shell.php?videoid=4956889',\n'https://video.sibnet.ru/shell.php?videoid=4956890'..."
                      className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs font-mono text-gray-300 mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" size="sm" variant="ghost" onClick={() => toggleBulk(seasonIndex)}>Annuler</Button>
                      <Button type="button" size="sm" onClick={() => processBulkLinks(seasonIndex)} className="bg-purple-600 hover:bg-purple-700">
                        Analyser et Ajouter
                      </Button>
                    </div>
                  </div>
                )}

                <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {season.episodes?.map((episode, episodeIndex) => (
                    <div key={episodeIndex} className="bg-gray-900 border border-gray-800 rounded p-3 relative hover:border-gray-600 transition-colors">
                      <button type="button" onClick={() => removeEpisodeFromSeason(seasonIndex, episodeIndex)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-1">
                        <Trash2 size={16} />
                      </button>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-gray-500 font-bold">N°</label>
                          <input type="number" value={episode.number} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'number', Number(e.target.value))} className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-sm text-white" />
                        </div>
                        <div className="space-y-1 col-span-2 lg:col-span-2">
                          <label className="text-[10px] uppercase text-gray-500 font-bold">Titre</label>
                          <input type="text" value={episode.title} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'title', e.target.value)} className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-sm text-white" />
                        </div>
                        <div className="space-y-1 col-span-2 lg:col-span-3 lg:row-span-2 gap-2 flex flex-col justify-end pb-1 text-xs text-gray-400">
                           <i>Les liens (M3U8, Sibnet, Vidmoly...) peuvent être gérés ci-dessous.</i>
                        </div>
                        
                        <div className="space-y-1 col-span-2 lg:col-span-3">
                          <label className="text-[10px] uppercase text-gray-500 font-bold">VOSTFR : Sibnet / M3U8 / Vidmoly / Movearn</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={episode.sibnetVostfrId || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'sibnetVostfrId', e.target.value)} placeholder="Sibnet ID" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.m3u8Url || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'm3u8Url', e.target.value)} placeholder="M3U8 Direct URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.vidmolyUrl || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'vidmolyUrl', e.target.value)} placeholder="Vidmoly URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.movearnUrl || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'movearnUrl', e.target.value)} placeholder="Movearn URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        <div className="space-y-1 col-span-2 lg:col-span-3">
                          <label className="text-[10px] uppercase text-gray-500 font-bold">VF : Sibnet / M3U8 / Vidmoly / Movearn</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={episode.sibnetVfId || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'sibnetVfId', e.target.value)} placeholder="Sibnet VF ID" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.m3u8VfUrl || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'm3u8VfUrl', e.target.value)} placeholder="M3U8 VF URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.vidmolyVfUrl || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'vidmolyVfUrl', e.target.value)} placeholder="Vidmoly VF URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                            <input type="text" value={episode.movearnVfUrl || ''} onChange={e => updateEpisodeInSeason(seasonIndex, episodeIndex, 'movearnVfUrl', e.target.value)} placeholder="Movearn VF URL" className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1 text-xs text-white" />
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                  {season.episodes?.length === 0 && (
                    <div className="text-center py-6 text-gray-500 border border-gray-800 border-dashed rounded bg-gray-900/50">
                      Aucun épisode dans cette saison.
                    </div>
                  )}
                </div>
              </div>
            ))}

            {formData.seasons?.length === 0 && (
              <div className="text-center py-10 bg-gray-900 border border-gray-800 border-dashed rounded-xl">
                <p className="text-gray-400 mb-4">Cet anime n'a pas encore de saisons ou d'épisodes configurés manuellement.</p>
                <Button type="button" onClick={addSeason} variant="outline" className="border-gray-700 text-gray-300">Créer la Saison 1</Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-800 sticky bottom-6 bg-gray-900/90 backdrop-blur pb-2 rounded-lg">
          <p className="text-xs text-gray-500">N'oubliez pas d'enregistrer après toute modification.</p>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 text-white px-8 h-12 flex items-center gap-2">
            {loading ? 'Sauvegarde en cours...' : <><Save size={20} /> Appliquer les modifications</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
