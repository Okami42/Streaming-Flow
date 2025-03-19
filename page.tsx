import { notFound } from "next/navigation";
import AnimePageClient from "./AnimePageClient";
import { ErrorBoundary } from 'react-error-boundary';

// Type pour l'anime
interface Anime {
  id: string;
  title: string;
  originalTitle: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  year: number;
  type: string;
  status: string;
  genres: string[];
  rating: number;
  episodes: Array<{
    number: number;
    title: string;
    duration: number;
    sibnetVostfrId: string;
    sibnetVfId: string;
  }>;
}

// Données d'exemple pour un anime
const mockAnime: Anime = {
  id: "welcome-demon-school-teacher",
  title: "Welcome, Demon-School Teacher!",
  originalTitle: "魔入りました！入間くん",
  description: "Iruma Suzuki est un adolescent de 14 ans qui est vendu à un démon par ses parents. Le démon, connu sous le nom de Sullivan, emmène Iruma dans le monde des démons et l'adopte officiellement comme son petit-fils. Il l'inscrit à l'école des démons Babyls où Iruma doit cacher qu'il est humain sous peine d'être mangé par les autres élèves. Sous l'aile de Sullivan, président de l'école, Iruma commence sa vie scolaire fantastique entouré d'êtres uniques tout en cachant son identité humaine.",
  imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
  bannerUrl: "https://ext.same-assets.com/3776337035/2304219014.jpeg",
  year: 2019,
  type: "TV",
  status: "En cours",
  genres: ["Comédie", "Fantasy", "École", "Démons", "Surnaturel"],
  rating: 8.2,
  episodes: [
    { number: 1, title: "Bienvenue à l'école des démons", duration: 1420, sibnetVostfrId: "5742388", sibnetVfId: "5742389" },
    { number: 2, title: "Le familier parfait", duration: 1410, sibnetVostfrId: "5742390", sibnetVfId: "5742391" },
    { number: 3, title: "La bague de Valac", duration: 1420, sibnetVostfrId: "5742392", sibnetVfId: "5742393" },
    { number: 4, title: "La classe anormale", duration: 1400, sibnetVostfrId: "5742394", sibnetVfId: "5742395" },
    { number: 5, title: "Les ambitions d'Asmodeus", duration: 1420, sibnetVostfrId: "5742396", sibnetVfId: "5742397" },
    { number: 6, title: "Le jardin royal", duration: 1440, sibnetVostfrId: "5742398", sibnetVfId: "5742399" }
  ]
};

// Fonction d'aide pour trouver un anime par son ID (simulé)
function getAnimeById(id: string): Anime | undefined {
  return id === mockAnime.id ? mockAnime : undefined;
}

// Composant d'erreur séparé dans un fichier à part pour éviter l'erreur
function MyFallbackComponent({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#030711] text-white">
      <h1 className="text-xl font-bold text-red-500 mb-4">Une erreur est survenue</h1>
      <p className="mb-4 text-gray-300">{error.message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-md transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}

export default async function AnimePage({ params }: { params: { id: string } }) {
  // Attendre les paramètres pour résoudre l'avertissement sur params.id
  const { id } = await Promise.resolve(params);
  const anime = getAnimeById(id);

  if (!anime) {
    return notFound();
  }

  return (
    <div>
      <AnimePageClient anime={anime} />
    </div>
  );
}
