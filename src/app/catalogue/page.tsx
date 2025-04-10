"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Définir l'interface pour les animes du catalogue
interface CatalogueAnime {
  id: string;
  title: string;
  imageUrl: string;
  type: "Anime" | "Scans";
  language: "VOSTFR" | "VF" | "VF & VOSTFR";
}

const animes: CatalogueAnime[] = [
  {
    id: "akira",
    title: "Akira",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "nagatoro",
    title: "Arrête de me chauffer Nagatoro",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/21/03/24/17/22/3948943.jpg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    imageUrl: "https://ext.same-assets.com/3309958097/2676309700.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://ext.same-assets.com/2175864690/3344234865.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://ext.same-assets.com/4236370899/4066221021.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "return-to-player",
    title: "Return to Player",
    imageUrl: "https://ext.same-assets.com/844008929/3598158507.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: "https://ext.same-assets.com/3039906599/884967313.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: "https://ext.same-assets.com/2879165773/327560351.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    imageUrl: "https://ext.same-assets.com/3410839635/1638134647.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "kuroko-no-basket",
    title: "Kuroko no Basket",
    imageUrl: "https://images.justwatch.com/poster/181383869/s166/kuroko-no-basket.avif",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    imageUrl: "https://ext.same-assets.com/4165707166/2193428669.jpeg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "death-note",
    title: "Death Note",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    type: "Anime",
    language: "VF & VOSTFR",
  },
  {
    id: "frieren",
    title: "Frieren",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/23/09/11/15/28/0344154.jpg",
    type: "Anime",
    language: "VOSTFR",
  },
];

const genres = [
  "Action", "Aventure", "Comédie", "Drame", "Fantasy",
  "Horreur", "Mystère", "Romance", "Sci-Fi", "Sport",
  "Surnaturel", "Slice of Life", "École", "Démons"
];

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<"VOSTFR" | "VF" | "VF & VOSTFR" | "">("");

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const filteredAnimes = animes.filter(anime =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Catalogue</h1>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-pink-500" />
                </div>
                <Input
                  type="search"
                  placeholder="Rechercher un anime..."
                  className="bg-[#0a0d14]/70 border-white/10 pl-10 text-sm text-gray-200 rounded-md focus:border-pink-500 focus:ring-1 focus:ring-pink-500/50 transition-all py-6"
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
                      ? "bg-pink-500 text-white"
                      : "bg-[#151a2a] text-gray-300 hover:bg-[#1a1f35]"
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredAnimes.map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                imageUrl={anime.imageUrl}
                type={anime.type}
                language={anime.language}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
