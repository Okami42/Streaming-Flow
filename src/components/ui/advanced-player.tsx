"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Loader2 } from "lucide-react";

interface AdvancedPlayerProps {
  videoId: string;
  type: "vidmoly" | "sibnet";
  poster?: string;
  className?: string;
}

export default function AdvancedPlayer({
  videoId,
  type,
  poster,
  className = "",
}: AdvancedPlayerProps) {
  // États pour l'UI
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false); // Nouvel état
  
  // Références
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // URL du lecteur vidéo
  const getVideoUrl = () => {
    if (type === "vidmoly") {
      return `https://vidmoly.net/embed-${videoId}.html`;
    }
    return "";
  };

  // Gestion de l'affichage/masquage des contrôles
  const hideControlsWithDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isBuffering) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Initialisation - Plus de timer pour le buffering
  useEffect(() => {
    // Simuler la durée (peut-être à supprimer si Vidmoly fournit la durée)
    setDuration(5400); 
  }, []);

  // Gestion de l'affichage des contrôles au survol
  useEffect(() => {
    const container = containerRef.current;
    
    const handleMouseMove = () => {
      hideControlsWithDelay();
    };
    
    const handleMouseLeave = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(false);
    };
    
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isBuffering]);

  // Mise à jour simulée du temps
  useEffect(() => {
    if (isPlaying && !isBuffering) {
      timeUpdateIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          return newTime < duration ? newTime : prev;
        });
      }, 1000);
    }
    
    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [isPlaying, isBuffering, duration]);

  // Mise à jour du statut plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Actions utilisateur
  const handlePlayPause = () => {
    if (!hasInteracted) {
      // Premier clic : démarrer la vidéo et masquer le spinner
      setIsBuffering(false);
      setIsPlaying(true);
      setHasInteracted(true);
      if (iframeRef.current && iframeRef.current.contentWindow && type === "vidmoly") {
        iframeRef.current.contentWindow.postMessage("playVideo", "https://vidmoly.to");
      }
    } else {
      // Clics suivants : basculer lecture/pause
      const newState = !isPlaying;
      setIsPlaying(newState);
      if (iframeRef.current && iframeRef.current.contentWindow && type === "vidmoly") {
        const message = newState ? "playVideo" : "pauseVideo";
        iframeRef.current.contentWindow.postMessage(message, "https://vidmoly.to");
      }
    }
    hideControlsWithDelay();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    hideControlsWithDelay();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    hideControlsWithDelay();
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Erreur lors du passage en plein écran: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    hideControlsWithDelay();
  };

  // Formatage du temps
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full bg-black ${className}`}
      onMouseMove={hideControlsWithDelay}
    >
      {/* Lecteur vidéo (iframe) - Toujours rendu, masqué par le spinner si buffering */}
      <iframe
        ref={iframeRef}
        src={getVideoUrl()} // Charger l'URL directement
        allowFullScreen
        allow="autoplay; encrypted-media"
        className={`absolute inset-0 w-full h-full border-0 ${isBuffering ? 'opacity-0' : 'opacity-100'}`}
        sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-popups"
        onLoad={() => {
          // Optionnel: On pourrait arrêter le buffering ici si Vidmoly ne le fait pas automatiquement
          // setIsBuffering(false); // Attention: peut causer des boucles si l'iframe se recharge
        }}
      />
      
      {/* Indicateur de chargement */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20"> {/* z-index plus élevé */}
          <Loader2 className="w-10 h-10 animate-spin text-white" />
        </div>
      )}
      
      {/* Overlay transparent pour contrôler les clics */}
      <div 
        className="absolute inset-0 z-10"
        onClick={(e) => {
          e.stopPropagation(); 
          handlePlayPause();
        }}
        // L'overlay est cliquable même pendant le buffering initial
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      />
      
      {/* Interface de contrôle personnalisée */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ height: '100px', pointerEvents: showControls ? 'auto' : 'none' }}
      >
        {/* Barre de progression */}
        <div 
          className="relative w-full h-1 bg-gray-600 cursor-pointer mb-4 group"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const newTime = percent * duration;
            setCurrentTime(newTime);
            e.stopPropagation();
          }}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-red-600" 
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          ></div>
          <div 
            className="absolute top-0 left-0 w-3 h-3 bg-red-600 rounded-full transform -translate-y-1 opacity-0 group-hover:opacity-100"
            style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
          ></div>
        </div>
        
        {/* Contrôles principaux */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Bouton lecture/pause */}
            <button 
              onClick={e => {
                handlePlayPause();
                e.stopPropagation();
              }}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label={isPlaying ? "Pause" : "Lecture"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            {/* Contrôle du volume */}
            <div className="flex items-center space-x-2" onClick={e => e.stopPropagation()}>
              <button 
                onClick={e => {
                  handleMuteToggle();
                  e.stopPropagation();
                }}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                onClick={e => e.stopPropagation()}
              />
            </div>
            
            {/* Affichage du temps */}
            <div className="text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Bouton plein écran */}
            <button 
              onClick={e => {
                handleFullscreenToggle();
                e.stopPropagation();
              }}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Gros bouton de lecture central */}
      {!isPlaying && showControls && !isBuffering && (
        <div
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-600/80 flex items-center justify-center z-10 cursor-pointer"
          aria-label="Lecture"
        >
          <Play size={40} className="text-white" />
        </div>
      )}
    </div>
  );
}
