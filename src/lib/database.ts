import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './auth-types';
import { WatchHistoryItem, ReadHistoryItem } from './history';

// Structure de la base de données
interface Database {
  users: (User & { password: string })[];
  userHistory: {
    [userId: string]: {
      watchHistory: WatchHistoryItem[];
      readHistory: ReadHistoryItem[];
    };
  };
}

const DB_PATH = path.join(process.cwd(), 'data', 'database.json');
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-super-secret';

// Initialiser la base de données
async function initializeDatabase(): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    try {
      await fs.access(DB_PATH);
    } catch {
      // Le fichier n'existe pas, le créer
      const initialData: Database = {
        users: [],
        userHistory: {},
      };
      await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
}

// Lire la base de données
async function readDatabase(): Promise<Database> {
  try {
    await initializeDatabase();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture de la base de données:', error);
    return { users: [], userHistory: {} };
  }
}

// Écrire dans la base de données
async function writeDatabase(data: Database): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans la base de données:', error);
    throw error;
  }
}

// Fonctions d'authentification
export async function createUser(username: string, password: string): Promise<User> {
  const db = await readDatabase();
  
  // Vérifier si l'utilisateur existe déjà
  const existingUser = db.users.find(u => u.username === username);
  if (existingUser) {
    throw new Error('Un utilisateur avec ce nom d\'utilisateur existe déjà');
  }
  
  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Créer le nouvel utilisateur (email généré automatiquement ou laissé vide)
  const newUser = {
    id: Date.now().toString(),
    email: `${username}@okastream.local`, // Email généré automatiquement
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };
  
  db.users.push(newUser);
  
  // Initialiser l'historique de l'utilisateur
  db.userHistory[newUser.id] = {
    watchHistory: [],
    readHistory: [],
  };
  
  await writeDatabase(db);
  
  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function authenticateUser(username: string, password: string): Promise<User> {
  const db = await readDatabase();
  
  // Trouver l'utilisateur
  const user = db.users.find(u => u.username === username);
  if (!user) {
    throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
  }
  
  // Vérifier le mot de passe
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
  }
  
  // Retourner l'utilisateur sans le mot de passe
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
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
  const db = await readDatabase();
  const user = db.users.find(u => u.id === userId);
  if (!user) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Fonctions pour l'historique
export async function getUserHistory(userId: string): Promise<{
  watchHistory: WatchHistoryItem[];
  readHistory: ReadHistoryItem[];
}> {
  const db = await readDatabase();
  return db.userHistory[userId] || { watchHistory: [], readHistory: [] };
}

export async function saveUserWatchHistory(userId: string, watchHistory: WatchHistoryItem[]): Promise<void> {
  const db = await readDatabase();
  
  if (!db.userHistory[userId]) {
    db.userHistory[userId] = { watchHistory: [], readHistory: [] };
  }
  
  db.userHistory[userId].watchHistory = watchHistory;
  await writeDatabase(db);
}

export async function saveUserReadHistory(userId: string, readHistory: ReadHistoryItem[]): Promise<void> {
  const db = await readDatabase();
  
  if (!db.userHistory[userId]) {
    db.userHistory[userId] = { watchHistory: [], readHistory: [] };
  }
  
  db.userHistory[userId].readHistory = readHistory;
  await writeDatabase(db);
}

export async function syncUserHistory(
  userId: string,
  watchHistory: WatchHistoryItem[],
  readHistory: ReadHistoryItem[]
): Promise<void> {
  const db = await readDatabase();
  
  if (!db.userHistory[userId]) {
    db.userHistory[userId] = { watchHistory: [], readHistory: [] };
  }
  
  db.userHistory[userId].watchHistory = watchHistory;
  db.userHistory[userId].readHistory = readHistory;
  await writeDatabase(db);
}
