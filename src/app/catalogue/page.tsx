"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AnimeCard } from "@/components/AnimeCard";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { animes as animeDataList } from "@/lib/animeData";

// Définir l'interface pour les animes du catalogue
interface CatalogueAnime {
  id: string;
  title: string;
  imageUrl: string;
  type: "Anime" | "Scans";
  language: "VO" | "VF" | "VF & VO";
  genres?: string[];
}

// Fonction pour obtenir les genres d'un anime par son ID
const getAnimeGenres = (animeId: string): string[] => {
  const anime = animeDataList.find(a => a.id === animeId);
  return anime?.genres || [];
};

const animes: CatalogueAnime[] = [
  {
    id: "akira",
    title: "Akira",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("akira"),
  },
  {
    id: "nagatoro",
    title: "Arrête de me chauffer Nagatoro",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/21/03/24/17/22/3948943.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("nagatoro"),
  },
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2ZjZmZhN2MtNTk4NC00MmFkLWEwMWEtZGNjOThmMTQ2YjdmXkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("welcome-demon-school-teacher"),
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("solo-leveling"),
  },
  {
    id:"clannad",
    title:"Clannad",
    imageUrl:"https://fr.web.img6.acsta.net/pictures/20/09/02/16/06/0799147.jpg",
    type:"Anime",
    language:"VO",
    genres: getAnimeGenres("clannad"),
  },
  {
    id:"gachiakuta",
    title:"Gachiakuta",
    imageUrl:"https://fr.web.img6.acsta.net/img/d5/7b/d57b51b6b84ed66f6dfb47d83aa759a6.jpg",
    type:"Anime",
    language:"VF & VO",
    genres: getAnimeGenres("gachiakuta"),
  },
  {
    id:"fire-force",
    title:"Fire Force",
    imageUrl:"https://fr.web.img5.acsta.net/pictures/19/09/16/16/21/4933552.jpg",
    type:"Anime",
    language:"VF & VO",
    genres: getAnimeGenres("fire-force"),
  },
  {
    id:"horimiya",
    title:"Horimiya",
    imageUrl:"https://imusic.b-cdn.net/images/item/original/447/5022366773447.jpg?anime-2023-horimiya-the-complete-season-dvd&class=scaled&v=1677384610",
    type:"Anime",
    language:"VF & VO",
    genres: getAnimeGenres("horimiya"),
  },
  {
    id: "classroom-of-the-elite",
    title: "Classroom of the Elite",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDg3MGVhNWUtYTQ2NS00ZDdiLTg5MTMtZmM5MjUzN2IxN2I4XkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("classroom-of-the-elite"),
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2Q5NTRiYTgtZjJmOS00YjQ0LWE2MmQtMjE5MmM3ODQ5ZDg2XkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("unnamed-memory"),
  },
  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY452_.jpg 319w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY678_.jpg 479w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY337_.jpg 238w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UX707_.jpg 707w, https://m.media-amazon.com/images/M/MV5BNDQ2MTY2YTEtOWI5ZS00YTFhLTg5YWYtMzkwYTA5NjM5NTIxXkEyXkFqcGc@._V1_FMjpg_UY1000_.jpg 707w",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("failure-skill-nut-master"),
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    imageUrl: "https://otakulevel10.fr/wp-content/uploads/2025/04/Amagami-Sister-saison-2.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("amagami-san-chi-no-enmusubi"),
  },
  {
    id: "yofukashi-no-uta",
    title: "Call of the Night",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/22/07/04/14/30/5500974.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("yofukashi-no-uta"),
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/19/09/18/13/46/0198270.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("demon-slayer"),
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/09/14/10/31/4875617.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("jujutsu-kaisen"),
  },
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Akudama_Drive.jpg/250px-Akudama_Drive.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("akudama-drive"),
  },
  {
    id: "kuroko-no-basket",
    title: "Kuroko no Basket",
    imageUrl: "https://images.justwatch.com/poster/181383869/s718/kuroko-no-basket.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("kuroko-no-basket"),
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    imageUrl: "https://fr.web.img4.acsta.net/pictures/19/09/16/17/09/4903250.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("vinland-saga"),
  },
  {
    id: "death-note",
    title: "Death Note",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("death-note"),
  },
  {
    id: "frieren",
    title: "Frieren",
    imageUrl: "https://sm.ign.com/ign_fr/screenshot/default/unnamed_qjuy.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("frieren"),
  },
  {
    id: "toradora",
    title: "Toradora!",
    imageUrl: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/toradora.png",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("toradora"),
  },
  {
    id: "kaguya-sama",
    title: "Kaguya-sama: Love is War",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/04/08/16/07/4929472.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("kaguya-sama"),
  },
  {
    id: "your-name",
    title: "Your Name",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("your-name"),
  },
  {
    id: "rent-a-girlfriend",
    title: "Rent-a-Girlfriend",
    imageUrl: "https://www.myutaku.com/media/anime/poster/346502.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("rent-a-girlfriend"),
  },
  {
    id: "quintessential-quintuplets",
    title: "The Quintessential Quintuplets",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODhmMGJjMjQtNDMzNi00ZTJmLWE4ZTItM2YwYjRlZWM5OWMxXkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("quintessential-quintuplets"),
  },
  {
    id: "weathering-with-you",
    title: "Weathering with You",
    imageUrl: "https://m.media-amazon.com/images/I/91IWdBo4TnL._UF894,1000_QL80_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("weathering-with-you"),
  },
  {
    id: "domestic-girlfriend",
    title: "Domestic Girlfriend",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmQyNWI1ZTgtMTgzNC00ZGIyLTg3NWMtZmM2ZjMzNTNjOTU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("domestic-girlfriend"),
  },
  {
    id: "golden-time",
    title: "Golden Time",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNGI0YjdmNGYtZTQ0OC00OWUzLTg2NWMtMjFhNGI1Y2IxNzdmXkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("golden-time"),
  },
  {
    id: "oregairu",
    title: "OreGairu",
    imageUrl: "https://adala-news.fr/wp-content/uploads/2020/02/Oregairu-Saison-3-anime-image.png",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("oregairu"),
  },
  {
    id: "Silent-voice",
    title: "Silent Voice",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/18/07/13/11/32/3961973.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("Silent-voice"),
  },
  {
    id: "365-days-to-the-wedding",
    title: "365 Days to the Wedding",
    imageUrl: "https://fr.web.img6.acsta.net/img/c1/7a/c17af00afe845e138265cdf4dc445720.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("365-days-to-the-wedding"),
  },
  {
    id: "nana",
    title: "NANA",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYjRmOWJmMDgtYjBjMS00OTg1LWJmZTItZTY2MjJlODgxNmUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("nana"),
  },
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    imageUrl: "https://fr.web.img6.acsta.net/img/77/07/77079c0a800097522800816954373303.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("kaiju-no-8"),
  },
  {
    id: "re-zero",
    title: "Re:Zero - Starting Life in Another World",
    imageUrl: "https://adala-news.fr/wp-content/uploads/2024/11/ReZERO-Starting-Life-in-Another-World-Saison-3-counterattack.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("re-zero"),
  },
  {
    id: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BZWI2NzZhMTItOTM3OS00NjcyLThmN2EtZGZjMjlhYWMwODMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("tokyo-ghoul"),
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/22/08/01/10/00/1492791.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("chainsaw-man"),
  },
  {
    id: "ragna-crimson",
    title: "Ragna Crimson",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/23/09/29/09/01/0704302.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("ragna-crimson"),
  },
  {
    id: "tsukimichi-moonlit-fantasy",
    title: "Tsukimichi - Moonlit Fantasy",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/21/07/05/14/43/1726486.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("tsukimichi-moonlit-fantasy"),
  },
  {
    id: "shingeki-no-kyojin",
    title: "Attack on Titan",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/20/12/28/10/24/5603983.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("attack-on-titan"),
  },
  {
    id: "86-eighty-six",
    title: "86 EIGHTY-SIX",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/21/04/06/18/19/5235708.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("86-eighty-six"),
  },
  {
    id: "akame-ga-kill",
    title: "Akame ga Kill!",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1429/95946.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("akame-ga-kill"),
  },
  {
    id: "aldnoah-zero",
    title: "Aldnoah.Zero",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BOWFkZjdmMzgtMzM0MC00YTA0LWI3Y2YtZmNiOTk4OTE2OTUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("aldnoah-zero"),
  },
  {
    id: "ajin",
    title: "Ajin",
    imageUrl: "https://www.manga-news.com/public/images/series/ajin-1-glenat.webp",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("ajin"),
  },
  {
    id: "air-gear",
    title: "Air Gear",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjg4NDc4NjctOTg0ZC00NDU0LWE3ZmQtNTQ2NWQ2MzMyYjZmXkEyXkFqcGc@._V1_QL75_UY281_CR2,0,190,281_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("air-gear"),
  },
  {
    id: "aharen-san-wa-hakarenai",
    title: "Aharen-san wa Hakarenai",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/22/03/31/09/46/1204786.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("aharen-san-wa-hakarenai"),
  },
  {
    id: "aho-girl",
    title: "Aho Girl",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BOWRkMjEyNDAtZTg0Ny00YzU0LWIwYjItY2EyZjQ5ZTdhNDFmXkEyXkFqcGc@._V1_.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("aho-girl"),
  },
  {
    id: "akatsuki-no-yona",
    title: "Yona of the Dawn",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/20/03/06/17/37/4676109.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("akatsuki-no-yona"),
  },
  {
    id: "91-days",
    title: "91 Days",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/20/08/27/14/04/0312906.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("91-days"),
  },
  {
    id: "absolute-duo",
    title: "Absolute Duo",
    imageUrl: "https://image.tmdb.org/t/p/original/reoZZ94M0nDL7SGstuChqbLlhNT.jpg",
    type: "Anime",
    language: "VO",
    genres: getAnimeGenres("absolute-duo"),
  },
  {
    id: "a-couple-of-cuckoos",
    title: "A Couple of Cuckoos",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYWY3MjQ3OTEtMmEwYi00NTYxLWE4ZWQtZWE5YWY1OTE4MDZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    type: "Anime",
    language: "VF & VO",
    genres: getAnimeGenres("a-couple-of-cuckoos"),
  }
];

