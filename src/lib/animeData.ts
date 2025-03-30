// Types pour les données d'anime
export interface AnimeEpisode {
  number: number;
  title: string;
  duration: number;
  sibnetVostfrId?: string;
  sibnetVfId?: string;
  smoothpreUrl?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  vidmolyVfId?: string;
}

export interface AnimeSeason {
  seasonNumber: number | string;
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
    return animes.find(anime => anime.id === "solo-leveling");
  }
  return animes.find(anime => anime.id === id);
}

// Fonction pour récupérer tous les animes du catalogue
export function getAllAnimes() {
  return animes;
}

// Fonction pour récupérer tous les animes
export function getAllAnimesFromList(): Anime[] {
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
    bannerUrl: "/picture/bassembanniere.png",
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
          { number: 1, title: "Je suis un chasseur de rang E", duration: 1440, sibnetVostfrId: "5389406", sibnetVfId: "5406687" },
          { number: 2, title: "Une porte rouge apparaît", duration: 1440, sibnetVostfrId: "5397577", sibnetVfId: "5415193" },
          { number: 3, title: "Donjon double", duration: 1440, sibnetVostfrId: "5406329", sibnetVfId: "5421450" },
          { number: 4, title: "Le système", duration: 1440, sibnetVostfrId: "5414604", sibnetVfId: "5428347" },
          { number: 5, title: "Niveau supérieur", duration: 1440, sibnetVostfrId: "5421264", sibnetVfId: "5435958" },
          { number: 6, title: "Chasses nocturnes", duration: 1440, sibnetVostfrId: "5428101", sibnetVfId: "5444965" },
          { number: 7, title: "Appel de l'aventure", duration: 1440, sibnetVostfrId: "5435724", sibnetVfId: "5453272" },
          { number: 8, title: "Le rang C", duration: 1440, sibnetVostfrId: "5453063", sibnetVfId: "5470652" },
          { number: 9, title: "La tanière des loups", duration: 1440, sibnetVostfrId: "5462021", sibnetVfId: "5479018" },
          { number: 10, title: "Le carnaval des ombres", duration: 1440, sibnetVostfrId: "5479008", sibnetVfId: "5499235" },
          { number: 11, title: "Je suis devenu plus fort", duration: 1440, sibnetVostfrId: "5544078", sibnetVfId: "5574694" },
          { number: 12, title: "Le retour du rang S", duration: 1440, sibnetVostfrId: "5545895", sibnetVfId: "5574694" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2024,
        episodes: [
          { number: 1, title: "Le Retour du Chasseur", duration: 1440, sibnetVostfrId: "5790524", sibnetVfId: "5806748" },
          { number: 2, title: "Nouveau Pouvoir", duration: 1440, sibnetVostfrId: "5795961", sibnetVfId: "5812653" },
          { number: 3, title: "La Menace Grandissante", duration: 1440, sibnetVostfrId: "5801411", sibnetVfId: "5819532" },
          { number: 4, title: "Alliance Inattendue", duration: 1440, sibnetVostfrId: "5806488", sibnetVfId: "5826552" },
          { number: 5, title: "Le Secret de la Tour", duration: 1440, sibnetVostfrId: "5811885", sibnetVfId: "5834007" },
          { number: 6, title: "Confrontation", duration: 1440, sibnetVostfrId: "5819034", sibnetVfId: "5839458" },
          { number: 7, title: "L'Ascension", duration: 1440, sibnetVostfrId: "5825877", sibnetVfId: "5845865" },
          { number: 8, title: "Vérité Cachée", duration: 1440, sibnetVostfrId: "5832048", sibnetVfId: "5851984" },
          { number: 9, title: "Le Test Final", duration: 1440, sibnetVostfrId: "5839080", sibnetVfId: "5857932" },
          { number: 10, title: "Force Ultime", duration: 1440, sibnetVostfrId: "5845645", sibnetVfId: "11000111" },
          { number: 11, title: "Révélation", duration: 1440, sibnetVostfrId: "5851330", sibnetVfId: "111000000011" },
          { number: 12, title: "Nouveau Départ", duration: 1440, sibnetVostfrId: "5857706", sibnetVfId: "111100001" },
          { number: 13, title: "Nouveau Départ 2", duration: 1440, sibnetVostfrId: "5863647", sibnetVfId: "111100001" }
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
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "TV",
    status: "Terminé",
    genres: ["Action", "Aventure", "Historique", "Fantastique"],
    rating: 9.5,
    episodes: [
      { number: 1, title: "Cruauté", duration: 1440, sibnetVostfrId: "abcdef123", sibnetVfId: "123456abc" },
      { number: 2, title: "Sabre du démon", duration: 1440, sibnetVostfrId: "ghijkl456", sibnetVfId: "789012def" }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "Cruauté", duration: 1420, sibnetVostfrId: "4668120", sibnetVfId: "4668241" },
          { number: 2, title: "Urokodaki Sakonji, le formateur", duration: 1420, sibnetVostfrId: "4668131", sibnetVfId: "4668280" },
          { number: 3, title: "Sabito et Makomo", duration: 1420, sibnetVostfrId: "4668135", sibnetVfId: "4668284" },
          { number: 4, title: "La Sélection finale", duration: 1420, sibnetVostfrId: "4668139", sibnetVfId: "4668287" },
          { number: 5, title: "Chacun son acier", duration: 1420, sibnetVostfrId: "4668143", sibnetVfId: "4668289" },
          { number: 6, title: "Le chasseur accompagné d'un démon", duration: 1420, sibnetVostfrId: "4668146", sibnetVfId: "4668291" },
          { number: 7, title: "Kibutsuji Muzan", duration: 1420, sibnetVostfrId: "4668149", sibnetVfId: "4668293" },
          { number: 8, title: "Le Parfum du sang d'envoûtement", duration: 1420, sibnetVostfrId: "4668152", sibnetVfId: "4668298" },
          { number: 9, title: "Les Démons aux ballons et aux flèches", duration: 1420, sibnetVostfrId: "4668154", sibnetVfId: "4668299" },
          { number: 10, title: "Nous resterons ensemble", duration: 1420, sibnetVostfrId: "4668157", sibnetVfId: "4668304" },
          { number: 11, title: "La Maison aux tambours", duration: 1420, sibnetVostfrId: "4668162", sibnetVfId: "4668308" },
          { number: 12, title: "Zen'itsu dort, le sanglier montre les crocs", duration: 1420, sibnetVostfrId: "4668168", sibnetVfId: "4668313" },
          { number: 13, title: "Ce à quoi je tiens plus qu'à ma vie", duration: 1420, sibnetVostfrId: "4668174", sibnetVfId: "4668320" },
          { number: 14, title: "Le Blason des glycines", duration: 1420, sibnetVostfrId: "4668180", sibnetVfId: "4668327" },
          { number: 15, title: "Le Mont Natagumo", duration: 1420, sibnetVostfrId: "4668185", sibnetVfId: "4668332" },
          { number: 16, title: "Faire passer les autres avant soi", duration: 1420, sibnetVostfrId: "4668191", sibnetVfId: "4668339" },
          { number: 17, title: "Parfaire une seule technique", duration: 1420, sibnetVostfrId: "4668198", sibnetVfId: "4668344" },
          { number: 18, title: "Des liens factices", duration: 1420, sibnetVostfrId: "4668203", sibnetVfId: "4668349" },
          { number: 19, title: "Le Dieu du feu 🔥", duration: 1420, sibnetVostfrId: "4668210", sibnetVfId: "4668358" },
          { number: 20, title: "Une famille improvisée", duration: 1420, sibnetVostfrId: "4668212", sibnetVfId: "4668363" },
          { number: 21, title: "Violation du code", duration: 1420, sibnetVostfrId: "4668216", sibnetVfId: "4668369" },
          { number: 22, title: "Le Maître", duration: 1420, sibnetVostfrId: "4668223", sibnetVfId: "4668375" },
          { number: 23, title: "La Réunion des piliers", duration: 1420, sibnetVostfrId: "4668225", sibnetVfId: "4668379" },
          { number: 24, title: "L'Entraînement récupérateur", duration: 1420, sibnetVostfrId: "4668227", sibnetVfId: "4668384" },
          { number: 25, title: "Tsuyuri Kanao, la successeuse", duration: 1420, sibnetVostfrId: "4668229", sibnetVfId: "4668387" },
          { number: 26, title: "Nouvelle mission", duration: 1420, sibnetVostfrId: "4668230", sibnetVfId: "4668389" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2021,
        episodes: [
          { number: 1, title: "Le train de l'Infini", duration: 1440, sibnetVostfrId: "4825545", sibnetVfId: "4708131" }
        ]
      },
      {
        seasonNumber: "Train de l'Infini",
        title: "Épisode - Train de l'Infini",
        year: 2021,
        episodes: [
          { number: 1, title: "Le village caché", duration: 1440, sibnetVostfrId: "ds3ep1", sibnetVfId: "ds3ep1fr" },
          { number: 2, title: "Les forgerons", duration: 1440, sibnetVostfrId: "ds3ep2", sibnetVfId: "ds3ep2fr" },
          { number: 3, title: "L'attaque des démons", duration: 1440, sibnetVostfrId: "ds3ep3", sibnetVfId: "ds3ep3fr" }

        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2020,
        episodes: [
          { number: 1, title: "Le Démon, Partie 1", duration: 1440, sibnetVostfrId: "4667143", sibnetVfId: "4699607" },
          { number: 2, title: "Le Démon, Partie 2", duration: 1440, sibnetVostfrId: "4667145", sibnetVfId: "4699609" },
          { number: 3, title: "Le Démon, Partie 3", duration: 1440, sibnetVostfrId: "4667146", sibnetVfId: "4699611" },
          { number: 4, title: "Le Démon, Partie 4", duration: 1440, sibnetVostfrId: "4667148", sibnetVfId: "4699612" },
          { number: 5, title: "Le Démon, Partie 5", duration: 1440, sibnetVostfrId: "4667149", sibnetVfId: "4699613" },
          { number: 6, title: "Le Démon, Partie 6", duration: 1440, sibnetVostfrId: "4667151", sibnetVfId: "4699614" },
          { number: 7, title: "Le Démon, Partie 7", duration: 1440, sibnetVostfrId: "4667153", sibnetVfId: "4699616" },
          { number: 8, title: "Le Démon, Partie 8", duration: 1440, sibnetVostfrId: "4667156", sibnetVfId: "4699618" },
          { number: 9, title: "Le Démon, Partie 9", duration: 1440, sibnetVostfrId: "4667157", sibnetVfId: "4699620" },
          { number: 10, title: "Le Démon, Partie 10", duration: 1440, sibnetVostfrId: "4667164", sibnetVfId: "4699622" },
          { number: 11, title: "Le Démon, Partie 11", duration: 1440, sibnetVostfrId: "4667165", sibnetVfId: "4699625" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2022,
        episodes: [
          { number: 1, title: "Le Démon, Partie 12", duration: 1440, sibnetVostfrId: "5101293", sibnetVfId: "5123652" },
          { number: 2, title: "Le Démon, Partie 13", duration: 1440, sibnetVostfrId: "5107783", sibnetVfId: "5129278" },
          { number: 3, title: "Le Démon, Partie 14", duration: 1440, sibnetVostfrId: "5115500", sibnetVfId: "5139733" },
          { number: 4, title: "Le Démon, Partie 15", duration: 1440, sibnetVostfrId: "5122356", sibnetVfId: "5148655" },
          { number: 5, title: "Le Démon, Partie 16", duration: 1440, sibnetVostfrId: "5129066", sibnetVfId: "5155200" },
          { number: 6, title: "Le Démon, Partie 17", duration: 1440, sibnetVostfrId: "5139273", sibnetVfId: "5162155" },
          { number: 7, title: "Le Démon, Partie 18", duration: 1440, sibnetVostfrId: "5148330", sibnetVfId: "5168755" },
          { number: 8, title: "Le Démon, Partie 19", duration: 1440, sibnetVostfrId: "5155057", sibnetVfId: "5175891" },
          { number: 9, title: "Le Démon, Partie 20", duration: 1440, sibnetVostfrId: "5162019", sibnetVfId: "5181163" },
          { number: 10, title: "Le Démon, Partie 21", duration: 1440, sibnetVostfrId: "5168522", sibnetVfId: "5186530" },
          { number: 11, title: "Le Démon, Partie 22", duration: 1440, sibnetVostfrId: "5175809", sibnetVfId: "5193486" }
        ]
      },
      {
        seasonNumber: 4,
        title: "Saison 4",
        year: 2024,
        episodes: [
          { number: 1, title: "Pour vaincre Kibutsuji Muzan", duration: 1440, sibnetVostfrId: "5533798", sibnetVfId: "5558735" },
          { number: 2, title: "La Souffrance de Tomioka Giyû, pilier de l'eau", duration: 1440, sibnetVostfrId: "5540224", sibnetVfId: "5565316" },
          { number: 3, title: "Tanjiro est rétabli et se joint à l'entraînement", duration: 1440, sibnetVostfrId: "5546321", sibnetVfId: "5574503" },
          { number: 4, title: "Souris", duration: 1440, sibnetVostfrId: "5552382", sibnetVfId: "5582223" },
          { number: 5, title: "Manger des démons", duration: 1440, sibnetVostfrId: "5558041", sibnetVfId: "5589758" },
          { number: 6, title: "Le Plus Fort des pourfendeurs", duration: 1440, sibnetVostfrId: "5565081", sibnetVfId: "5597263" },
          { number: 7, title: "Himejima Gyômei, pilier du rocher", duration: 1440, sibnetVostfrId: "5573417", sibnetVfId: "5606165" },
          { number: 8, title: "Rassemblement des piliers", duration: 1440, sibnetVostfrId: "5581267", sibnetVfId: "5613056" }
        ]
      }
    ]
  },
  {
    id: "akudama-drive",
    title: "Akudama Drive",
    originalTitle: "アクダマドライブ",
    description: "Dans une ville cyberpunk de Kansai, suite à une guerre entre Kansai et Kantō, Kansai est devenu dépendant économiquement de Kantō. Dans cette société, des criminels connus sous le nom d'Akudama commettent toutes sortes de crimes. L'histoire suit une fille ordinaire qui se retrouve impliquée avec un groupe d'Akudama, après avoir été confondue avec l'un d'entre eux.",
    imageUrl: "https://ext.same-assets.com/3410839635/1638134647.jpeg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2020,
    type: "TV",
    status: "Terminé",
    genres: ["Action", "Science-fiction", "Dystopie"],
    rating: 8.7,
    episodes: [
      { number: 1, title: "SE7EN", duration: 1440, sibnetVostfrId: "akudama123", sibnetVfId: "akudama123fr" },
      { number: 2, title: "Reservoir Dogs", duration: 1440, sibnetVostfrId: "akudama456", sibnetVfId: "akudama456fr" }
      // Ajoutez d'autres épisodes selon vos besoins
    ]
  },
  {
    id: "welcome-demon-school-teacher",
    title: "Welcome, Demon-School Teacher!",
    originalTitle: "魔入りました！入間くん",
    description: "Iruma Suzuki est un adolescent de 14 ans qui est vendu à un démon par ses parents. Le démon, connu sous le nom de Sullivan, emmène Iruma dans le monde des démons et l'adopte officiellement comme son petit-fils. Il l'inscrit à l'école des démons Babyls où Iruma doit cacher qu'il est humain sous peine d'être mangé par les autres élèves. Sous l'aile de Sullivan, président de l'école, Iruma commence sa vie scolaire fantastique entouré d'êtres uniques tout en cachant son identité humaine.",
    imageUrl: "https://ext.same-assets.com/3692778002/4215009052.jpeg",
    bannerUrl: "/picture/bassembanniere.png",
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
    bannerUrl: "/picture/bassembanniere.png",
    year: 2012,
    type: "TV",
    status: "Terminé",
    genres: ["Sports", "Comédie", "Drame", "École"],
    rating: 8.7,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2012,
        episodes: [
            { number: 1, title: "Je suis Kuroko", duration: 1440, sibnetVostfrId: "4737805", sibnetVfId: "4738641" },
            { number: 2, title: "Je suis sérieux", duration: 1440, sibnetVostfrId: "4737812", sibnetVfId: "4738646" },
            { number: 3, title: "La victoire est toujours importante", duration: 1440, sibnetVostfrId: "4737817", sibnetVfId: "4738651" },
            { number: 4, title: "Rien n'est impossible", duration: 1440, sibnetVostfrId: "4737823", sibnetVfId: "4738657" },
            { number: 5, title: "Ta basket est trop vieille", duration: 1440, sibnetVostfrId: "4737830", sibnetVfId: "4738660" },
            { number: 6, title: "Faisons-le", duration: 1440, sibnetVostfrId: "4737836", sibnetVfId: "4738665" },
            { number: 7, title: "Tu as beaucoup de jugeote", duration: 1440, sibnetVostfrId: "4737843", sibnetVfId: "4738668" },
            { number: 8, title: "Je suis vraiment jaloux", duration: 1440, sibnetVostfrId: "4737848", sibnetVfId: "4738671" },
            { number: 9, title: "Tu ferais bien de gagner", duration: 1440, sibnetVostfrId: "4737852", sibnetVfId: "4738675" },
            { number: 10, title: "Je lui montrerai", duration: 1440, sibnetVostfrId: "4737857", sibnetVfId: "4738679" },
            { number: 11, title: "Commençons", duration: 1440, sibnetVostfrId: "4737865", sibnetVfId: "4738683" },
            { number: 12, title: "Franchement, je déteste ça", duration: 1440, sibnetVostfrId: "4737888", sibnetVfId: "4738687" },
            { number: 13, title: "Je ne peux pas lire son mental", duration: 1440, sibnetVostfrId: "4737905", sibnetVfId: "4738691" },
            { number: 14, title: "Vous avez eu tort de m'en vouloir", duration: 1440, sibnetVostfrId: "4737923", sibnetVfId: "4738696" },
            { number: 15, title: "Nous n'avons pas fini", duration: 1440, sibnetVostfrId: "4737938", sibnetVfId: "4738698" },
            { number: 16, title: "Laissez-moi vous raconter", duration: 1440, sibnetVostfrId: "4737947", sibnetVfId: "4738700" },
            { number: 17, title: "Tu m'as battu", duration: 1440, sibnetVostfrId: "4737952", sibnetVfId: "4738704" },
            { number: 18, title: "Vous allez comprendre pourquoi", duration: 1440, sibnetVostfrId: "4737955", sibnetVfId: "4738706" },
            { number: 19, title: "C'est pas pour des prunes", duration: 1440, sibnetVostfrId: "4737957", sibnetVfId: "4738710" },
            { number: 20, title: "Je ne peux pas le croire", duration: 1440, sibnetVostfrId: "4737960", sibnetVfId: "4738712" },
            { number: 21, title: "Essaie de me dépasser", duration: 1440, sibnetVostfrId: "4737964", sibnetVfId: "4738714" },
            { number: 22, title: "Je suis pas un gamin", duration: 1440, sibnetVostfrId: "4737966", sibnetVfId: "4738717" },
            { number: 23, title: "Je suis le meilleur joueur", duration: 1440, sibnetVostfrId: "4737969", sibnetVfId: "4738718" },
            { number: 24, title: "Ne me fais pas rire", duration: 1440, sibnetVostfrId: "4737970", sibnetVfId: "4738724" },
            { number: 25, title: "C'est le moment de bondir", duration: 1440, sibnetVostfrId: "4737973", sibnetVfId: "4738730" },
            { number: 26, title: "Rendez-vous l'hiver prochain", duration: 1440, sibnetVostfrId: "4737979", sibnetVfId: "4738735" }
          ]
          
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2013,
        episodes: [
          { number: 1, title: "Le début d'une nouvelle bataille", duration: 1440, sibnetVostfrId: "4737982", sibnetVfId: "3100316" },
          { number: 2, title: "Le retour de l'Empereur", duration: 1440, sibnetVostfrId: "4737984", sibnetVfId: "3100317" },
          { number: 3, title: "Le défi de Midorima", duration: 1440, sibnetVostfrId: "4737987", sibnetVfId: "3100319" },
          { number: 4, title: "La stratégie de Takao", duration: 1440, sibnetVostfrId: "4737991", sibnetVfId: "3100321" },
          { number: 5, title: "Le réveil de l'Empereur", duration: 1440, sibnetVostfrId: "4737993", sibnetVfId: "3100323" },
          { number: 6, title: "Le défi de Kise", duration: 1440, sibnetVostfrId: "4737996", sibnetVfId: "3100324" },
          { number: 7, title: "Le match contre Kaijo", duration: 1440, sibnetVostfrId: "4738000", sibnetVfId: "3100326" },
          { number: 8, title: "La victoire de Seirin", duration: 1440, sibnetVostfrId: "4738002", sibnetVfId: "3100327" },
          { number: 9, title: "Le défi de Murasakibara", duration: 1440, sibnetVostfrId: "4738005", sibnetVfId: "3100329" },
          { number: 10, title: "Le match contre Yosen", duration: 1440, sibnetVostfrId: "4738008", sibnetVfId: "3100330" },
          { number: 11, title: "La stratégie de Himuro", duration: 1440, sibnetVostfrId: "4738011", sibnetVfId: "3100332" },
          { number: 12, title: "Le réveil de Murasakibara", duration: 1440, sibnetVostfrId: "4738013", sibnetVfId: "3100333" },
          { number: 13, title: "Le défi d'Aomine", duration: 1440, sibnetVostfrId: "5010815", sibnetVfId: "3100334" },
          { number: 14, title: "Le match contre Touou", duration: 1440, sibnetVostfrId: "4738017", sibnetVfId: "3100335" },
          { number: 15, title: "La stratégie d'Imayoshi", duration: 1440, sibnetVostfrId: "4738019", sibnetVfId: "3100336" },
          { number: 16, title: "Le réveil d'Aomine", duration: 1440, sibnetVostfrId: "4738027", sibnetVfId: "3100337" },
          { number: 17, title: "Le défi de Kise", duration: 1440, sibnetVostfrId: "4738022", sibnetVfId: "3100339" },
          { number: 18, title: "Le match contre Kaijo", duration: 1440, sibnetVostfrId: "4738048", sibnetVfId: "3100341" },
          { number: 19, title: "La stratégie de Kasamatsu", duration: 1440, sibnetVostfrId: "4738052", sibnetVfId: "3100343" },
          { number: 20, title: "Le réveil de Kise", duration: 1440, sibnetVostfrId: "4738057", sibnetVfId: "3100345" },
          { number: 21, title: "Le défi de Midorima", duration: 1440, sibnetVostfrId: "4738059", sibnetVfId: "3100347" },
          { number: 22, title: "Le match contre Shutoku", duration: 1440, sibnetVostfrId: "4738063", sibnetVfId: "3100350" },
          { number: 23, title: "La stratégie de Takao", duration: 1440, sibnetVostfrId: "4738067", sibnetVfId: "3100352" },
          { number: 24, title: "Le réveil de Midorima", duration: 1440, sibnetVostfrId: "4738068", sibnetVfId: "3100354" },
          { number: 25, title: "Je suis l'ombre", duration: 1440, sibnetVostfrId: "4738070", sibnetVfId: "3100356" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2015,
        episodes: [
          { number: 1, title: "La Winter Cup commence", duration: 1440, sibnetVostfrId: "4738073", sibnetVfId: "3100524" },
          { number: 2, title: "", duration: 1440, sibnetVostfrId: "4738075", sibnetVfId: "3100527" },
          { number: 3, title: "", duration: 1440, sibnetVostfrId: "4738077", sibnetVfId: "3100528" },
          { number: 4, title: "", duration: 1440, sibnetVostfrId: "4738079", sibnetVfId: "3100530" },
          { number: 5, title: "", duration: 1440, sibnetVostfrId: "4738084", sibnetVfId: "3100531" },
          { number: 6, title: "", duration: 1440, sibnetVostfrId: "4738088", sibnetVfId: "3100533" },
          { number: 7, title: "", duration: 1440, sibnetVostfrId: "4738091", sibnetVfId: "3100534" },
          { number: 8, title: "", duration: 1440, sibnetVostfrId: "4738096", sibnetVfId: "3100535" },
          { number: 9, title: "", duration: 1440, sibnetVostfrId: "4738099", sibnetVfId: "3100537" },
          { number: 10, title: "", duration: 1440, sibnetVostfrId: "4738103", sibnetVfId: "3100539" },
          { number: 11, title: "", duration: 1440, sibnetVostfrId: "4738106", sibnetVfId: "3100540" },
          { number: 12, title: "", duration: 1440, sibnetVostfrId: "4738111", sibnetVfId: "3100542" },
          { number: 13, title: "", duration: 1440, sibnetVostfrId: "4738114", sibnetVfId: "3100544" },
          { number: 14, title: "", duration: 1440, sibnetVostfrId: "4738116", sibnetVfId: "3100545" },
          { number: 15, title: "", duration: 1440, sibnetVostfrId: "4738118", sibnetVfId: "3100546" },
          { number: 16, title: "", duration: 1440, sibnetVostfrId: "4738123", sibnetVfId: "3100547" },
          { number: 17, title: "", duration: 1440, sibnetVostfrId: "4738127", sibnetVfId: "3100550" },
          { number: 18, title: "", duration: 1440, sibnetVostfrId: "4738130", sibnetVfId: "3100558" },
          { number: 19, title: "", duration: 1440, sibnetVostfrId: "4738134", sibnetVfId: "3100563" },
          { number: 20, title: "", duration: 1440, sibnetVostfrId: "4738138", sibnetVfId: "3100565" },
          { number: 21, title: "", duration: 1440, sibnetVostfrId: "4738141", sibnetVfId: "3100569" },
          { number: 22, title: "", duration: 1440, sibnetVostfrId: "4738145", sibnetVfId: "3100571" },
          { number: 23, title: "", duration: 1440, sibnetVostfrId: "4738148", sibnetVfId: "3100574" },
          { number: 24, title: "", duration: 1440, sibnetVostfrId: "4738151", sibnetVfId: "3100575" },
          { number: 25, title: "", duration: 1440, sibnetVostfrId: "4738154", sibnetVfId: "3100577" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2017,
        episodes: [
          { number: 1, title: "Kuroko's Basket Last Game", duration: 1440, sibnetVostfrId: "4738157", vidmolyVfId: "i835rhqdf94g" }
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
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "TV",
    status: "En cours",
    genres: ["Action", "Aventure", "Drame", "Historique"],
    rating: 8.9,
    episodes: [
      { number: 1, title: "Quelque part, pas ici", duration: 1440, sibnetVostfrId: "vs1ep1", sibnetVfId: "vs1ep1fr" },
      { number: 2, title: "L'épée", duration: 1440, sibnetVostfrId: "vs1ep2", sibnetVfId: "vs1ep2fr" }
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
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    originalTitle: "呪術廻戦",
    description: "Plus de 10 000 morts et disparus sont recensés chaque année au Japon. Les sentiments négatifs que relâchent les êtres humains sont en cause. Souffrance, regrets, humiliation : leur concentration dans un même endroit engendre des malédictions souvent mortelles. Yuji Itadori, lycéen et membre du club d'occultisme, avale le doigt découpé d'un démon millénaire pour briser une malédiction. Maintenant possédé par Ryômen Sukuna, le célèbre démon à deux visages, il parvient étonnamment à garder le contrôle de son corps. Condamné à mort par l'organisation des exorcistes, il ne pourra survivre qu'à condition de trouver tous les doigts de Sukuna afin d'écarter la menace une bonne fois pour toutes.",
    imageUrl: "https://ext.same-assets.com/2879165773/327560351.jpeg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2020,
    type: "TV",
    status: "En cours",
    genres: ["Action", "Aventure", "School Life", "Yokai", "Surnaturel", "Magie", "Mystère", "Shônen"],
    rating: 8.8,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2020,
        episodes: [
          { number: 1, title: "Ryomen Sukuna", duration: 1440, sibnetVostfrId: "4667514", sibnetVfId: "4668025" },
          { number: 2, title: "Pour moi-même", duration: 1440, sibnetVostfrId: "4667523", sibnetVfId: "4668028" },
          { number: 3, title: "La fille au volant", duration: 1440, sibnetVostfrId: "4667532", sibnetVfId: "4668029" },
          { number: 4, title: "Peine de mort", duration: 1440, sibnetVostfrId: "4667548", sibnetVfId: "4668030" },
          { number: 5, title: "Le bien et le mal", duration: 1440, sibnetVostfrId: "4667557", sibnetVfId: "4668034" },
          { number: 6, title: "Après la pluie", duration: 1440, sibnetVostfrId: "4667566", sibnetVfId: "4668035" },
          { number: 7, title: "Assaut", duration: 1440, sibnetVostfrId: "4667578", sibnetVfId: "4668038" },
          { number: 8, title: "Bonne volonté", duration: 1440, sibnetVostfrId: "4667599", sibnetVfId: "4668040" },
          { number: 9, title: "Petit poisson et Écorcheur", duration: 1440, sibnetVostfrId: "4667621", sibnetVfId: "4668042" },
          { number: 10, title: "Délire mutuel", duration: 1440, sibnetVostfrId: "4667634", sibnetVfId: "4668044" },
          { number: 11, title: "En sommeil", duration: 1440, sibnetVostfrId: "4667642", sibnetVfId: "4668049" },
          { number: 12, title: "Le tournoi de l'éveil", duration: 1440, sibnetVostfrId: "4667648", sibnetVfId: "4668055" },
          { number: 13, title: "Demain", duration: 1440, sibnetVostfrId: "4667656", sibnetVfId: "4668061" },
          { number: 14, title: "Kyoto Sister School Exchange Event - Team Battle 0 -", duration: 1440, sibnetVostfrId: "4667663", sibnetVfId: "4668066" },
          { number: 15, title: "Kyoto Sister School Exchange Event - Group Battle 1 -", duration: 1440, sibnetVostfrId: "4667667", sibnetVfId: "4668072" },
          { number: 16, title: "Kyoto Sister School Exchange Event - Group Battle 2 -", duration: 1440, sibnetVostfrId: "4667673", sibnetVfId: "4668077" },
          { number: 17, title: "Kyoto Sister School Exchange Event - Group Battle 3 -", duration: 1440, sibnetVostfrId: "4667683", sibnetVfId: "4668081" },
          { number: 18, title: "La répétition", duration: 1440, sibnetVostfrId: "4667689", sibnetVfId: "4668084" },
          { number: 19, title: "Black Flash", duration: 1440, sibnetVostfrId: "4667696", sibnetVfId: "4668086" },
          { number: 20, title: "Irresponsabilité", duration: 1440, sibnetVostfrId: "4667717", sibnetVfId: "4668089" },
          { number: 21, title: "Jujutsu Koshien", duration: 1440, sibnetVostfrId: "4667725", sibnetVfId: "4668092" },
          { number: 22, title: "Le prix des malédictions", duration: 1440, sibnetVostfrId: "4667735", sibnetVfId: "4668096" },
          { number: 23, title: "Le péché de l'origine", duration: 1440, sibnetVostfrId: "4667746", sibnetVfId: "4668102" },
          { number: 24, title: "Réplique", duration: 1440, sibnetVostfrId: "4667756", sibnetVfId: "4668111" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2023,
        episodes: [
          { number: 1, title: "Fuji de nuit", duration: 1440, sibnetVostfrId: "5190453", sibnetVfId: "5253308" },
          { number: 2, title: "Malheur", duration: 1440, sibnetVostfrId: "5196965", sibnetVfId: "5253310" },
          { number: 3, title: "Transformation", duration: 1440, sibnetVostfrId: "5203199", sibnetVfId: "5258312" },
          { number: 4, title: "Retour", duration: 1440, sibnetVostfrId: "5210246", sibnetVfId: "5258314" },
          { number: 5, title: "Précurseur", duration: 1440, sibnetVostfrId: "5217464", sibnetVfId: "5263543" },
          { number: 6, title: "Loi désirable", duration: 1440, sibnetVostfrId: "5238868", sibnetVfId: "5263545" },
          { number: 7, title: "Échec", duration: 1440, sibnetVostfrId: "5246781", sibnetVfId: "5269446" },
          { number: 8, title: "Toujours aussi fort", duration: 1440, sibnetVostfrId: "5253009", sibnetVfId: "5278562" },
          { number: 9, title: "Malédiction sur malédiction – Partie 1", duration: 1440, sibnetVostfrId: "5258097", sibnetVfId: "5278171" },
          { number: 10, title: "Malédiction sur malédiction – Partie 2", duration: 1440, sibnetVostfrId: "5263399", sibnetVfId: "5288287" },
          { number: 11, title: "Il faudra bien que quelqu'un le fasse", duration: 1440, sibnetVostfrId: "5269261", sibnetVfId: "5298421" },
          { number: 12, title: "Sans titre", duration: 1440, sibnetVostfrId: "5277754", sibnetVfId: "5306222" },
          { number: 13, title: "La révolution rouge", duration: 1440, sibnetVostfrId: "5288042", sibnetVfId: "5314926" },
          { number: 14, title: "Convergence", duration: 1440, sibnetVostfrId: "5297930", sibnetVfId: "5324699" },
          { number: 15, title: "Rive nord de Shibuya", duration: 1440, sibnetVostfrId: "5305970", sibnetVfId: "5334985" },
          { number: 16, title: "Dévoilement", duration: 1440, sibnetVostfrId: "5314006", sibnetVfId: "5346113" },
          { number: 17, title: "Dagon", duration: 1440, sibnetVostfrId: "5324440", sibnetVfId: "5355754" },
          { number: 18, title: "Rapprochement", duration: 1440, sibnetVostfrId: "5334685", sibnetVfId: "5364778" },
          { number: 19, title: "Résonance", duration: 1440, sibnetVostfrId: "5345737", sibnetVfId: "5372583" },
          { number: 20, title: "Reddition", duration: 1440, sibnetVostfrId: "5355176", sibnetVfId: "5380126" },
          { number: 21, title: "Rassemblement", duration: 1440, sibnetVostfrId: "5364195", sibnetVfId: "5395745" },
          { number: 22, title: "Métamorphose", duration: 1440, sibnetVostfrId: "5372381", sibnetVfId: "5404433" },
          { number: 23, title: "Shibuya Incident Perfection", duration: 1440, sibnetVostfrId: "5379934", sibnetVfId: "5413795" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2022,
        episodes: [
          { number: 1, title: "Jujutsu Kaisen 0", duration: 6000, sibnetVostfrId: "4879058", sibnetVfId: "4879087" }
        ]
      }
    ]
  }
];
