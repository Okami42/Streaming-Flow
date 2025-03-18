import AnimePageClient from "./AnimePageClient";

// Données fictives pour les animes
const animeData: Record<string, {
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
    duration: number; // en secondes
    sibnetVostfrId: string;
    sibnetVfId: string;
  }>;
}> = {
  "welcome-demon-school-teacher": {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    originalTitle: "魔入りました！入間くん",
    description: "Suzuki Iruma a été vendu à un démon par ses parents. Surprenant, ce démon, qui est le principal d'une école de démons, l'adopte comme son petit-fils. Il l'inscrit au \"Babyls\", une école pour démons où Iruma va découvrir un univers nouveau à lui. Il devra garder son identité secrète auprès des autres élèves, car s'ils apprennent qu'il est humain, ils le mangeront tout cru !",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    bannerUrl: "https://ext.same-assets.com/3776337035/2304219014.jpeg",
    year: 2019,
    type: "TV",
    status: "En cours",
    genres: ["Comédie", "Démons", "Fantasy", "École", "Surnaturel"],
    rating: 8.1,
    episodes: [
      {
        number: 1,
        title: "Bienvenue à l'école des démons",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "5742388",
        sibnetVfId: "5742388"
      },
      {
        number: 2,
        title: "Familiers démoniaques",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "2241043",
        sibnetVfId: "2241043"
      },
      {
        number: 3,
        title: "Aspirations démoniaques",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "4432846",
        sibnetVfId: "4432845"
      },
      {
        number: 4,
        title: "Amis démoniaques",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "4432848",
        sibnetVfId: "4432847"
      },
      {
        number: 5,
        title: "Volonté démoniaque",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "4432850",
        sibnetVfId: "4432849"
      }
    ]
  }
};

export function generateStaticParams() {
  return [
    { id: 'welcome-demon-school-teacher' },
  ];
}

export default async function AnimePage({ params }: { params: { id: string } }) {
  // Attendre les paramètres avec Promise.resolve pour s'assurer que params est bien disponible
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  const anime = animeData[id];
  
  return <AnimePageClient anime={anime} />;
}
