// Types pour les données d'anime
export interface AnimeEpisode {
  number: number;
  title: string;
  duration: number;
  sibnetVostfrId?: string;
  sibnetVfId?: string;
  smoothpreUrl?: string;
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
  if (id === "solo-leveling-2") {
    return soloLevelingSeason2;
  }
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
    id: "solo-leveling",
    title: "Solo Leveling",
    originalTitle: "나 혼자만 레벨업",
    description: "Dix ans auparavant, des portails ont commencé à apparaître un peu partout dans le monde. Ces portails ont la particularité de connecter le monde à d'autres dimensions, donjons ou mondes parallèles. En même temps, certaines personnes ont développé des capacités afin de pouvoir chasser ces portails. On appelle ceux qui reçoivent un Éveil, des Chasseurs. Sung Jin Woo est considéré comme le plus faible des Chasseurs de rang E... Autrement dit le plus faible parmi les faibles. Il est tellement faible qu'il est surnommé par ses confrères, le « Faible ». Avec une équipe de Chasseurs, il se rend dans un donjon de rang D. Malheureusement, l'équipe se retrouve piégée dans une salle avec des monstres qui ne sont pas du tout du niveau du donjon... S'en suit un massacre... Et Sung Jin Woo, aux portes de la mort arrive à acquérir une capacité pour le moins étrange... Sung Jin Woo va-t-il réussir à devenir le plus puissant des Chasseurs tout en surmontant les épreuves et conspirations ?",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    year: 2024,
    type: "TV",
    status: "En cours",
    genres: ["Action", "Fantasy", "Aventure", "Surnaturel"],
    rating: 9.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2024,
        episodes: [
          {
            number: 1,
            title: "Je suis un chasseur de rang E",
            duration: 1440,
            sibnetVostfrId: "5389406",
            sibnetVfId: "5406687"
          },
          {
            number: 2,
            title: "Une porte rouge apparaît",
            duration: 1440,
            sibnetVostfrId: "5397577",
            sibnetVfId: "5415193"
          },
          {
            number: 3,
            title: "Donjon double",
            duration: 1440,
            sibnetVostfrId: "5406329",
            sibnetVfId: "5421450"
          },
          {
            number: 4,
            title: "Le système",
            duration: 1440,
            sibnetVostfrId: "5414604",
            sibnetVfId: "5428347"
          },
          {
            number: 5,
            title: "Niveau supérieur",
            duration: 1440,
            sibnetVostfrId: "5421264",
            sibnetVfId: "5435958"
          },
          {
            number: 6,
            title: "Chasses nocturnes",
            duration: 1440,
            sibnetVostfrId: "5428101",
            sibnetVfId: "5444965"
          },
          {
            number: 7,
            title: "Appel de l'aventure",
            duration: 1440,
            sibnetVostfrId: "5435724",
            sibnetVfId: "5453272"
          },
          {
            number: 8,
            title: "Le rang C",
            duration: 1440,
            sibnetVostfrId: "5453063",
            sibnetVfId: "5470652"
          },
          {
            number: 9,
            title: "La tanière des loups",
            duration: 1440,
            sibnetVostfrId: "5461770",
            sibnetVfId: "5479612"
          },
          {
            number: 10,
            title: "Progression de compétence",
            duration: 1440,
            sibnetVostfrId: "5470382",
            sibnetVfId: "5496084"
          },
          {
            number: 11,
            title: "Raid de haut rang",
            duration: 1440,
            sibnetVostfrId: "5479260",
            sibnetVfId: "5504016"
          },
          {
            number: 12,
            title: "La tour de puissance",
            duration: 1440,
            sibnetVostfrId: "5487838",
            sibnetVfId: "5511308"
          }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2024,
        episodes: [
          {
            number: 1,
            title: "Le Retour du Chasseur",
            duration: 1440,
            sibnetVostfrId: "5790524",
            sibnetVfId: "5806748"
          },
          {
            number: 2,
            title: "Nouveau Pouvoir",
            duration: 1440,
            sibnetVostfrId: "5795961",
            sibnetVfId: "5812653"
          },
          {
            number: 3,
            title: "La Menace Grandissante",
            duration: 1440,
            sibnetVostfrId: "5801411",
            sibnetVfId: "5819532"
          },
          {
            number: 4,
            title: "Alliance Inattendue",
            duration: 1440,
            sibnetVostfrId: "5806488",
            sibnetVfId: "5826552"
          },
          {
            number: 5,
            title: "Le Secret de la Tour",
            duration: 1440,
            sibnetVostfrId: "5811885",
            sibnetVfId: "5834007"
          },
          {
            number: 6,
            title: "Confrontation",
            duration: 1440,
            sibnetVostfrId: "5819034",
            sibnetVfId: "5839458"
          },
          {
            number: 7,
            title: "L'Ascension",
            duration: 1440,
            sibnetVostfrId: "5825877",
            sibnetVfId: "5845865"
          },
          {
            number: 8,
            title: "Vérité Cachée",
            duration: 1440,
            sibnetVostfrId: "5832048",
            sibnetVfId: "5851984"
          },
          {
            number: 9,
            title: "Le Test Final",
            duration: 1440,
            sibnetVostfrId: "5839080",
            sibnetVfId: "5857932"
          },
          {
            number: 10,
            title: "Force Ultime",
            duration: 1440,
            sibnetVostfrId: "5845645",
            sibnetVfId: "11000111"
          },
          {
            number: 11,
            title: "Révélation",
            duration: 1440,
            sibnetVostfrId: "5851330",
            sibnetVfId: "111000000011"
          },
          {
            number: 12,
            title: "Nouveau Départ",
            duration: 1440,
            sibnetVostfrId: "5857706",
            sibnetVfId: "111100001"
          }
        ]
      }
    ]
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    originalTitle: "鬼滅の刃",
    description: "Dans un Japon de l'ère Taishō, Tanjirō Kamado est le fils aîné d'une famille de marchands de charbon dont le père est décédé. Pour subvenir aux besoins de celle-ci, il vend du charbon au village en contrebas de la montagne où ils habitent. Malgré les difficultés de la vie, ils réussissent à trouver le bonheur dans leur quotidien. Un jour, Tanjirō se rend au village et, à cause d'une rumeur à propos d'un démon mangeur d'hommes qui rôderait la nuit dans les montagnes, il est forcé de passer la nuit chez un habitant du village. À son retour le lendemain, il découvre sa famille massacrée par un démon. Seule sa sœur Nezuko a survécu à l'attaque, mais elle a été transformée en démon. Cependant, elle parvient à résister à son instinct et à ne pas attaquer son frère.",
    imageUrl: "https://ext.same-assets.com/3039906599/884967313.jpeg",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
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
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
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
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
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
  },
  {
    id: "kuroko-no-basket",
    title: "Kuroko no Basket",
    originalTitle: "黒子のバスケ",
    description: "Kuroko est un joueur de basket-ball qui a fait partie de l'équipe du collège Teikô, une équipe qui a remporté tous les championnats depuis trois ans. Les cinq meilleurs joueurs de cette équipe étaient connus sous le nom de 'Génération des Miracles'. Kuroko était le sixième joueur fantôme de cette équipe. Personne ne le remarque sur le terrain à cause de son manque de présence. Kuroko a intégré le lycée Seirin et fait désormais équipe avec Kagami Taiga, un joueur très prometteur qui a vécu aux États-Unis, pour faire de Seirin la meilleure équipe du Japon.",
    imageUrl: "https://images.justwatch.com/poster/181383869/s166/kuroko-no-basket.avif",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    year: 2012,
    type: "TV",
    status: "Terminé",
    genres: ["Sports", "Comédie", "Drame", "École"],
    rating: 8.7,
    episodes: [
      {
        number: 1,
        title: "Je suis Kuroko",
        duration: 1440,
        sibnetVostfrId: "4737805",
        sibnetVfId: "knb1ep1fr"
      },
      {
        number: 2,
        title: "Je suis sérieux",
        duration: 1440,
        sibnetVostfrId: "4737812",
        sibnetVfId: "knb1ep2fr"
      }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2012,
        episodes: [
          { number: 1, title: "Je suis Kuroko", duration: 1440, sibnetVostfrId: "4737805", sibnetVfId: "knb1ep1fr" },
          { number: 2, title: "Je suis sérieux", duration: 1440, sibnetVostfrId: "4737812", sibnetVfId: "knb1ep2fr" },
          { number: 3, title: "La victoire est toujours importante", duration: 1440, sibnetVostfrId: "4737817", sibnetVfId: "knb1ep3fr" },
          { number: 4, title: "Rien n'est impossible", duration: 1440, sibnetVostfrId: "4737823", sibnetVfId: "knb1ep4fr" },
          { number: 5, title: "Ta basket est trop vieille", duration: 1440, sibnetVostfrId: "4737830", sibnetVfId: "knb1ep5fr" },
          { number: 6, title: "Faisons-le", duration: 1440, sibnetVostfrId: "4737836", sibnetVfId: "knb1ep6fr" },
          { number: 7, title: "Tu as beaucoup de jugeote", duration: 1440, sibnetVostfrId: "4737843", sibnetVfId: "knb1ep7fr" },
          { number: 8, title: "Je suis vraiment jaloux", duration: 1440, sibnetVostfrId: "4737848", sibnetVfId: "knb1ep8fr" },
          { number: 9, title: "Tu ferais bien de gagner", duration: 1440, sibnetVostfrId: "4737852", sibnetVfId: "knb1ep9fr" },
          { number: 10, title: "Je lui montrerai", duration: 1440, sibnetVostfrId: "4737857", sibnetVfId: "knb1ep10fr" },
          { number: 11, title: "Commençons", duration: 1440, sibnetVostfrId: "4737865", sibnetVfId: "knb1ep11fr" },
          { number: 12, title: "Franchement, je déteste ça", duration: 1440, sibnetVostfrId: "4737888", sibnetVfId: "knb1ep12fr" },
          { number: 13, title: "Je ne peux pas lire son mental", duration: 1440, sibnetVostfrId: "4737905", sibnetVfId: "knb1ep13fr" },
          { number: 14, title: "Vous avez eu tort de m'en vouloir", duration: 1440, sibnetVostfrId: "4737923", sibnetVfId: "knb1ep14fr" },
          { number: 15, title: "Nous n'avons pas fini", duration: 1440, sibnetVostfrId: "4737938", sibnetVfId: "knb1ep15fr" },
          { number: 16, title: "Laissez-moi vous raconter", duration: 1440, sibnetVostfrId: "4737947", sibnetVfId: "knb1ep16fr" },
          { number: 17, title: "Tu m'as battu", duration: 1440, sibnetVostfrId: "4737952", sibnetVfId: "knb1ep17fr" },
          { number: 18, title: "Vous allez comprendre pourquoi", duration: 1440, sibnetVostfrId: "4737955", sibnetVfId: "knb1ep18fr" },
          { number: 19, title: "C'est pas pour des prunes", duration: 1440, sibnetVostfrId: "4737957", sibnetVfId: "knb1ep19fr" },
          { number: 20, title: "Je ne peux pas le croire", duration: 1440, sibnetVostfrId: "4737960", sibnetVfId: "knb1ep20fr" },
          { number: 21, title: "Essaie de me dépasser", duration: 1440, sibnetVostfrId: "4737964", sibnetVfId: "knb1ep21fr" },
          { number: 22, title: "Je suis pas un gamin", duration: 1440, sibnetVostfrId: "4737966", sibnetVfId: "knb1ep22fr" },
          { number: 23, title: "Je suis le meilleur joueur", duration: 1440, sibnetVostfrId: "4737969", sibnetVfId: "knb1ep23fr" },
          { number: 24, title: "Ne me fais pas rire", duration: 1440, sibnetVostfrId: "4737970", sibnetVfId: "knb1ep24fr" },
          { number: 25, title: "C'est le moment de bondir", duration: 1440, sibnetVostfrId: "4737973", sibnetVfId: "knb1ep25fr" },
          { number: 26, title: "Rendez-vous l'hiver prochain", duration: 1440, sibnetVostfrId: "4737979", sibnetVfId: "knb1ep26fr" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2013,
        episodes: [
          { number: 1, title: "Je suis de retour", duration: 1440, sibnetVostfrId: "knb2ep1", sibnetVfId: "knb2ep1fr" },
          { number: 2, title: "On recommence", duration: 1440, sibnetVostfrId: "knb2ep2", sibnetVfId: "knb2ep2fr" },
          { number: 3, title: "Nouveaux défis", duration: 1440, sibnetVostfrId: "knb2ep3", sibnetVfId: "knb2ep3fr" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2015,
        episodes: [
          { number: 1, title: "La Winter Cup commence", duration: 1440, sibnetVostfrId: "knb3ep1", sibnetVfId: "knb3ep1fr" },
          { number: 2, title: "La finale approche", duration: 1440, sibnetVostfrId: "knb3ep2", sibnetVfId: "knb3ep2fr" },
          { number: 3, title: "Le dernier match", duration: 1440, sibnetVostfrId: "knb3ep3", sibnetVfId: "knb3ep3fr" }
        ]
      }
    ]
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    originalTitle: "ヴィンランド・サガ",
    description: "Thorfinn est le fils d'un des plus grands guerriers vikings, mais lorsque son père est tué par Askeladd, un chef mercenaire, il jure de se venger. Il rejoint l'équipage d'Askeladd pour le défier en duel et le tuer, mais il se retrouve entraîné dans la guerre politique pour la couronne d'Angleterre. Pendant tout ce temps, Thorfinn doit se retrouver et comprendre ce que signifie être un vrai guerrier.",
    imageUrl: "https://ext.same-assets.com/4165707166/2193428669.jpeg",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    year: 2019,
    type: "TV",
    status: "En cours",
    genres: ["Action", "Aventure", "Drame", "Historique"],
    rating: 8.9,
    episodes: [
      {
        number: 1,
        title: "Quelque part, pas ici",
        duration: 1440,
        sibnetVostfrId: "vs1ep1",
        sibnetVfId: "vs1ep1fr"
      },
      {
        number: 2,
        title: "L'épée",
        duration: 1440,
        sibnetVostfrId: "vs1ep2",
        sibnetVfId: "vs1ep2fr"
      }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "Quelque part, pas ici", duration: 1440, sibnetVostfrId: "vs1ep1", sibnetVfId: "vs1ep1fr" },
          { number: 2, title: "L'épée", duration: 1440, sibnetVostfrId: "vs1ep2", sibnetVfId: "vs1ep2fr" },
          { number: 3, title: "Le troll", duration: 1440, sibnetVostfrId: "vs1ep3", sibnetVfId: "vs1ep3fr" },
          { number: 4, title: "Une véritable guerrière", duration: 1440, sibnetVostfrId: "vs1ep4", sibnetVfId: "vs1ep4fr" },
          { number: 5, title: "La mission", duration: 1440, sibnetVostfrId: "vs1ep5", sibnetVfId: "vs1ep5fr" },
          { number: 6, title: "L'expédition commence", duration: 1440, sibnetVostfrId: "vs1ep6", sibnetVfId: "vs1ep6fr" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2 - L'ère esclave",
        year: 2023,
        episodes: [
          { number: 1, title: "Esclave", duration: 1440, sibnetVostfrId: "vs2ep1", sibnetVfId: "vs2ep1fr" },
          { number: 2, title: "Une nouvelle vie", duration: 1440, sibnetVostfrId: "vs2ep2", sibnetVfId: "vs2ep2fr" },
          { number: 3, title: "La ferme", duration: 1440, sibnetVostfrId: "vs2ep3", sibnetVfId: "vs2ep3fr" }
        ]
      }
    ]
  }
];

// Ajout de Solo Leveling saison 2 avec les IDs Sibnet
export const soloLevelingSeason2: Anime = {
  id: "solo-leveling-2",
  title: "Solo Leveling",
  originalTitle: "나 혼자만 레벨업",
  description: "Suite des aventures de Sung Jin-Woo, le seul chasseur à pouvoir monter de niveau dans un monde où les chasseurs doivent combattre des monstres mortels issus de portails.",
  type: "TV",
  status: "En cours",
  year: 2024,
  seasons: [
    {
      seasonNumber: 2,
      title: "Saison 2",
      year: 2024,
      episodes: [
        {
          number: 1,
          title: "Le Retour du Chasseur",
          duration: 1440,
          sibnetVostfrId: "5790524",
          sibnetVfId: "5806748"
        },
        {
          number: 2,
          title: "Nouveau Pouvoir",
          duration: 1440,
          sibnetVostfrId: "5795961",
          sibnetVfId: "5812653"
        },
        {
          number: 3,
          title: "La Menace Grandissante",
          duration: 1440,
          sibnetVostfrId: "5801411",
          sibnetVfId: "5819532"
        },
        {
          number: 4,
          title: "Alliance Inattendue",
          duration: 1440,
          sibnetVostfrId: "5806488",
          sibnetVfId: "5826552"
        },
        {
          number: 5,
          title: "Le Secret de la Tour",
          duration: 1440,
          sibnetVostfrId: "5811885",
          sibnetVfId: "5834007"
        },
        {
          number: 6,
          title: "Confrontation",
          duration: 1440,
          sibnetVostfrId: "5819034",
          sibnetVfId: "5839458"
        },
        {
          number: 7,
          title: "L'Ascension",
          duration: 1440,
          sibnetVostfrId: "5825877",
          sibnetVfId: "5845865"
        },
        {
          number: 8,
          title: "Vérité Cachée",
          duration: 1440,
          sibnetVostfrId: "5832048",
          sibnetVfId: "5851984"
        },
        {
          number: 9,
          title: "Le Test Final",
          duration: 1440,
          sibnetVostfrId: "5839080",
          sibnetVfId: "5857932"
        },
        {
          number: 10,
          title: "Force Ultime",
          duration: 1440,
          sibnetVostfrId: "5845645",
          sibnetVfId: "5845865"
        },
        {
          number: 11,
          title: "Révélation",
          duration: 1440,
          sibnetVostfrId: "5851330",
          sibnetVfId: "5851984"
        },
        {
          number: 12,
          title: "Nouveau Départ",
          duration: 1440,
          sibnetVostfrId: "5857706",
          sibnetVfId: "5857932"
        }
      ]
    }
  ],
  genres: ["Action", "Aventure", "Fantasy", "Surnaturel"],
  rating: 9.2,
  imageUrl: "/picture/animes/solo-leveling.jpg",
  bannerUrl: "/picture/bannieres/solo-leveling-banner.jpg"
}; 