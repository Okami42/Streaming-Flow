import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Anime } from '@/lib/animeData';
import { saveAnimeToDb } from '@/lib/database';

export async function POST(req: Request) {
  try {
    const newAnime: Anime = await req.json();

    if (!newAnime.id || !newAnime.title) {
      return NextResponse.json({ error: 'Champs obligatoires manquants (id, title)' }, { status: 400 });
    }

    // 1. Sauvegarder dans la base de données PostgreSQL (pour la production sur Vercel)
    try {
      await saveAnimeToDb(newAnime);
    } catch (dbError: any) {
      console.error('Erreur DB POST anime:', dbError);
    }

    // 2. Sauvegarder dans le fichier local (pour le développement local)
    try {
      if (process.env.VERCEL) {
        throw new Error("Sur Vercel, on ne modifie pas les fichiers locaux.");
      }
      
      const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');
      let fileContent = await fs.readFile(filePath, 'utf-8');

      const arrayEndIndex = fileContent.lastIndexOf('];');

      if (arrayEndIndex !== -1) {
        const formattedAnime = JSON.stringify(newAnime, null, 2)
          .split('\n')
          .map((line, index) => index === 0 ? `  ${line}` : `  ${line}`)
          .join('\n');
        
        const contentBefore = fileContent.substring(0, arrayEndIndex).trimRight();
        const hasComma = contentBefore.endsWith(',');
        const separator = hasComma ? '\n\n' : ',\n\n';

        const newContent = contentBefore + separator + formattedAnime + '\n\n];\n';

        await fs.writeFile(filePath, newContent, 'utf-8');
      }
    } catch (fsError: any) {
      console.log('Mode production détecté, fichier local non modifié.');
    }

    return NextResponse.json({ success: true, message: 'Anime ajouté avec succès !' });

  } catch (error: any) {
    console.error('Erreur globale ajout anime :', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la modification', details: error.message },
      { status: 500 }
    );
  }
}
