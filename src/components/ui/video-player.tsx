"use client";

import React, { useRef } from "react";

interface VideoPlayerProps {
  sibnetId?: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({
  sibnetId,
  poster,
  className = "",
}: VideoPlayerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      {sibnetId && (
        <iframe 
          src={`https://video.sibnet.ru/shell.php?videoid=${sibnetId}`}
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          allowFullScreen 
          className="w-full h-full"
        />
      )}
    </div>
  );
} 