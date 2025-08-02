// Types pour les données d'anime
export interface AnimeEpisode {
  number: number;
  title: string;
  sibnetVostfrId?: string;
  sibnetVfId?: string;
  smoothpreUrl?: string;
  vidmolyUrl?: string;
  vidmolyId?: string;
  vidmolyVfId?: string;
  vidmolyVfUrl?: string;  // URL complète pour Vidmoly VF
  sendvidId?: string;
  m3u8Url?: string;
  m3u8VfUrl?: string;
  mp4Url?: string;     // Lien direct vers le fichier MP4 en VOSTFR
  mp4VfUrl?: string;   // Lien direct vers le fichier MP4 en VF
  movearnUrl?: string; // URL pour Movearn
  movearnVfUrl?: string; // URL VF pour Movearn
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
    id: "akira",
    title: "Akira",
    originalTitle: "アキラ",
    description: "En juillet 1988, une mystérieuse explosion détruit Tokyo et déclenche la troisième guerre mondiale. 31 ans plus tard, en 2019, Neo-Tokyo, la mégalopole construite sur la baie de Tokyo a retrouvé sa prospérité d'antan et se prépare à l'événement majeur des Jeux olympiques de 2020. Dans l'ombre, les choses sont moins réjouissantes : les sectes religieuses pullulent, le terrorisme fait rage, et les manifestations sont durement réprimées par les forces de l'ordre. Dans ce contexte chaotique, l'histoire suit le destin de Kaneda, chef de gang de jeunes motards, et de son ami d'enfance Tetsuo. Après une confrontation avec un gang rival, Tetsuo est blessé et capturé par l'armée qui mène des expériences secrètes sur des êtres dotés de pouvoirs psychiques. Au contact de ces individus, Tetsuo développe d'extraordinaires pouvoirs qu'il ne parvient pas à maîtriser. Devenu incontrôlable, il représente bientôt une menace pour Neo-Tokyo, que seul Kaneda semble capable d'arrêter.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 1988,
    type: "Movie",
    status: "Terminé",
    genres: ["Science-fiction", "Action", "Cyberpunk", "Psychologique"],
    rating: 8.7,
    episodes: [
      { number: 1, title: "Akira", sibnetVostfrId: "4740096", sibnetVfId: "5340708" }
    ]
  },
  {
    id: "my-dress-up-darling",
    title: "My Dress-Up Darling",
    originalTitle: "その着せ替え人形は恋をする",
    description: "Wakana Gojo est un lycéen qui rêve de devenir un maître artisan de poupées hina traditionnelles japonaises. Malgré sa passion, il garde son intérêt secret car il a été traumatisé dans son enfance quand un ami s'est moqué de son hobby. Un jour, la très populaire Marin Kitagawa le surprend en train de coudre des vêtements de poupée à l'école. Loin de se moquer de lui, elle révèle sa propre passion secrète : le cosplay. Impressionnée par ses talents de couturier, elle lui demande de l'aider à créer des costumes. Alors que Gojo confectionne des tenues pour Marin, ils se rapprochent et découvrent qu'ils ont plus en commun qu'ils ne le pensaient initialement.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "En cours",
    genres: ["Comédie", "Romance", "Tranche de vie", "École"],
    rating: 8.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2022,
        episodes: [
          { number: 1, title: "épisode 1",movearnUrl: "https://movearnpre.com/embed/v1c7jhjyb07t", movearnVfUrl: "https://movearnpre.com/embed/v1c7jhjyb07t" },
          { number: 2, title: "épisode 2", vidmolyUrl: "https://vidmoly.net/embed-rcdhk4zd8y1k.html", vidmolyVfUrl: "https://vidmoly.net/embed-7jfcbayq8ejr.html" },
          { number: 3, title: "épisode 3", vidmolyUrl: "https://vidmoly.net/embed-0xfbden4oahr.html", vidmolyVfUrl: "https://vidmoly.net/embed-pn74nl5f4csj.html" },
          { number: 4, title: "épisode 4", vidmolyUrl: "https://vidmoly.net/embed-hp2ihakg9ztd.html", vidmolyVfUrl: "https://vidmoly.net/embed-1e5tt361yfju.html" },
          { number: 5, title: "épisode 5", vidmolyUrl: "https://vidmoly.net/embed-l99r9h1asimh.html", vidmolyVfUrl: "https://vidmoly.net/embed-ggydjas1wqrc.html" },
          { number: 6, title: "épisode 6", vidmolyUrl: "https://vidmoly.net/embed-qsrchtxigrid.html", vidmolyVfUrl: "https://vidmoly.net/embed-ae4pt04e59uc.html" },
          { number: 7, title: "épisode 7", vidmolyUrl: "https://vidmoly.net/embed-r3vvozj7ampu.html", vidmolyVfUrl: "https://vidmoly.net/embed-4uh1w6u5y8pe.html" },
          { number: 8, title: "épisode 8", vidmolyUrl: "https://vidmoly.net/embed-cik04lczfgu1.html", vidmolyVfUrl: "https://vidmoly.net/embed-k75h7ca21kaz.html" },
          { number: 9, title: "épisode 9", vidmolyUrl: "https://vidmoly.net/embed-aokt9o4c8bds.html", vidmolyVfUrl: "https://vidmoly.net/embed-nkvdsnf8ohm9.html" },
          { number: 10, title: "épisode 10", vidmolyUrl: "https://vidmoly.net/embed-t9gospi89g0r.html", vidmolyVfUrl: "https://vidmoly.net/embed-wipmx35ifog8.html" },
          { number: 11, title: "épisode 11", vidmolyUrl: "https://vidmoly.net/embed-tcsualkozdpf.html", vidmolyVfUrl: "https://vidmoly.net/embed-oqmof3ojfo9u.html" },
          { number: 12, title: "épisode 12", vidmolyUrl: "https://vidmoly.net/embed-p4mtsavf8s45.html", vidmolyVfUrl: "https://vidmoly.net/embed-e8x9g53x1mfr.html" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2025,
        episodes: []
      }
    ]
  },
  {
    id: "nagatoro",
    title: "Arrête de me chauffer Nagatoro",
    originalTitle: "イジらないで、長瀞さん",
    description: "Naoto Hachiouji est un étudiant otaku solitaire qui passe son temps à dessiner. Un jour, il rencontre Hayase Nagatoro, une fille de première année qui commence à le taquiner sans relâche. Malgré l'embarras et l'humiliation qu'il ressent initialement, Naoto découvre peu à peu que leurs interactions lui permettent de sortir de sa coquille et que Nagatoro pourrait être plus attachée à lui qu'elle ne veut bien l'admettre.",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/21/03/24/17/22/3948943.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "Terminé",
    genres: ["Comédie", "Romance", "Tranche de vie", "École"],
    rating: 7.8,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2021,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4290980", sibnetVfId: "4573351" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4295910", sibnetVfId: "4580989" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4301350", sibnetVfId: "4589163" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4306690", sibnetVfId: "4594077" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4310975", sibnetVfId: "4600276" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4315884", sibnetVfId: "5553840" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4319845", sibnetVfId: "4614623" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4323890", sibnetVfId: "4622092" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4328598", sibnetVfId: "4629048" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4332899", sibnetVfId: "4636255" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4336991", sibnetVfId: "4645173" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4340165", sibnetVfId: "4651686" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2024,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "5001688", sibnetVfId: "5479098" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "5006411", sibnetVfId: "5479099" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "5009553", sibnetVfId: "5479101" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "5015744", sibnetVfId: "5479103" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "5024418", sibnetVfId: "5479105" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "5031591", sibnetVfId: "5479107" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "5039558", sibnetVfId: "5479108" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "5049154", sibnetVfId: "5479109" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "5058520", sibnetVfId: "5479111" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "5067253", sibnetVfId: "5479113" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "5073176", sibnetVfId: "5479114" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "5079577", sibnetVfId: "5479115" }
        ]
      }
    ]
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    originalTitle: "나 혼자만 레벨업",
    description: "Dix ans auparavant, des portails ont commencé à apparaître un peu partout dans le monde. Ces portails ont la particularité de connecter le monde à d'autres dimensions, donjons ou mondes parallèles. En même temps, certaines personnes ont développé des capacités afin de pouvoir chasser ces portails. On appelle ceux qui reçoivent un Éveil, des Chasseurs. Sung Jin Woo est considéré comme le plus faible des Chasseurs de rang E... Autrement dit le plus faible parmi les faibles.",
    imageUrl: "https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Fantasy", "Aventure", "Surnaturel"],
    rating: 9.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2024,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "5389406", sibnetVfId: "5406687" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "5397577", sibnetVfId: "5415193" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "5406329", sibnetVfId: "5421450" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "5414604", sibnetVfId: "5428347" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "5421264", sibnetVfId: "5435958" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "5428101", sibnetVfId: "5444965" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "5435724", sibnetVfId: "5453272" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "5444576", sibnetVfId: "5461990" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "5453063", sibnetVfId: "5470652" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "5461770", sibnetVfId: "5479018" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "5470382", sibnetVfId: "5489456" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "5479260", sibnetVfId: "5499235" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "5487838", sibnetVfId: "5506878" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2025,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "5790524", sibnetVfId: "5806748" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "5795961", sibnetVfId: "5812653" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "5801411", sibnetVfId: "5819532" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "5806488", sibnetVfId: "5826552" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "5811885", sibnetVfId: "5834007" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "5819034", sibnetVfId: "5839458" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "5825877", sibnetVfId: "5845865" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "5832048", sibnetVfId: "5851984" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "5839080", sibnetVfId: "5857932" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "5845645", sibnetVfId: "11000111" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "5851330", sibnetVfId: "111000000011" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "5857706", sibnetVfId: "111100001" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "5863647", sibnetVfId: "111100001" }
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
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Historique", "Fantastique"],
    rating: 9.5,
    episodes: [
      { number: 1, title: "Cruauté", sibnetVostfrId: "4670053", sibnetVfId: "4745088" },
      { number: 2, title: "Sabre du démon", sibnetVostfrId: "4670054", sibnetVfId: "4745089" }
    ],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4668120", sibnetVfId: "4668241" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4668131", sibnetVfId: "4668280" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4668135", sibnetVfId: "4668284" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4668139", sibnetVfId: "4668287" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4668143", sibnetVfId: "4668289" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4668146", sibnetVfId: "4668291" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4668149", sibnetVfId: "4668293" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4668152", sibnetVfId: "4668298" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4668154", sibnetVfId: "4668299" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4668157", sibnetVfId: "4668304" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4668162", sibnetVfId: "4668308" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4668168", sibnetVfId: "4668313" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4668174", sibnetVfId: "4668320" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4668180", sibnetVfId: "4668327" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "4668185", sibnetVfId: "4668332" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "4668191", sibnetVfId: "4668339" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "4668198", sibnetVfId: "4668344" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "4668203", sibnetVfId: "4668349" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "4668210", sibnetVfId: "4668358" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "4668212", sibnetVfId: "4668363" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "4668216", sibnetVfId: "4668369" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "4668223", sibnetVfId: "4668375" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "4668225", sibnetVfId: "4668379" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "4668227", sibnetVfId: "4668384" },
          { number: 25, title: "épisode 25", sibnetVostfrId: "4668229", sibnetVfId: "4668387" },
          { number: 26, title: "épisode 26", sibnetVostfrId: "4668230", sibnetVfId: "4668389" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2021,
        episodes: [
          { number: 1, title: "Le train de l'Infini", sibnetVostfrId: "4825545", sibnetVfId: "4708131" }
        ]
      },
      {
        seasonNumber: "Train de l'Infini",
        title: "Épisode - Train de l'Infini",
        year: 2021,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "ds3ep1", sibnetVfId: "ds3ep1fr" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "ds3ep2", sibnetVfId: "ds3ep2fr" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "ds3ep3", sibnetVfId: "ds3ep3fr" }

        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2020,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4667143", sibnetVfId: "4699607" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4667145", sibnetVfId: "4699609" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4667146", sibnetVfId: "4699611" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4667148", sibnetVfId: "4699612" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4667149", sibnetVfId: "4699613" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4667151", sibnetVfId: "4699614" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4667153", sibnetVfId: "4699616" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4667156", sibnetVfId: "4699618" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4667157", sibnetVfId: "4699620" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4667164", sibnetVfId: "4699622" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4667165", sibnetVfId: "4699625" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2022,
        episodes: [
          { number: 1, title: "Le Démon, Partie 12", sibnetVostfrId: "5101293", sibnetVfId: "5123652" },
          { number: 2, title: "Le Démon, Partie 13", sibnetVostfrId: "5107783", sibnetVfId: "5129278" },
          { number: 3, title: "Le Démon, Partie 14", sibnetVostfrId: "5115500", sibnetVfId: "5139733" },
          { number: 4, title: "Le Démon, Partie 15", sibnetVostfrId: "5122356", sibnetVfId: "5148655" },
          { number: 5, title: "Le Démon, Partie 16", sibnetVostfrId: "5129066", sibnetVfId: "5155200" },
          { number: 6, title: "Le Démon, Partie 17", sibnetVostfrId: "5139273", sibnetVfId: "5162155" },
          { number: 7, title: "Le Démon, Partie 18", sibnetVostfrId: "5148330", sibnetVfId: "5168755" },
          { number: 8, title: "Le Démon, Partie 19", sibnetVostfrId: "5155057", sibnetVfId: "5175891" },
          { number: 9, title: "Le Démon, Partie 20", sibnetVostfrId: "5162019", sibnetVfId: "5181163" },
          { number: 10, title: "Le Démon, Partie 21", sibnetVostfrId: "5168522", sibnetVfId: "5186530" },
          { number: 11, title: "Le Démon, Partie 22", sibnetVostfrId: "5175809", sibnetVfId: "5193486" }
        ]
      },
      {
        seasonNumber: 4,
        title: "Saison 4",
        year: 2024,
        episodes: [
          { number: 1, title: "Pour vaincre Kibutsuji Muzan", sibnetVostfrId: "5533798", sibnetVfId: "5558735" },
          { number: 2, title: "La Souffrance de Tomioka Giyû, pilier de l'eau", sibnetVostfrId: "5540224", sibnetVfId: "5565316" },
          { number: 3, title: "Tanjiro est rétabli et se joint à l'entraînement", sibnetVostfrId: "5546321", sibnetVfId: "5574503" },
          { number: 4, title: "Souris", sibnetVostfrId: "5552382", sibnetVfId: "5582223" },
          { number: 5, title: "Manger des démons", sibnetVostfrId: "5558041", sibnetVfId: "5589758" },
          { number: 6, title: "Le Plus Fort des pourfendeurs", sibnetVostfrId: "5565081", sibnetVfId: "5597263" },
          { number: 7, title: "Himejima Gyômei, pilier du rocher", sibnetVostfrId: "5573417", sibnetVfId: "5606165" },
          { number: 8, title: "Rassemblement des piliers", sibnetVostfrId: "5581267", sibnetVfId: "5613056" }
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
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Science-fiction", "Dystopie"],
    rating: 8.7,
    episodes: [
      { number: 1, title: "Episode 1", sibnetVostfrId: "4113996" },
      { number: 2, title: "Episode 2", sibnetVostfrId: "4121876" },
      { number: 3, title: "Episode 3", sibnetVostfrId: "4121877" },
      { number: 4, title: "Episode 4", sibnetVostfrId: "4124111" },
      { number: 5, title: "Episode 5", sibnetVostfrId: "4131827" },
      { number: 6, title: "Episode 6", sibnetVostfrId: "4138651" },
      { number: 7, title: "Episode 7", sibnetVostfrId: "4145600" },
      { number: 8, title: "Episode 8", sibnetVostfrId: "4154555" },
      { number: 9, title: "Episode 9", sibnetVostfrId: "4162621" },
      { number: 10, title: "Episode 10", sibnetVostfrId: "4168934" },
      { number: 11, title: "Episode 11", sibnetVostfrId: "4175750" },
      { number: 12, title: "Episode 12", sibnetVostfrId: "4189420" }
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
    type: "Anime",
    status: "En cours",
    genres: ["Comédie", "Fantasy", "École", "Démons", "Surnaturel"],
    rating: 8.2,
    episodes: [],
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "Bienvenue à l'école des démons", sibnetVostfrId: "5721980"},
          { number: 2, title: "Le familier parfait", sibnetVostfrId: "5721984"},
          { number: 3, title: "La bague de Valac", sibnetVostfrId: "5725827"},
          { number: 4, title: "La classe anormale", sibnetVostfrId: "5734316"},
          { number: 5, title: "Les ambitions d'Asmodeus", sibnetVostfrId: "5742388"},
          { number: 6, title: "Le jardin royal", sibnetVostfrId: "5749708"},
          { number: 7, title: "Fête d'éveil", sibnetVostfrId: "5756064"},
          { number: 8, title: "Compétition de familier", sibnetVostfrId: "5763156"},
          { number: 9, title: "Les examens", sibnetVostfrId: "5767285"},
          { number: 10, title: "Le ballon explosif", sibnetVostfrId: "5771456"},
          { number: 11, title: "Le secret d'Iruma", sibnetVostfrId: "5776114"},
          { number: 12, title: "La réunion des parents", sibnetVostfrId: "5782623"},
          { number: 13, title: "La magie d'Iruma", sibnetVostfrId: "5792481"},
          { number: 14, title: "Le grand banquet", sibnetVostfrId: "5798358"},
          { number: 15, title: "La face cachée d'Iruma", sibnetVostfrId: "5803875"},
          { number: 16, title: "Iruma maléfique", sibnetVostfrId: "5808382"},
          { number: 17, title: "Le retour à la normale", sibnetVostfrId: "5814648"},
          { number: 18, title: "La salle de musique", sibnetVostfrId: "5821706"},
          { number: 19, title: "Le message de Balam", sibnetVostfrId: "5828253"},
          { number: 20, title: "Le professeur Balam", sibnetVostfrId: "5835963"},
          { number: 21, title: "Le démon volant", sibnetVostfrId: "5842211"},
          { number: 22, title: "Les vacances de Sullivan", sibnetVostfrId: "5848186"},
          { number: 23, title: "La bataille finale", sibnetVostfrId: "5854073"},
          { number: 24, title: "La fin de l'année scolaire", sibnetVostfrId: "5854073"}
        ]
      }
    ]
  },
  {
    id: "kuroko-no-basket",
    title: "Kuroko no Basket",
    originalTitle: "黒子のバスケ",
    description: "Kuroko est un joueur de basket-ball qui a fait partie de l'équipe du collège Teikô, une équipe qui a remporté tous les championnats depuis trois ans. Les cinq meilleurs joueurs de cette équipe étaient connus sous le nom de 'Génération des Miracles'. Kuroko était le sixième joueur fantôme de cette équipe. Personne ne le remarque sur le terrain à cause de son manque de présence. Kuroko a intégré le lycée Seirin et fait désormais équipe avec Kagami Taiga, un joueur très prometteur qui a vécu aux États-Unis, pour faire de Seirin la meilleure équipe du Japon.",
    imageUrl: "https://images.justwatch.com/poster/181383869/s718/kuroko-no-basket.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2012,
    type: "Anime",
    status: "Terminé",
    genres: ["Sports", "Comédie", "Drame", "École"],
    rating: 8.7,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2012,
        episodes: [
            { number: 1, title: "Je suis Kuroko", sibnetVostfrId: "4737805", sibnetVfId: "4738641" },
            { number: 2, title: "Je suis sérieux", sibnetVostfrId: "4737812", sibnetVfId: "4738646" },
            { number: 3, title: "La victoire est toujours importante", sibnetVostfrId: "4737817", sibnetVfId: "4738651" },
            { number: 4, title: "Rien n'est impossible", sibnetVostfrId: "4737823", sibnetVfId: "4738657" },
            { number: 5, title: "Ta basket est trop vieille", sibnetVostfrId: "4737830", sibnetVfId: "4738660" },
            { number: 6, title: "Faisons-le", sibnetVostfrId: "4737836", sibnetVfId: "4738665" },
            { number: 7, title: "Tu as beaucoup de jugeote", sibnetVostfrId: "4737843", sibnetVfId: "4738668" },
            { number: 8, title: "Je suis vraiment jaloux", sibnetVostfrId: "4737848", sibnetVfId: "4738671" },
            { number: 9, title: "Tu ferais bien de gagner", sibnetVostfrId: "4737852", sibnetVfId: "4738675" },
            { number: 10, title: "Je lui montrerai", sibnetVostfrId: "4737857", sibnetVfId: "4738679" },
            { number: 11, title: "Commençons", sibnetVostfrId: "4737865", sibnetVfId: "4738683" },
            { number: 12, title: "Franchement, je déteste ça", sibnetVostfrId: "4737888", sibnetVfId: "4738687" },
            { number: 13, title: "Je ne peux pas lire son mental", sibnetVostfrId: "4737905", sibnetVfId: "4738691" },
            { number: 14, title: "Vous avez eu tort de m'en vouloir", sibnetVostfrId: "4737923", sibnetVfId: "4738696" },
            { number: 15, title: "Nous n'avons pas fini", sibnetVostfrId: "4737938", sibnetVfId: "4738698" },
            { number: 16, title: "Laissez-moi vous raconter", sibnetVostfrId: "4737947", sibnetVfId: "4738700" },
            { number: 17, title: "Tu m'as battu", sibnetVostfrId: "4737952", sibnetVfId: "4738704" },
            { number: 18, title: "Vous allez comprendre pourquoi", sibnetVostfrId: "4737955", sibnetVfId: "4738706" },
            { number: 19, title: "C'est pas pour des prunes", sibnetVostfrId: "4737957", sibnetVfId: "4738710" },
            { number: 20, title: "Je ne peux pas le croire", sibnetVostfrId: "4737960", sibnetVfId: "4738712" },
            { number: 21, title: "Essaie de me dépasser", sibnetVostfrId: "4737964", sibnetVfId: "4738714" },
            { number: 22, title: "Je suis pas un gamin", sibnetVostfrId: "4737966", sibnetVfId: "4738717" },
            { number: 23, title: "Je suis le meilleur joueur", sibnetVostfrId: "4737969", sibnetVfId: "4738718" },
            { number: 24, title: "Ne me fais pas rire", sibnetVostfrId: "4737970", sibnetVfId: "4738724" },
            { number: 25, title: "C'est le moment de bondir", sibnetVostfrId: "4737973", sibnetVfId: "4738730" },
            { number: 26, title: "Rendez-vous l'hiver prochain", sibnetVostfrId: "4737979", sibnetVfId: "4738735" }
          ]
          
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2013,
        episodes: [
          { number: 1, title: "Le début d'une nouvelle bataille", sibnetVostfrId: "4737982", sibnetVfId: "3100316" },
          { number: 2, title: "Le retour de l'Empereur", sibnetVostfrId: "4737984", sibnetVfId: "3100317" },
          { number: 3, title: "Le défi de Midorima", sibnetVostfrId: "4737987", sibnetVfId: "3100319" },
          { number: 4, title: "La stratégie de Takao", sibnetVostfrId: "4737991", sibnetVfId: "3100321" },
          { number: 5, title: "Le réveil de l'Empereur", sibnetVostfrId: "4737993", sibnetVfId: "3100323" },
          { number: 6, title: "Le défi de Kise", sibnetVostfrId: "4737996", sibnetVfId: "3100324" },
          { number: 7, title: "Le match contre Kaijo", sibnetVostfrId: "4738000", sibnetVfId: "3100326" },
          { number: 8, title: "La victoire de Seirin", sibnetVostfrId: "4738002", sibnetVfId: "3100327" },
          { number: 9, title: "Le défi de Murasakibara", sibnetVostfrId: "4738005", sibnetVfId: "3100329" },
          { number: 10, title: "Le match contre Yosen", sibnetVostfrId: "4738008", sibnetVfId: "3100330" },
          { number: 11, title: "La stratégie de Himuro", sibnetVostfrId: "4738011", sibnetVfId: "3100332" },
          { number: 12, title: "Le réveil de Murasakibara", sibnetVostfrId: "4738013", sibnetVfId: "3100333" },
          { number: 13, title: "Le défi d'Aomine", sibnetVostfrId: "5010815", sibnetVfId: "3100334" },
          { number: 14, title: "Le match contre Touou", sibnetVostfrId: "4738017", sibnetVfId: "3100335" },
          { number: 15, title: "La stratégie d'Imayoshi", sibnetVostfrId: "4738019", sibnetVfId: "3100336" },
          { number: 16, title: "Le réveil d'Aomine", sibnetVostfrId: "4738027", sibnetVfId: "3100337" },
          { number: 17, title: "Le défi de Kise", sibnetVostfrId: "4738022", sibnetVfId: "3100339" },
          { number: 18, title: "Le match contre Kaijo", sibnetVostfrId: "4738048", sibnetVfId: "3100341" },
          { number: 19, title: "La stratégie de Kasamatsu", sibnetVostfrId: "4738052", sibnetVfId: "3100343" },
          { number: 20, title: "Le réveil de Kise", sibnetVostfrId: "4738057", sibnetVfId: "3100345" },
          { number: 21, title: "Le défi de Midorima", sibnetVostfrId: "4738059", sibnetVfId: "3100347" },
          { number: 22, title: "Le match contre Shutoku", sibnetVostfrId: "4738063", sibnetVfId: "3100350" },
          { number: 23, title: "La stratégie de Takao", sibnetVostfrId: "4738067", sibnetVfId: "3100352" },
          { number: 24, title: "Le réveil de Midorima", sibnetVostfrId: "4738068", sibnetVfId: "3100354" },
          { number: 25, title: "Je suis l'ombre", sibnetVostfrId: "4738070", sibnetVfId: "3100356" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2015,
        episodes: [
          { number: 1, title: "La Winter Cup commence", sibnetVostfrId: "4738073", sibnetVfId: "3100524" },
          { number: 2, title: "", sibnetVostfrId: "4738075", sibnetVfId: "3100527" },
          { number: 3, title: "", sibnetVostfrId: "4738077", sibnetVfId: "3100528" },
          { number: 4, title: "", sibnetVostfrId: "4738079", sibnetVfId: "3100530" },
          { number: 5, title: "", sibnetVostfrId: "4738084", sibnetVfId: "3100531" },
          { number: 6, title: "", sibnetVostfrId: "4738088", sibnetVfId: "3100533" },
          { number: 7, title: "", sibnetVostfrId: "4738091", sibnetVfId: "3100534" },
          { number: 8, title: "", sibnetVostfrId: "4738096", sibnetVfId: "3100535" },
          { number: 9, title: "", sibnetVostfrId: "4738099", sibnetVfId: "3100537" },
          { number: 10, title: "", sibnetVostfrId: "4738103", sibnetVfId: "3100539" },
          { number: 11, title: "", sibnetVostfrId: "4738106", sibnetVfId: "3100540" },
          { number: 12, title: "", sibnetVostfrId: "4738111", sibnetVfId: "3100542" },
          { number: 13, title: "", sibnetVostfrId: "4738114", sibnetVfId: "3100544" },
          { number: 14, title: "", sibnetVostfrId: "4738116", sibnetVfId: "3100545" },
          { number: 15, title: "", sibnetVostfrId: "4738118", sibnetVfId: "3100546" },
          { number: 16, title: "", sibnetVostfrId: "4738123", sibnetVfId: "3100547" },
          { number: 17, title: "", sibnetVostfrId: "4738127", sibnetVfId: "3100550" },
          { number: 18, title: "", sibnetVostfrId: "4738130", sibnetVfId: "3100558" },
          { number: 19, title: "", sibnetVostfrId: "4738134", sibnetVfId: "3100563" },
          { number: 20, title: "", sibnetVostfrId: "4738138", sibnetVfId: "3100565" },
          { number: 21, title: "", sibnetVostfrId: "4738141", sibnetVfId: "3100569" },
          { number: 22, title: "", sibnetVostfrId: "4738145", sibnetVfId: "3100571" },
          { number: 23, title: "", sibnetVostfrId: "4738148", sibnetVfId: "3100574" },
          { number: 24, title: "", sibnetVostfrId: "4738151", sibnetVfId: "3100575" },
          { number: 25, title: "", sibnetVostfrId: "4738154", sibnetVfId: "3100577" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Kuroko no Basket: Last Game",
        year: 2017,
        episodes: [
          { 
            number: 1, 
            title: "Kuroko's Basket Last Game", 
            
            vidmolyId: "u8jv52sxa6hl", 
            vidmolyVfId: "u01v11vvld94", // Mise à jour avec le nouveau ID
            smoothpreUrl: "https://vimeo.com/1073297108/6d0921f528"
            // Retrait de m3u8VfUrl qui ne fonctionne plus
          }
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
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Aventure", "Drame", "Historique"],
    rating: 8.9,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "3647044", sibnetVfId: "4943733" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "3647304", sibnetVfId: "4943740" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "3647443", sibnetVfId: "4943742" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "3662684", sibnetVfId: "4943747" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "3667963", sibnetVfId: "4943757" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "3672944", sibnetVfId: "4943765" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "3676493", sibnetVfId: "4943768" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "3688051", sibnetVfId: "4943776" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "3691477", sibnetVfId: "4943782" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "3702318", sibnetVfId: "4943792" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "3706484", sibnetVfId: "4943797" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "3710539", sibnetVfId: "4943807" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "3717142", sibnetVfId: "4943816" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "3721647", sibnetVfId: "4943822" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "3726383", sibnetVfId: "4943833" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "3730909", sibnetVfId: "4943848" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "3736885", sibnetVfId: "4943863" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "3748880", sibnetVfId: "4943873" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "3756834", sibnetVfId: "4943879" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "3762340", sibnetVfId: "4943886" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "3767329", sibnetVfId: "4943890" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "3772512", sibnetVfId: "4943891" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "3776730", sibnetVfId: "4943894" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "3782231", sibnetVfId: "4943897" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2 - L'ère esclave",
        year: 2023,
        episodes: [
          { number: 1, title: "Episode 1", sibnetVostfrId: "5004408", sibnetVfId: "5026921" },
          { number: 2, title: "Episode 2", sibnetVostfrId: "5011334", sibnetVfId: "5033731" },
          { number: 3, title: "Episode 3", sibnetVostfrId: "5018542", sibnetVfId: "5044600" },
          { number: 4, title: "Episode 4", sibnetVostfrId: "5026395", sibnetVfId: "5052822" },
          { number: 5, title: "Episode 5", sibnetVostfrId: "5033314", sibnetVfId: "5061067" },
          { number: 6, title: "Episode 6", sibnetVostfrId: "5042085", sibnetVfId: "5069392" },
          { number: 7, title: "Episode 7", sibnetVostfrId: "5052406", sibnetVfId: "5075340" },
          { number: 8, title: "Episode 8", sibnetVostfrId: "5060798", sibnetVfId: "5081652" },
          { number: 9, title: "Episode 9", sibnetVostfrId: "5069061", sibnetVfId: "5089301" },
          { number: 10, title: "Episode 10", sibnetVostfrId: "5075067", sibnetVfId: "5095610" },
          { number: 11, title: "Episode 11", sibnetVostfrId: "5081387", sibnetVfId: "5102021" },
          { number: 12, title: "Episode 12", sibnetVostfrId: "5088885", sibnetVfId: "5108678" },
          { number: 13, title: "Episode 13", sibnetVostfrId: "5095328", sibnetVfId: "5116910" },
          { number: 14, title: "Episode 14", sibnetVostfrId: "5101840", sibnetVfId: "5123645" },
          { number: 15, title: "Episode 15", sibnetVostfrId: "5108510", sibnetVfId: "5130404" },
          { number: 16, title: "Episode 16", sibnetVostfrId: "5116560", sibnetVfId: "5141307" },
          { number: 17, title: "Episode 17", sibnetVostfrId: "5123255", sibnetVfId: "5149599" },
          { number: 18, title: "Episode 18", sibnetVostfrId: "5129963", sibnetVfId: "5156147" },
          { number: 19, title: "Episode 19", sibnetVostfrId: "5140997", sibnetVfId: "5163201" },
          { number: 20, title: "Episode 20", sibnetVostfrId: "5149336", sibnetVfId: "5169877" },
          { number: 21, title: "Episode 21", sibnetVostfrId: "5155922", sibnetVfId: "5176587" },
          { number: 22, title: "Episode 22", sibnetVostfrId: "5163016", sibnetVfId: "5181771" },
          { number: 23, title: "Episode 23", sibnetVostfrId: "5169663", sibnetVfId: "5187492" },
          { number: 24, title: "Episode 24", sibnetVostfrId: "5176400", sibnetVfId: "5194290" }
        ]
      }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    originalTitle: "呪術廻戦",
    description: "Plus de 10 000 morts et disparus sont recensés chaque année au Japon. Les sentiments négatifs que relâchent les êtres humains sont en cause. Souffrance, regrets, humiliation : leur concentration dans un même endroit engendre des malédictions souvent mortelles. Yuji Itadori, lycéen et membre du club d'occultisme, avale le doigt découpé d'un démon millénaire pour briser une malédiction. Maintenant possédé par Ryômen Sukuna, le célèbre démon à deux visages, il parvient étonnamment à garder le contrôle de son corps. Condamné à mort par l'organisation des exorcistes, il ne pourra survivre qu'à condition de trouver tous les doigts de Sukuna afin d'écarter la menace une bonne fois pour toutes.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/09/14/10/31/4875617.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2020,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Aventure", "School Life", "Yokai", "Surnaturel", "Magie", "Mystère", "Shônen"],
    rating: 8.8,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2020,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "4667514", sibnetVfId: "4668025" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "4667523", sibnetVfId: "4668028" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "4667532", sibnetVfId: "4668029" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "4667548", sibnetVfId: "4668030" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "4667557", sibnetVfId: "4668034" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "4667566", sibnetVfId: "4668035" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "4667578", sibnetVfId: "4668038" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "4667599", sibnetVfId: "4668040" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "4667621", sibnetVfId: "4668042" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "4667634", sibnetVfId: "4668044" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "4667642", sibnetVfId: "4668049" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "4667648", sibnetVfId: "4668055" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "4667656", sibnetVfId: "4668061" },
          { number: 14, title: "Épisode 14", sibnetVostfrId: "4667663", sibnetVfId: "4668066" },
          { number: 15, title: "Épisode 15", sibnetVostfrId: "4667667", sibnetVfId: "4668072" },
          { number: 16, title: "Épisode 16", sibnetVostfrId: "4667673", sibnetVfId: "4668077" },
          { number: 17, title: "Épisode 17", sibnetVostfrId: "4667683", sibnetVfId: "4668081" },
          { number: 18, title: "Épisode 18", sibnetVostfrId: "4667689", sibnetVfId: "4668084" },
          { number: 19, title: "Épisode 19", sibnetVostfrId: "4667696", sibnetVfId: "4668086" },
          { number: 20, title: "Épisode 20", sibnetVostfrId: "4667717", sibnetVfId: "4668089" },
          { number: 21, title: "Épisode 21", sibnetVostfrId: "4667725", sibnetVfId: "4668092" },
          { number: 22, title: "Épisode 22", sibnetVostfrId: "4667735", sibnetVfId: "4668096" },
          { number: 23, title: "Épisode 23", sibnetVostfrId: "4667746", sibnetVfId: "4668102" },
          { number: 24, title: "Épisode 24", sibnetVostfrId: "4667756", sibnetVfId: "4668111" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2023,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5190453", sibnetVfId: "5253308" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5196965", sibnetVfId: "5253310" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5203199", sibnetVfId: "5258312" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5210246", sibnetVfId: "5258314" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5217464", sibnetVfId: "5263543" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5238868", sibnetVfId: "5263545" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5246781", sibnetVfId: "5269446" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5253009", sibnetVfId: "5278562" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5258097", sibnetVfId: "5278171" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5263399", sibnetVfId: "5288287" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5269261", sibnetVfId: "5298421" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5277754", sibnetVfId: "5306222" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "5288042", sibnetVfId: "5314926" },
          { number: 14, title: "Épisode 14", sibnetVostfrId: "5297930", sibnetVfId: "5324699" },
          { number: 15, title: "Épisode 15", sibnetVostfrId: "5305970", sibnetVfId: "5334985" },
          { number: 16, title: "Épisode 16", sibnetVostfrId: "5314006", sibnetVfId: "5346113" },
          { number: 17, title: "Épisode 17", sibnetVostfrId: "5324440", sibnetVfId: "5355754" },
          { number: 18, title: "Épisode 18", sibnetVostfrId: "5334685", sibnetVfId: "5364778" },
          { number: 19, title: "Épisode 19", sibnetVostfrId: "5345737", sibnetVfId: "5372583" },
          { number: 20, title: "Épisode 20", sibnetVostfrId: "5355176", sibnetVfId: "5380126" },
          { number: 21, title: "Épisode 21", sibnetVostfrId: "5364195", sibnetVfId: "5395745" },
          { number: 22, title: "Épisode 22", sibnetVostfrId: "5372381", sibnetVfId: "5404433" },
          { number: 23, title: "Épisode 23", sibnetVostfrId: "5379934", sibnetVfId: "5413795" }
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2022,
        episodes: [
          { number: 1, title: "Jujutsu Kaisen 0", sibnetVostfrId: "4879058", sibnetVfId: "4879087" }
        ]
      }
    ]
  },
  {
    id: "death-note",
    title: "Death Note",
    originalTitle: "デスノート",
    description: "Light Yagami est un étudiant surdoué qui juge le monde actuel criminel et corrompu. Sa vie change radicalement le jour où il ramasse par hasard un mystérieux cahier intitulé 'Death Note'. Son mode d'emploi indique que 'la personne dont le nom est écrit dans ce cahier meurt'. D'abord sceptique, Light décide toutefois de tester le cahier et découvre que son pouvoir est bien réel. Il rencontre alors l'ancien propriétaire du Death Note, un dieu de la mort nommé Ryuk. Celui-ci déclare avoir volontairement laissé tomber son carnet dans le monde des humains par ennui. Light décide d'utiliser le Death Note pour exterminer les criminels et créer un monde parfait dont il serait le dieu. L'utilisation du Death Note attire l'attention du mystérieux détective L, qui tente de découvrir l'identité de celui que l'opinion publique nomme désormais 'Kira'.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2006,
    type: "Anime",
    status: "Terminé",
    genres: ["Mystère", "Surnaturel", "Thriller", "Psychologique"],
    rating: 9.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2006,
        episodes: [
          { number: 1, title: "Episode 1", mp4Url: "https://23.mugiwara.one/death-note/death-note-1.mp4",sibnetVfId: "4745088" },
          { number: 2, title: "Episode 2", mp4Url: "https://23.mugiwara.one/death-note/death-note-2.mp4",sibnetVfId: "4745089" },
          { number: 3, title: "Episode 3", mp4Url: "https://23.mugiwara.one/death-note/death-note-3.mp4",sibnetVfId: "4745090" },
          { number: 4, title: "Episode 4", mp4Url: "https://23.mugiwara.one/death-note/death-note-4.mp4",sibnetVfId: "4745091" },
          { number: 5, title: "Episode 5", mp4Url: "https://23.mugiwara.one/death-note/death-note-5.mp4",sibnetVfId: "4745092" },
          { number: 6, title: "Episode 6", mp4Url: "https://23.mugiwara.one/death-note/death-note-6.mp4",sibnetVfId: "4745094" },
          { number: 7, title: "Episode 7", mp4Url: "https://23.mugiwara.one/death-note/death-note-7.mp4",sibnetVfId: "4745097" },
          { number: 8, title: "Episode 8", mp4Url: "https://23.mugiwara.one/death-note/death-note-8.mp4",sibnetVfId: "4745099" },
          { number: 9, title: "Episode 9", mp4Url: "https://23.mugiwara.one/death-note/death-note-9.mp4",sibnetVfId: "4745101" },
          { number: 10, title: "Episode 10", mp4Url: "https://23.mugiwara.one/death-note/death-note-10.mp4",sibnetVfId: "4745102" },
          { number: 11, title: "Episode 11", mp4Url: "https://23.mugiwara.one/death-note/death-note-11.mp4",sibnetVfId: "4745103" },
          { number: 12, title: "Episode 12", mp4Url: "https://23.mugiwara.one/death-note/death-note-12.mp4",sibnetVfId: "4745104" },
          { number: 13, title: "Episode 13", mp4Url: "https://23.mugiwara.one/death-note/death-note-13.mp4",sibnetVfId: "4745105" },
          { number: 14, title: "Episode 14", mp4Url: "https://23.mugiwara.one/death-note/death-note-14.mp4",sibnetVfId: "4745106" },
          { number: 15, title: "Episode 15", mp4Url: "https://23.mugiwara.one/death-note/death-note-15.mp4",sibnetVfId: "4745107" },
          { number: 16, title: "Episode 16", mp4Url: "https://23.mugiwara.one/death-note/death-note-16.mp4",sibnetVfId: "4745108" },
          { number: 17, title: "Episode 17", mp4Url: "https://23.mugiwara.one/death-note/death-note-17.mp4",sibnetVfId: "4745111" },
          { number: 18, title: "Episode 18", mp4Url: "https://23.mugiwara.one/death-note/death-note-18.mp4",sibnetVfId: "4745113" },
          { number: 19, title: "Episode 19", mp4Url: "https://23.mugiwara.one/death-note/death-note-19.mp4",sibnetVfId: "4745114" },
          { number: 20, title: "Episode 20", mp4Url: "https://23.mugiwara.one/death-note/death-note-20.mp4",sibnetVfId: "4745115" },
          { number: 21, title: "Episode 21", mp4Url: "https://23.mugiwara.one/death-note/death-note-21.mp4",sibnetVfId: "4745117" },
          { number: 22, title: "Episode 22", mp4Url: "https://23.mugiwara.one/death-note/death-note-22.mp4",sibnetVfId: "4745118" },
          { number: 23, title: "Episode 23", mp4Url: "https://23.mugiwara.one/death-note/death-note-23.mp4",sibnetVfId: "4745125" },
          { number: 24, title: "Episode 24", mp4Url: "https://23.mugiwara.one/death-note/death-note-24.mp4",sibnetVfId: "4745134" },
          { number: 25, title: "Episode 25", mp4Url: "https://23.mugiwara.one/death-note/death-note-25.mp4",sibnetVfId: "4745137" },
          { number: 26, title: "Episode 26", mp4Url: "https://23.mugiwara.one/death-note/death-note-26.mp4",sibnetVfId: "4745138" },
          { number: 27, title: "Episode 27", mp4Url: "https://23.mugiwara.one/death-note/death-note-27.mp4",sibnetVfId: "4745140" },
          { number: 28, title: "Episode 28", mp4Url: "https://23.mugiwara.one/death-note/death-note-28.mp4",sibnetVfId: "4745144" },
          { number: 29, title: "Episode 29", mp4Url: "https://23.mugiwara.one/death-note/death-note-29.mp4",sibnetVfId: "4745149" },
          { number: 30, title: "Episode 30", mp4Url: "https://23.mugiwara.one/death-note/death-note-30.mp4",sibnetVfId: "4745153" },
          { number: 31, title: "Episode 31", mp4Url: "https://23.mugiwara.one/death-note/death-note-31.mp4",sibnetVfId: "4745156" },
          { number: 32, title: "Episode 32", mp4Url: "https://23.mugiwara.one/death-note/death-note-32.mp4",sibnetVfId: "4745157" },
          { number: 33, title: "Episode 33", mp4Url: "https://23.mugiwara.one/death-note/death-note-33.mp4",sibnetVfId: "4745162" },
          { number: 34, title: "Episode 34", mp4Url: "https://23.mugiwara.one/death-note/death-note-34.mp4",sibnetVfId: "4745164" },
          { number: 35, title: "Episode 35", mp4Url: "https://23.mugiwara.one/death-note/death-note-35.mp4",sibnetVfId: "4745165" },
          { number: 36, title: "Episode 36", mp4Url: "https://23.mugiwara.one/death-note/death-note-36.mp4",sibnetVfId: "4745165" },
          { number: 37, title: "Episode 37", mp4Url: "https://23.mugiwara.one/death-note/death-note-37.mp4",sibnetVfId: "4745165" }
        ]
      }
    ]
  },
  {
    id: "frieren",
    title: "Frieren",
    originalTitle: "葬送のフリーレン",
    description: "Après avoir vaincu le Roi des Démons et ramené la paix dans le royaume, l'elfe mage Frieren et ses compagnons, Himmel le héros, Heiter le prêtre et Eisen le guerrier, se séparent et poursuivent leurs propres voies. En raison de sa longévité, Frieren voit ses amis vieillir et mourir les uns après les autres. Réalisant qu'elle n'a jamais vraiment cherché à comprendre les humains, Frieren commence un voyage pour découvrir leur valeur et leur importance.",
    imageUrl: "https://sm.ign.com/ign_fr/screenshot/default/unnamed_qjuy.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "En cours",
    genres: ["Aventure", "Drame", "Fantasy", "Shōnen"],
    rating: 8.9,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2023,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5263878", sibnetVfId: "5289523" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5263889", sibnetVfId: "5289524" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5263900", sibnetVfId: "5289526" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5263896", sibnetVfId: "5289527" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5270090", sibnetVfId: "5299302" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5279138", sibnetVfId: "5307446" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5289021", sibnetVfId: "5316024" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5298992", sibnetVfId: "5326128" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5307136", sibnetVfId: "5336290" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5315438", sibnetVfId: "5348006" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5325551", sibnetVfId: "5357956" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5335798", sibnetVfId: "5365746" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "5346773", sibnetVfId: "5373753" },
          { number: 14, title: "Épisode 14", sibnetVostfrId: "5356616", sibnetVfId: "5388589" },
          { number: 15, title: "Épisode 15", sibnetVostfrId: "5365221", sibnetVfId: "5397102" },
          { number: 16, title: "Épisode 16", sibnetVostfrId: "5373515", sibnetVfId: "5397101" },
          { number: 17, title: "Épisode 17", sibnetVostfrId: "5388201", sibnetVfId: "5413758" },
          { number: 18, title: "Épisode 18", sibnetVostfrId: "5396805", sibnetVfId: "5420974" },
          { number: 19, title: "Épisode 19", sibnetVostfrId: "5405242", sibnetVfId: "5427176" },
          { number: 20, title: "Épisode 20", sibnetVostfrId: "5413359", sibnetVfId: "5434730" },
          { number: 21, title: "Épisode 21", sibnetVostfrId: "5420365", sibnetVfId: "5443475" },
          { number: 22, title: "Épisode 22", sibnetVostfrId: "5427772", sibnetVfId: "5452423" },
          { number: 23, title: "Épisode 23", sibnetVostfrId: "5434335", sibnetVfId: "5461352" },
          { number: 24, title: "Épisode 24", sibnetVostfrId: "5442935", sibnetVfId: "5469357" },
          { number: 25, title: "Épisode 25", sibnetVostfrId: "5451751", sibnetVfId: "5478827" },
          { number: 26, title: "Épisode 26", sibnetVostfrId: "5460022", sibnetVfId: "5487053" },
          { number: 27, title: "Épisode 27", sibnetVostfrId: "5468730", sibnetVfId: "5495416" },
          { number: 28, title: "Épisode 28", sibnetVostfrId: "5477670", sibnetVfId: "5504164" }
        ]
      }
    ]
  },
  {
    id: "gachiakuta",
    title: "Gachiakuta",
    originalTitle: "ガチアクタ",
    description: "Rudo, un adolescent de la tribu des parias, vit dans les bidonvilles de la Sphère – une société flottante divisée bien au-dessus des nuages. Non seulement il appartient à une classe sociale inférieure opprimée par les riches citadins obsédés par la propreté et le gaspillage, mais ses pairs le méprisent pour être le fils d'un meurtrier décédé. Lorsqu'il est accusé à tort du meurtre de son père adoptif Regto, Rudo est jeté de la Sphère dans la Fosse.",
    imageUrl: "https://fr.web.img6.acsta.net/img/d5/7b/d57b51b6b84ed66f6dfb47d83aa759a6.jpg",
    bannerUrl: "/picture/okastreamtextbanner.png",
    year: 2025,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Fantasy", "Aventure", "Shounen"],
    rating: 9.1,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2025,
        episodes: [
          { number: 1, title:"Épisode 1", sibnetVostfrId: "5955294", sibnetVfId: "5955316" },
          { number: 2, title:"Épisode 2", sibnetVostfrId: "5963148", sibnetVfId: "5963187" },
        ]
      }
    ]
  },
  {
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    originalTitle: "甘神さんちの縁結び",
    description: "Un jeune homme se retrouve à vivre dans un sanctuaire avec trois sœurs prêtresses. Entre traditions, romance et comédie, il va devoir s'adapter à sa nouvelle vie et aux liens qui se tissent.",
    imageUrl: "https://ext.same-assets.com/4236370899/4066221021.jpeg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Comédie", "Romance", "Tranche de vie", "École"],
    rating: 7.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2024,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5699478", sibnetVfId: "5726374" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5707586", sibnetVfId: "5735004" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5717100", sibnetVfId: "5743146" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5725823", sibnetVfId: "5750856" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5734327", sibnetVfId: "5757488" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5742421", sibnetVfId: "5763756" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5749752", sibnetVfId: "5768068" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5756114", sibnetVfId: "5772065" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5763191", sibnetVfId: "5779110" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5767315", sibnetVfId: "9hmexwakz6if" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5771462", sibnetVfId: "5788537" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5776192", sibnetVfId: "5793362" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "5782635", sibnetVfId: "5799190" },
          { number: 14, title: "Épisode 14", sibnetVostfrId: "5798343", sibnetVfId: "5815780" },
          { number: 15, title: "Épisode 15", sibnetVostfrId: "5803880", sibnetVfId: "5822911" },
          { number: 16, title: "Épisode 16", sibnetVostfrId: "5808416", sibnetVfId: "5828698" },
          { number: 17, title: "Épisode 17", sibnetVostfrId: "5814699", sibnetVfId: "5836787" },
          { number: 18, title: "Épisode 18", sibnetVostfrId: "5821823", sibnetVfId: "5842841" },
          { number: 19, title: "Épisode 19", sibnetVostfrId: "5828277", sibnetVfId: "5849216" },
          { number: 20, title: "Épisode 20", sibnetVostfrId: "5836047", sibnetVfId: "5855031" },
          { number: 21, title: "Épisode 21", sibnetVostfrId: "5842195", sibnetVfId: "5861381" },
          { number: 22, title: "Épisode 22", sibnetVostfrId: "5848239", sibnetVfId: "5866446" },
          { number: 23, title: "Épisode 23", sibnetVostfrId: "5854127", sibnetVfId: "5872811" },
          { number: 24, title: "Épisode 24", sibnetVostfrId: "5860315", sibnetVfId: "5881009" },
        ]
      }
    ]
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    originalTitle: "アンネームドメモリー",
    description: "En escaladant une tour mortelle, Oscar cherche le pouvoir de sa gardienne nommée Tinasha. Il espère que son incroyable magie pourra briser une malédiction qui tue toute femme qu'il prend pour épouse. Mais lorsque le prince voit la beauté de Tinasha, il a une meilleure idée : puisqu'elle est sûrement assez forte pour survivre à la malédiction, elle devrait l'épouser ! Cette dernière n'est pas emballée par cette idée, mais elle accepte de vivre avec Oscar dans son château pendant un an",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BY2Q5NTRiYTgtZjJmOS00YjQ0LWE2MmQtMjE5MmM3ODQ5ZDg2XkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Fantasy", "Romance", "Drame"],
    rating: 7.2,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2024,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5499446" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5506967" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5513954" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5520816" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5528539" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5535464" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5541944" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5548303" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5554280" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5560173" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5567639" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5575200" },
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2024,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5792533" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5798345" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5803874" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5808390" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5814656" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5821777" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5828249" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5836004" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5842121" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5848209" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5854094" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5860276" },
        ]
      }
    ]
  },

  {
    id: "failure-skill-nut-master",
    title: "Failure Skill 'Nut Master'",
    originalTitle: "Hazure Skill 'Nut Master'",
    description: "Un jeune homme doté d'une compétence jugée inutile se retrouve projeté dans un autre monde. Grâce à sa persévérance et à sa capacité à exploiter son pouvoir, il va surprendre tout le monde et s'imposer dans un univers fantastique.",
    imageUrl: "https://www.nautiljon.com/images/anime/00/06/hazure_skill_kinomi_master_skill_no_mi_tabetara_shinu_wo_mugen_ni_taberareru_you_ni_natta_ken_ni_tsuite_12760.webp",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Aventure", "Fantasy", "Isekai"],
    rating: 7.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2024,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5787656" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5792535" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5798344" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5803873" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5808403" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5814675" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5821800" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5828273" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5836040" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5842129" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5848231" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5854110" }
        ]
      }
    ]
  },
  {
    id: "classroom-of-the-elite",
    title: "Classroom of the Elite",
    originalTitle: "ようこそ実力至上主義の教室へ",
    description: "L'Académie Kôdo Ikusei est un établissement prestigieux doté d'installations ultramodernes où presque tous les élèves poursuivent ensuite leurs études à l'université ou trouvent un emploi. Les élèves y bénéficient d'une grande liberté, mais en réalité, seule l'élite des quatre classes est privilégiée. Kiyotaka Ayanokôji est un élève de la classe D, où l'école regroupe les élèves considérés comme inférieurs. Pour diverses raisons, il a délibérément choisi cette classe, mais ses camarades le considèrent comme un élève sans ambition. Cependant, son comportement change lorsqu'il rencontre Suzune Horikita et Kikyô Kushida, deux camarades de classe qui vont l'aider à dévoiler sa véritable personnalité.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMDg3MGVhNWUtYTQ2NS00ZDdiLTg5MTMtZmM5MjUzN2IxN2I4XkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2017,
    type: "Anime",
    status: "En cours",
    genres: ["Drame", "Psychologique", "École", "Thriller"],
    rating: 8.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2017,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "4668080", sibnetVfId: "4799425"},
          { number: 2, title: "Épisode 2", sibnetVostfrId: "4668082", sibnetVfId: "4801518"},
          { number: 3, title: "Épisode 3", sibnetVostfrId: "4668083", sibnetVfId: "4810031" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "4668085", sibnetVfId: "4818237" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "4668087", sibnetVfId: "4829160" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "4668088", sibnetVfId: "5412534" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "4668090", sibnetVfId: "4859838" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "4668091", sibnetVfId: "4877616" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "4668094", sibnetVfId: "4885368" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "4668095", sibnetVfId: "4905085" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "4668098", sibnetVfId: "4914202" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "4668106", sibnetVfId: "4923056" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2022,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "4777568", sibnetVfId: "4798438" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "4785592", sibnetVfId: "4801519" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "4796430", sibnetVfId: "4810035" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "4801138", sibnetVfId: "4818231" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "4809651", sibnetVfId: "4829170" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "4817808", sibnetVfId: "4840252" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "4827084", sibnetVfId: "4859840" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "4839805", sibnetVfId: "4877610" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "4850225", sibnetVfId: "4885371" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "4859398", sibnetVfId: "4905107" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "4867782", sibnetVfId: "4914194" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "4877110", sibnetVfId: "4923064" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "4885041", sibnetVfId: "4936443" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2024,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5385344", sibnetVfId: "5411763" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5394000", sibnetVfId: "5419156" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5402994", sibnetVfId: "5425762" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5411124", sibnetVfId: "5432231" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5418962", sibnetVfId: "5440577" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5425218", sibnetVfId: "5450119" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5431981", sibnetVfId: "5458236" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5440248", sibnetVfId: "5467291" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5449806", sibnetVfId: "5475846" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5457931", sibnetVfId: "5484596" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5466856", sibnetVfId: "5492552" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5475128", sibnetVfId: "5501364" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "5484154", sibnetVfId: "5508441" }
        ]
      }
    ]
  },
  {
    id: "horimiya",
    title: "Horimiya",
    originalTitle: "ホリミヤ",
    description: "Kyouko Hori est une lycéenne populaire et brillante qui cache un secret : elle doit s'occuper de son petit frère et faire les tâches ménagères en l'absence de ses parents. Izumi Miyamura est un élève discret et solitaire qui cache également un secret : il a des piercings et des tatouages sous ses vêtements. Quand ils se découvrent mutuellement leurs vies secrètes, une relation inattendue commence à se développer entre eux.",
    imageUrl: "https://imusic.b-cdn.net/images/item/original/447/5022366773447.jpg?anime-2023-horimiya-the-complete-season-dvd&class=scaled&v=1677384610",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Tranche de vie", "École"],
    rating: 8.4,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2021,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4204892", sibnetVfId: "4958981" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4211242", sibnetVfId: "4958983" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4215445", sibnetVfId: "4958984" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4221259", sibnetVfId: "4958986" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4226708", sibnetVfId: "4958987" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4232280", sibnetVfId: "4958988" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4240640", sibnetVfId: "4958990" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4247862", sibnetVfId: "4958991" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4254400", sibnetVfId: "4958992" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4260381", sibnetVfId: "4958994" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4265578", sibnetVfId: "4958995" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4276303", sibnetVfId: "4958997" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4286072", sibnetVfId: "4958999" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2 - The Missing Pieces",
        year: 2023,
        episodes: [
          { number: 1, title: "Épisode 1", sibnetVostfrId: "5185440", sibnetVfId: "5295574" },
          { number: 2, title: "Épisode 2", sibnetVostfrId: "5192058", sibnetVfId: "5295575" },
          { number: 3, title: "Épisode 3", sibnetVostfrId: "5198879", sibnetVfId: "5295576" },
          { number: 4, title: "Épisode 4", sibnetVostfrId: "5204899", sibnetVfId: "5295577" },
          { number: 5, title: "Épisode 5", sibnetVostfrId: "5211467", sibnetVfId: "5295578" },
          { number: 6, title: "Épisode 6", sibnetVostfrId: "5219661", sibnetVfId: "5295579" },
          { number: 7, title: "Épisode 7", sibnetVostfrId: "5226764", sibnetVfId: "5295580" },
          { number: 8, title: "Épisode 8", sibnetVostfrId: "5605559", sibnetVfId: "5295583" },
          { number: 9, title: "Épisode 9", sibnetVostfrId: "5605560", sibnetVfId: "5295584" },
          { number: 10, title: "Épisode 10", sibnetVostfrId: "5240748", sibnetVfId: "5295585" },
          { number: 11, title: "Épisode 11", sibnetVostfrId: "5248157", sibnetVfId: "5295586" },
          { number: 12, title: "Épisode 12", sibnetVostfrId: "5254461", sibnetVfId: "5295587" },
          { number: 13, title: "Épisode 13", sibnetVostfrId: "5259624", sibnetVfId: "5295589" }
        ]
      }
    ]
  },
  {
    id: "fire-force",
    title: "Fire Force",
    originalTitle: "炎炎ノ消防隊",
    description: "Dans un monde où les humains peuvent s'enflammer spontanément et se transformer en créatures appelées 'Infernals', les pompiers spéciaux de la Fire Force combattent ces phénomènes. Shinra Kusakabe, un jeune pompier doté du pouvoir de contrôler le feu avec ses pieds, rejoint la 8ème brigade de la Fire Force. Alors qu'il enquête sur les mystères entourant les Infernals et sa propre famille, il découvre des secrets sombres sur l'origine de ces phénomènes et l'organisation qui les combat.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/09/16/16/21/4933552.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Fantasy", "Supernatural", "Shounen"],
    rating: 8.2,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-1.mp4", sibnetVfId: "4799682" },
          { number: 2, title: "épisode 2", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-2.mp4", sibnetVfId: "4799686" },
          { number: 3, title: "épisode 3", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-3.mp4", sibnetVfId: "4799688" },
          { number: 4, title: "épisode 4", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-4.mp4", sibnetVfId: "4799689" },
          { number: 5, title: "épisode 5", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-5.mp4", sibnetVfId: "4799691" },
          { number: 6, title: "épisode 6", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-6.mp4", sibnetVfId: "4799693" },
          { number: 7, title: "épisode 7", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-7.mp4",  sibnetVfId: "4799696" },
          { number: 8, title: "épisode 8", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-8.mp4", sibnetVfId: "4799697" },
          { number: 9, title: "épisode 9", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-9.mp4",  sibnetVfId: "4799699" },
          { number: 10, title: "épisode 10", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-10.mp4", sibnetVfId: "4799700" },
          { number: 11, title: "épisode 11", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-11.mp4", sibnetVfId: "4799701" },
          { number: 12, title: "épisode 12", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-12.mp4", sibnetVfId: "4799702" },
          { number: 13, title: "épisode 13", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-13.mp4", sibnetVfId: "4799704" },
          { number: 14, title: "épisode 14", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-14.mp4", sibnetVfId: "4799707" },
          { number: 15, title: "épisode 15", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-15.mp4", sibnetVfId: "4799708" },
          { number: 16, title: "épisode 16", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-16.mp4", sibnetVfId: "4799709" },
          { number: 17, title: "épisode 17", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-17.mp4", sibnetVfId: "4799710" },
          { number: 18, title: "épisode 18", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-18.mp4", sibnetVfId: "4799712" },
          { number: 19, title: "épisode 19", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-19.mp4", sibnetVfId: "4799713" },
          { number: 20, title: "épisode 20", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-20.mp4", sibnetVfId: "4799715" },
          { number: 21, title: "épisode 21", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-21.mp4", sibnetVfId: "4799716" },
          { number: 22, title: "épisode 22", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-22.mp4", sibnetVfId: "4799717" },
          { number: 23, title: "épisode 23", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-23.mp4", sibnetVfId: "4799719" },
          { number: 24, title: "épisode 24", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-24.mp4",  sibnetVfId: "4799721" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2020,
        episodes: [
          { number: 1, title: "épisode 1", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-25.mp4", sibnetVfId: "4960001" },
          { number: 2, title: "épisode 2", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-26.mp4", sibnetVfId: "4960002" },
          { number: 3, title: "épisode 3", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-27.mp4", sibnetVfId: "4960003" },
          { number: 4, title: "épisode 4", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-28.mp4", sibnetVfId: "4960004" },
          { number: 5, title: "épisode 5", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-29.mp4", sibnetVfId: "4960005" },
          { number: 6, title: "épisode 6", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-30.mp4", sibnetVfId: "4960006" },
          { number: 7, title: "épisode 7", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-31.mp4", sibnetVfId: "4960007" },
          { number: 8, title: "épisode 8", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-32.mp4", sibnetVfId: "4960008" },
          { number: 9, title: "épisode 9", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-33.mp4", sibnetVfId: "4960009" },
          { number: 10, title: "épisode 10", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-34.mp4", sibnetVfId: "4960010" },
          { number: 11, title: "épisode 11", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-35.mp4", sibnetVfId: "4960011" },
          { number: 12, title: "épisode 12", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-36.mp4", sibnetVfId: "4960012" },
          { number: 13, title: "épisode 13", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-37.mp4", sibnetVfId: "4960013" },
          { number: 14, title: "épisode 14", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-38.mp4", sibnetVfId: "4960014" },
          { number: 15, title: "épisode 15", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-39.mp4", sibnetVfId: "4960015" },
          { number: 16, title: "épisode 16", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-40.mp4", sibnetVfId: "4960016" },
          { number: 17, title: "épisode 17", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-41.mp4", sibnetVfId: "4960017" },
          { number: 18, title: "épisode 18", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-42.mp4", sibnetVfId: "4960018" },
          { number: 19, title: "épisode 19", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-43.mp4", sibnetVfId: "4960019" },
          { number: 20, title: "épisode 20", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-44.mp4", sibnetVfId: "4960020" },
          { number: 21, title: "épisode 21", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-45.mp4", sibnetVfId: "4960021" },
          { number: 22, title: "épisode 22", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-46.mp4", sibnetVfId: "4960022" },
          { number: 23, title: "épisode 23", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-47.mp4", sibnetVfId: "4960023" },
          { number: 24, title: "épisode 24", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-48.mp4", sibnetVfId: "4960024" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3 - Partie 1",
        year: 2023,
        episodes: [
          { number: 1, title: "épisode 1", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-49.mp4", sibnetVfId: "5892668" },
          { number: 2, title: "épisode 2", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-50.mp4", sibnetVfId: "5899606" },
          { number: 3, title: "épisode 3", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-51.mp4", sibnetVfId: "5906897" },
          { number: 4, title: "épisode 4", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-52.mp4", sibnetVfId: "5913866" },
          { number: 5, title: "épisode 5", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-53.mp4", sibnetVfId: "5920282" },
          { number: 6, title: "épisode 6", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-54.mp4", sibnetVfId: "5925932" },
          { number: 7, title: "épisode 7", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-55.mp4", sibnetVfId: "5931026" },
          { number: 8, title: "épisode 8", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-56.mp4", sibnetVfId: "5936587" },
          { number: 9, title: "épisode 9", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-57.mp4", sibnetVfId: "5941940" },
          { number: 10, title: "épisode 10", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-58.mp4", sibnetVfId: "5947856" },
          { number: 11, title: "épisode 11", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-59.mp4", sibnetVfId: "5953737" },
          { number: 12, title: "épisode 12", mp4Url: "https://5.mugiwara.one/fire-force/fire-force-60.mp4", sibnetVfId: "5961614" }
        ]
      }
    ]
  },
  {
    id: "clannad",
    title: "Clannad",
    originalTitle: "クラナド",
    description: "Tomoya Okazaki est un lycéen qui a perdu tout intérêt pour la vie après la mort de sa mère et l'alcoolisme de son père. Un jour, il rencontre Nagisa Furukawa, une fille timide qui répète sa dernière année de lycée. Ensemble, ils vont former un club de théâtre et rencontrer d'autres élèves avec leurs propres problèmes. À travers ces rencontres, Tomoya va redécouvrir le sens de la vie et de l'amitié.",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/20/09/02/16/06/0799147.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2007,
    type: "Anime",
    status: "Terminé",
    genres: ["Drame", "Romance", "Slice of Life", "Supernatural"],
    rating: 8.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2007,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4942633", sibnetVfId: "" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4942634", sibnetVfId: "" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4942635", sibnetVfId: "" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4942636", sibnetVfId: "" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4942638", sibnetVfId: "" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4942639", sibnetVfId: "" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4942640", sibnetVfId: "" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4942641", sibnetVfId: "" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4942642", sibnetVfId: "" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4942643", sibnetVfId: "" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4942644", sibnetVfId: "" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4942646", sibnetVfId: "" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4942887", sibnetVfId: "" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4942889", sibnetVfId: "" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "4942891", sibnetVfId: "" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "4942893", sibnetVfId: "" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "4942896", sibnetVfId: "" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "4942897", sibnetVfId: "" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "4942900", sibnetVfId: "" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "4942902", sibnetVfId: "" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "4942904", sibnetVfId: "" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "4942906", sibnetVfId: "" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "4942909", sibnetVfId: "" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "4942911", sibnetVfId: "" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2008,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4942913", sibnetVfId: "" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4942915", sibnetVfId: "" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4942917", sibnetVfId: "" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4942918", sibnetVfId: "" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4942920", sibnetVfId: "" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4942921", sibnetVfId: "" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4942924", sibnetVfId: "" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4942925", sibnetVfId: "" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4942927", sibnetVfId: "" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4942928", sibnetVfId: "" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4942930", sibnetVfId: "" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4942931", sibnetVfId: "" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4942932", sibnetVfId: "" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4942934", sibnetVfId: "" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "4942937", sibnetVfId: "" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "4942938", sibnetVfId: "" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "4942939", sibnetVfId: "" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "4942940", sibnetVfId: "" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "4942942", sibnetVfId: "" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "4942943", sibnetVfId: "" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "4942944", sibnetVfId: "" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "4942945", sibnetVfId: "" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "4942947", sibnetVfId: "" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "4942949", sibnetVfId: "" },
          { number: 25, title: "épisode 24", sibnetVostfrId: "4942952", sibnetVfId: "" }
        ]
      }
    ]
  },
  {
    id: "call-of-the-night",
    title: "Call of the Night",
    originalTitle: "よふかしのうた",
    description: "Kou Yamori est un lycéen qui ne peut plus dormir la nuit. Un soir, il rencontre Nazuna Nanakusa, une mystérieuse jeune femme qui lui propose de l'aider à dormir. Mais Nazuna cache un secret : elle est une vampire. Alors que Kou découvre ce monde nocturne fascinant, il doit décider s'il veut devenir un vampire lui-même ou rester humain. Une histoire d'amour et de choix dans l'obscurité de la nuit.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/22/07/04/14/30/5500974.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Supernatural", "Drame", "Comédie"],
    rating: 8.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2022,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4780746", sibnetVfId: "5095543" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4796421", sibnetVfId: "5095544" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4797919", sibnetVfId: "5096001" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4804317", sibnetVfId: "5095551" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4813949", sibnetVfId: "5095553" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4822093", sibnetVfId: "5095554" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4834820", sibnetVfId: "5095556" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4845588", sibnetVfId: "5095557" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4853785", sibnetVfId: "5095558" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4863210", sibnetVfId: "5096002" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4872347", sibnetVfId: "5095560" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4880445", sibnetVfId: "5095561" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4890711", sibnetVfId: "5095563" }
        ]
      }
    ]
  },
  {
    id: "toradora",
    title: "Toradora!",
    originalTitle: "とらドラ！",
    description: "Ryūji Takasu est un lycéen qui a une apparence intimidante mais qui est en réalité très gentil. Il rencontre Taiga Aisaka, une fille petite mais avec un caractère explosif surnommée 'Tiger Palmtop'. Malgré leurs différences, ils décident de s'entraider pour conquérir leurs coups de cœur respectifs. Une comédie romantique touchante qui explore les relations humaines et l'amour adolescent.",
    imageUrl: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/toradora.png",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2008,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Drame", "École"],
    rating: 8.8,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2008,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4862610" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4862611" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4862612" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4862613" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4862614" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4862615" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4862616" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4862617" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4862619" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4862621" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4862622" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4862623" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4862624" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4862625" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "4862626" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "4862627" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "4862628" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "4862629" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "4862630" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "4862631" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "4862632" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "4862633" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "4862634" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "4862635" },
          { number: 25, title: "épisode 25", sibnetVostfrId: "4862636" }
        ]
      }
    ]
  },
  {
    id: "kaguya-sama",
    title: "Kaguya-sama: Love is War",
    originalTitle: "かぐや様は告らせたい〜天才たちの恋愛頭脳戦〜",
    description: "Kaguya Shinomiya et Miyuki Shirogane sont les deux meilleurs élèves de leur lycée prestigieux et dirigent ensemble le conseil des élèves. Ils sont secrètement amoureux l'un de l'autre, mais leur fierté les empêche de faire le premier pas. Ils élaborent des stratégies complexes pour forcer l'autre à avouer ses sentiments en premier, créant une bataille d'esprit hilarante.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/04/08/16/07/4929472.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "École", "Psychologique"],
    rating: 9.0,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4668794", sibnetVfId: "4866828" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4668802", sibnetVfId: "4866831" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4668813", sibnetVfId: "4866833" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4668821", sibnetVfId: "4866836" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4668830", sibnetVfId: "4866837" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4668834", sibnetVfId: "4866839" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4668843", sibnetVfId: "4866840" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4668846", sibnetVfId: "4866841" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4668850", sibnetVfId: "4866844" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4668848", sibnetVfId: "4866845" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4668852", sibnetVfId: "4866847" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4668856", sibnetVfId: "4866848" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2020,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4668845", sibnetVfId: "4905594" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4668847", sibnetVfId: "4905597" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4668851", sibnetVfId: "4905598" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4668853", sibnetVfId: "4905600" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4668857", sibnetVfId: "4905602" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4668861", sibnetVfId: "4905606" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4668868", sibnetVfId: "4905608" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4668878", sibnetVfId: "4905611" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4668884", sibnetVfId: "4905614" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4668899", sibnetVfId: "4905616" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4668912", sibnetVfId: "4905618" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4668919", sibnetVfId: "4905620" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2022,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4663982", sibnetVfId: "4712401" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4675257", sibnetVfId: "4712438" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4681391", sibnetVfId: "4712464" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4693711", sibnetVfId: "4721446" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4704501", sibnetVfId: "5131488" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4711602", sibnetVfId: "4747224" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4720734", sibnetVfId: "4755545" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4729988", sibnetVfId: "4764611" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4737656", sibnetVfId: "4775132" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4746239", sibnetVfId: "4784169" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4754941", sibnetVfId: "4908435" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4763998", sibnetVfId: "4908439" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4764011", sibnetVfId: "4908444" }
        ]
      }
    ]
  },
  {
    id: "your-name",
    title: "Your Name",
    originalTitle: "君の名は。",
    description: "Mitsuha, une lycéenne vivant dans une petite ville de montagne, et Taki, un lycéen de Tokyo, commencent mystérieusement à échanger leurs corps. Ils tentent de communiquer en laissant des notes, mais découvrent bientôt qu'ils vivent à des époques différentes. Une histoire d'amour transcendant le temps et l'espace, mêlant surnaturel et émotion pure.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Movie",
    status: "Terminé",
    genres: ["Romance", "Drame", "Supernatural", "Film"],
    rating: 9.2,
    episodes: [
      { number: 1, title: "Your Name", sibnetVostfrId: "5117447", sibnetVfId: "3202964" }
    ]
  },
  {
    id: "rent-a-girlfriend",
    title: "Rent-a-Girlfriend",
    originalTitle: "彼女、お借りします",
    description: "Kazuya Kinoshita, un étudiant de 20 ans, loue une petite amie après sa rupture. Chizuru Mizuhara semble être la petite amie parfaite, mais elle cache sa vraie personnalité. Quand leurs familles et amis découvrent leur relation, ils doivent maintenir le mensonge. Une comédie romantique moderne sur les relations artificielles qui deviennent réelles.",
    imageUrl: "https://www.myutaku.com/media/anime/poster/346502.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2020,
    type: "Anime",
    status: "En cours",
    genres: ["Romance", "Comédie", "Drame", "École"],
    rating: 7.8,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2020,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4771695", sibnetVfId: "4855764" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4771697", sibnetVfId: "4855780" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4771698", sibnetVfId: "4855781" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4771700", sibnetVfId: "4864639" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4771701", sibnetVfId: "4873903" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4771702", sibnetVfId: "4881884" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4771703", sibnetVfId: "4899939" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4771704", sibnetVfId: "4910295" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4771705", sibnetVfId: "4918648" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4771706", sibnetVfId: "4926330" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4771707", sibnetVfId: "4933247" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4771714", sibnetVfId: "4941522" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2022,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4774441", sibnetVfId: "4799781" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4782202", sibnetVfId: "4805941" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4796342", sibnetVfId: "4815431" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4798233", sibnetVfId: "4824094" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4805660", sibnetVfId: "4836151" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4815243", sibnetVfId: "4846446" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4823686", sibnetVfId: "4855451" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4835969", sibnetVfId: "4864647" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4846267", sibnetVfId: "4873892" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4855275", sibnetVfId: "4881875" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4864319", sibnetVfId: "4899946" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4873334", sibnetVfId: "4910303" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2023,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "5191316", sibnetVfId: "5210573" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "5198376", sibnetVfId: "5218924" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "5203864", sibnetVfId: "5224141" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "5210426", sibnetVfId: "5229870" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "5218711", sibnetVfId: "5234450" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "5224023", sibnetVfId: "5240295" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "5229776", sibnetVfId: "5248146" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "5239798", sibnetVfId: "5259168" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "5247399", sibnetVfId: "5264193" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "5253818", sibnetVfId: "5270518" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "5259015", sibnetVfId: "5279873" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "5264069", sibnetVfId: "5289512" }
        ]
      }
    ]
  },
  {
    id: "quintessential-quintuplets",
    title: "The Quintessential Quintuplets",
    originalTitle: "五等分の花嫁",
    description: "Fuutarou Uesugi, un étudiant brillant mais pauvre, devient le tuteur privé de quintuplées identiques riches mais ayant de mauvaises notes. Ichika, Nino, Miku, Yotsuba et Itsuki ont chacune une personnalité unique et développent des sentiments pour leur tuteur. Une comédie romantique harem où Fuutarou doit déterminer laquelle des sœurs il épousera.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODhmMGJjMjQtNDMzNi00ZTJmLWE4ZTItM2YwYjRlZWM5OWMxXkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Harem", "École"],
    rating: 8.6,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "3525692"},
          { number: 2, title: "épisode 2", sibnetVostfrId: "3531484"},
          { number: 3, title: "épisode 3", sibnetVostfrId: "3536097"},
          { number: 4, title: "épisode 4", sibnetVostfrId: "3540644"},
          { number: 5, title: "épisode 5", sibnetVostfrId: "3544962"},
          { number: 6, title: "épisode 6", sibnetVostfrId: "3549797"},
          { number: 7, title: "épisode 7", sibnetVostfrId: "3554643"},
          { number: 8, title: "épisode 8", sibnetVostfrId: "3560363"},
          { number: 9, title: "épisode 9", sibnetVostfrId: "3564715"},
          { number: 10, title: "épisode 10", sibnetVostfrId: "3569454"},
          { number: 11, title: "épisode 11", sibnetVostfrId: "3575247"},
          { number: 12, title: "épisode 12", sibnetVostfrId: "3581308"}
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2021,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4203768"},
          { number: 2, title: "épisode 2", sibnetVostfrId: "4210219"},
          { number: 3, title: "épisode 3", sibnetVostfrId: "4214225"},
          { number: 4, title: "épisode 4", sibnetVostfrId: "4218729"},
          { number: 5, title: "épisode 5", sibnetVostfrId: "4225176"},
          { number: 6, title: "épisode 6", sibnetVostfrId: "4231060"},
          { number: 7, title: "épisode 7", sibnetVostfrId: "4239653"},
          { number: 8, title: "épisode 8", sibnetVostfrId: "4245733"},
          { number: 9, title: "épisode 9", sibnetVostfrId: "4252665"},
          { number: 10, title: "épisode 10", sibnetVostfrId: "4672169"},
          { number: 11, title: "épisode 11", sibnetVostfrId: "4263921"},
          { number: 12, title: "épisode 12", sibnetVostfrId: "4271640"}
        ]
      },
      {
        seasonNumber: "Film",
        title: "Film",
        year: 2022,
        episodes: [
          { number: 1, title: "The Quintessential Quintuplets Movie", sibnetVostfrId: "5119913"}
        ]
      }
    ]
  },
  {
    id: "weathering-with-you",
    title: "Weathering with You",
    originalTitle: "天気の子",
    description: "Hodaka, un lycéen qui a fui sa ville natale pour Tokyo, rencontre Hina, une fille orpheline qui a le pouvoir mystérieux de faire cesser la pluie et de faire apparaître le soleil. Dans un Tokyo constamment pluvieux, ils commencent un petit business météorologique, mais découvrent bientôt le vrai prix du pouvoir de Hina. Une histoire d'amour touchante sur le sacrifice et les choix difficiles.",
    imageUrl: "https://m.media-amazon.com/images/I/91IWdBo4TnL._UF894,1000_QL80_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Movie",
    status: "Terminé",
    genres: ["Romance", "Drame", "Supernatural", "Film"],
    rating: 8.9,
    episodes: [
      { number: 1, title: "Weathering with You", sibnetVostfrId: "4831762", sibnetVfId: "4110281" }
    ]
  },
  {
    id: "domestic-girlfriend",
    title: "Domestic Girlfriend",
    originalTitle: "ドメスティックな彼女",
    description: "Natsuo Fujii est un lycéen écrivain en herbe qui entretient une relation compliquée avec sa professeure Hina. Après qu'il ait couché avec une fille rencontrée lors d'une fête, Rui, sa vie devient encore plus compliquée quand son père se remarie et que ses nouvelles belles-sœurs s'avèrent être... Hina et Rui. Un triangle amoureux complexe dans un environnement familial peu conventionnel.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYmQyNWI1ZTgtMTgzNC00ZGIyLTg3NWMtZmM2ZjMzNTNjOTU5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Drame", "École", "Mature"],
    rating: 7.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2019,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "3525937" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "3531585" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "3536725" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "3540942" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "3545607" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "3550170" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "3555093" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "3560360" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "3565180" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "3570017" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "3575949" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "3582199" }
        ]
      }
    ]
  },
  {
    id: "golden-time",
    title: "Golden Time",
    originalTitle: "ゴールデンタイム",
    description: "Banri Tada, un étudiant universitaire qui a perdu ses souvenirs d'avant un accident, commence une nouvelle vie à Tokyo. Il rencontre Koko Kaga, une belle fille obsédée par son ami d'enfance Mitsuo. Alors que Banri tombe amoureux de Koko et qu'elle commence à s'ouvrir à lui, ses souvenirs passés menacent de revenir et de détruire sa nouvelle vie. Une histoire d'amour mature sur la mémoire et l'identité.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BNGI0YjdmNGYtZTQ0OC00OWUzLTg2NWMtMjFhNGI1Y2IxNzdmXkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2013,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Drame", "Comédie", "Université"],
    rating: 8.3,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2013,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4765393" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4765395" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4765397" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4765400" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4765401" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4765402" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4765405" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4765406" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4765407" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4765409" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4765412" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4765413" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4765414" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4765415" },
          { number: 15, title: "épisode 15", sibnetVostfrId: "4765419" },
          { number: 16, title: "épisode 16", sibnetVostfrId: "4765420" },
          { number: 17, title: "épisode 17", sibnetVostfrId: "4765421" },
          { number: 18, title: "épisode 18", sibnetVostfrId: "4765423" },
          { number: 19, title: "épisode 19", sibnetVostfrId: "4765424" },
          { number: 20, title: "épisode 20", sibnetVostfrId: "4765427" },
          { number: 21, title: "épisode 21", sibnetVostfrId: "4765429" },
          { number: 22, title: "épisode 22", sibnetVostfrId: "4765430" },
          { number: 23, title: "épisode 23", sibnetVostfrId: "4765431" },
          { number: 24, title: "épisode 24", sibnetVostfrId: "4765435" }
        ]
      }
    ]
  },
  {
    id: "oregairu",
    title: "OreGairu",
    originalTitle: "やはり俺の青春ラブコメはまちがっている。",
    description: "Hachiman Hikigaya est un lycéen cynique qui n'a pas d'amis et préfère être seul. Forcé de rejoindre le club de service communautaire dirigé par Yukino Yukinoshita, une fille intelligente mais froide, il doit aider d'autres étudiants avec leurs problèmes. Avec l'ajout de Yui Yuigahama, une fille énergique, le trio développe une dynamique complexe qui remet en question les idées de Hachiman sur l'authenticité et les relations.",
    imageUrl: "https://adala-news.fr/wp-content/uploads/2020/02/Oregairu-Saison-3-anime-image.png",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2013,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Drame", "École"],
    rating: 8.7,
    seasons: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        year: 2013,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4853949" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4853951" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4853953" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4853956" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4853961" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4853963" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4853965" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4853968" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4853973" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4853974" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4853976" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4853977" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4853979" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4853980" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        year: 2015,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4853981" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4853982" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4853983" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4853984" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4853986" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4853989" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4853991" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4853994" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4853996" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4853998" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4854000" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4854003" },
          { number: 13, title: "épisode 13", sibnetVostfrId: "4854006" },
          { number: 14, title: "épisode 14", sibnetVostfrId: "4854009" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        year: 2020,
        episodes: [
          { number: 1, title: "épisode 1", sibnetVostfrId: "4854011" },
          { number: 2, title: "épisode 2", sibnetVostfrId: "4854012" },
          { number: 3, title: "épisode 3", sibnetVostfrId: "4854013" },
          { number: 4, title: "épisode 4", sibnetVostfrId: "4854014" },
          { number: 5, title: "épisode 5", sibnetVostfrId: "4854016" },
          { number: 6, title: "épisode 6", sibnetVostfrId: "4854017" },
          { number: 7, title: "épisode 7", sibnetVostfrId: "4854018" },
          { number: 8, title: "épisode 8", sibnetVostfrId: "4854019" },
          { number: 9, title: "épisode 9", sibnetVostfrId: "4854021" },
          { number: 10, title: "épisode 10", sibnetVostfrId: "4854022" },
          { number: 11, title: "épisode 11", sibnetVostfrId: "4854023" },
          { number: 12, title: "épisode 12", sibnetVostfrId: "4854026" },
          { number: 12.5, title: "épisode 12.5", sibnetVostfrId: "5132906" }
        ]
      }
    ]
  },
  {
    id: "silent-voice",
    title: "Silent Voice",
    originalTitle: "映画 聲の形",
    description: "Tout commence lorsque Shôko Nishimiya intègre en cours d'année la classe de primaire de Shôya Ishida. La jeune Shôko est une sourde et Shôya est un jeune garçon turbulent qui n'en fait qu'à sa tête et qui ne cause que des problèmes. Ce sont deux personnes différentes et Shôya ne semble pas comprendre qui est réellement Shôko. De ce fait, il commencera à la brutaliser, ne sachant pas comment s'y prendre avec elle. La classe suivra le mouvement au fur et à mesure, mais plus discrètement, sans que leur professeur principal ne fasse d'efforts pour les rappeler à l'ordre. Seulement un jour, le garçon dépasse les limites et le directeur demande à savoir qui a cassé les appareils auditifs de Shôko. C'est ainsi que Shôya réalisera qu'il se retrouve tout seul car tout le monde lui tourne le dos, feignant d'avoir été manipulés par ce dernier. Shôko est transférée dans une nouvelle école et Shôya se rend compte que chaque jour, malgré tout, elle souhaitait seulement être son amie.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/18/07/13/11/32/3961973.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Fantasy", "Comédie", "Supernatural"],
    rating: 8.5,
    seasons: [
      {
        seasonNumber: 1,
        title: "Film",
        year: 2016,
        episodes: [
          { number: 1, title: "Silent Voice", sibnetVostfrId: "4824811", sibnetVfId: "5036237" },
        ]
      }
    ]
  }
];
