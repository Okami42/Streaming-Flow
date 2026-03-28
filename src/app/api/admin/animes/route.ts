import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Anime } from '@/lib/animeData';

export async function POST(req: Request) {
  try {
    const newAnime: Anime = await req.json();

    // Vérifier les champs obligatoires (simplifié)
    if (!newAnime.id || !newAnime.title) {
      return NextResponse.json({ error: 'Champs obligatoires manquants (id, title)' }, { status: 400 });
    }

    // Chemin absolu vers le fichier animeData.ts
    // process.cwd() donne la racine du projet (Streaming-Flow-main)
    const filePath = path.join(process.cwd(), 'src', 'lib', 'animeData.ts');

    // Lire le contenu du fichier
    let fileContent = await fs.readFile(filePath, 'utf-8');

    // On cherche la fin du tableau `];`
    const arrayEndIndex = fileContent.lastIndexOf('];');

    if (arrayEndIndex === -1) {
      return NextResponse.json({ error: 'Impossible de trouver la fin du tableau dans animeData.ts' }, { status: 500 });
    }

    // Formater le nouvel anime en JavaScript lisible (indenté avec 2 espaces)
    // JSON.stringify génère des clés avec guillemets ce qui est valide en TypeScript
    const formattedAnime = JSON.stringify(newAnime, null, 2)
      // On indente toutes les lignes de 2 espaces supplémentaires pour correspondre au fichier existant
      .split('\n')
      .map((line, index) => index === 0 ? `  ${line}` : `  ${line}`)
      .join('\n');

    // S'assurer qu'il y a une virgule sur l'élément précédent si nécessaire
    // On va simplement insérer `, \n\n` + le nouvel objet juste avant le `];`
    
    // Pour être sûr, on vérifie ce qu'il y a juste avant le `];`
    const contentBefore = fileContent.substring(0, arrayEndIndex).trimRight();
    const hasComma = contentBefore.endsWith(',');
    
    const separator = hasComma ? '\n\n' : ',\n\n';

    const newContent = contentBefore + separator + formattedAnime + '\n\n];\n';

    // Réécrire le fichier complet
    await fs.writeFile(filePath, newContent, 'utf-8');

    return NextResponse.json({ success: true, message: 'Anime ajouté avec succès !' });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'anime :', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la modification du fichier' },
      { status: 500 }
    );
  }
}
