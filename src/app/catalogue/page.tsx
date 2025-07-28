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
  language: "VO" | "VF" | "VF & VO";
}

const animes: CatalogueAnime[] = [
  {
    id: "akira",
    title: "Akira",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "nagatoro",
    title: "Arrête de me chauffer Nagatoro",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/21/03/24/17/22/3948943.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2ZjZmZhN2MtNTk4NC00MmFkLWEwMWEtZGNjOThmMTQ2YjdmXkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id:"clannad",
    title:"Clannad",
    imageUrl:"https://fr.web.img6.acsta.net/pictures/20/09/02/16/06/0799147.jpg",
    type:"Anime",
    language:"VO",
  },
  {
    id:"gachiakuta",
    title:"Gachiakuta",
    imageUrl:"https://fr.web.img6.acsta.net/img/d5/7b/d57b51b6b84ed66f6dfb47d83aa759a6.jpg",
    type:"Anime",
    language:"VF & VO",
  },
  {
    id:"fire-force",
    title:"Fire Force",
    imageUrl:"https://fr.web.img5.acsta.net/pictures/19/09/16/16/21/4933552.jpg",
    type:"Anime",
    language:"VF & VO",
  },
  {
    id:"horimiya",
    title:"Horimiya",
    imageUrl:"https://imusic.b-cdn.net/images/item/original/447/5022366773447.jpg?anime-2023-horimiya-the-complete-season-dvd&class=scaled&v=1677384610",
    type:"Anime",
    language:"VF & VO",
  },
  {
    id: "classroom-of-the-elite",
    title: "Classroom of the Elite",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDg3MGVhNWUtYTQ2NS00ZDdiLTg5MTMtZmM5MjUzN2IxN2I4XkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2Q5NTRiYTgtZjJmOS00YjQ0LWE2MmQtMjE5MmM3ODQ5ZDg2XkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
  },
  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY452_.jpg 319w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY678_.jpg 479w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY337_.jpg 238w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UX707_.jpg 707w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY1000_.jpg 707w",
    type: "Anime",
    language: "VO",
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://otakulevel10.fr/wp-content/uploads/2025/04/Amagami-Sister-saison-2.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "call-of-the-night",
    title: "Call of the Night",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/22/07/04/14/30/5500974.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/19/09/18/13/46/0198270.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/09/14/10/31/4875617.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Akudama_Drive.jpg/250px-Akudama_Drive.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "kuroko-no-basket",
    title: "Kuroko no Basket",
    imageUrl: "https://images.justwatch.com/poster/181383869/s718/kuroko-no-basket.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    imageUrl: "https://fr.web.img4.acsta.net/pictures/19/09/16/17/09/4903250.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "death-note",
    title: "Death Note",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
  },
  {
    id: "frieren",
    title: "Frieren",
    imageUrl: "https://sm.ign.com/ign_fr/screenshot/default/unnamed_qjuy.jpg",
    type: "Anime",
    language: "VF & VO",
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
  const [languageFilter, setLanguageFilter] = useState<"VO" | "VF" | "VF & VO" | "">("");

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

      <main className="flex-grow pt-24">
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
