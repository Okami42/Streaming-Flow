import Link from "next/link";
import { Play } from "lucide-react";
import CustomImage from "./ui/custom-image";

export interface SeriesProps {
  id: string;
  title: string;
  imageUrl: string;
  type: "Série" | "Film";
  language: "VOSTFR" | "VF";
  time?: string;
}

export function SeriesCard({ id, title, imageUrl, type, language, time }: SeriesProps) {
  return (
    <Link href={`/series/${id}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 bg-[#151a2a]">
        <CustomImage
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        <div className="absolute top-2 right-2 flex gap-2">
          <div className="px-2 py-1 bg-blue-600/80 text-white text-xs font-medium rounded">
            {type}
          </div>
          <div className="px-2 py-1 bg-pink-600/80 text-white text-xs font-medium rounded">
            {language}
          </div>
        </div>
        
        {/* Bouton de lecture au milieu (optionnel, apparaît au survol) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center justify-center gap-1 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="h-3 w-3" />
            Regarder
          </button>
        </div>
        
        {/* Titre et saisons tout en bas à gauche */}
        <div className="absolute bottom-0 left-0 p-4 pb-6">
          <div className="flex flex-col items-start justify-start">
            <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{title}</h3>
            
            {time && (
              <div className="text-gray-300 text-xs">{time}</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 