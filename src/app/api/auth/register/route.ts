import { NextRequest, NextResponse } from 'next/server';
import { createUser, generateToken, initializeDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Initialiser la base de données au premier appel
    await initializeDatabase();
    
    const { username, password } = await request.json();

    // Validation basique
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      );
    }

    // Validation du nom d'utilisateur
    if (username.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' },
        { status: 400 }
      );
    }

    // Créer l'utilisateur
    const user = await createUser(username, password);
    
    // Générer un token JWT
    const token = generateToken(user.id);

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie',
      user,
      token,
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    
    const message = error instanceof Error ? error.message : 'Erreur d\'inscription';
    const status = message.includes('existe déjà') ? 409 : 500;
    
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}
