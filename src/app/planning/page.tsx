"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanningWeekView from "@/components/PlanningWeekView";
import { usePlanningUpdater } from "@/hooks/usePlanningUpdater";
import { usePlanningUpdaterDev } from "@/hooks/usePlanningUpdater.dev";
import { CalendarDays } from "lucide-react";

export default function PlanningPage() {
  // Utiliser la version dev si en développement
  const isDev = process.env.NODE_ENV === 'development';
  const { weekPlanning, lastUpdate, refreshPlanning, isLoading } = isDev 
    ? usePlanningUpdaterDev() 
    : usePlanningUpdater();

  // Si le planning n'est pas encore chargé
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#030711] via-[#0c1222] to-[#030711]">
        <Header />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <div className="text-white text-xl">Chargement du planning...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#030711] via-[#0c1222] to-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-2 space-y-3">
          {/* Header avec titre et description */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CalendarDays className="h-8 w-8 text-blue-400" />
              <h1 className="text-4xl font-bold text-white">
                Planning des Sorties
              </h1>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Découvrez toutes les nouvelles sorties d'animes, et scans de la semaine. 
              Ne manquez plus jamais vos épisodes préférés !
            </p>
          </div>

          {/* Planning hebdomadaire */}
          <PlanningWeekView weekPlanning={weekPlanning!} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
