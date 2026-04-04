"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScrollText, Globe, Timer, Layers, Zap } from 'lucide-react';
import { WeeklyPlanning, PlanningDay, PlanningEpisode } from '@/lib/planning-data';

interface PlanningWeekViewProps {
  weekPlanning: WeeklyPlanning;
  className?: string;
}

type FilterType = 'all' | 'Anime' | 'Scans';
type FilterLanguage = 'all' | 'VO' | 'VF';

export default function PlanningWeekView({ weekPlanning, className = "" }: PlanningWeekViewProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterLanguage, setFilterLanguage] = useState<FilterLanguage>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updatedDays = weekPlanning.days.map(day => ({
    ...day,
    isToday: day.date === currentDate.toISOString().split('T')[0]
  }));

  const filterEpisodes = (episodes: PlanningEpisode[]): PlanningEpisode[] => {
    return episodes.filter(episode => {
      const typeMatch = filterType === 'all' || episode.type === filterType;
      const langMatch = filterLanguage === 'all' || episode.language === filterLanguage ||
        (filterLanguage === 'VF' && episode.language === 'VF & VO');
      const searchMatch = searchQuery === '' ||
        episode.animeTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && langMatch && searchMatch;
    });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const formatClock = (date: Date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  const getLangFlag = (lang: string) => {
    if (lang === 'VO' || lang.startsWith('VO'))
      return <img src="https://flagcdn.com/16x12/jp.png" srcSet="https://flagcdn.com/32x24/jp.png 2x" width="16" height="12" alt="JP" className="rounded-[2px] inline" />;
    if (lang === 'VF' || lang.startsWith('VF'))
      return <img src="https://flagcdn.com/16x12/fr.png" srcSet="https://flagcdn.com/32x24/fr.png 2x" width="16" height="12" alt="FR" className="rounded-[2px] inline" />;
    return null;
  };

  const getSeasonLabel = (episode: PlanningEpisode) => {
    if (episode.type === 'Scans') return 'Scan';
    const s = episode.seasonNumber || 1;
    return `Saison ${s}`;
  };

  // ─── Anime Card (style anime-sama) ──────────────────────────────────────
  const AnimeCard = ({ episode, isToday }: { episode: PlanningEpisode; isToday: boolean }) => (
    <Link href={`/catalogue/${episode.animeId}`} className="block group">
      <div
        className="rounded-md overflow-hidden transition-all duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        style={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* ── Image 160×115 ── */}
        <div className="relative overflow-hidden" style={{ width: '100%', aspectRatio: '16/10' }}>
          <img
            src={episode.imageUrl}
            alt={episode.animeTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ display: 'block' }}
          />

          {/* Type badge — top left */}
          <div className="absolute top-1.5 left-1.5 z-10">
            <span
              className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(14,30,70,0.85)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.3)' }}
            >
              {episode.type === 'Anime'
                ? <Zap className="w-2.5 h-2.5 inline mr-0.5" />
                : <ScrollText className="w-2.5 h-2.5 inline mr-0.5" />
              }
              {episode.type}
            </span>
          </div>

          {/* Language badge — top right */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold"
              style={
                episode.language === 'VO' || episode.language.startsWith('VO')
                  ? { background: 'rgba(185,28,28,0.85)', color: '#fff', border: '1px solid rgba(239,68,68,0.5)' }
                  : { background: 'rgba(29,78,216,0.85)', color: '#fff', border: '1px solid rgba(96,165,250,0.5)' }
              }
            >
              {getLangFlag(episode.language)}
              {episode.language.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* ── Info below image ── */}
        <div className="px-2 pt-2 pb-2.5">
          {/* Title */}
          <p
            className="text-white font-bold uppercase text-center leading-tight mb-2 line-clamp-2"
            style={{ fontSize: '14px', letterSpacing: '0.04em' }}
          >
            {episode.animeTitle}
          </p>

          {/* Time + Season boxes — empilés verticalement */}
          <div className="flex flex-col gap-1">
            {/* Time */}
            <div
              className="flex items-center gap-1.5 justify-center py-1.5 rounded"
              style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Timer className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span
                className="font-semibold text-slate-300"
                style={{ fontSize: '13px' }}
              >
                {episode.releaseTime === '?' ? '?' : episode.releaseTime.slice(0, 5).replace(':', 'h')}
              </span>
            </div>

            {/* Season */}
            <div
              className="flex items-center gap-1.5 justify-center py-1.5 rounded"
              style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Layers className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span
                className="font-semibold text-slate-300 truncate"
                style={{ fontSize: '13px' }}
              >
                {getSeasonLabel(episode)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // ─── Filter button ──────────────────────────────────────────────────────
  const FilterBtn = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all duration-200"
      style={
        active
          ? { background: '#1d4ed8', color: '#fff', border: '1px solid #3b82f6' }
          : { background: '#0d1424', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }
      }
    >
      {children}
    </button>
  );

  return (
    <div className={`${className}`}>

      {/* ── Digital clock ────────────────────────────────────────────────── */}
      <div className="flex justify-center mb-4">
        <div
          className="text-2xl font-mono font-bold tracking-widest"
          style={{ color: '#60a5fa', textShadow: '0 0 20px rgba(96,165,250,0.4)' }}
        >
          🕐 {formatClock(currentTime)}
        </div>
      </div>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 flex-wrap px-4 py-3 rounded-lg mb-4"
        style={{ background: '#080f1f', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mr-1">Filtrer :</span>

        <FilterBtn active={filterType === 'all'} onClick={() => setFilterType('all')}>
          <Globe className="w-3 h-3" /> Tous
        </FilterBtn>
        <FilterBtn active={filterType === 'Anime'} onClick={() => setFilterType('Anime')}>
          <Zap className="w-3 h-3" /> Animes
        </FilterBtn>
        <FilterBtn active={filterType === 'Scans'} onClick={() => setFilterType('Scans')}>
          <ScrollText className="w-3 h-3" /> Scans
        </FilterBtn>

        <FilterBtn
          active={filterLanguage === 'VO'}
          onClick={() => setFilterLanguage(filterLanguage === 'VO' ? 'all' : 'VO')}
        >
          <img src="https://flagcdn.com/16x12/jp.png" width="16" height="12" alt="JP" className="rounded-[2px]" /> VO
        </FilterBtn>
        <FilterBtn
          active={filterLanguage === 'VF'}
          onClick={() => setFilterLanguage(filterLanguage === 'VF' ? 'all' : 'VF')}
        >
          <img src="https://flagcdn.com/16x12/fr.png" width="16" height="12" alt="FR" className="rounded-[2px]" /> VF
        </FilterBtn>

        {/* Search */}
        <div className="relative ml-auto">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 rounded text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
            style={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', width: '180px' }}
          />
        </div>
      </div>

      {/* ── 7-column grid (Desktop) ───────────────────────────────────────── */}
      <div className="hidden lg:block">
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(7, 1fr)',
            borderLeft: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {updatedDays.map((day: PlanningDay) => {
            const filteredEpisodes = filterEpisodes(day.episodes);

            return (
              <div
                key={day.date}
                className="flex flex-col"
                style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Day header */}
                <div
                  className="text-center py-2.5 px-1 sticky top-0 z-20"
                  style={
                    day.isToday
                      ? { background: '#1a3a8f', borderBottom: '2px solid #3b82f6' }
                      : { background: '#06091a', borderBottom: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  <div
                    className={`font-bold text-sm uppercase tracking-widest ${day.isToday ? 'text-white' : 'text-slate-300'}`}
                  >
                    {day.dayName}
                  </div>
                  <div
                    className={`text-xs font-medium mt-0.5 ${day.isToday ? 'text-blue-200' : 'text-slate-600'}`}
                  >
                    {formatDateShort(day.date)}
                  </div>
                </div>

                {/* Episodes */}
                <div
                  className="flex flex-col gap-2 px-1.5 pt-2 pb-4"
                  style={day.isToday ? { background: 'rgba(30,58,138,0.07)' } : {}}
                >
                  {filteredEpisodes.map((episode) => (
                    <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} />
                  ))}

                  {filteredEpisodes.length === 0 && (
                    <div className="text-center py-8">
                      <span className="text-slate-700 text-xs">—</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: horizontal scroll ────────────────────────────────────── */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-0" style={{ width: 'max-content', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {updatedDays.map((day: PlanningDay) => {
            const filteredEpisodes = filterEpisodes(day.episodes);
            return (
              <div
                key={day.date}
                className="flex flex-col"
                style={{ width: '160px', borderRight: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Day header */}
                <div
                  className="text-center py-2 px-1"
                  style={
                    day.isToday
                      ? { background: '#1a3a8f', borderBottom: '2px solid #3b82f6' }
                      : { background: '#06091a', borderBottom: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  <div className={`font-bold text-xs uppercase tracking-wider ${day.isToday ? 'text-white' : 'text-slate-300'}`}>
                    {day.dayName}
                  </div>
                  <div className={`text-[10px] font-medium mt-0.5 ${day.isToday ? 'text-blue-200' : 'text-slate-600'}`}>
                    {formatDateShort(day.date)}
                  </div>
                </div>

                {/* Episodes */}
                <div
                  className="flex flex-col gap-2 px-1.5 pt-2 pb-4"
                  style={day.isToday ? { background: 'rgba(30,58,138,0.07)' } : {}}
                >
                  {filteredEpisodes.map((episode) => (
                    <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} />
                  ))}
                  {filteredEpisodes.length === 0 && (
                    <div className="text-center py-6">
                      <span className="text-slate-700 text-[10px]">—</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
