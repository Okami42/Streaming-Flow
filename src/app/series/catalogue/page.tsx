"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeriesCard } from "@/components/SeriesCard";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomImage from "@/components/ui/custom-image";

// Définir l'interface pour les séries du catalogue
interface CatalogueSeries {
  id: string;
  title: string;
  imageUrl: string;
  type: "Série" | "Film";
  language: "VOSTFR" | "VF";
  time?: string;
}

const seriesList: CatalogueSeries[] = [
  {
    id: "motorheads",
    title: "Motorheads",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    type: "Série",
    language: "VF",
    time: "1 saison"
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    type: "Série",
    language: "VF",
    time: "5 saisons"
  },
  {
    id: "squid-game",
    title: "Squid Game",
    imageUrl: "https://media.senscritique.com/media/000021637905/300/squid_game.png",
    type: "Série",
    language: "VF",
    time: "3 saisons"
  },
  {
    id: "adventure-time",
    title: "Adventure Time",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjE2MzE1MDI2M15BMl5BanBnXkFtZTgwNzUyODQxMDE@._V1_.jpg",
    type: "Série",
    language: "VF",
    time: "10 saisons"
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/23/01/03/14/13/0717778.jpg",
    type: "Série",
    language: "VF",
    time: "8 saisons"
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
    type: "Série",
    language: "VF",
    time: "4 saisons"
  },
  {
    id: "the-boys",
    title: "The Boys",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
    type: "Série",
    language: "VF",
    time: "3 saisons"
  },
  {
    id: "the-witcher",
    title: "The Witcher",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
    type: "Série",
    language: "VF",
    time: "2 saisons"
  },
  {
    id: "peaky-blinders",
    title: "Peaky Blinders",
    imageUrl: "https://medias.boutique.lab.arte.tv/prod/10878_vod_thumb_82796.jpg",
    type: "Série",
    language: "VF", 
    time: "6 saisons"
  },
  {
    id: "dune",
    title: "Dune",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
    type: "Film",
    language: "VF",
    time: "2h35"
  },
  {
    id: "the-batman",
    title: "The Batman",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/22/02/16/17/42/3125788.jpg",
    type: "Film",
    language: "VF",
    time: "2h56"
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    imageUrl: "https://fr.web.img4.acsta.net/pictures/22/03/29/15/12/0827894.jpg",
    type: "Film",
    language: "VF",
    time: "2h11"
  }
];

const genres = [
  "Action", "Aventure", "Automobile", "Comédie", "Drame", "Fantasy",
  "Horreur", "Thriller", "Romance", "Science-Fiction", "Sport",
  "Crime", "Historique", "Documentaire", "Biopic"
];

export default function SeriesCataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const filteredSeries = seriesList.filter(series =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6"></h1>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-blue-500" />
                </div>
                <Input
                  type="search"
                  placeholder="Rechercher une série ou un film..."
                  className="bg-[#0a0d14]/70 border-white/10 pl-10 text-sm text-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex-shrink-0">
                <Button variant="outline" className="border-white/10 text-white h-12 px-6">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-8">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedGenres.includes(genre)
                      ? "bg-blue-500 text-white"
                      : "bg-[#151a2a] text-gray-300 hover:bg-[#1a1f35]"
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Series Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredSeries.map((series) => (
              <SeriesCard
                key={series.id}
                id={series.id}
                title={series.title}
                imageUrl={series.imageUrl}
                type={series.type}
                language={series.language}
                time={series.time}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 
