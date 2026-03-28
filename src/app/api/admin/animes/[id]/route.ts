import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Anime, getAllAnimes } from '@/lib/animeData';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const updatedAnime: Anime = await req.json();
    const id = params.id;

    if (!updatedAnime || updatedAnime.id !== id) {
      return NextResponse.json({ error: 'Données invalides : L\'ID ne correspond pas.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Mettre à jour le tableau en mémoire
    // On doit cloner pour éviter des problèmes de référence avec le cache require de Node
    const currentAnimes = JSON.parse(JSON.stringify(getAllAnimes()));
    const index = currentAnimes.findIndex((a: Anime) => a.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Anime non trouvé dans la base de données' }, { status: 404 });
    }

    // Remplacer l'objet
    currentAnimes[index] = updatedAnime;

    // Trouver où commence le tableau dans le fichier
    const splitText = 'export const animes: Anime[] = [';
    const splitIndex = fileContent.indexOf(splitText);
    
    if (splitIndex === -1) {
      return NextResponse.json({ error: 'Format du fichier source animeData.ts non reconnu.' }, { status: 500 });
    }

    // Garder toute la partie statique du fichier (imports, interfaces)
    const staticPart = fileContent.substring(0, splitIndex);

    // Formater le nouveau tableau
    const formattedArray = JSON.stringify(currentAnimes, null, 2);

    // Reconstruire le fichier
    // On ajoute `export const animes: Anime[] = ` suivi du tableau et d'un point-virgule final
    const newContent = staticPart + 'export const animes: Anime[] = ' + formattedArray + ';\n';

    await fs.writeFile(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true, message: 'Anime mis à jour avec succès !' });

  } catch (error) {
    console.error('Erreur PUT anime :', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la sauvegarde.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const currentAnimes = JSON.parse(JSON.stringify(getAllAnimes()));
    const index = currentAnimes.findIndex((a: Anime) => a.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Anime non trouvé dans la base de données' }, { status: 404 });
    }

    // Supprimer l'objet
    currentAnimes.splice(index, 1);

    const splitText = 'export const animes: Anime[] = [';
    const splitIndex = fileContent.indexOf(splitText);
    
    if (splitIndex === -1) {
      return NextResponse.json({ error: 'Format du fichier source animeData.ts non reconnu.' }, { status: 500 });
    }

    const staticPart = fileContent.substring(0, splitIndex);
    const formattedArray = JSON.stringify(currentAnimes, null, 2);
    const newContent = staticPart + 'export const animes: Anime[] = ' + formattedArray + ';\n';

    await fs.writeFile(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true, message: 'Anime supprimé avec succès !' });

  } catch (error) {
    console.error('Erreur DELETE anime :', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la suppression.' }, { status: 500 });
  }
}
