import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth-types';
import { WatchHistoryItem, ReadHistoryItem } from './history';

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-super-secret';

// Initialiser les tables de la base de données
export async function initializeDatabase(): Promise<void> {
  try {
    // Créer la table des utilisateurs
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Créer la table de l'historique de visionnage
    await sql`
      CREATE TABLE IF NOT EXISTS watch_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        item_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        image_url TEXT,
        last_watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress INTEGER DEFAULT 0,
        duration INTEGER DEFAULT 0,
        season INTEGER DEFAULT 1,
        episode INTEGER DEFAULT 1,
        episode_title VARCHAR(255),
        content_type VARCHAR(50) DEFAULT 'Anime'
      )
    `;

    // Créer la table de l'historique de lecture
    await sql`
      CREATE TABLE IF NOT EXISTS read_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        item_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        image_url TEXT,
        last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        chapter INTEGER DEFAULT 1,
        page INTEGER DEFAULT 1,
        total_pages INTEGER DEFAULT 1
      )
    `;

    console.log('Tables créées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
}

// Fonctions d'authentification
export async function createUser(username: string, password: string): Promise<User> {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await sql`
      SELECT id FROM users WHERE username = ${username}
    `;
    
    if (existingUser.rows.length > 0) {
      throw new Error('Un utilisateur avec ce nom d\'utilisateur existe déjà');
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Créer le nouvel utilisateur
    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${`${username}@okastream.local`}, ${hashedPassword})
      RETURNING id, username, email, created_at
    `;
    
    const newUser = result.rows[0];
    
    return {
      id: newUser.id.toString(),
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.created_at,
    };
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
}

export async function authenticateUser(username: string, password: string): Promise<User> {
  try {
    // Trouver l'utilisateur
    const result = await sql`
      SELECT id, username, email, password, created_at
      FROM users 
      WHERE username = ${username}
    `;
    
    if (result.rows.length === 0) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
    
    const user = result.rows[0];
    
    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
    
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
    };
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    throw error;
  }
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    throw new Error('Token invalide');
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, username, email, created_at
      FROM users 
      WHERE id = ${userId}
    `;
    
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      createdAt: user.created_at,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
}

// Fonctions pour l'historique
export async function getUserHistory(userId: string): Promise<{
  watchHistory: WatchHistoryItem[];
  readHistory: ReadHistoryItem[];
}> {
  try {
    // Récupérer l'historique de visionnage
    const watchResult = await sql`
      SELECT * FROM watch_history 
      WHERE user_id = ${userId}
      ORDER BY last_watched_at DESC
    `;

    // Récupérer l'historique de lecture
    const readResult = await sql`
      SELECT * FROM read_history 
      WHERE user_id = ${userId}
      ORDER BY last_read_at DESC
    `;

    const watchHistory: WatchHistoryItem[] = watchResult.rows.map(row => ({
      id: row.item_id,
      title: row.title,
      imageUrl: row.image_url || '',
      lastWatchedAt: row.last_watched_at,
      progress: row.progress,
      duration: row.duration,
      episodeInfo: {
        season: row.season,
        episode: row.episode,
        title: row.episode_title,
      },
      type: row.content_type as any,
    }));

    const readHistory: ReadHistoryItem[] = readResult.rows.map(row => ({
      id: row.item_id,
      title: row.title,
      imageUrl: row.image_url || '',
      lastReadAt: row.last_read_at,
      chapter: row.chapter,
      page: row.page,
      totalPages: row.total_pages,
      type: 'Scans',
    }));

    return { watchHistory, readHistory };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    return { watchHistory: [], readHistory: [] };
  }
}

export async function syncUserHistory(
  userId: string,
  watchHistory: WatchHistoryItem[],
  readHistory: ReadHistoryItem[]
): Promise<void> {
  try {
    // Supprimer l'ancien historique
    await sql`DELETE FROM watch_history WHERE user_id = ${userId}`;
    await sql`DELETE FROM read_history WHERE user_id = ${userId}`;

    // Insérer le nouvel historique de visionnage
    for (const item of watchHistory) {
      await sql`
        INSERT INTO watch_history (
          user_id, item_id, title, image_url, last_watched_at, 
          progress, duration, season, episode, episode_title, content_type
        ) VALUES (
          ${userId}, ${item.id}, ${item.title}, ${item.imageUrl}, 
          ${item.lastWatchedAt}, ${item.progress}, ${item.duration},
          ${item.episodeInfo.season}, ${item.episodeInfo.episode}, 
          ${item.episodeInfo.title || ''}, ${item.type}
        )
      `;
    }

    // Insérer le nouvel historique de lecture
    for (const item of readHistory) {
      await sql`
        INSERT INTO read_history (
          user_id, item_id, title, image_url, last_read_at,
          chapter, page, total_pages
        ) VALUES (
          ${userId}, ${item.id}, ${item.title}, ${item.imageUrl},
          ${item.lastReadAt}, ${item.chapter}, ${item.page}, ${item.totalPages}
        )
      `;
    }
  } catch (error) {
    console.error('Erreur lors de la synchronisation de l\'historique:', error);
    throw error;
  }
}

// Fonction pour supprimer tout l'historique d'un utilisateur
export async function clearUserHistory(userId: string): Promise<void> {
  try {
    await sql`DELETE FROM watch_history WHERE user_id = ${userId}`;
    await sql`DELETE FROM read_history WHERE user_id = ${userId}`;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'historique:', error);
    throw error;
  }
}
