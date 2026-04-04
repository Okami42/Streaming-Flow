import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

// Fallback path pour le developpement local si la DB bogue
const PLANNING_FILE = path.join(process.cwd(), 'public', 'planning.json');

async function initDb() {
  if (process.env.POSTGRES_URL) {
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB
      )
    `;
  }
}

export async function GET() {
  try {
    if (process.env.POSTGRES_URL) {
      await initDb();
      const res = await sql`SELECT value FROM settings WHERE key = 'planning'`;
      if (res.rows.length > 0) {
        return NextResponse.json({ exists: true, planning: res.rows[0].value });
      }
    }
    
    // Fallback local file system (Local dev only)
    if (fs.existsSync(PLANNING_FILE)) {
      const raw = fs.readFileSync(PLANNING_FILE, 'utf-8');
      const planning = JSON.parse(raw);
      return NextResponse.json({ exists: true, planning });
    }
    
    return NextResponse.json({ exists: false, planning: null });
  } catch (err) {
    return NextResponse.json({ error: 'Impossible de lire le planning' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planning } = body;
    if (!planning) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }
    
    if (process.env.POSTGRES_URL) {
      await initDb();
      await sql`
        INSERT INTO settings (key, value) 
        VALUES ('planning', ${JSON.stringify(planning)}::jsonb)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
    } else {
      // Fallback local file system (Local dev only)
      fs.writeFileSync(PLANNING_FILE, JSON.stringify(planning, null, 2), 'utf-8');
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Impossible de sauvegarder le planning' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (process.env.POSTGRES_URL) {
      await initDb();
      await sql`DELETE FROM settings WHERE key = 'planning'`;
    }
    
    // Fallback local file system (Local dev only)
    if (fs.existsSync(PLANNING_FILE)) {
      fs.unlinkSync(PLANNING_FILE);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Impossible de supprimer le planning' }, { status: 500 });
  }
}
