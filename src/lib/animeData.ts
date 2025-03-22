// Types pour les données d'anime
export interface AnimeEpisode {
  number: number;
  title: string;
  duration: number;
  sibnetVostfrId: string;
  sibnetVfId: string;
}

export interface AnimeSeason {
  seasonNumber: number;
  title: string;
  year: number;
  episodes: AnimeEpisode[];
}

export interface Anime {
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
  seasons?: AnimeSeason[];
  episodes?: AnimeEpisode[]; // Garder le support pour l'ancienne structure
}

// Fonction pour récupérer un anime par son ID
export function getAnimeById(id: string): Anime | undefined {
  return animes.find(anime => anime.id === id);
}

// Fonction pour récupérer tous les animes
export function getAllAnimes(): Anime[] {
  return animes;
}

// Fonction pour récupérer les animes filtrés par genre
export function getAnimesByGenre(genre: string): Anime[] {
  return animes.filter(anime => anime.genres.includes(genre));
}

// Liste des animes
export const animes: Anime[] = [
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    originalTitle: "鬼滅の刃",
    description: "Dans un Japon de l'ère Taishō, Tanjirō Kamado est le fils aîné d'une famille de marchands de charbon dont le père est décédé. Pour subvenir aux besoins de celle-ci, il vend du charbon au village en contrebas de la montagne où ils habitent. Malgré les difficultés de la vie, ils réussissent à trouver le bonheur dans leur quotidien. Un jour, Tanjirō se rend au village et, à cause d'une rumeur à propos d'un démon mangeur d'hommes qui rôderait la nuit dans les montagnes, il est forcé de passer la nuit chez un habitant du village. À son retour le lendemain, il découvre sa famille massacrée par un démon. Seule sa sœur Nezuko a survécu à l'attaque, mais elle a été transformée en démon. Cependant, elle parvient à résister à son instinct et à ne pas attaquer son frère.",
    imageUrl: "https://ext.same-assets.com/3039906599/884967313.jpeg",
    bannerUrl: "https://ext.same-assets.com/3039906599/884967313-banner.jpeg",
    year: 2019,
    type: "TV",
    status: "Terminé",
    genres: ["Action", "Aventure", "Historique", "Fantastique"],
    rating: 9.5,
    episodes: [
      {
        number: 1,
        title: "Cruauté",
        duration: 1440, // 24 minutes
        sibnetVostfrId: "abcdef123",
        sibnetVfId: "123456abc"
      },
      {
        number: 2,
        title: "Sabre du démon",
        duration: 1440,
        sibnetVostfrId: "ghijkl456",
        sibnetVfId: "789012def"
      }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          {
            number: 1,
            title: "Cruauté",
            duration: 1440,
            sibnetVostfrId: "ds1ep1",
            sibnetVfId: "ds1ep1fr"
          },
          {
            number: 2,
            title: "Sabre du démon",
            duration: 1440,
            sibnetVostfrId: "ds1ep2",
            sibnetVfId: "ds1ep2fr"
          },
          {
            number: 3,
            title: "Sabito et Makomo",
            duration: 1440,
            sibnetVostfrId: "ds1ep3",
            sibnetVfId: "ds1ep3fr"
          },
          {
            number: 4,
            title: "Sélection finale",
            duration: 1440,
            sibnetVostfrId: "ds1ep4",
            sibnetVfId: "ds1ep4fr"
          },
          {
            number: 5,
            title: "Ma propre acier",
            duration: 1440,
            sibnetVostfrId: "ds1ep5",
            sibnetVfId: "ds1ep5fr"
          }
        ]
      },
      {
        seasonNumber: 2,
        title: "Arc du Train de l'Infini",
        year: 2021,
        episodes: [
          {
            number: 1,
            title: "Le train de l'Infini",
            duration: 1440,
            sibnetVostfrId: "ds2ep1",
            sibnetVfId: "ds2ep1fr"
          },
          {
            number: 2,
            title: "Sommeil profond",
            duration: 1440,
            sibnetVostfrId: "ds2ep2",
            sibnetVfId: "ds2ep2fr"
          },
          {
            number: 3,
            title: "Enmu",
            duration: 1440,
            sibnetVostfrId: "ds2ep3",
            sibnetVfId: "ds2ep3fr"
          },
          {
            number: 4,
            title: "Akaza",
            duration: 1440,
            sibnetVostfrId: "ds2ep4",
            sibnetVfId: "ds2ep4fr"
          }
        ]
      },
      {
        seasonNumber: 3,
        title: "Arc du Village des Forgerons",
        year: 2023,
        episodes: [
          {
            number: 1,
            title: "Le village caché",
            duration: 1440,
            sibnetVostfrId: "ds3ep1",
            sibnetVfId: "ds3ep1fr"
          },
          {
            number: 2,
            title: "Les forgerons",
            duration: 1440,
            sibnetVostfrId: "ds3ep2",
            sibnetVfId: "ds3ep2fr"
          },
          {
            number: 3,
            title: "L'attaque des démons",
            duration: 1440,
            sibnetVostfrId: "ds3ep3",
            sibnetVfId: "ds3ep3fr"
          }
        ]
      }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    originalTitle: "呪術廻戦",
    description: "Yuji Itadori, un lycéen doué en sport, rejoint le club de spiritisme de son école pour éviter l'équipe sportive. Malgré ses talents athlétiques naturels, il veut simplement une vie tranquille. Quand de véritables esprits apparaissent à l'école, Yuji avale une relique maudite pour protéger ses amis – un doigt appartenant au démon Ryomen Sukuna. Désormais possédé, il est condamné à mort par les exorcistes, mais un puissant exorciste lui propose de mourir uniquement après avoir consommé tous les doigts de Sukuna, lui permettant de l'éliminer définitivement.",
    imageUrl: "https://ext.same-assets.com/2879165773/327560351.jpeg",
    bannerUrl: "https://ext.same-assets.com/2879165773/327560351-banner.jpeg",
    year: 2020,
    type: "TV",
    status: "En cours",
    genres: ["Action", "Surnaturel", "École", "Démons"],
    rating: 9.2,
    episodes: [
      {
        number: 1,
        title: "Ryomen Sukuna",
        duration: 1440,
        sibnetVostfrId: "jkaisen123",
        sibnetVfId: "jkaisen123fr"
      },
      {
        number: 2,
        title: "Pour moi-même",
        duration: 1440,
        sibnetVostfrId: "jkaisen456",
        sibnetVfId: "jkaisen456fr"
      }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2020,
        episodes: [
          {
            number: 1,
            title: "Ryomen Sukuna",
            duration: 1440,
            sibnetVostfrId: "4667514",
            sibnetVfId: "jk1ep1fr"
          },
          {
            number: 2,
            title: "Pour moi-même",
            duration: 1440,
            sibnetVostfrId: "4667523",
            sibnetVfId: "jk1ep2fr"
          },
          {
            number: 3,
            title: "Jeune fille d'acier",
            duration: 1440,
            sibnetVostfrId: "4667532",
            sibnetVfId: "jk1ep3fr"
          },
          {
            number: 4,
            title: "La mort des esprits maudits",
            duration: 1440,
            sibnetVostfrId: "4667548",
            sibnetVfId: "jk1ep4fr"
          },
          {
            number: 5,
            title: "L'existence terreuse",
            duration: 1440,
            sibnetVostfrId: "4667557",
            sibnetVfId: "jk1ep5fr"
          },
          {
            number: 6,
            title: "Après la pluie",
            duration: 1440,
            sibnetVostfrId: "4667566",
            sibnetVfId: "jk1ep6fr"
          },
          {
            number: 7,
            title: "L'assaut",
            duration: 1440,
            sibnetVostfrId: "4667578",
            sibnetVfId: "jk1ep7fr"
          },
          {
            number: 8,
            title: "Écorchure",
            duration: 1440,
            sibnetVostfrId: "4667599",
            sibnetVfId: "jk1ep8fr"
          },
          {
            number: 9,
            title: "Petit poisson et Échec inversé",
            duration: 1440,
            sibnetVostfrId: "4667621",
            sibnetVfId: "jk1ep9fr"
          },
          {
            number: 10,
            title: "Magie idole",
            duration: 1440,
            sibnetVostfrId: "4667634",
            sibnetVfId: "jk1ep10fr"
          },
          {
            number: 11,
            title: "Formation en équipe",
            duration: 1440,
            sibnetVostfrId: "4667642",
            sibnetVfId: "jk1ep11fr"
          },
          {
            number: 12,
            title: "À toi, ô mon brillant futur",
            duration: 1440,
            sibnetVostfrId: "4667648",
            sibnetVfId: "jk1ep12fr"
          },
          {
            number: 13,
            title: "Demain",
            duration: 1440,
            sibnetVostfrId: "4667656",
            sibnetVfId: "jk1ep13fr"
          },
          {
            number: 14,
            title: "Kyoto Sister School Exchange Event - Team Battle, Part 1",
            duration: 1440,
            sibnetVostfrId: "4667663",
            sibnetVfId: "jk1ep14fr"
          },
          {
            number: 15,
            title: "Kyoto Sister School Exchange Event - Team Battle, Part 2",
            duration: 1440,
            sibnetVostfrId: "4667667",
            sibnetVfId: "jk1ep15fr"
          },
          {
            number: 16,
            title: "Kyoto Sister School Exchange Event - Team Battle, Part 3",
            duration: 1440,
            sibnetVostfrId: "4667673",
            sibnetVfId: "jk1ep16fr"
          },
          {
            number: 17,
            title: "Kyoto Sister School Exchange Event - Individual Battle, Part 1",
            duration: 1440,
            sibnetVostfrId: "4667683",
            sibnetVfId: "jk1ep17fr"
          },
          {
            number: 18,
            title: "Préparatifs",
            duration: 1440,
            sibnetVostfrId: "4667689",
            sibnetVfId: "jk1ep18fr"
          },
          {
            number: 19,
            title: "Black Flash",
            duration: 1440,
            sibnetVostfrId: "4667696",
            sibnetVfId: "jk1ep19fr"
          },
          {
            number: 20,
            title: "Nonstandard",
            duration: 1440,
            sibnetVostfrId: "4667717",
            sibnetVfId: "jk1ep20fr"
          },
          {
            number: 21,
            title: "Origine de l'obéissance",
            duration: 1440,
            sibnetVostfrId: "4667725",
            sibnetVfId: "jk1ep21fr"
          },
          {
            number: 22,
            title: "Le destin",
            duration: 1440,
            sibnetVostfrId: "4667735",
            sibnetVfId: "jk1ep22fr"
          },
          {
            number: 23,
            title: "Le gouffre",
            duration: 1440,
            sibnetVostfrId: "4667746",
            sibnetVfId: "jk1ep23fr"
          },
          {
            number: 24,
            title: "Accomplissement",
            duration: 1440,
            sibnetVostfrId: "4667756",
            sibnetVfId: "jk1ep24fr"
          }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2 - L'incident de Shibuya",
        year: 2023,
        episodes: [
          {
            number: 1,
            title: "Shibuya",
            duration: 1440,
            sibnetVostfrId: "jk2ep1",
            sibnetVfId: "jk2ep1fr"
          },
          {
            number: 2,
            title: "Premières batailles",
            duration: 1440,
            sibnetVostfrId: "jk2ep2",
            sibnetVfId: "jk2ep2fr"
          },
          {
            number: 3,
            title: "Sans nom",
            duration: 1440,
            sibnetVostfrId: "jk2ep3",
            sibnetVfId: "jk2ep3fr"
          },
          {
            number: 4,
            title: "Rassemblement des forces",
            duration: 1440,
            sibnetVostfrId: "jk2ep4",
            sibnetVfId: "jk2ep4fr"
          },
          {
            number: 5,
            title: "Sukuna contre Mahomora",
            duration: 1440,
            sibnetVostfrId: "jk2ep5",
            sibnetVfId: "jk2ep5fr"
          },
          {
            number: 6,
            title: "Le réveil du roi des fléaux",
            duration: 1440,
            sibnetVostfrId: "jk2ep6",
            sibnetVfId: "jk2ep6fr"
          },
          {
            number: 7,
            title: "Destruction totale",
            duration: 1440,
            sibnetVostfrId: "jk2ep7",
            sibnetVfId: "jk2ep7fr"
          },
          {
            number: 8,
            title: "Derniers espoirs",
            duration: 1440,
            sibnetVostfrId: "jk2ep8",
            sibnetVfId: "jk2ep8fr"
          }
        ]
      }
    ]
  },
  // Vous pouvez ajouter d'autres animes ici
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    originalTitle: "アクダマドライブ",
    description: "Dans une ville cyberpunk de Kansai, suite à une guerre entre Kansai et Kantō, Kansai est devenu dépendant économiquement de Kantō. Dans cette société, des criminels connus sous le nom d'Akudama commettent toutes sortes de crimes. L'histoire suit une fille ordinaire qui se retrouve impliquée avec un groupe d'Akudama, après avoir été confondue avec l'un d'entre eux.",
    imageUrl: "https://ext.same-assets.com/3410839635/1638134647.jpeg",
    bannerUrl: "https://ext.same-assets.com/3410839635/1638134647-banner.jpeg",
    year: 2020,
    type: "TV",
    status: "Terminé",
    genres: ["Action", "Science-fiction", "Dystopie"],
    rating: 8.7,
    episodes: [
      {
        number: 1,
        title: "SE7EN",
        duration: 1440,
        sibnetVostfrId: "akudama123",
        sibnetVfId: "akudama123fr"
      },
      {
        number: 2,
        title: "Reservoir Dogs",
        duration: 1440,
        sibnetVostfrId: "akudama456",
        sibnetVfId: "akudama456fr"
      },
      // Ajoutez d'autres épisodes selon vos besoins
    ]
  },
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    originalTitle: "魔入りました！入間くん",
    description: "Iruma Suzuki est un adolescent de 14 ans qui est vendu à un démon par ses parents. Le démon, connu sous le nom de Sullivan, emmène Iruma dans le monde des démons et l'adopte officiellement comme son petit-fils. Il l'inscrit à l'école des démons Babyls où Iruma doit cacher qu'il est humain sous peine d'être mangé par les autres élèves. Sous l'aile de Sullivan, président de l'école, Iruma commence sa vie scolaire fantastique entouré d'êtres uniques tout en cachant son identité humaine.",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    year: 2019,
    type: "TV",
    status: "En cours",
    genres: ["Comédie", "Fantasy", "École", "Démons", "Surnaturel"],
    rating: 8.2,
    episodes: [
      { number: 1, title: "Bienvenue à l'école des démons", duration: 1420, sibnetVostfrId: "5721980", sibnetVfId: "3689142" },
      { number: 2, title: "Le familier parfait", duration: 1410, sibnetVostfrId: "5721984", sibnetVfId: "3720577" },
      { number: 3, title: "La bague de Valac", duration: 1420, sibnetVostfrId: "5725827", sibnetVfId: "3728146" },
      { number: 4, title: "La classe anormale", duration: 1400, sibnetVostfrId: "5734316", sibnetVfId: "5742395" },
      { number: 5, title: "Les ambitions d'Asmodeus", duration: 1420, sibnetVostfrId: "5742388", sibnetVfId: "5742397" },
      { number: 6, title: "Le jardin royal", duration: 1440, sibnetVostfrId: "5749708", sibnetVfId: "5742399" },
      { number: 7, title: "Fête d'éveil", duration: 1420, sibnetVostfrId: "5756064", sibnetVfId: "5742401" },
      { number: 8, title: "Compétition de familier", duration: 1420, sibnetVostfrId: "5763156", sibnetVfId: "5742403" },
      { number: 9, title: "Les examens", duration: 1420, sibnetVostfrId: "5767285", sibnetVfId: "5742405" },
      { number: 10, title: "Le ballon explosif", duration: 1420, sibnetVostfrId: "5771456", sibnetVfId: "5742407" },
      { number: 11, title: "Le secret d'Iruma", duration: 1420, sibnetVostfrId: "5776114", sibnetVfId: "5742409" },
      { number: 12, title: "La réunion des parents", duration: 1420, sibnetVostfrId: "5782623", sibnetVfId: "5742411" },
      { number: 13, title: "La magie d'Iruma", duration: 1420, sibnetVostfrId: "5792481", sibnetVfId: "5742413" },
      { number: 14, title: "Le grand banquet", duration: 1420, sibnetVostfrId: "5798358", sibnetVfId: "5742415" },
      { number: 15, title: "La face cachée d'Iruma", duration: 1420, sibnetVostfrId: "5803875", sibnetVfId: "5742417" },
      { number: 16, title: "Iruma maléfique", duration: 1420, sibnetVostfrId: "5808382", sibnetVfId: "5742419" },
      { number: 17, title: "Le retour à la normale", duration: 1420, sibnetVostfrId: "5814648", sibnetVfId: "5742421" },
      { number: 18, title: "La salle de musique", duration: 1420, sibnetVostfrId: "5821706", sibnetVfId: "5742423" },
      { number: 19, title: "Le message de Balam", duration: 1420, sibnetVostfrId: "5828253", sibnetVfId: "5742425" },
      { number: 20, title: "Le professeur Balam", duration: 1420, sibnetVostfrId: "5835963", sibnetVfId: "5742427" },
      { number: 21, title: "Le démon volant", duration: 1420, sibnetVostfrId: "5842211", sibnetVfId: "5742429" },
      { number: 22, title: "Les vacances de Sullivan", duration: 1420, sibnetVostfrId: "5848186", sibnetVfId: "5742431" },
      { number: 23, title: "La bataille finale", duration: 1420, sibnetVostfrId: "5854073", sibnetVfId: "5742433" },
      { number: 24, title: "La fin de l'année scolaire", duration: 1420, sibnetVostfrId: "5854073", sibnetVfId: "5742435" }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "Bienvenue à l'école des démons", duration: 1420, sibnetVostfrId: "5721980", sibnetVfId: "3689142" },
          { number: 2, title: "Le familier parfait", duration: 1410, sibnetVostfrId: "5721984", sibnetVfId: "3720577" },
          { number: 3, title: "La bague de Valac", duration: 1420, sibnetVostfrId: "5725827", sibnetVfId: "3728146" },
          { number: 4, title: "La classe anormale", duration: 1400, sibnetVostfrId: "5734316", sibnetVfId: "5742395" },
          { number: 5, title: "Les ambitions d'Asmodeus", duration: 1420, sibnetVostfrId: "5742388", sibnetVfId: "5742397" },
          { number: 6, title: "Le jardin royal", duration: 1440, sibnetVostfrId: "5749708", sibnetVfId: "5742399" },
          { number: 7, title: "Fête d'éveil", duration: 1420, sibnetVostfrId: "5756064", sibnetVfId: "5742401" },
          { number: 8, title: "Compétition de familier", duration: 1420, sibnetVostfrId: "5763156", sibnetVfId: "5742403" },
          { number: 9, title: "Les examens", duration: 1420, sibnetVostfrId: "5767285", sibnetVfId: "5742405" },
          { number: 10, title: "Le ballon explosif", duration: 1420, sibnetVostfrId: "5771456", sibnetVfId: "5742407" },
          { number: 11, title: "Le secret d'Iruma", duration: 1420, sibnetVostfrId: "5776114", sibnetVfId: "5742409" },
          { number: 12, title: "La réunion des parents", duration: 1420, sibnetVostfrId: "5782623", sibnetVfId: "5742411" },
          { number: 13, title: "La magie d'Iruma", duration: 1420, sibnetVostfrId: "5792481", sibnetVfId: "5742413" },
          { number: 14, title: "Le grand banquet", duration: 1420, sibnetVostfrId: "5798358", sibnetVfId: "5742415" },
          { number: 15, title: "La face cachée d'Iruma", duration: 1420, sibnetVostfrId: "5803875", sibnetVfId: "5742417" },
          { number: 16, title: "Iruma maléfique", duration: 1420, sibnetVostfrId: "5808382", sibnetVfId: "5742419" },
          { number: 17, title: "Le retour à la normale", duration: 1420, sibnetVostfrId: "5814648", sibnetVfId: "5742421" },
          { number: 18, title: "La salle de musique", duration: 1420, sibnetVostfrId: "5821706", sibnetVfId: "5742423" },
          { number: 19, title: "Le message de Balam", duration: 1420, sibnetVostfrId: "5828253", sibnetVfId: "5742425" },
          { number: 20, title: "Le professeur Balam", duration: 1420, sibnetVostfrId: "5835963", sibnetVfId: "5742427" },
          { number: 21, title: "Le démon volant", duration: 1420, sibnetVostfrId: "5842211", sibnetVfId: "5742429" },
          { number: 22, title: "Les vacances de Sullivan", duration: 1420, sibnetVostfrId: "5848186", sibnetVfId: "5742431" },
          { number: 23, title: "La bataille finale", duration: 1420, sibnetVostfrId: "5854073", sibnetVfId: "5742433" },
          { number: 24, title: "La fin de l'année scolaire", duration: 1420, sibnetVostfrId: "5854073", sibnetVfId: "5742435" }
        ]
      }
    ]
  }
]; 