const genres = [
  "Action", "Adolescence", "Adventure", "Aventure", "Comedy", "Comédie", "Combats", "Cyberpunk", 
  "Démons", "Drama", "Drame", "Dragons", "Dystopie", "Ecchi", "École", "Fantasy", "Film", 
  "Harem", "Historique", "Horror", "Horreur", "Isekai", "Mafia", "Magie", "Mature", "Mecha", 
  "Militaire", "Musique", "Mystery", "Mystère", "Psychologique", "Romance", "School", 
  "Science-fiction", "Science-Fiction", "Seinen", "Shoujo", "Shounen", "Shōnen", "Slice of Life", 
  "Sport", "Sports", "Supernatural", "Surnaturel", "Thriller", "Tranche de vie", 
  "Voyage temporel", "Workplace", "Yokai"
];

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<"VO" | "VF" | "VF & VO" | "">("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredAnimes = animes.filter(anime => {
    // Filtre par terme de recherche
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par langue si sélectionné
    const matchesLanguage = !languageFilter || anime.language === languageFilter || anime.language === "VF & VO";
    
    // Filtre par genres - l'anime doit avoir TOUS les genres sélectionnés (ET logique)
    const matchesGenres = selectedGenres.length === 0 || 
      (anime.genres && selectedGenres.every(selectedGenre => anime.genres!.includes(selectedGenre)));
    
    return matchesSearch && matchesLanguage && matchesGenres;
  });

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
                <Button 
                  variant="outline" 
                  className={`border-white/10 text-white h-12 px-6 transition-colors hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white ${
                    showFilters 
                      ? "bg-blue-500 border-blue-500 text-white" 
                      : ""
                  }`}
                  onClick={toggleFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Genres - Affichés seulement si showFilters est true */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 mb-8">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedGenres.includes(genre)
                        ? "bg-blue-500 text-white"
                        : "bg-[#151a2a] text-gray-300 hover:!bg-blue-500 hover:!text-white"
                    }`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
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
