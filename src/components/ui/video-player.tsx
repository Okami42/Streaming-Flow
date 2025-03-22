"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight } from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  sibnetId?: string;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  initialTime?: number;
  className?: string;
  onNextEpisode?: () => void;
  onPreviousEpisode?: () => void;
  hasNextEpisode?: boolean;
  hasPreviousEpisode?: boolean;
}

export default function VideoPlayer({
  src,
  poster,
  sibnetId,
  onTimeUpdate,
  onPlay,
  onPause,
  initialTime = 0,
  className = "",
  onNextEpisode,
  onPreviousEpisode,
  hasNextEpisode = false,
  hasPreviousEpisode = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(0);
  const [previewTime, setPreviewTime] = useState(0);
  const [hoverProgress, setHoverProgress] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Mise à jour du temps initial
  useEffect(() => {
    if (videoRef.current && initialTime > 0) {
      videoRef.current.currentTime = initialTime;
      setCurrentTime(initialTime);
    }
  }, [initialTime]);
  
  // Format du temps (00:00)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Gestion des événements vidéo
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const newTime = videoRef.current.currentTime;
      setCurrentTime(newTime);
      onTimeUpdate?.(newTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      const newTime = clickPosition * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && duration > 0) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const hoverPosition = (e.clientX - rect.left) / rect.width;
      const previewTimeValue = hoverPosition * duration;
      
      setPreviewPosition(e.clientX - rect.left);
      setPreviewTime(previewTimeValue);
      setShowPreview(true);
    }
  };
  
  const handleProgressLeave = () => {
    setShowPreview(false);
    setHoverProgress(false);
  };
  
  const fullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };
  
  // Déterminer la source à utiliser: vidéo MP4 ou iframe Sibnet
  const useIframe = !!sibnetId;
  
  return (
    <div 
      ref={playerRef}
      className={`relative overflow-hidden bg-black rounded-md ${className}`}
    >
      {useIframe ? (
        <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
          <iframe 
            src={`https://video.sibnet.ru/shell.php?videoid=${sibnetId}`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0" 
            scrolling="no" 
            allow="autoplay; fullscreen" 
            allowFullScreen
          />
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
          
          {/* Contrôles personnalisés */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300">
            {/* Barre de progression avec prévisualisation */}
            <div 
              ref={progressBarRef}
              className="relative h-2 mb-2 bg-gray-700 rounded cursor-pointer group"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseEnter={() => setHoverProgress(true)}
              onMouseLeave={handleProgressLeave}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-pink-600 rounded"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              
              {/* Point de progression */}
              <div 
                className={`absolute top-1/2 h-4 w-4 -mt-2 -ml-2 bg-white rounded-full shadow transform scale-0 group-hover:scale-100 transition-transform ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                style={{ left: `${(currentTime / duration) * 100}%` }}
              />
              
              {/* Prévisualisation au survol */}
              {showPreview && (
                <div 
                  className="absolute bottom-full mb-2 transform -translate-x-1/2 bg-black border border-gray-600 rounded shadow-lg p-1"
                  style={{ left: previewPosition }}
                >
                  {/* Miniature de prévisualisation (simulée) */}
                  <div className="w-32 h-20 bg-gray-800 flex items-center justify-center text-xs">
                    {formatTime(previewTime)}
                  </div>
                  {/* Flèche vers le bas */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-gray-600"></div>
                </div>
              )}
            </div>
            
            {/* Contrôles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button onClick={togglePlay} className="p-1 rounded hover:bg-white/10">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <button onClick={toggleMute} className="p-1 rounded hover:bg-white/10">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <div className="w-20 hidden sm:block">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
                
                <div className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
              
              <div>
                <button onClick={fullscreen} className="p-1 rounded hover:bg-white/10">
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Bouton géant au centre pour lecture/pause */}
          <button
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 p-5 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} />}
          </button>
          
          {/* Navigation entre épisodes */}
          <div className="absolute top-1/2 w-full transform -translate-y-1/2 flex justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
            <button 
              className={`bg-black/50 rounded-full p-2 hover:bg-black/70 ${!hasPreviousEpisode ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={hasPreviousEpisode ? onPreviousEpisode : undefined}
              disabled={!hasPreviousEpisode}
            >
              <ChevronLeft size={30} />
            </button>
            <button 
              className={`bg-black/50 rounded-full p-2 hover:bg-black/70 ${!hasNextEpisode ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={hasNextEpisode ? onNextEpisode : undefined}
              disabled={!hasNextEpisode}
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
} 