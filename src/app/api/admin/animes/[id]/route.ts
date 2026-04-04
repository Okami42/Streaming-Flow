import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Anime, getAllAnimes } from '@/lib/animeData';
import { saveAnimeToDb, deleteAnimeFromDb } from '@/lib/database';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const updatedAnime: Anime = await req.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!updatedAnime || updatedAnime.id !== id) {
      return NextResponse.json({ error: 'Données invalides : L\'ID ne correspond pas.' }, { status: 400 });
    }

    // 1. D'abord, on sauvegarde dans la base de données (pour Vercel / Production)
    try {
      if (process.env.POSTGRES_URL) {
        await saveAnimeToDb(updatedAnime);
      }
    } catch (dbError: any) {
      console.error('Erreur DB PUT anime:', dbError);
      // On continue car on veut aussi essayer de sauvegarder en local si on est en développement
    }

    // 2. Ensuite, on essaie de sauvegarder en local (pour le développement local)
    // Ne s'exécute pas sur Vercel (read-only filesystem)
    try {
      if (process.env.VERCEL) {
        throw new Error("Sur Vercel, on ne modifie pas les fichiers locaux.");
      }
      
      const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Mettre à jour le tableau en mémoire
      const currentAnimes = JSON.parse(JSON.stringify(getAllAnimes()));
      const index = currentAnimes.findIndex((a: Anime) => a.id === id);
      
      if (index === -1) {
        // Si l'animé n'existe pas localement mais qu'on veut le mettre à jour, on l'ajoute
        currentAnimes.push(updatedAnime);
      } else {
        // Remplacer l'objet
        currentAnimes[index] = updatedAnime;
      }

      // Trouver où commence le tableau dans le fichier
      const splitText = 'export const animes: Anime[] = [';
      const splitIndex = fileContent.indexOf(splitText);
      
      if (splitIndex !== -1) {
        const staticPart = fileContent.substring(0, splitIndex);
        const formattedArray = JSON.stringify(currentAnimes, null, 2);
        const newContent = staticPart + 'export const animes: Anime[] = ' + formattedArray + ';\n';
        await fs.writeFile(filePath, newContent, 'utf-8');
      }
    } catch (fsError: any) {
      // Ignorer l'erreur en production car Vercel est en lecture seule
      console.log('Mode production détecté, fichier local non modifié.');
    }

    return NextResponse.json({ success: true, message: 'Anime mis à jour avec succès !' });

  } catch (error: any) {
    console.error('Erreur globale PUT anime :', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la sauvegarde.', details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // 1. Supprimer de la base de données (pour Vercel / Production)
    try {
      if (process.env.POSTGRES_URL) {
        await deleteAnimeFromDb(id);
      }
    } catch (dbError: any) {
      console.error('Erreur DB DELETE anime:', dbError);
    }

    // 2. Supprimer du fichier local (pour le développement)
    try {
      if (process.env.VERCEL) {
        throw new Error("Sur Vercel, on ne modifie pas les fichiers locaux.");
      }
      
      const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');
      const fileContent = await fs.readFile(filePath, 'utf-8');

      const currentAnimes = JSON.parse(JSON.stringify(getAllAnimes()));
      const index = currentAnimes.findIndex((a: Anime) => a.id === id);
      
      if (index !== -1) {
        // Supprimer l'objet
        currentAnimes.splice(index, 1);

        const splitText = 'export const animes: Anime[] = [';
        const splitIndex = fileContent.indexOf(splitText);
        
        if (splitIndex !== -1) {
          const staticPart = fileContent.substring(0, splitIndex);
          const formattedArray = JSON.stringify(currentAnimes, null, 2);
          const newContent = staticPart + 'export const animes: Anime[] = ' + formattedArray + ';\n';
          await fs.writeFile(filePath, newContent, 'utf-8');
        }
      }
    } catch (fsError: any) {
      console.log('Mode production détecté, fichier local non modifié.');
    }

    return NextResponse.json({ success: true, message: 'Anime supprimé avec succès !' });

  } catch (error: any) {
    console.error('Erreur globale DELETE anime :', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la suppression.', details: error.message }, { status: 500 });
  }
}
