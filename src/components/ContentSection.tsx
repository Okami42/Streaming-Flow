"use client";

import React, { useRef, useState } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import AnimeCard from "./AnimeCard";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  time?: string;
  type: "Anime" | "Scans";
  language: "VF & VO";
}

interface ContentSectionProps {
  title: string;
  icon?: React.ReactNode;
  items: ContentItem[];
  className?: string;
}

export default function ContentSection({
  title,
  icon,
  items,
  className
}: ContentSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section className={cn("py-7 relative", className)}>
      {/* Glass effect background for better visual separation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1222]/40 to-transparent opacity-50 rounded-lg -z-10"></div>

      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={title} icon={icon} />
        
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft}
            className="p-1 rounded-full bg-[#151a2a] hover:bg-[#1e263f] border border-white/5 transition-colors"
            aria-label="Défiler à gauche"
          >
            <ChevronLeft className="h-5 w-5 text-white/70" />
          </button>
          <button 
            onClick={scrollRight}
            className="p-1 rounded-full bg-[#151a2a] hover:bg-[#1e263f] border border-white/5 transition-colors"
            aria-label="Défiler à droite"
          >
            <ChevronRight className="h-5 w-5 text-white/70" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-5 pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[200px]">
            <AnimeCard
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              time={item.time}
              type={item.type}
              language={item.language}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
