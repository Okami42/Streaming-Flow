"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Download, Save, Trash2, Plus, RefreshCw,
  CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp,
  Edit3, X, Clock, Globe, Tv2, BookOpen, ExternalLink, Code2,
  Zap
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface PlanningEpisode {
  id: string;
  animeId: string;
  animeTitle: string;
  title: string;
  imageUrl: string;
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: string;
  releaseTime: string;
  type: 'Anime' | 'Scans' | 'Film';
  language: 'VO' | 'VF' | 'VF & VO';
  status: 'upcoming' | 'released' | 'delayed';
  genres: string[];
}

interface PlanningDay {
  date: string;
  dayName: string;
  isToday: boolean;
  episodes: PlanningEpisode[];
}

interface WeeklyPlanning {
  weekStartDate: string;
  weekEndDate: string;
  days: PlanningDay[];
  _importedAt?: string;
  _source?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function slugify(str: string): string {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '').trim()
    .replace(/\s+/g, '-');
}

function getWeekDates(): Record<string, string> {
  const today = new Date();
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const dates: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates[DAY_NAMES[i]] = d.toISOString().split('T')[0];
  }
  return dates;
}

function buildEmptyWeekPlanning(): WeeklyPlanning {
  const weekDates = getWeekDates();
  const today = new Date().toISOString().split('T')[0];
  const days: PlanningDay[] = DAY_NAMES.map(name => ({
    date: weekDates[name],
    dayName: name,
    isToday: weekDates[name] === today,
    episodes: [],
  }));
  const dates = Object.values(weekDates).sort();
  return { weekStartDate: dates[0], weekEndDate: dates[6], days };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// ── Empty episode template ───────────────────────────────────────────────────

function newEpisode(date: string, dayIdx: number): PlanningEpisode {
  const id = `new-${Date.now()}-${dayIdx}`;
  return {
    id,
    animeId: '',
    animeTitle: '',
    title: 'Épisode',
    imageUrl: '',
    episodeNumber: 1,
    seasonNumber: 1,
    releaseDate: date,
    releaseTime: '18:00',
    type: 'Anime',
    language: 'VO',
    status: 'upcoming',
    genres: [],
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: 'from-emerald-600/90 to-emerald-700/90 border-emerald-500/40',
    error: 'from-rose-600/90 to-rose-700/90 border-rose-500/40',
    info: 'from-indigo-600/90 to-indigo-700/90 border-indigo-500/40',
  };
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : Loader2;

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border bg-gradient-to-r ${colors[type]} backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-4 duration-300`}>
      <Icon className="w-5 h-5 text-white flex-shrink-0" />
      <p className="text-sm text-white font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
    </div>
  );
}

function EpisodeRow({
  episode,
  onUpdate,
  onDelete,
}: {
  episode: PlanningEpisode;
  onUpdate: (ep: PlanningEpisode) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const field = (key: keyof PlanningEpisode, value: string) =>
    onUpdate({ ...episode, [key]: value });

  const inputCls = "bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/60 transition-colors w-full";

  return (
    <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: 'rgba(15,20,40,0.7)' }}>
      {/* Row header */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        {/* Time */}
        <input
          type="time"
          value={episode.releaseTime.slice(0, 5)}
          onChange={e => field('releaseTime', e.target.value)}
          className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-indigo-300 font-mono focus:outline-none focus:border-indigo-500 w-20"
        />

        {/* Title */}
        <input
          type="text"
          placeholder="Titre de l'anime…"
          value={episode.animeTitle}
          onChange={e => {
            const title = e.target.value;
            onUpdate({ ...episode, animeTitle: title, animeId: slugify(title) });
          }}
          className="flex-1 bg-transparent border-b border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 pb-0.5 transition-colors"
        />

        {/* Language badge */}
        <select
          value={episode.language}
          onChange={e => field('language', e.target.value)}
          className="bg-transparent text-xs font-bold border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-indigo-500 text-slate-300"
        >
          <option value="VO">VO</option>
          <option value="VF">VF</option>
          <option value="VF & VO">VO+VF</option>
        </select>

        {/* Type */}
        <select
          value={episode.type}
          onChange={e => field('type', e.target.value)}
          className="bg-transparent text-xs border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-indigo-500 text-slate-400"
        >
          <option value="Anime">Anime</option>
          <option value="Scans">Scan</option>
        </select>

        {/* Status */}
        <select
          value={episode.status}
          onChange={e => field('status', e.target.value)}
          className={`bg-transparent text-xs border rounded px-2 py-1 focus:outline-none ${
            episode.status === 'delayed'
              ? 'border-amber-500/50 text-amber-400'
              : 'border-white/10 text-slate-400'
          }`}
        >
          <option value="upcoming">↑ À venir</option>
          <option value="released">✓ Sorti</option>
          <option value="delayed">⚠ Reporté</option>
        </select>

        <button
          onClick={() => setExpanded(v => !v)}
          className="text-slate-500 hover:text-white transition-colors p-1"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <button
          onClick={onDelete}
          className="text-slate-600 hover:text-rose-400 transition-colors p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3 grid grid-cols-2 gap-2 border-t border-white/6 pt-3">
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">URL Image</label>
            <input
              type="text"
              placeholder="https://cdn.../image.jpg"
              value={episode.imageUrl}
              onChange={e => field('imageUrl', e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">Anime ID (slug)</label>
            <input
              type="text"
              placeholder="one-piece"
              value={episode.animeId}
              onChange={e => field('animeId', e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">Épisode n°</label>
            <input
              type="number"
              value={episode.episodeNumber}
              onChange={e => onUpdate({ ...episode, episodeNumber: parseInt(e.target.value) || 1 })}
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 uppercase tracking-wide block mb-1">Saison n°</label>
            <input
              type="number"
              value={episode.seasonNumber}
              onChange={e => onUpdate({ ...episode, seasonNumber: parseInt(e.target.value) || 1 })}
              className={inputCls}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPlanningPage() {
  const [activeTab, setActiveTab] = useState<'import' | 'manual'>('import');
  const [planning, setPlanning] = useState<WeeklyPlanning | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Import tab state
  const [importUrl, setImportUrl] = useState('https://anime-sama.to/planning/');
  const [importHtml, setImportHtml] = useState('');
  const [showHtmlInput, setShowHtmlInput] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importPreview, setImportPreview] = useState<WeeklyPlanning | null>(null);
  const [importStats, setImportStats] = useState<any>(null);

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'info') => setToast({ msg, type });

  // Expanded days
  const [expandedDays, setExpandedDays] = useState<string[]>(DAY_NAMES);

  // Load current planning
  useEffect(() => {
    fetch('/api/admin/planning')
      .then(r => r.json())
      .then(data => {
        if (data.planning) setPlanning(data.planning);
        else setPlanning(buildEmptyWeekPlanning());
      })
      .catch(() => setPlanning(buildEmptyWeekPlanning()))
      .finally(() => setLoading(false));
  }, []);

  // ── Import ────────────────────────────────────────────────────────────────

  const handleImport = async () => {
    setImporting(true);
    setImportPreview(null);
    try {
      const body: any = {};
      if (showHtmlInput && importHtml.trim()) {
        body.html = importHtml;
      } else {
        body.url = importUrl;
      }

      const res = await fetch('/api/admin/import-planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        if (data.needsHtml) {
          setShowHtmlInput(true);
          showToast('Site bloqué. Colle le HTML de la page manuellement ci-dessous.', 'error');
        } else {
          showToast(data.error || 'Erreur import', 'error');
        }
        return;
      }

      setImportPreview(data.planning);
      setImportStats(data.stats);
      showToast(`${data.stats.totalEpisodes} épisodes importés — vérifie et applique`, 'success');
    } catch (err) {
      showToast('Erreur réseau lors de l\'import', 'error');
    } finally {
      setImporting(false);
    }
  };

  const handleApplyImport = async () => {
    if (!importPreview) return;
    setPlanning(importPreview);
    setImportPreview(null);
    setImportStats(null);
    await handleSave(importPreview);
    setActiveTab('manual');
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async (planningToSave?: WeeklyPlanning) => {
    setSaving(true);
    try {
      const data = planningToSave || planning;
      const res = await fetch('/api/admin/planning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planning: data }),
      });
      const json = await res.json();
      if (json.success) {
        showToast('Planning sauvegardé avec succès !', 'success');
      } else {
        showToast(json.error || 'Erreur sauvegarde', 'error');
      }
    } catch {
      showToast('Erreur réseau', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Supprimer le planning sauvegardé et revenir aux données statiques ?')) return;
    await fetch('/api/admin/planning', { method: 'DELETE' });
    setPlanning(buildEmptyWeekPlanning());
    showToast('Planning réinitialisé', 'info');
  };

  // ── Episode CRUD ──────────────────────────────────────────────────────────

  const updateEpisode = (dayIdx: number, epIdx: number, ep: PlanningEpisode) => {
    if (!planning) return;
    const newDays = planning.days.map((d, di) => {
      if (di !== dayIdx) return d;
      return { ...d, episodes: d.episodes.map((e, ei) => ei === epIdx ? ep : e) };
    });
    setPlanning({ ...planning, days: newDays });
  };

  const deleteEpisode = (dayIdx: number, epIdx: number) => {
    if (!planning) return;
    const newDays = planning.days.map((d, di) => {
      if (di !== dayIdx) return d;
      return { ...d, episodes: d.episodes.filter((_, ei) => ei !== epIdx) };
    });
    setPlanning({ ...planning, days: newDays });
  };

  const addEpisode = (dayIdx: number) => {
    if (!planning) return;
    const day = planning.days[dayIdx];
    const ep = newEpisode(day.date, dayIdx);
    const newDays = planning.days.map((d, di) => {
      if (di !== dayIdx) return d;
      return { ...d, episodes: [...d.episodes, ep] };
    });
    setPlanning({ ...planning, days: newDays });
  };

  const toggleDay = (dayName: string) => {
    setExpandedDays(prev =>
      prev.includes(dayName) ? prev.filter(d => d !== dayName) : [...prev, dayName]
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030711' }}>
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const totalEps = planning?.days.reduce((acc, d) => acc + d.episodes.length, 0) ?? 0;

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #05091a 0%, #030711 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-7">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/8">
          <div>
            <Link href="/admin/animes" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour admin
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Calendar className="text-indigo-400 w-8 h-8" />
              Gestion du Planning
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {totalEps} épisodes cette semaine
              {planning?._importedAt && (
                <span className="ml-2 text-slate-600">
                  · Importé le {new Date(planning._importedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all text-sm"
            >
              <Trash2 className="w-4 h-4" /> Réinitialiser
            </button>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Sauvegarder
            </button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 p-1 rounded-2xl w-fit" style={{ background: 'rgba(15,20,40,0.8)' }}>
          {[
            { id: 'import', label: 'Import auto', icon: <Zap className="w-4 h-4" /> },
            { id: 'manual', label: 'Édition manuelle', icon: <Edit3 className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* TAB : IMPORT AUTO                         */}
        {/* ══════════════════════════════════════════ */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            {/* Card import URL */}
            <div className="rounded-2xl border border-white/8 p-6 space-y-5" style={{ background: 'rgba(15,20,40,0.7)' }}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-white">Importer depuis anime-sama.to</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Le planning sera extrait automatiquement — heure, titre, langue, statut.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={importUrl}
                  onChange={e => setImportUrl(e.target.value)}
                  placeholder="https://anime-sama.to/planning/"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 transition-colors"
                />
                <button
                  onClick={handleImport}
                  disabled={importing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: importing ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
                >
                  {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {importing ? 'Import…' : 'Importer'}
                </button>
              </div>

              {/* Option collage manuel */}
              <div>
                <button
                  onClick={() => setShowHtmlInput(v => !v)}
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  {showHtmlInput ? 'Masquer le collage manuel' : '✎ Coller le contenu manuellement (si URL bloquée)'}
                </button>

                {showHtmlInput && (
                  <div className="mt-4 space-y-3 rounded-xl border border-amber-500/20 p-4" style={{ background: 'rgba(251,191,36,0.05)' }}>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Comment récupérer le contenu ? (2 méthodes)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg p-3 border border-white/8" style={{ background: 'rgba(15,20,40,0.8)' }}>
                          <p className="text-[11px] font-bold text-emerald-400 mb-1">✅ Méthode 1 (recommandée)</p>
                          <ol className="text-[11px] text-slate-400 space-y-0.5 list-decimal list-inside">
                            <li>Ouvre <a href="https://anime-sama.to/planning/" target="_blank" className="text-indigo-400 underline">anime-sama.to/planning/</a></li>
                            <li>Attends que la page charge entièrement</li>
                            <li>Fais <kbd className="bg-white/10 px-1 rounded text-white">Ctrl+A</kbd> puis <kbd className="bg-white/10 px-1 rounded text-white">Ctrl+C</kbd></li>
                            <li>Colle ici avec <kbd className="bg-white/10 px-1 rounded text-white">Ctrl+V</kbd></li>
                          </ol>
                        </div>
                        <div className="rounded-lg p-3 border border-white/8" style={{ background: 'rgba(15,20,40,0.8)' }}>
                          <p className="text-[11px] font-bold text-blue-400 mb-1">🔧 Méthode 2 (source HTML)</p>
                          <ol className="text-[11px] text-slate-400 space-y-0.5 list-decimal list-inside">
                            <li>Ouvre <a href="https://anime-sama.to/planning/" target="_blank" className="text-indigo-400 underline">anime-sama.to/planning/</a></li>
                            <li>Fais <kbd className="bg-white/10 px-1 rounded text-white">Ctrl+U</kbd> (source)</li>
                            <li>Sélectionne tout : <kbd className="bg-white/10 px-1 rounded text-white">Ctrl+A</kbd></li>
                            <li>Copie et colle ici</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                    <textarea
                      value={importHtml}
                      onChange={e => setImportHtml(e.target.value)}
                      placeholder="Colle ici le texte ou le code source HTML de la page planning…"
                      rows={10}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 transition-colors font-mono resize-y"
                    />
                    <button
                      onClick={handleImport}
                      disabled={importing || !importHtml.trim()}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
                    >
                      {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                      Analyser et importer
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Résultat d'import */}
            {importPreview && importStats && (
              <div className="rounded-2xl border border-emerald-500/30 overflow-hidden" style={{ background: 'rgba(10,20,15,0.7)' }}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white">{importStats.totalEpisodes} épisodes détectés</p>
                      <div className="flex gap-3 mt-1">
                        {importStats.days.map((d: any) => (
                          <span key={d.day} className="text-xs text-slate-400">
                            {d.day.slice(0, 3)} <span className="text-emerald-400 font-bold">{d.count}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setImportPreview(null); setImportStats(null); }}
                      className="px-4 py-2 rounded-xl text-sm text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleApplyImport}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm text-white"
                      style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Appliquer & Sauvegarder
                    </button>
                  </div>
                </div>

                {/* Preview par jour */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {importPreview.days.filter(d => d.episodes.length > 0).map(day => (
                    <div key={day.date} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">{day.dayName}</span>
                        <span className="text-[10px] text-slate-600">{day.episodes.length} eps</span>
                      </div>
                      {day.episodes.slice(0, 5).map(ep => (
                        <div key={ep.id} className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-mono w-10">{ep.releaseTime.slice(0, 5)}</span>
                          <span className="text-slate-300 truncate flex-1">{ep.animeTitle}</span>
                          <span className={`text-[9px] font-bold px-1 rounded ${ep.language === 'VF' ? 'text-blue-400' : 'text-rose-400'}`}>{ep.language}</span>
                        </div>
                      ))}
                      {day.episodes.length > 5 && (
                        <p className="text-[10px] text-slate-600">+{day.episodes.length - 5} de plus…</p>
                      )}
                    </div>
                  ))}
                  {importPreview.days.every(d => d.episodes.length === 0) && (
                    <div className="col-span-full text-center py-8 text-slate-500">
                      <AlertCircle className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                      <p className="font-medium text-amber-400">Aucun épisode extrait</p>
                      <p className="text-sm mt-1">Structure HTML non reconnue. Essaie de coller le HTML manuellement.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* TAB : ÉDITION MANUELLE                    */}
        {/* ══════════════════════════════════════════ */}
        {activeTab === 'manual' && planning && (
          <div className="space-y-4">
            {planning.days.map((day, dayIdx) => {
              const isExpanded = expandedDays.includes(day.dayName);
              return (
                <div
                  key={day.date}
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    border: day.isToday ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.06)',
                    background: day.isToday ? 'rgba(30,30,70,0.5)' : 'rgba(15,20,40,0.6)',
                  }}
                >
                  {/* Day header */}
                  <button
                    onClick={() => toggleDay(day.dayName)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {day.isToday && (
                        <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-300" />
                        </span>
                      )}
                      <span className={`font-bold text-base uppercase tracking-widest ${day.isToday ? 'text-indigo-300' : 'text-white'}`}>
                        {day.dayName}
                      </span>
                      <span className="text-slate-600 text-sm">{formatDate(day.date)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        day.episodes.length > 0
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-white/5 text-slate-600'
                      }`}>
                        {day.episodes.length} épisode{day.episodes.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </button>

                  {/* Episodes list */}
                  {isExpanded && (
                    <div className="px-5 pb-4 space-y-2 border-t border-white/5 pt-3">
                      {day.episodes.length === 0 && (
                        <p className="text-slate-600 text-sm py-3 text-center">Aucun épisode — clique + pour ajouter</p>
                      )}
                      {day.episodes.map((ep, epIdx) => (
                        <EpisodeRow
                          key={ep.id}
                          episode={ep}
                          onUpdate={ep => updateEpisode(dayIdx, epIdx, ep)}
                          onDelete={() => deleteEpisode(dayIdx, epIdx)}
                        />
                      ))}
                      <button
                        onClick={() => addEpisode(dayIdx)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/10 text-slate-500 hover:border-indigo-500/40 hover:text-indigo-400 transition-all text-sm mt-1"
                      >
                        <Plus className="w-4 h-4" /> Ajouter un épisode
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Sticky save bar */}
            <div className="sticky bottom-4 flex justify-end pt-2">
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-2xl shadow-indigo-500/30"
                style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Sauvegarder le planning
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
