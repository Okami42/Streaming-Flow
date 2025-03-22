"use client";

import Link from "next/link";
import CustomImage from "./ui/custom-image";

interface AnimeCardProps {
  title: string;
  imageUrl: string;
  time?: string;
  type: "Anime" | "Scans";
  language: "VOSTFR" | "VF";
  href?: string;
  id?: string;
}

export function AnimeCard({
  title,
  imageUrl,
  time,
  type,
  language,
  href,
  id,
}: AnimeCardProps) {
  // Si href n'est pas spécifié, construire l'URL à partir de l'ID
  const linkUrl = href || (id ? `/catalogue/${id}` : '#');

  return (
    <Link
      href={linkUrl}
      className="group animate-card block max-w-[230px] relative h-full"
    >
      <div className="anime-card h-full flex flex-col">
        <div className="anime-hover-card relative aspect-[3/4] w-full overflow-hidden">
          <CustomImage
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Time badge */}
          {time && (
            <div className="absolute top-2 right-2">
              <span className="bg-pink-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg backdrop-blur-sm">
                {time}
              </span>
            </div>
          )}
        </div>

        <div className="p-3 space-y-2 flex-grow flex flex-col justify-between">
          <h3 className="font-bold text-white text-center text-sm sm:text-base line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-blue-500 transition-all duration-300">
            {title}
          </h3>

          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="inline-flex items-center bg-gradient-to-r from-pink-600/90 to-pink-600/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                {type}
              </span>
              <span className="inline-flex items-center bg-gradient-to-r from-blue-600/90 to-blue-600/70 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                {language}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom shine effect on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
}

// Exporter à la fois comme module par défaut et comme export nommé
export default AnimeCard;
