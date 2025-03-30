"use client";

import React, { useState } from "react";
import VideoPlayer from "@/components/ui/video-player";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TestPlayerPage() {
  const [currentPlayer, setCurrentPlayer] = useState<"sibnet" | "vidmoly">("vidmoly");
  
  // ID Vidmoly de test - c'est juste un exemple, vous pouvez le remplacer par un ID réel
  const vidmolyId = "i835rhqdf94g"; // L'ID de "Kuroko's Basket Last Game" de votre catalogue
  
  // ID Sibnet de test - vous pouvez le remplacer par un ID réel
  const sibnetId = "4738145"; // Un épisode de Kuroko's Basket de votre catalogue
  
  return (
    <div className="min-h-screen bg-[#080D1A] text-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Test du Nouveau Lecteur Vidéo</h1>
        
        <div className="flex justify-center mb-6 space-x-4">
          <button 
            onClick={() => setCurrentPlayer("vidmoly")}
            className={`px-6 py-3 rounded-md ${
              currentPlayer === "vidmoly" 
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white" 
                : "bg-[#151A29] hover:bg-[#1E263F] text-white/80"
            }`}
          >
            Lecteur Avancé (Vidmoly)
          </button>
          
          <button 
            onClick={() => setCurrentPlayer("sibnet")}
            className={`px-6 py-3 rounded-md ${
              currentPlayer === "sibnet" 
                ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white" 
                : "bg-[#151A29] hover:bg-[#1E263F] text-white/80"
            }`}
          >
            Lecteur Original (Sibnet)
          </button>
        </div>
        
        <div className="w-full aspect-video max-w-5xl mx-auto bg-black rounded-lg overflow-hidden shadow-xl border border-[#1A1F35]">
          <VideoPlayer 
            vidmolyId={currentPlayer === "vidmoly" ? vidmolyId : undefined}
            sibnetId={currentPlayer === "sibnet" ? sibnetId : undefined}
            className="w-full h-full"
          />
        </div>
        
        <div className="mt-8 p-6 bg-[#151A29] rounded-lg border border-[#1A1F35] max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-pink-500">Instructions :</h2>
          
          <ul className="space-y-2 list-disc pl-5">
            <li>Basculez entre les deux lecteurs en utilisant les boutons ci-dessus</li>
            <li>Le <span className="text-pink-500 font-medium">Lecteur Avancé</span> utilise notre nouveau composant avec Plyr.js</li>
            <li>Le <span className="text-blue-500 font-medium">Lecteur Original</span> utilise l'iframe Sibnet standard</li>
            <li>Testez les contrôles de son, la barre de progression et les autres fonctionnalités</li>
          </ul>
          
          <div className="mt-6 p-4 bg-[#0D121E] rounded-md border border-pink-500/20">
            <p className="text-sm text-white/70">
              <span className="text-pink-500 font-bold">Note :</span> Pour utiliser ce lecteur dans votre application, il suffit d'utiliser le composant <code className="bg-[#1A1F35] px-1 rounded">VideoPlayer</code> comme d'habitude. Le changement est transparent pour les utilisateurs et les développeurs.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
