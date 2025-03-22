"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const animes = [
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    imageUrl: "https://ext.same-assets.com/3309958097/2676309700.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://ext.same-assets.com/2175864690/3344234865.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://ext.same-assets.com/4236370899/4066221021.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "return-to-player",
    title: "Return to Player",
    imageUrl: "https://ext.same-assets.com/844008929/3598158507.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: "https://ext.same-assets.com/3039906599/884967313.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: "https://ext.same-assets.com/2879165773/327560351.jpeg",
    type: "Anime",
    language: "VOSTFR",
  },
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    imageUrl: "https://ext.same-assets.com/3410839635/1638134647.jpeg",
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

          {/* Special Focus for Welcome Demon-School Teacher */}
          <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">En ce moment sur Okanime</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <Link href="/catalogue/welcome-demon-school-teacher" className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-pink-500/20 hover:border-pink-500/50 transition-all shadow-lg hover:shadow-pink-500/20">
                    <img
                      src="https://ext.same-assets.com/3692778002/4215009052.jpeg"
                      alt="Welcome, Demon-School Teacher!"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Welcome, Demon-School Teacher!</h3>
                <p className="text-gray-300 mb-4">
                  Suzuki Iruma a été vendu à un démon par ses parents. Surprenant, ce démon, qui est le principal d'une école de démons, l'adopte comme son petit-fils. Il l'inscrit au "Babyls", une école pour démons où Iruma va découvrir un univers nouveau à lui.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Comédie", "Démons", "Fantasy", "École"].map((tag) => (
                    <span key={tag} className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/catalogue/welcome-demon-school-teacher">
                  <Button className="theme-button">
                    Voir les épisodes
                  </Button>
                </Link>
              </div>
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
