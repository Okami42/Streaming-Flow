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
    id: "breaking-bad",
    title: "Breaking Bad",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    type: "Série",
    language: "VF",
    time: "5 saisons"
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
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
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
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
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg",
    type: "Film",
    language: "VF",
    time: "2h55"
  }
];

const genres = [
  "Action", "Aventure", "Comédie", "Drame", "Fantasy",
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

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Catalogue de Séries & Films</h1>

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

          {/* Special Focus for Breaking Bad */}
          <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">En ce moment sur OKA Stream</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <Link href="/series/breaking-bad" className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-blue-500/20 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20">
                    <CustomImage
                      src="https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg"
                      alt="Breaking Bad"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Breaking Bad</h3>
                <p className="text-gray-300 mb-4">
                  Un professeur de chimie atteint d'un cancer du poumon inopérable se lance dans la fabrication et la vente de méthamphétamine pour assurer l'avenir financier de sa famille.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Drame", "Crime", "Thriller"].map((tag) => (
                    <span key={tag} className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/series/breaking-bad">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Voir les épisodes
                  </Button>
                </Link>
              </div>
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