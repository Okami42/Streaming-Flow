"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Anime, AnimeEpisode } from '@/lib/animeData';
import { PlusCircle, Trash2, Save, X } from 'lucide-react';

export default function AddAnimeForm({ onSuccess, onCancel }: { onSuccess?: () => void, onCancel?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Anime>>({
    id: '',
    title: '',
    originalTitle: '',
    description: '',
    imageUrl: '',
    bannerUrl: '',
    year: new Date().getFullYear(),
    type: 'Anime',
    status: 'En cours',
    genres: [],
    rating: 8.0,
    language: 'VOSTFR',
    episodes: [],
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

  // Gestion des épisodes
  const addEpisode = () => {
    const newEp: AnimeEpisode = {
      number: (formData.episodes?.length || 0) + 1,
      title: `Épisode ${(formData.episodes?.length || 0) + 1}`,
      sibnetVostfrId: '',
    };
    setFormData(prev => ({
      ...prev,
      episodes: [...(prev.episodes || []), newEp],
    }));
  };

  const updateEpisode = (index: number, field: keyof AnimeEpisode, value: string | number) => {
    const newEpisodes = [...(formData.episodes || [])];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setFormData(prev => ({ ...prev, episodes: newEpisodes }));
  };

  const removeEpisode = (index: number) => {
    const newEpisodes = [...(formData.episodes || [])];
    newEpisodes.splice(index, 1);
    // Réajuster les numéros
    newEpisodes.forEach((ep, i) => { ep.number = i + 1; });
    setFormData(prev => ({ ...prev, episodes: newEpisodes }));
  };

  const [bulkConfig, setBulkConfig] = useState<{ text: string; lang: 'VOSTFR' | 'VF'; show: boolean }>({ text: '', lang: 'VOSTFR', show: false });

  const toggleBulk = () => setBulkConfig(prev => ({ ...prev, show: !prev.show }));
  const updateBulkText = (text: string) => setBulkConfig(prev => ({ ...prev, text }));
  const updateBulkLang = (lang: 'VOSTFR' | 'VF') => setBulkConfig(prev => ({ ...prev, lang }));

  const processBulkLinks = () => {
    if (!bulkConfig.text.trim()) return;

    const urlRegex = /(https?:\/\/[^\s"',]+)/g;
    const matches = bulkConfig.text.match(urlRegex) || [];
    
    if (matches.length === 0) {
      alert("Aucun lien valide trouvé dans le texte.");
      return;
    }

    const currentEpisodes = [...(formData.episodes || [])];

    matches.forEach((url) => {
      let field: keyof AnimeEpisode | null = null;
      let value = url;

      if (url.includes('sibnet.ru')) {
        const idMatch = url.match(/videoid=(\d+)/);
        if (idMatch) {
          field = bulkConfig.lang === 'VOSTFR' ? 'sibnetVostfrId' : 'sibnetVfId';
          value = idMatch[1];
        } else {
           field = bulkConfig.lang === 'VOSTFR' ? 'sibnetVostfrId' : 'sibnetVfId'; 
        }
      } else if (url.includes('vidmoly')) {
        field = bulkConfig.lang === 'VOSTFR' ? 'vidmolyUrl' : 'vidmolyVfUrl';
      } else if (url.includes('movearn')) {
        field = bulkConfig.lang === 'VOSTFR' ? 'movearnUrl' : 'movearnVfUrl';
      } else if (url.includes('sendvid')) {
          const idMatch = url.match(/sendvid\.com\/embed\/([a-zA-Z0-9]+)/) || url.match(/sendvid\.com\/([a-zA-Z0-9]+)/);
          if (idMatch) {
            field = bulkConfig.lang === 'VOSTFR' ? 'sendvidId' : 'sendvidVfId';
            value = idMatch[1];
          }
      } else {
        field = bulkConfig.lang === 'VOSTFR' ? 'm3u8Url' : 'm3u8VfUrl';
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

    setFormData(prev => ({ ...prev, episodes: currentEpisodes }));
    setBulkConfig(prev => ({ ...prev, show: false, text: '' }));
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

      // Nettoyer les épisodes (enlever les champs vides)
      const cleanedData = { ...formData };
      if (cleanedData.episodes) {
        cleanedData.episodes = cleanedData.episodes.map(ep => {
          const cleanEp: any = { ...ep };
          Object.keys(cleanEp).forEach(key => {
            if (cleanEp[key] === '') delete cleanEp[key];
          });
          return cleanEp;
        });
      }

      const res = await fetch('/api/admin/animes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'enregistrement');
      }

      setSuccess('Anime ajouté avec succès !');
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
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-4xl mx-auto mb-10 text-white">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold">Ajouter un Nouvel Anime</h2>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={20} />
          </Button>
        )}
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">ID (ex: naruto-shippuden) *</label>
            <input required type="text" name="id" value={formData.id} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Titre *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-950 border border-gray-800 rounded px-3 py-2 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Titre Original (Romaji/Jap)</label>
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

        {/* Épisodes */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Épisodes ({formData.episodes?.length || 0})</h3>
            <div className="flex gap-2">
              <Button type="button" onClick={toggleBulk} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                Import Masse
              </Button>
              <Button type="button" onClick={addEpisode} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <PlusCircle size={16} /> Ajouter un Épisode
              </Button>
            </div>
          </div>

          {bulkConfig.show && (
            <div className="p-4 mb-4 bg-purple-900/20 border-b border-purple-500/30 rounded">
              <h4 className="text-sm font-bold text-purple-300 mb-2">Ajout rapide de liens en masse</h4>
              <p className="text-xs text-gray-400 mb-3">
                Collez une liste de liens (Sibnet, Vidmoly, Movearn, M3U8...). Ils seront automatiquement analysés et ajoutés comme nouveaux épisodes à la suite des actuels.
              </p>
              <div className="flex gap-4 mb-3">
                <select 
                  value={bulkConfig.lang} 
                  onChange={(e) => updateBulkLang(e.target.value as 'VOSTFR' | 'VF')}
                  className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-sm text-white"
                >
                  <option value="VOSTFR">Liens VOSTFR</option>
                  <option value="VF">Liens VF</option>
                </select>
              </div>
              <textarea 
                rows={5}
                value={bulkConfig.text}
                onChange={(e) => updateBulkText(e.target.value)}
                placeholder="'https://video.sibnet.ru/shell.php?videoid=4956889',\n'https://video.sibnet.ru/shell.php?videoid=4956890'..."
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs font-mono text-gray-300 mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button type="button" size="sm" variant="ghost" onClick={toggleBulk}>Annuler</Button>
                <Button type="button" size="sm" onClick={processBulkLinks} className="bg-purple-600 hover:bg-purple-700">
                  Analyser et Ajouter
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {formData.episodes?.map((episode, index) => (
              <div key={index} className="bg-gray-950 border border-gray-800 rounded-lg p-4 relative">
                <button type="button" onClick={() => removeEpisode(index)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 p-1">
                  <Trash2 size={16} />
                </button>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Numéro</label>
                    <input type="number" value={episode.number} onChange={e => updateEpisode(index, 'number', Number(e.target.value))} className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white" />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-3">
                    <label className="text-xs text-gray-400">Titre de l'épisode</label>
                    <input type="text" value={episode.title} onChange={e => updateEpisode(index, 'title', e.target.value)} className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white" />
                  </div>
                  
                  {/* Liens de streaming */}
                  <div className="space-y-1 col-span-2 md:col-span-2">
                    <label className="text-xs text-gray-400">ID Sibnet VOSTFR</label>
                    <input type="text" value={episode.sibnetVostfrId || ''} onChange={e => updateEpisode(index, 'sibnetVostfrId', e.target.value)} placeholder="ex: 456789" className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-2">
                    <label className="text-xs text-gray-400">URL Vidmoly VOSTFR</label>
                    <input type="text" value={episode.vidmolyUrl || ''} onChange={e => updateEpisode(index, 'vidmolyUrl', e.target.value)} placeholder="https://vidmoly.to/w/..." className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-2">
                    <label className="text-xs text-gray-400">URL Movearn VOSTFR</label>
                    <input type="text" value={episode.movearnUrl || ''} onChange={e => updateEpisode(index, 'movearnUrl', e.target.value)} placeholder="https://movearn.com/embed-..." className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-1 col-span-2 md:col-span-2">
                    <label className="text-xs text-gray-400">Lien Direct M3U8 (Dood, ou HLS)</label>
                    <input type="text" value={episode.m3u8Url || ''} onChange={e => updateEpisode(index, 'm3u8Url', e.target.value)} placeholder="https://.../index.m3u8" className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-sm text-white focus:border-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
            {formData.episodes?.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4 border border-dashed border-gray-800 rounded-lg">Aucun épisode ajouté. Vous pouvez enregistrer l'anime et ajouter les épisodes plus tard.</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-800">
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center gap-2">
            {loading ? 'Sauvegarde...' : <><Save size={18} /> Enregistrer l'Anime</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
