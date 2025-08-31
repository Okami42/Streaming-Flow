import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getUserHistory, syncUserHistory, initializeDatabase } from '@/lib/database';
import { WatchHistoryItem, ReadHistoryItem } from '@/lib/history';

export async function GET(request: NextRequest) {
  try {
    // Initialiser la base de données au premier appel
    await initializeDatabase();
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    const history = await getUserHistory(userId);

    return NextResponse.json({
      success: true,
      data: history,
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    
    const message = error instanceof Error ? error.message : 'Erreur de récupération de l\'historique';
    const status = message.includes('invalide') ? 401 : 500;
    
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialiser la base de données au premier appel
    await initializeDatabase();
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Token d\'authentification requis' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const { userId } = verifyToken(token);

    const { watchHistory, readHistory }: {
      watchHistory: WatchHistoryItem[];
      readHistory: ReadHistoryItem[];
    } = await request.json();

    await syncUserHistory(userId, watchHistory || [], readHistory || []);

    return NextResponse.json({
      success: true,
      message: 'Historique synchronisé avec succès',
    });

  } catch (error) {
    console.error('Erreur lors de la synchronisation de l\'historique:', error);
    
    const message = error instanceof Error ? error.message : 'Erreur de synchronisation de l\'historique';
    const status = message.includes('invalide') ? 401 : 500;
    
    return NextResponse.json(
      { success: false, message },
      { status }
    );
  }
}
