"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HLSPlayer from '@/components/ui/hls-player';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TestHLSPlayer() {
  const [m3u8Url, setM3u8Url] = useState<string>('');
  const [currentStream, setCurrentStream] = useState<string | null>(null);
  
  // Exemples de flux M3U8 ouverts (streams publics pour démonstration)
  const sampleStreams = [
    {
      name: "Big Buck Bunny (Test)",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
    },
    {
      name: "Sintel (Test)",
      url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
    }
  ];
  
  const loadStream = (url: string) => {
    setCurrentStream(url);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Lecteur 3 (Teste de qualité)</h1>
        
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Entrez l'URL du flux M3U8</h2>
          <div className="flex gap-4 mb-4">
            <Input 
              type="text" 
              value={m3u8Url}
              onChange={(e) => setM3u8Url(e.target.value)}
              placeholder="https://example.com/stream.m3u8"
              className="flex-1 bg-[#151a2a] border-white/10"
            />
            <Button 
              onClick={() => loadStream(m3u8Url)}
              disabled={!m3u8Url.includes('.m3u8')}
            >
              Charger
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {sampleStreams.map((stream) => (
              <Button
                key={stream.url}
                variant="outline"
                className="border-white/10 text-left justify-start"
                onClick={() => {
                  setM3u8Url(stream.url);
                  loadStream(stream.url);
                }}
              >
                {stream.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl text-white mb-4">Lecteur</h2>
          
          {currentStream ? (
            <div className="aspect-video bg-black rounded-md overflow-hidden">
              <HLSPlayer src={currentStream} />
            </div>
          ) : (
            <div className="aspect-video bg-[#151a2a] rounded-md flex items-center justify-center text-white/70">
              Entrez une URL de flux et cliquez sur Charger pour commencer la lecture
            </div>
          )}
          
          {currentStream && (
            <p className="mt-2 text-sm text-gray-400 break-all">
              Source actuelle: {currentStream}
            </p>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 