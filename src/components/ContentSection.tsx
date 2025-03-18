"use client";

import { Clock } from "lucide-react";
import SectionTitle from "./SectionTitle";
import AnimeCard from "./AnimeCard";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  time?: string;
  type: "Anime" | "Scans";
  language: "VOSTFR" | "VF";
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
  return (
    <section className={cn("py-8 relative", className)}>
      {/* Glass effect background for better visual separation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c1222]/40 to-transparent opacity-50 rounded-lg -z-10"></div>

      <SectionTitle title={title} icon={icon} />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <AnimeCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            time={item.time}
            type={item.type}
            language={item.language}
          />
        ))}
      </div>

      {/* If there are many items, add a view all button */}
      {items.length > 4 && (
        <div className="flex justify-center mt-8">
          <button className="bg-gradient-to-r from-pink-600/20 to-blue-600/20 hover:from-pink-600/30 hover:to-blue-600/30 text-white px-6 py-2 rounded-md border border-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] group">
            <span className="relative">
              Voir tout
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
