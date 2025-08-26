// Types pour les données d'anime
// Import supprimé - utiliser realAutoImport.ts pour l'auto-chargement

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
  sendvidId?: string;     // Sendvid VOSTFR
  sendvidVfId?: string;   // Sendvid VF
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
  language?: string; // VF, VOSTFR, ou VF & VOSTFR
  seasons?: AnimeSeason[];
  episodes?: AnimeEpisode[]; // Garder le support pour l'ancienne structure
}

// Fonction pour récupérer un anime par son ID
export function getAnimeById(id: string): Anime | undefined {
  return animes.find(anime => anime.id === id);
}

// Fonction pour récupérer tous les animes
export function getAllAnimes() {
  return animes;
}

// Fonction pour récupérer tous les animes de la liste
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
    genres: ["Science-fiction", "Action", "Cyberpunk", "Psychologique", "Combats", "Dystopie", "Technologies", "Futur"],
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
    genres: ["Comédie", "Romance", "Slice of Life", "École", "Adolescence", "Art"],
    rating: 8.0
  },
  {
    id: "ijiranaide-nagatoro-san",
    title: "Arrête de me chauffer Nagatoro",
    originalTitle: "イジらないで、長瀞さん",
    description: "Naoto Hachiouji est un étudiant otaku solitaire qui passe son temps à dessiner. Un jour, il rencontre Hayase Nagatoro, une fille de première année qui commence à le taquiner sans relâche. Malgré l'embarras et l'humiliation qu'il ressent initialement, Naoto découvre peu à peu que leurs interactions lui permettent de sortir de sa coquille et que Nagatoro pourrait être plus attachée à lui qu'elle ne veut bien l'admettre.",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/21/03/24/17/22/3948943.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "Terminé",
    genres: ["Comédie", "Romance", "École", "Slice of Life", "Adolescence", "Harcèlement"],
    rating: 7.8
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
    genres: ["Action", "Fantasy", "Aventure", "Shônen", "Combats", "Autre monde"],
    rating: 9.0
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
    genres: ["Action", "Shônen", "Historique", "Surnaturel", "Combats", "Adolescence", "Démons", "Famille"],
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
    genres: ["Action", "Science-fiction", "Dystopie", "Combats"],
    rating: 8.7
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
    genres: ["Comédie", "Fantasy", "École", "Démons", "Surnaturel", "Adolescence"],
    rating: 8.2,
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
    genres: ["Sport", "Comédie", "Drame", "École", "Adolescence", "Amitié", "School Life"],
    rating: 8.7,
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
    genres: ["Action", "Shônen", "École", "Surnaturel", "Combats", "Adolescence", "Magie"],
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
    genres: ["Mystère", "Surnaturel", "Thriller", "Psychologique", "Crime", "Supernatural", "Mature"],
    rating: 9.0
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
    genres: ["Drame", "Romance", "Slice of Life", "Surnaturel", "École", "Famille", "Amitié"],
    rating: 8.5,
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
    genres: ["Action", "Fantasy", "Aventure", "Shônen", "Combats"],
    rating: 9.1,
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
    genres: ["Aventure", "Drame", "Fantasy", "Shônen", "Combats", "Magie", "Amitié"],
    rating: 8.9
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
    genres: ["Aventure", "Fantasy", "Isekai", "Comédie", "Autre monde"],
    rating: 7.0
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
    genres: ["Drame", "Psychologique", "École", "Thriller", "Adolescence", "School Life"],
    rating: 8.5,
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
    genres: ["Romance", "Comédie", "Slice of Life", "École", "Adolescence", "Shônen"],
    rating: 8.4
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
    genres: ["Action", "Fantasy", "Surnaturel", "Shounen"],
    rating: 8.2
  },
  {
    id: "yofukashi-no-uta",
    title: "Call of the Night",
    originalTitle: "よふかしのうた",
    description: "Kou Yamori est un lycéen qui ne peut plus dormir la nuit. Un soir, il rencontre Nazuna Nanakusa, une mystérieuse jeune femme qui lui propose de l'aider à dormir. Mais Nazuna cache un secret : elle est une vampire. Alors que Kou découvre ce monde nocturne fascinant, il doit décider s'il veut devenir un vampire lui-même ou rester humain. Une histoire d'amour et de choix dans l'obscurité de la nuit.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/22/07/04/14/30/5500974.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Surnaturel", "Drame", "Comédie"],
    rating: 8.5
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
    genres: ["Romance", "Comédie", "Drame", "École", "Adolescence"],
    rating: 8.8
  },
  {
    id: "kaguya-sama-love-is-war",
    title: "Kaguya-sama: Love is War",
    originalTitle: "かぐや様は告らせたい〜天才たちの恋愛頭脳戦〜",
    description: "Kaguya Shinomiya et Miyuki Shirogane sont les deux meilleurs élèves de leur lycée prestigieux et dirigent ensemble le conseil des élèves. Ils sont secrètement amoureux l'un de l'autre, mais leur fierté les empêche de faire le premier pas. Ils élaborent des stratégies complexes pour forcer l'autre à avouer ses sentiments en premier, créant une bataille d'esprit hilarante.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/20/04/08/16/07/4929472.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "École", "Psychologique", "Adolescence"],
    rating: 9.0
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
    genres: ["Romance", "Drame", "Surnaturel", "Art", "Voyage temporel", "Amour"],
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
    genres: ["Romance", "Comédie", "Drame", "École", "Adolescence", "Harem"],
    rating: 7.8
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
    genres: ["Romance", "Comédie", "Harem", "École", "Adolescence"],
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
    genres: ["Romance", "Drame", "Surnaturel", "Film"],
    rating: 8.9,
    seasons: [
      {
        seasonNumber: 1,
        title: "Film",
        year: 2019,
        episodes: [
          { number: 1, title: "Weathering with You", sibnetVostfrId: "4831762", sibnetVfId: "4110281" }
        ]
      }
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
    genres: ["Romance", "Drame", "École", "Mature", "Adolescence"],
    rating: 7.5
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
    genres: ["Romance", "Comédie", "Drame", "École", "Adolescence"],
    rating: 8.7
  },
  {
    id: "silent-voice",
    title: "Silent Voice",
    originalTitle: "映画 聲の形",
    description: "Tout commence lorsque Shôko Nishimiya intègre en cours d'année la classe de primaire de Shôya Ishida. La jeune Shôko est une sourde et Shôya est un jeune garçon turbulent qui n'en fait qu'à sa tête et qui ne cause que des problèmes. Ce sont deux personnes différentes et Shôya ne semble pas comprendre qui est réellement Shôko. De ce fait, il commencera à la brutaliser, ne sachant pas comment s'y prendre avec elle. La classe suivra le mouvement au fur et à mesure, sans que leur professeur principal ne fasse d'efforts pour les rappeler à l'ordre. Seulement un jour, le garçon dépasse les limites et le directeur demande à savoir qui a cassé les appareils auditifs de Shôko. C'est ainsi que Shôya réalisera qu'il se retrouve tout seul car tout le monde lui tourne le dos, feignant d'avoir été manipulés par ce dernier. Shôko est transférée dans une nouvelle école et Shôya se rend compte que chaque jour, malgré tout, elle souhaitait seulement être son amie.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/18/07/13/11/32/3961973.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Fantasy", "Comédie", "Surnaturel"],
    rating: 8.5
  },
  {
    id: "365-days-to-the-wedding",
    title: "365 Days to the Wedding",
    originalTitle: "結婚するって、本当ですか",
    description: "Takuya Ohara et Rika Honjoji travaillent dans la même agence de voyage. L'entreprise annonce qu'elle ouvre une nouvelle succursale en Alaska et que les employés célibataires seront recrutés pour y travailler. Craignant d'être tous les deux choisis, ils décident de simuler une relation jusqu'à ce que quelqu'un soit sélectionné. Une comédie romantique touchante sur deux introvertis qui découvrent l'amour à travers un faux mariage.",
    imageUrl: "https://fr.web.img6.acsta.net/img/c1/7a/c17af00afe845e138265cdf4dc445720.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Slice of Life",],
    rating: 8.3
  },
  {
    id: "nana",
    title: "NANA",
    originalTitle: "ナナ",
    description: "Deux jeunes femmes au nom identique, Nana, se rencontrent dans un train pour Tokyo et deviennent colocataires. Nana Komatsu (surnommée Hachi) cherche l'amour et le bonheur, tandis que Nana Osaki poursuit son rêve de devenir une rock star avec son groupe Black Stones. Leurs vies s'entremêlent dans une histoire de friendship, d'amour, de musique et de rêves brisés, explorant les défis de la vie d'adulte à Tokyo.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYjRmOWJmMDgtYjBjMS00OTg1LWJmZTItZTY2MjJlODgxNmUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2006,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Drame", "Slice of Life", "Musique"],
    rating: 8.4
  },
  {
    id: "ragna-crimson",
    title: "Ragna Crimson",
    originalTitle: "ラグナクリムゾン",
    description: "Dans un monde ravagé par des dragons, Ragna, un jeune chasseur de dragons faible, fait équipe avec la sorcière d'argent Leonica pour affronter ces créatures terrifiantes. Mais quand Leonica est tuée, Ragna est mystérieusement ramené dans le passé avec les souvenirs et les pouvoirs de son futur soi. Déterminé à changer le destin et sauver Leonica, il entreprend une quête vengeresse contre les dragons qui ont détruit son monde.",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/23/09/29/09/01/0704302.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Drama", "Fantasy", "Dragons", "Voyage temporel"],
    rating: 7.8
  },
  {
    id: "tsukimichi-moonlit-fantasy",
    title: "Tsukimichi - Moonlit Fantasy",
    originalTitle: "月が導く異世界道中",
    description: "Makoto Misumi est un lycéen japonais normal qui est soudainement convoqué dans un autre monde par la déesse de ce monde. Cependant, la déesse le trouve laid et le bannit dans le désert à la frontière du monde. Là, il rencontre des créatures mythiques et découvre qu'il possède des pouvoirs magiques exceptionnels. Avec l'aide de ses nouveaux alliés, Makoto doit survivre dans ce monde hostile et peut-être même changer le cours de l'histoire.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/21/07/05/14/43/1726486.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Aventure", "Comédie", "Fantasy", "Isekai", "Magie"],
    rating: 7.5
  },
  {
    id: "shingeki-no-kyojin",
    title: "Attack on Titan",
    originalTitle: "進撃の巨人",
    description: "Dans un monde où l'humanité vit enfermée derrière d'énormes murailles pour se protéger des Titans, des géants humanoïdes mangeurs d'hommes, Eren Jäger rêve de liberté et souhaite rejoindre le Bataillon d'exploration pour voir le monde extérieur.",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/20/12/28/10/24/5603983.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2013,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Drame", "Fantasy", "Shounen", "Combats","Psychologique"],
    rating: 9.0
  },
  {
    id: "86-eighty-six",
    title: "86 EIGHTY-SIX",
    originalTitle: "86 ―エイティシックス―",
    description: "Dans la République de San Magnolia, la guerre contre les robots autonomes de l'Empire voisin fait rage depuis neuf ans. Officiellement, il n'y a aucune victime humaine dans cette guerre. En réalité, les citoyens de deuxième classe, les '86', sont forcés de piloter des drones de combat dans une bataille désespérée.",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1987/117507.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Drame", "Mecha", "Science-Fiction", "Militaire"],
    rating: 8.7
  },
  {
    id: "akame-ga-kill",
    title: "Akame ga Kill!",
    originalTitle: "アカメが斬る!",
    description: "Tatsumi, un jeune guerrier, se rend dans la capitale pour gagner de l'argent pour son village. Il découvre rapidement la corruption qui règne et rejoint un groupe d'assassins révolutionnaires appelé Night Raid, déterminés à renverser le gouvernement tyrannique.",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1429/95946.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Drame", "Fantasy", "Shounen"],
    rating: 7.8
  },
  {
    id: "aldnoah-zero",
    title: "Aldnoah.Zero",
    originalTitle: "アルドノア・ゼロ",
    description: "En 1972, l'humanité découvre un portail vers Mars. Les colons martiens développent une technologie avancée appelée Aldnoah et déclarent leur indépendance sous le nom d'Empire Vers. Quinze ans plus tard, une guerre éclate entre la Terre et Mars.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BOWFkZjdmMzgtMzM0MC00YTA0LWI3Y2YtZmNiOTk4OTE2OTUwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
        year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Mecha", "Science-Fiction", "Militaire", "Drame"],
    rating: 7.4
  },
  {
    id: "ajin",
    title: "Ajin",
    originalTitle: "亜人",
    description: "Les Ajin sont des immortels découverts il y a 17 ans en Afrique. Kei Nagai était un lycéen normal jusqu'au jour où il découvre qu'il est lui-même un Ajin. Traqué par le gouvernement, il doit fuir et apprendre à contrôler ses nouveaux pouvoirs terrifiants.",
    imageUrl: "https://www.manga-news.com/public/images/series/ajin-1-glenat.webp",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Horror", "Mystery", "Supernatural", "Seinen"],
    rating: 7.9
  },
  {
    id: "air-gear",
    title: "Air Gear",
    originalTitle: "エア・ギア",
    description: "Itsuki Minami vit avec quatre sœurs adoptives dans un quartier violent. Sa vie change quand il découvre les Air Treck, des patins à roulettes motorisés qui permettent aux riders de voler. Il rejoint le monde underground des Storm Riders.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMjg4NDc4NjctOTg0ZC00NDU0LWE3ZmQtNTQ2NWQ2MzMyYjZmXkEyXkFqcGc@._V1_QL75_UY281_CR2,0,190,281_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2006,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Comedy", "Ecchi", "School", "Shounen", "Sports"],
    rating: 7.4
  },
  {
    id: "aharen-san-wa-hakarenai",
    title: "Aharen-san wa Hakarenai",
    originalTitle: "阿波連さんははかれない",
    description: "Reina Aharen est une fille très petite qui a du mal à jauger la distance appropriée entre elle et les autres. Raidou, son voisin de classe, remarque ses difficultés et décide de devenir son ami, menant à des situations hilarantes et touchantes.",
    imageUrl: "https://fr.web.img2.acsta.net/pictures/22/03/31/09/46/1204786.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "Terminé",
    genres: ["Comedy", "Romance", "School", "Slice of Life"],
    rating: 7.6
  },
  {
    id: "aho-girl",
    title: "Aho Girl",
    originalTitle: "アホガール",
    description: "Yoshiko Hanabatake est une lycéenne extrêmement stupide qui adore les bananes. Son ami d'enfance Akuru Akutsu essaie constamment de la corriger, mais ses efforts sont souvent vains face à sa bêtise sans limites.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BOWRkMjEyNDAtZTg0Ny00YzU0LWIwYjItY2EyZjQ5ZTdhNDFmXkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2017,
    type: "Anime",
    status: "Terminé",
    genres: ["Comedy", "Romance", "School", "Shounen"],
    rating: 6.9
  },
  {
    id: "akatsuki-no-yona",
    title: "Yona of the Dawn",
    originalTitle: "暁のヨナ",
    description: "La princesse Yona a vécu une vie protégée au château jusqu'à ce que son cousin Su-won assassine son père et prenne le trône. Forcée de fuir avec son garde du corps Hak, elle doit rassembler les quatre Dragons légendaires pour reconquérir son royaume.",
    imageUrl: "https://fr.web.img6.acsta.net/pictures/20/03/06/17/37/4676109.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "Shoujo"],
    rating: 8.4
  },
  {
    id: "91-days",
    title: "91 Days",
    originalTitle: "91デイズ",
    description: "Pendant la prohibition aux États-Unis, Angelo Lagusa revient dans la ville de Lawless pour venger le meurtre de sa famille. Il s'infiltre dans la famille Vanetti sous une fausse identité et planifie méthodiquement sa vengeance sur 91 jours.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/20/08/27/14/04/0312906.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Drama", "Historical", "Mafia"],
    rating: 7.8
  },
  {
    id: "absolute-duo",
    title: "Absolute Duo",
    originalTitle: "アブソリュート・デュオ",
    description: "Tor Kokonoe entre dans l'académie Koryo pour devenir un Exceed, une personne capable de matérialiser son âme en arme. Il forme un duo avec Julie Sigtuna et ensemble ils affrontent les défis de l'académie tout en découvrant des conspiracies plus sombres.",
    imageUrl: "https://image.tmdb.org/t/p/original/reoZZ94M0nDL7SGstuChqbLlhNT.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2015,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Ecchi", "Harem", "Romance", "School", "Supernatural"],
    rating: 6.3
  },
  {
    id: "slam-dunk",
    title: "Slam Dunk",
    originalTitle: "スラムダンク",
    description: "Hanamichi Sakuragi, un lycéen de 16 ans délinquant aux cheveux roux, tombe amoureux de Haruko Akagi qui adore le basket-ball. Désireux de conquérir son cœur, il s'inscrit dans l'équipe de basket de son lycée, les Shohoku. Malgré sa grande taille et sa force physique, Sakuragi est un débutant complet. Sous la tutelle du capitaine Takenori Akagi (frère aîné de Haruko), il va progressivement découvrir sa passion pour ce sport et développer ses talents naturels.",
    imageUrl: "https://fr.web.img3.acsta.net/pictures/23/04/18/18/46/1142239.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 1993,
    type: "Anime",
    status: "Terminé",
    genres: ["Sports", "Comédie", "Drame", "École", "Shōnen"],
    rating: 9.0,
    language: "VOSTFR"
  },
  {
    id: "shirobako",
    title: "Shirobako",
    originalTitle: "SHIROBAKO",
    description: "Cinq amies du lycée rêvent de travailler ensemble dans l'industrie de l'animation. Deux ans plus tard, Aoi Miyamori travaille comme assistante de production dans un studio d'animation. Suivez les coulisses de la création d'un anime à travers les yeux d'Aoi, qui découvre les défis et les joies de l'industrie de l'animation. Entre deadlines serrées, problèmes créatifs et relations humaines complexes, Shirobako offre un regard réaliste et touchant sur le monde de l'animation japonaise.",
    imageUrl: "https://m.media-amazon.com/images/I/81AFkgbK58L._UF894,1000_QL80_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé", 
    genres: ["Comédie", "Drame", "Tranche de vie", "Travail"],
    rating: 8.3,
    language: "VOSTFR"
  },
  {
    id: "skip-to-loafer",
    title: "Skip to Loafer",
    originalTitle: "スキップとローファー",
    description: "Mitsumi Iwakura est une lycéenne studieuse qui vient de la campagne et entre dans un prestigieux lycée de Tokyo. Malgré sa détermination et ses excellentes notes, elle se retrouve souvent perdue dans cette grande ville. Heureusement, elle rencontre Shima Sousuke, un garçon populaire qui l'aide à s'adapter. Cette comédie slice-of-life suit Mitsumi dans sa découverte de la vie lycéenne à Tokyo, mêlant moments touchants, situations comiques et développement des personnages.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMTI3MmJmZmMtMTNkZi00Nzk3LTk5MDUtZmUzMGRlNDFkZmE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "Terminé",
    genres: ["Comédie", "Romance", "Tranche de vie", "École"],
    rating: 8.1,
    language: "VOSTFR"
  },
  {
    id: "shingeki-no-bahamut",
    title: "Rage of Bahamut: Genesis",
    originalTitle: "神撃のバハムート GENESIS",
    description: "Il y a deux mille ans, l'humanité était au bord de la destruction à cause de Bahamut, une bête démoniaque. Les anges et les démons s'unirent pour sceller cette créature, divisant sa clé en deux parties. Dans le royaume de Mistarcia, la coexistence entre humains, dieux et démons maintient un équilibre fragile. Favaro Leone, un chasseur de primes, rencontre une mystérieuse femme amnésique qui détient la moitié de la clé de Bahamut. Cette rencontre va déclencher une aventure épique mêlant action, magie et destins croisés.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BODlhNzBjZjgtOTk4OC00ZTFiLWJkOWItMzQ0ZTY5MGZmMDI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Fantastique", "Magie", "Démons"],
    rating: 8.2,
    language: "VF & VOSTFR"
  },
  {
    id:"Cyberpunk-Edgerunners",
    title: "Cyberpunk Edgerunners",
    originalTitle: "サイバーパンク: エッジランナーズ",
    description:"Dans une société dystopique rongée par la corruption et les implants cybernétiques, un jeune de la rue talentueux et impulsif aspire à devenir un mercenaire hors-la-loi.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Fantastique", "Sci-fi"],
    rating: 8.5,
    language: "VF & VOSTFR"
  },
  {
    id: "somali-to-mori-no-kamisama",
    title: "Somali and the Forest Spirit",
    originalTitle: "ソマリと森の神様",
    description: "Dans un monde dominé par des créatures fantastiques, les humains sont en voie d'extinction et sont chassés par les autres races. Un golem gardien de la forêt découvre une petite fille humaine qu'il nomme Somali. Bien qu'il ne lui reste que 1000 jours avant que sa magie ne s'épuise, le golem décide d'entreprendre un voyage pour trouver d'autres humains qui pourraient s'occuper de Somali. Cette histoire touchante explore les liens entre un père adoptif non-humain et sa fille humaine, dans un monde à la fois beau et dangereux.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BMGI5NzcyYmItNjI1ZS00YWU4LWE1ODYtYmZhN2E1YmU1MTk4XkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2020,
    type: "Anime",
    status: "Terminé",
    genres: ["Aventure", "Drame", "Fantastique", "Tranche de vie"],
    rating: 8.0,
    language: "VOSTFR"
  },
  {
    id: "a-couple-of-cuckoos",
    title: "A Couple of Cuckoos",
    originalTitle: "カッコウの許嫁",
    description: "Nagi Umino découvre qu'il a été échangé à la naissance et que ses vrais parents veulent qu'il épouse leur fille adoptive, Erika Amano. Le problème ? Nagi est déjà amoureux de sa camarade de classe, et Erika a déjà un petit ami.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYWY3MjQ3OTEtMmEwYi00NTYxLWE4ZWQtZWE5YWY1OTE4MDZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "En cours",
    genres: ["Comedy", "Romance", "School", "Shounen"],
    rating: 7.1
  },
  {
    id: "3d-kanojo",
    title: "3D Kanojo: Real Girl",
    originalTitle: "3D彼女 リアルガール",
    description: "Hikari Tsutsui est un otaku introverti qui passe son temps libre à jouer aux jeux vidéo et à regarder des animes. Sa vie change radicalement quand la belle et populaire Iroha Igarashi commence à s'intéresser à lui. Cette comédie romantique explore les défis d'une relation entre deux personnes aux personnalités et intérêts très différents, tout en abordant les thèmes de l'acceptation de soi et de la croissance personnelle.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BYzQ4ZTUzM2UtMzg5MS00MjliLTgzNWYtZTBkYjBkMDA3ZWVhXkEyXkFqcGc@._V1_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "École", "Tranche de vie"],
    rating: 7.2,
    language: "VOSTFR"
  },
  {
    id: "acca-13-ku-kansatsu-ka",
    title: "ACCA: 13-Territory Inspection Dept.",
    originalTitle: "ACCA13区監察課",
    description: "Dans le royaume de Dowa, divisé en 13 territoires autonomes, l'organisation ACCA maintient la paix depuis 99 ans. Jean Otus travaille comme inspecteur pour ACCA et effectue des tournées de routine dans les différents territoires. Cependant, des rumeurs de coup d'État commencent à circuler, et Jean se retrouve malgré lui au centre d'une intrigue politique complexe. Cette série mélange mystère, politique et développement de personnages dans un monde aux allures rétro-futuristes.",
    imageUrl: "https://m.media-amazon.com/images/M/MV5BM2Y5NmNkY2ItNTlkMi00YzYzLTgzYjctMjRhMThlMWE3NGE2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2017,
    type: "Anime",
    status: "Terminé",
    genres: ["Mystère", "Politique", "Drame", "Militaire"],
    rating: 7.8
  },
  {
    id: "acchi-kocchi",
    title: "Place to Place",
    originalTitle: "あっちこっち",
    description: "Tsumiki Miniwa est secrètement amoureuse de son camarade de classe Io Otonashi, mais elle est trop timide pour exprimer ses sentiments. Leurs amis Mayoi, Sakaki et Hime observent cette romance innocente avec amusement. Cette comédie slice-of-life suit le quotidien de ce groupe d'amis au lycée, rempli de moments mignons, de malentendus romantiques et de situations comiques. L'anime est connu pour son style artistique adorable et son humour léger.",
    imageUrl: "", 
    bannerUrl: "/picture/bassembanniere.png",
    year: 2012,
    type: "Anime",
    status: "Terminé",
    genres: ["Comédie", "Romance", "Tranche de vie", "École"],
    rating: 7.4
  },
  {
    id: "shirayuki-aux-cheveux-rouges",
    title: "shirayuki aux cheveux rouges",
    originalTitle: "赤髪の白雪姫",
    description: "Shirayuki est une herboriste aux cheveux roux flamboyants qui vit paisiblement jusqu'à ce que le prince Raji de son royaume décide de faire d'elle sa concubine à cause de sa beauté unique. Pour échapper à ce destin, elle fuit vers le royaume voisin de Clarines où elle rencontre Zen, le deuxième prince du royaume. Impressionné par sa détermination et sa gentillesse, Zen l'aide à devenir pharmacienne de la cour. Cette romance fantasy suit leur relation qui se développe lentement dans un cadre politique complexe.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png", 
    year: 2015,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Fantastique", "Drame", "Historique"],
    rating: 8.0
  },
  {
    id: "shinigami-bocchan-to-kuro-maid",
    title: "The Duke of Death and His Maid",
    originalTitle: "死神坊ちゃんと黒メイド",
    description: "Le jeune duc a été maudit : tout ce qu'il touche meurt instantanément. Isolé dans une villa avec pour seule compagnie sa dévouée femme de chambre Alice, il tente de briser sa malédiction. Alice, malicieuse et taquine, aime provoquer son maître malgré le danger que représente sa malédiction. Cette comédie romantique gothique mélange moments touchants et situations comiques, explorant les thèmes de l'amour impossible et de l'espoir face à l'adversité.",
    imageUrl: "https://cdn-eu.anidb.net/images/main/300788.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021, 
    type: "Anime",
    status: "En cours",
    genres: ["Comédie", "Romance", "Surnaturel", "Ecchi"],
    rating: 7.8
  },
  {
    id: "sk8-the-infinity",
    title: "SK8 the Infinity", 
    originalTitle: "SK∞ エスケーエイト",
    description: "Reki Kyan est un lycéen passionné de skateboard qui fréquente une course underground nocturne appelée \"S\". Il rencontre Langa Hasegawa, un étudiant canadien transféré qui n'a jamais fait de skateboard mais qui possède une expérience en snowboard. Ensemble, ils découvrent le monde exaltant et dangereux des courses de skateboard clandestines, affrontant des rivaux redoutables et développant leur amitié à travers leur passion commune pour ce sport extrême.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime", 
    status: "Terminé",
    genres: ["Sports", "Comédie", "Tranche de vie"],
    rating: 8.1
  },
  {
    id: "silent-witch",
    title: "Silent Witch",
    originalTitle: "沈黙の魔女の隠れ家",
    description: "Monica Everett est une sorcière prodigieusement douée mais extrêmement timide, capable de lancer des sorts sans incantation - un talent extrêmement rare. Malgré ses capacités exceptionnelles, elle préfère rester dans l'ombre. Quand elle est forcée d'intégrer l'académie de magie la plus prestigieuse pour protéger le prince, elle doit surmonter sa timidité maladive tout en cachant sa véritable identité. Cette histoire mélange magie, comédie et développement personnel.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "Terminé", 
    genres: ["Fantastique", "Comédie", "École", "Magie"],
    rating: 7.6
  },
  {
    id: "sirius-the-jaeger",
    title: "Sirius the Jaeger",
    originalTitle: "天狼 Sirius the Jaeger",
    description: "Dans le Tokyo des années 1930, un groupe de chasseurs de vampires appelés \"Jaegers\" arrive de l'étranger pour éliminer les vampires qui ont envahi la capitale japonaise. Parmi eux se trouve Yuliy, un werewolf dont le village natal a été détruit par les vampires. Armé d'une détermination sans faille et d'un mystérieux coffret que convoitent les vampires, Yuliy mène sa quête de vengeance dans une Tokyo en proie aux créatures de la nuit.",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1274/93070.jpg",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Surnaturel", "Vampires", "Historique"],
    rating: 7.3
  },
  {
    id: "shy",
    title: "Shy",
    originalTitle: "SHY",
    description: "Dans un monde où la paix règne grâce aux héros qui protègent chaque pays, Teru Momijiyama, alias Shy, est la héroïne timide du Japon. Malgré ses pouvoirs et sa responsabilité de protéger les gens, elle lutte constamment contre sa nature introvertie. Quand une nouvelle menace émerge et que les héros du monde entier commencent à être ciblés, Shy doit surmonter sa timidité pour sauver non seulement le Japon, mais le monde entier.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Super-héros", "Drame", "Surnaturel"],
    rating: 7.5
  },
  {
    id: "soul-eater",
    title: "Soul Eater",
    originalTitle: "ソウルイーター", 
    description: "À l'académie Shibusen, des étudiants s'entraînent pour devenir des technicians capables de manier des armes démoniaques qui peuvent se transformer en humains. Maka Albarn et son partenaire Soul Eater Evans, une faux parlante, doivent collecter 99 âmes de démons et une âme de sorcière pour transformer Soul en Death Scythe, l'arme ultime du Shinigami. Cette série d'action surnaturelle mélange combats spectaculaires, humour et développement de caractères dans un univers gothique unique.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2008,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Comédie", "Surnaturel", "Ecole", "Shōnen"],
    rating: 8.0
  },
  {
    id: "16bit-sensation-another-layer",
    title: "16bit Sensation: Another Layer",
    originalTitle: "16bitセンセーション ANOTHER LAYER",
    description: "Konoha Akisato est une illustratrice passionnée de jeux vidéo rétro qui travaille dans une société de développement moderne. Un jour, elle se retrouve mystérieusement transportée dans les années 1990, à l'âge d'or de l'industrie du jeu vidéo japonais. Dans cette époque, elle découvre un monde créatif effervescent et doit naviguer entre passé et présent pour réaliser ses rêves.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "Terminé",
    genres: ["Drame", "Comédie", "Tranche de vie", "Technologie"],
    rating: 7.6
  },
  {
    id: "dandadan",
    title: "Dandadan",
    originalTitle: "ダンダダン",
    description: "Momo Ayase, une lycéenne qui croit aux esprits, et Ken Takakura, un otaku qui croit aux aliens, font un pari : chacun va prouver l'existence de ce en quoi il croit. Mais ils découvrent que les deux phénomènes paranormaux existent vraiment, et ils doivent maintenant faire face à des aliens et des fantômes dans des aventures complètement délirantes.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Comédie", "Surnaturel", "Romance", "Ecchi", "Aliens / Extra-terrestres", "Fantômes", "Paranormal"],
    rating: 8.8
  },
  {
    id: "blue-archive-the-animation",
    title: "Blue Archive The Animation",
    originalTitle: "ブルーアーカイブ The Animation",
    description: "Dans la ville académique de Kivotos, le Sénat étudiant de Schale a été dissous en raison de l'accumulation de dettes. Pour résoudre divers problèmes dans Kivotos, le conseiller (joueur) devra collaborer avec les étudiantes de différentes écoles. Une adaptation de l'univers du jeu mobile populaire Blue Archive.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Comédie", "École", "Moe"],
    rating: 7.3
  },
  {
    id: "a-galaxy-next-door",
    title: "A Galaxy Next Door",
    originalTitle: "お隣の天使様",
    description: "Ichiro Kuga est un mangaka qui élève seul ses deux jeunes frères depuis la mort de leurs parents. Quand il engage Shiori Goshiki comme assistante, il découvre qu'elle possède des pouvoirs mystérieux. Cette comédie romantique mélange quotidien et éléments fantastiques dans une histoire touchante sur la famille et l'amour.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2023,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "Surnaturel", "Tranche de vie"],
    rating: 7.5
  },
  {
    id: "7th-time-loop-the-villainess-enjoys-a-carefree-life-married-to-her-worst-enemy",
    title: "7th Time Loop: The Villainess Enjoys a Carefree Life Married to Her Worst Enemy!",
    originalTitle: "ループ7回目の悪役令嬢は、元敵国で自由気ままな花嫁生活を満喫する",
    description: "Rishe Irmgard Weitzner revit sans cesse les mêmes cinq années de sa vie, mourant toujours à 20 ans. Dans sa septième boucle temporelle, elle décide d'épouser Arnold Hein, le prince héritier qui l'a tuée dans une précédente boucle, dans l'espoir de changer son destin et vivre enfin une vie paisible.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Romance", "Fantasy", "Isekai", "Drame"],
    rating: 7.8
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    originalTitle: "チェンソーマン",
    description: "Denji est un jeune homme endetté qui vit dans la misère avec son démon de compagnie Pochita. Quand des yakuzas les tuent, Pochita fusionne avec Denji et lui donne le pouvoir de se transformer en Chainsaw Man. Recruté par une organisation gouvernementale de chasseurs de démons, Denji découvre un monde violent où les démons menacent l'humanité.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Surnaturel", "Horreur", "Shônen", "Démons", "Combats", "Mature"],
    rating: 8.9
  },
  {
    id: "bocchi-the-rock",
    title: "Bocchi the Rock!",
    originalTitle: "ぼっち・ざ・ろっく！",
    description: "Hitori Gotoh est une lycéenne extrêmement timide qui rêve de jouer de la guitare dans un groupe. Surnommée 'Bocchi' (la solitaire), elle passe son temps à jouer seule dans sa chambre. Sa vie change quand elle rencontre d'autres musiciennes et forme le groupe Kessoku Band. Une comédie musicale touchante sur l'amitié et la confiance en soi.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "Terminé",
    genres: ["Comédie", "Musique", "Slice of Life", "École", "Amitié", "Adolescence"],
    rating: 8.7
  },
  {
    id: "one-piece",
    title: "One Piece",
    originalTitle: "ワンピース",
    description: "Monkey D. Luffy, un garçon au corps élastique, explore Grand Line avec son équipage de pirates Straw Hat pour trouver le plus grand trésor connu sous le nom de 'One Piece' et devenir le prochain roi des pirates.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 1999,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Aventure", "Comédie", "Shônen", "Pirates", "Amitié"],
    rating: 9.5
  },
  {
    id: "kaiju-n8",
    title: "Kaiju No. 8",
    originalTitle: "怪獣8号",
    description: "Dans un Japon où des kaijus gigantesques attaquent régulièrement, Kafka Hibino, un homme de 32 ans travaillant dans une équipe de nettoyage spécialisée dans les dégâts causés par ces monstres, rêve toujours de rejoindre les Forces de Défense. Un jour, il est mystérieusement transformé en kaiju lui-même, devenant le Kaiju No. 8, tout en gardant sa conscience humaine.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Science-fiction", "Shônen", "Militaire", "Monstres", "Super-pouvoirs"],
    rating: 8.6
  },
  {
    id: "naruto",
    title: "Naruto",
    originalTitle: "ナルト",
    description: "Naruto Uzumaki, un ninja adolescent orphelin du village de Konoha, cherche la reconnaissance de ses pairs et rêve de devenir Hokage, le chef du village.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2002,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Arts martiaux", "Aventure", "Shônen", "Ninjas", "Amitié"],
    rating: 8.4
  },
  {
    id: "fullmetal-alchemist-brotherhood",
    title: "Fullmetal Alchemist: Brotherhood",
    originalTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    description: "Edward et Alphonse Elric utilisent l'alchimie pour essayer de ramener leur mère à la vie, mais la tentative échoue et coûte le bras d'Edward et le corps d'Alphonse. Ils partent à la recherche de la Pierre Philosophale pour récupérer leurs corps.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2009,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Drame", "Fantasy", "Militaire", "Shônen"],
    rating: 9.1
  }
];
