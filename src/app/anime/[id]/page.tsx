import React from "react";
import { notFound } from "next/navigation";
import { getAnimeByIdAsync } from "@/lib/animeData";
import { Calendar, Star, Building, Film, Play } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomImage from "@/components/ui/custom-image";
import { extractSeriesId } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";

// Définir le type correct pour les paramètres de page Next.js
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<any>;
}

export default async function AnimePage({ params }: PageProps) {
  // Attendre la résolution des paramètres
  const resolvedParams = await params;
  const rawAnimeId = resolvedParams.id;
  
  // Utiliser extractSeriesId pour s'assurer que l'ID est correctement extrait
  const animeId = extractSeriesId(rawAnimeId);
  
  // Utilisation de la fonction asynchrone qui interroge la base de données
  const anime = await getAnimeByIdAsync(animeId);

  if (!anime) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#030711]">
      <Header />

      <main className="flex-grow pt-20">
        {/* Bannière */}
        <div className="relative h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <CustomImage
              src={anime.bannerUrl || anime.imageUrl}
              alt={`Bannière ${anime.title}`}
              fill={true}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-[#030711]/80 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-4 pb-12 md:px-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="relative w-[180px] h-[240px] shrink-0 rounded-lg overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10">
                  <CustomImage
                    src={anime.imageUrl}
                    alt={anime.title}
                    fill={true}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {anime.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genres?.map((genre: string) => (
                      <span
                        key={genre}
                        className="inline-block px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-md"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-300">
                        {anime.rating}/10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-300">
                        {anime.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-300">
                        {anime.type === "TV" ? "Série" : anime.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="h-4 w-4 text-pink-500" />
                      <span className="text-sm text-gray-300">
                        {anime.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Link href={`/catalogue/${anime.id}`}>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors">
                        <Play className="h-4 w-4" />
                        Regarder
                      </button>
                    </Link>
                    
                    <FavoriteButton 
                      animeId={anime.id} 
                      title={anime.title} 
                      imageUrl={anime.imageUrl} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de favoris flottant */}
        <FavoriteButton 
          animeId={anime.id} 
          title={anime.title} 
          imageUrl={anime.imageUrl} 
          floating={true} 
        />

      </main>

      <Footer />
    </div>
  );
} 