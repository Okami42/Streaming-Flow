"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Play, BookOpen, Tv2, Globe, ChevronRight } from 'lucide-react';
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const updateCurrentDate = () => setCurrentDate(new Date());
    updateCurrentDate();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      updateCurrentDate();
      const dailyInterval = setInterval(updateCurrentDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimer);
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

  const getLangFlagImg = (lang: string) => {
    if (lang === 'VO' || lang.startsWith('VO'))
      return <img src="https://flagcdn.com/16x12/jp.png" srcSet="https://flagcdn.com/32x24/jp.png 2x" width="16" height="12" alt="JP" className="rounded-[2px]" />;
    if (lang === 'VF' || lang.startsWith('VF'))
      return <img src="https://flagcdn.com/16x12/fr.png" srcSet="https://flagcdn.com/32x24/fr.png 2x" width="16" height="12" alt="FR" className="rounded-[2px]" />;
    return <img src="https://flagcdn.com/16x12/un.png" srcSet="https://flagcdn.com/32x24/un.png 2x" width="16" height="12" alt="WW" className="rounded-[2px]" />;
  };

  const getLangColor = (lang: string) => {
    if (lang === 'VO') return 'from-red-500/80 to-rose-600/80';
    if (lang === 'VF') return 'from-blue-500/80 to-indigo-600/80';
    return 'from-emerald-500/80 to-teal-600/80';
  };

  const AnimeCard = ({ episode, isToday, compact = false }: { episode: PlanningEpisode; isToday: boolean; compact?: boolean }) => (
    <Link
      href={`/catalogue/${episode.animeId}`}
      className="block group"
      onMouseEnter={() => setHoveredCard(episode.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1"
        style={{
          boxShadow: isToday
            ? hoveredCard === episode.id
              ? '0 0 0 2px rgba(129,140,248,1), 0 0 20px rgba(99,102,241,0.7), 0 8px 32px rgba(99,102,241,0.5)'
              : '0 0 0 2px rgba(99,102,241,0.8), 0 0 12px rgba(99,102,241,0.45), 0 2px 8px rgba(0,0,0,0.4)'
            : hoveredCard === episode.id
              ? '0 8px 24px rgba(0,0,0,0.5)'
              : '0 2px 8px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, rgba(15,20,40,0.95) 0%, rgba(10,13,28,0.98) 100%)',
        }}
      >
        {/* Poster image */}
        <div className="relative overflow-hidden aspect-[160/115]">
          <img
            src={episode.imageUrl}
            alt={episode.animeTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Type badge — top left */}
          <div className="absolute top-2 left-2 z-10">
            <span className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide
              backdrop-blur-md shadow-lg
              ${episode.type === 'Anime'
                ? 'bg-indigo-500/80 text-white'
                : 'bg-violet-600/80 text-white'}
            `}>
              {episode.type === 'Anime' ? <Tv2 className="w-2.5 h-2.5" /> : <BookOpen className="w-2.5 h-2.5" />}
              {episode.type}
            </span>
          </div>

          {/* Language badge — top right */}
          <div className="absolute top-2 right-2 z-10">
            <span className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md shadow-lg bg-gradient-to-br ${getLangColor(episode.language)}
            `}>
              {getLangFlagImg(episode.language)}
              <span className="text-white font-bold">{episode.language.split(' ')[0]}</span>
            </span>
          </div>

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-full p-3 scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>

          {/* Bottom info strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-2.5 pb-3">
            {/* Time pill */}
            <div className="flex items-center justify-center mb-1.5">
              <span className={`
                inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold
                backdrop-blur-md shadow-md
                ${isToday ? 'bg-indigo-500/80 text-white' : 'bg-black/50 text-slate-200'}
              `}>
                <Clock className="w-3 h-3" />
                {episode.releaseTime.slice(0, 5).replace(':', 'h')}
              </span>
            </div>

            {/* Title */}
            <h4 className={`
              text-white font-bold text-center leading-tight
              ${compact ? 'text-[10px] line-clamp-1' : 'text-xs line-clamp-2'}
            `}
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
            >
              {episode.animeTitle}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );

  const FilterPill = ({
    active,
    onClick,
    children,
    activeColor = 'from-indigo-600 to-blue-600',
    activeShadow = 'shadow-indigo-500/30',
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    activeColor?: string;
    activeShadow?: string;
  }) => (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
        flex items-center gap-1.5 whitespace-nowrap
        ${active
          ? `bg-gradient-to-r ${activeColor} text-white shadow-lg ${activeShadow} scale-105`
          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 flex-wrap px-5 py-4 rounded-2xl border border-white/8"
        style={{
          background: 'linear-gradient(135deg, rgba(15,20,40,0.7) 0%, rgba(8,12,25,0.85) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Type filters */}
        <div className="flex items-center gap-2">
          <FilterPill active={filterType === 'all'} onClick={() => setFilterType('all')}>
            <Globe className="w-3.5 h-3.5" /> Tous
          </FilterPill>
          <FilterPill
            active={filterType === 'Anime'}
            onClick={() => setFilterType('Anime')}
            activeColor="from-indigo-600 to-blue-700"
            activeShadow="shadow-indigo-500/40"
          >
            <Tv2 className="w-3.5 h-3.5" /> Animes
          </FilterPill>
          <FilterPill
            active={filterType === 'Scans'}
            onClick={() => setFilterType('Scans')}
            activeColor="from-violet-600 to-purple-700"
            activeShadow="shadow-violet-500/40"
          >
            <BookOpen className="w-3.5 h-3.5" /> Scans
          </FilterPill>
        </div>

        {/* Divider */}
        <div className="w-px h-7 bg-white/10 hidden sm:block" />

        {/* Language filters */}
        <div className="flex items-center gap-2">
          <FilterPill
            active={filterLanguage === 'VO'}
            onClick={() => setFilterLanguage(filterLanguage === 'VO' ? 'all' : 'VO')}
            activeColor="from-rose-600 to-red-700"
            activeShadow="shadow-rose-500/40"
          >
            <img src="https://flagcdn.com/16x12/jp.png" srcSet="https://flagcdn.com/32x24/jp.png 2x" width="16" height="12" alt="JP" className="rounded-[2px]" /> VO
          </FilterPill>
          <FilterPill
            active={filterLanguage === 'VF'}
            onClick={() => setFilterLanguage(filterLanguage === 'VF' ? 'all' : 'VF')}
            activeColor="from-blue-600 to-sky-700"
            activeShadow="shadow-blue-500/40"
          >
            <img src="https://flagcdn.com/16x12/fr.png" srcSet="https://flagcdn.com/32x24/fr.png 2x" width="16" height="12" alt="FR" className="rounded-[2px]" /> VF
          </FilterPill>
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-[280px] ml-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un anime…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10
                       text-white placeholder-slate-500 text-sm
                       focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
                       transition-all duration-300"
          />
        </div>
      </div>

      {/* ── Desktop 7-column grid ───────────────────────────────── */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-3">
        {updatedDays.map((day: PlanningDay) => {
          const filteredEpisodes = filterEpisodes(day.episodes);

          return (
            <div key={day.date} className="flex flex-col gap-3">
              {/* Day header */}
              <div
                className={`
                  relative text-center py-3 px-2 rounded-2xl overflow-hidden transition-all duration-300
                  ${day.isToday
                    ? 'shadow-lg shadow-indigo-500/30'
                    : 'hover:border-white/15'}
                `}
                style={day.isToday ? {
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(79,70,229,0.95) 100%)',
                  border: '1px solid rgba(165,180,252,0.35)',
                } : {
                  background: 'linear-gradient(135deg, rgba(20,27,50,0.8) 0%, rgba(12,16,32,0.9) 100%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {day.isToday && (
                  <>
                    {/* Glowing orb */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-indigo-400/20 blur-xl pointer-events-none" />
                    {/* Today pulse dot */}
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-200" />
                    </span>
                  </>
                )}

                <div className={`font-bold text-sm uppercase tracking-widest ${day.isToday ? 'text-white' : 'text-slate-300'}`}>
                  {day.dayName}
                </div>
                <div className={`text-xs mt-0.5 font-medium ${day.isToday ? 'text-indigo-200' : 'text-slate-600'}`}>
                  {formatDateShort(day.date)}
                </div>

                {filteredEpisodes.length > 0 && (
                  <div className={`
                    inline-flex items-center justify-center mt-1.5 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold
                    ${day.isToday ? 'bg-white/25 text-white' : 'bg-white/8 text-slate-400'}
                  `}>
                    {filteredEpisodes.length}
                  </div>
                )}
              </div>

              {/* Episodes */}
              <div className="flex flex-col gap-2.5">
                {filteredEpisodes.map((episode) => (
                  <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} />
                ))}

                {filteredEpisodes.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center py-10 rounded-2xl text-slate-700 border border-dashed border-white/6"
                    style={{ background: 'rgba(10,13,28,0.4)' }}
                  >
                    <span className="text-2xl mb-2 opacity-40">—</span>
                    <p className="text-[11px] font-medium text-slate-600">Aucune sortie</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile horizontal scroll ────────────────────────────── */}
      <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {updatedDays.map((day: PlanningDay) => {
            const filteredEpisodes = filterEpisodes(day.episodes);

            return (
              <div key={day.date} className="flex flex-col w-40 gap-2.5">
                {/* Day header */}
                <div
                  className={`
                    relative text-center py-3 px-2 rounded-xl overflow-hidden transition-all duration-300
                    ${day.isToday ? 'shadow-lg shadow-indigo-500/30' : ''}
                  `}
                  style={day.isToday ? {
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(79,70,229,0.95) 100%)',
                    border: '1px solid rgba(165,180,252,0.3)',
                  } : {
                    background: 'linear-gradient(135deg, rgba(20,27,50,0.8) 0%, rgba(12,16,32,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {day.isToday && (
                    <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-200" />
                    </span>
                  )}

                  <div className={`font-bold text-xs uppercase tracking-wider ${day.isToday ? 'text-white' : 'text-slate-300'}`}>
                    {day.dayName}
                  </div>
                  <div className={`text-[10px] mt-0.5 font-medium ${day.isToday ? 'text-indigo-200' : 'text-slate-600'}`}>
                    {formatDateShort(day.date)}
                  </div>
                </div>

                {/* Episodes */}
                <div className="flex flex-col gap-2">
                  {filteredEpisodes.map((episode) => (
                    <AnimeCard key={episode.id} episode={episode} isToday={day.isToday} compact={true} />
                  ))}

                  {filteredEpisodes.length === 0 && (
                    <div
                      className="flex flex-col items-center justify-center py-8 rounded-xl text-slate-700 border border-dashed border-white/6"
                      style={{ background: 'rgba(10,13,28,0.4)' }}
                    >
                      <span className="text-xl mb-1 opacity-30">—</span>
                      <p className="text-[10px] font-medium text-slate-600">Rien</p>
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
