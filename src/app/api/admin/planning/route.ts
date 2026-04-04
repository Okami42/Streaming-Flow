import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PLANNING_FILE = path.join(process.cwd(), 'public', 'planning.json');

export async function GET() {
  try {
    if (!fs.existsSync(PLANNING_FILE)) {
      return NextResponse.json({ exists: false, planning: null });
    }
    const raw = fs.readFileSync(PLANNING_FILE, 'utf-8');
    const planning = JSON.parse(raw);
    return NextResponse.json({ exists: true, planning });
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
    fs.writeFileSync(PLANNING_FILE, JSON.stringify(planning, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Impossible de sauvegarder le planning' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(PLANNING_FILE)) {
      fs.unlinkSync(PLANNING_FILE);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Impossible de supprimer le planning' }, { status: 500 });
  }
}
