import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validation basique
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      );
    }

    // Authentifier l'utilisateur
    const user = await authenticateUser(username, password);
    
    // Générer un token JWT
    const token = generateToken(user.id);

    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      user,
      token,
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    
    const message = error instanceof Error ? error.message : 'Erreur de connexion';
    const status = message.includes('incorrect') ? 401 : 500;
    
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}
