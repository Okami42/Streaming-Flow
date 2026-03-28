"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Anime, getAnimeByIdAsync } from '@/lib/animeData';
import { ultraFastEnrichAnime } from '@/lib/realAutoImport';
import EditAnimeForm from '@/components/admin/EditAnimeForm';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EditAnimePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!anime) return;
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'anime "${anime.title}" ? Cette action est irréversible et retirera l'anime de la base de données.`)) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/animes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      
      router.push('/admin/animes');
      router.refresh();
    } catch (err) {
      alert("Erreur lors de la suppression de l'anime.");
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const foundAnime = await getAnimeByIdAsync(id as string);
        if (foundAnime) {
          // Enrichir rapidement l'anime avec les données d'épisodes s'il manque des saisons
          const enriched = await ultraFastEnrichAnime(foundAnime);
          setAnime(enriched);
        }
      } catch (e) {
        console.error("Erreur chargement anime:", e);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchAnime();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030711] flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-3 text-blue-500" size={32} /> Chargement des données et épisodes...
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-[#030711] p-12 text-white">
        <Link href="/admin/animes" className="text-blue-500 hover:underline flex items-center mb-6">
          <ArrowLeft size={16} className="mr-2" /> Retour à la liste
        </Link>
        <h1 className="text-2xl font-bold text-red-500">Anime introuvable</h1>
        <p className="mt-4 text-gray-400">L'anime avec l'ID {id} n'existe pas dans le fichier de base de données.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030711] text-white p-6 md:p-12 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* En-tête de la page */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-6 gap-4">
          <div>
            <Link href="/admin/animes" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Retour au catalogue
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Modifier l'Anime : <span className="text-blue-500">{anime.title}</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Modifiez les métadonnées de l'anime ou gérez manuellement ses épisodes et saisons.
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 size={16} />
            {isDeleting ? 'Suppression en cours...' : 'Supprimer l\'Anime'}
          </button>
        </div>

        {/* Formulaire Edition (pré-rempli, gère ses propres submits) */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EditAnimeForm 
            initialAnime={anime} 
            onSuccess={() => {
              // Une fois sauvegardé, on pourrait recharger ou revenir en arrière
              router.push("/admin/animes");
              router.refresh();
            }} 
          />
        </div>

      </div>
    </div>
  );
}
