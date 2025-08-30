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
    id: "amagami-san-chi-no-enmusubi",
    title: "Amagami-san Chi no Enmusubi",
    originalTitle: "甘神さんちの縁結び",
    imageUrl:"",
    description: "Uryū Kamihate est un lycéen aspirant à intégrer la faculté de médecine de l'Université de Kyoto. Après avoir vécu dans un orphelinat, il emménage au sanctuaire Amagami, où le prêtre en chef lui demande d'épouser l'une de ses trois petites-filles pour hériter du sanctuaire. Uryū et les sœurs Amagami doivent également faire face à divers défis, notamment des problèmes financiers menaçant la fermeture du sanctuaire. Une comédie romantique touchante qui explore les liens familiaux et la tradition dans le Japon moderne.",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Romance", "Comédie", "Slice of Life", "École", "Harem", "Surnaturel", "Tradition"],
    rating: 7.5
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
        seasonNumber: "Film",
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
  },
  {
    id: "angel-beats",
    title: "Angel Beats!",
    originalTitle: "エンジェルビーツ!",
    description: "Yuzuru Otonashi se réveille dans un monde étrange qui ressemble à un lycée, sans aucun souvenir de sa vie passée ou de sa mort. Il y rencontre Yuri Nakamura, la chef d'une organisation rebelle appelée Shinda Sekai Sensen (Front de l'Au-delà) qui mène une guerre acharnée contre un mystérieux ange aux cheveux argentés surnommé 'Tenshi'. Dans cet étrange purgatoire où les âmes peuvent disparaître si elles trouvent la paix, Otonashi doit choisir son camp et découvrir les secrets de ce monde intermédiaire. Entre batailles épiques, moments de comédie et révélations bouleversantes sur le passé tragique de chaque personnage, Angel Beats! explore les thèmes du sacrifice, de l'amitié et de l'acceptation de la mort avec une profondeur émotionnelle saisissante.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2010,
    type: "Anime",
    status: "Terminé",
    genres: ["Drame", "Comédie", "Surnaturel", "École", "Musique"],
    rating: 8.1
  },
  {
    id: "assassination-classroom",
    title: "Assassination Classroom",
    originalTitle: "暗殺教室",
    description: "Une mystérieuse créature alien au visage souriant et aux tentacules jaunes a détruit 70% de la Lune et menace de faire subir le même sort à la Terre dans un an. Mais de manière surprenante, cette créature ultra-puissante, surnommée Koro-sensei, accepte de devenir le professeur principal de la classe 3-E du collège Kunugigaoka, une classe composée des élèves les plus faibles de l'établissement. Le gouvernement offre une récompense de 10 milliards de yens à quiconque réussira à tuer Koro-sensei, mais ce dernier se révèle être un professeur extraordinaire qui aide ses élèves à retrouver confiance en eux. Entre cours d'assassinat et leçons de vie, les élèves de la classe 3-E vont apprendre bien plus que des techniques de meurtre : ils découvriront leur propre valeur et le véritable sens de l'éducation.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2015,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Comédie", "École", "Shônen", "Enseignement"],
    rating: 8.7
  },
  {
    id: "beastars",
    title: "Beastars",
    originalTitle: "ビースターズ",
    description: "Dans un monde moderne où les animaux anthropomorphes ont créé une société complexe, l'ordre fragile entre carnivores et herbivores est maintenu par des règles strictes et des instincts réprimés. Au lycée Cherryton, Legoshi, un loup gris timide et introverti, voit sa vie basculer lorsqu'Tem, un alpaga de son club de théâtre, est sauvagement dévoré par un carnivore inconnu. Cette tragédie réveille les tensions raciales et les préjugés dans l'école. Mais quand Legoshi rencontre Haru, une petite lapine blanche assumant sa sexualité, il découvre des sentiments qu'il ne peut pas distinguer entre l'amour et la faim. Naviguant entre ses instincts prédateurs et ses émotions humaines, Legoshi doit faire face aux complexités d'une société où la chaîne alimentaire dicte encore les relations sociales.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Drame", "Romance", "Psychologique", "École", "Anthropomorphe"],
    rating: 7.8
  },
  {
    id: "black-clover",
    title: "Black Clover",
    originalTitle: "ブラッククローバー",
    description: "Dans le royaume de Clover, la magie est tout. Seuls ceux qui la maîtrisent peuvent espérer s'élever dans la société. Asta, un orphelin sans le moindre pouvoir magique, et Yuno, son rival d'enfance doté d'un immense talent, rêvent tous deux de devenir l'Empereur Mage, le plus puissant mage du royaume. Alors que Yuno reçoit un grimoire aux quatre feuilles, symbole de chance exceptionnelle, Asta semble condamné à rester sans magie. Mais le destin lui réserve une surprise : un mystérieux grimoire noir aux cinq feuilles, légendaire et maudit, qui lui confère le pouvoir d'annuler toute magie. Rejoignant les Taureaux Noirs, l'escouade de chevaliers-mages la plus chahutée du royaume, Asta devra prouver que même sans magie, on peut devenir le plus grand des mages grâce à la détermination et au travail acharnés.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2017,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Shônen", "Magie", "Aventure", "Combats"],
    rating: 8.2
  },
  {
    id: "bleach",
    title: "Bleach",
    originalTitle: "ブリーチ",
    description: "Ichigo Kurosaki, 15 ans, a toujours eu la capacité de voir les esprits, ce qui lui attire régulièrement des ennuis. Sa vie bascule complètement quand il rencontre Rukia Kuchiki, un Shinigami (dieu de la mort) chargé de guider les âmes vers l'au-delà et d'éliminer les Hollows, des esprits maléfiques qui dévorent les âmes humaines. Lors d'une attaque de Hollow particulièrement violent, Rukia est gravement blessée et transfère ses pouvoirs à Ichigo pour qu'il puisse protéger sa famille. Mais cette transfération lui fait perdre tous ses pouvoirs, la coinçant dans le monde humain. Ichigo se retrouve alors malgré lui à devoir assumer le rôle de Shinigami remplaçant, armé d'un zanpakutō gigantesque et de pouvoirs qu'il ne maîtrise pas encore. Entre protection des vivants, purification des Hollows et découverte progressive de ses origines mystérieuses, Ichigo va être entraîné dans une guerre spirituelle qui dépasse tout ce qu'il imaginait.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2004,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Shônen", "Surnaturel", "Combats", "Shinigami"],
    rating: 8.2
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    originalTitle: "ブルーロック",
    description: "Après une énorme déception lors de la Coupe du Monde de football, la Fédération japonaise de football lance un projet radical et controversé : Blue Lock. Cette installation secrète enfermera 300 des meilleurs jeunes attaquants du pays dans un programme d'élimination impitoyable conçu pour forger l'attaquant égoïste ultime. Yoichi Isagi, un lycéen au talent modeste mais à l'instinct affuté, se retrouve plongé dans cet environnement où seul le plus fort survivra. Dirigé par l'entraîneur excentrique Jinpachi Ego, le programme encourage l'égoïsme absolu et la destruction de l'esprit d'équipe traditionnel japonais. Dans cette prison footballîstique, Isagi devra se transformer pour devenir le tueur des surfaces que le Japon attend, quitte à détruire les rêves de tous ses rivaux.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2022,
    type: "Anime",
    status: "En cours",
    genres: ["Sport", "Shônen", "Football", "Compétition", "Psychologique"],
    rating: 8.6
  },
  {
    id: "code-geass",
    title: "Code Geass",
    originalTitle: "コードギアス",
    description: "En 2010, l'Empire de Britannia, une superpuissance mondiale, a conquis le Japon qu'il a rebaptisé 'Zone 11', réduisant ses habitants au statut d''Eleven'. Lelouch Lamperouge, un prince britannien exilé qui cache sa véritable identité, vit paisiblement avec sa sœur aveugle Nunnally. Mais sa vie bascule quand il acquiert accidentellement le pouvoir du Geass grâce à une mystérieuse fille aux cheveux verts nommée C.C. Ce pouvoir lui permet d'imposer sa volonté absolue à quiconque croise son regard. Arms de cette capacité, de son génie tactique et de sa soif de vengeance contre son père l'empereur, Lelouch prend l'identité de Zero et mène une rébellion impitoyable contre Britannia. Mais le pouvoir corrompt, et Lelouch doit naviguer entre ses idéaux de justice et les sacrifices nécessaires pour libérer le Japon, quitte à devenir le démon qu'il combat.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2006,
    type: "Anime",
    status: "Terminé",
    genres: ["Mecha", "Drame", "Militaire", "Psychologique", "Stratégie"],
    rating: 8.9
  },
  {
    id: "cowboy-bebop",
    title: "Cowboy Bebop",
    originalTitle: "カウボーイビバップ",
    description: "En 2071, l'humanité a colonisé le système solaire après qu'un accident avec un portail hyperespace ait rendu la Terre inhabitable. Dans ce far-west spatial, Spike Spiegel et Jet Black, deux chasseurs de primes désabusés, sillonnent la galaxie à bord de leur vaisseau, le Bebop, traquant les criminels pour gagner leur vie. Leur équipage s'enrichit bientôt de Faye Valentine, une femme mystérieuse amnrique endettée jusqu'au cou, Edward, une jeune hackeuse excentrique, et Ein, un chien génétiquement modifié d'une intelligence exceptionnelle. Mais derrière les missions de routine se cache le passé douloureux de Spike, ancien membre du syndicat du crime Red Dragon, et sa relation toxique avec Vicious, son ancien partenaire devenu ennemi mortel. Mêlant action, philosophie existentielle et jazz envoûtant, Cowboy Bebop explore les thèmes de la solitude, du passé qui hante et de la difficulté de trouver sa place dans l'univers.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 1998,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Space Western", "Drame", "Science-fiction", "Jazz"],
    rating: 8.8
  },
  {
    id: "darling-in-the-franxx",
    title: "Darling in the FranXX",
    originalTitle: "ダーリン・イン・ザ・フランキス",
    description: "Dans un futur post-apocalyptique, l'humanité a été contrainte de se réfugier dans des dômes géants appelés Plantations pour échapper aux mystérieux Klaxosaures, des créatures gigantesques qui ravagent la surface terrestre. Les adultes vivent dans les hauteurs luxueuses tandis que les enfants, élevés uniquement pour être pilotes, habitent dans des pensionnats souterrains sans connaître le monde extérieur. Ces enfants, identifiés par des codes numériques, pilotent en binômes les FranXX, des mechas organiques nécessitant la synchronisation parfaite entre un 'pistil' (fille) et un 'étamine' (garçon). Hiro, ancien prodige déchu incapable de piloter, rencontre Zero Two, une mystérieuse pilote aux cornes rouges surnommée 'Partner Killer' car ses coéquipiers meurent après trois sorties. Ensemble, ils forment un duo exceptionnel, mais leur relation grandit dans un monde où les émotions sont bridées et où la vérité sur l'humanité, les Klaxosaures et les adultes dirigeants cache des secrets terrifiants. Entre mecha, romance adolescente et critique sociale, Darling in the FranXX explore les thèmes de l'identité, de l'amour interdit et de la rébellion contre un système oppressif.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "Terminé",
    genres: ["Mecha", "Romance", "Drame", "Science-fiction", "Dystopie"],
    rating: 7.2
  },
  {
    id: "dr-stone",
    title: "Dr. Stone",
    originalTitle: "ドクターストーン",
    description: "Le 5 juin 2019, une mystérieuse lumière verte balaye la planète, pétrifiant instantanément tous les êtres humains. 3700 ans plus tard, Senku Ishigami, un génie scientifique de 16 ans, se libère miraculeusement de sa prison de pierre, découvrant un monde retourné à l'état sauvage où la nature a repris ses droits. Armé de ses connaissances encyclopédiques et de sa passion inébranlable pour la science, Senku se lance dans un projet titanesque : reconstruire la civilisation humaine de zéro en utilisant uniquement la méthode scientifique. Avec l'aide de son ami d'enfance Taiju et du lycéen le plus fort du Japon, Tsukasa, il va devoir redécouvrir et recréer toutes les inventions de l'humanité, de la poudre à canon aux antibiotiques. Mais Tsukasa et Senku ont des visions opposées du futur : l'un veut un monde purifié sans adultes corrompus, l'autre rêve de ressusciter toute l'humanité. Cette opposition idéologique va diviser les survivants en deux camps et déclencher la première guerre de l'ère de pierre.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "En cours",
    genres: ["Shônen", "Science-fiction", "Aventure", "Science", "Post-apocalyptique"],
    rating: 8.7
  },
  {
    id: "fairy-tail",
    title: "Fairy Tail",
    originalTitle: "フェアリーテイル",
    description: "Dans le royaume de Fiore, la magie fait partie intégrante de la vie quotidienne et les mages s'organisent en guildes pour accomplir diverses missions. Natsu Dragneel, un jeune mage au tempérament explosif capable de manipuler le feu de dragon, recherche désespérément Ignir, le dragon qui l'a élevé avant de disparaître mystérieusement. Il rejoint Fairy Tail, l'une des guildes les plus réputées du royaume, mais aussi la plus chahuteuse. Là, il fait équipe avec Lucy Heartfilia, une mage céleste qui invoque des esprits stellaires, Erza Scarlett, une guerrière implacable spécialisée dans la magie de ré-équipement, et Gray Fullbuster, un mage de glace à l'habitude fâcheuse de se déshabiller. Ensemble, cette équipe improbable va affronter des guildes noires, des dragons anciens, des démons légendaires et des conspirations qui menacent l'équilibre même du monde magique. Entre batailles épiques, moments de camaraderie et quête personnelle, Fairy Tail célèbre les liens indéfectibles de l'amitié et la force que procure l'appartenance à une famille choisie.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2009,
    type: "Anime",
    status: "Terminé",
    genres: ["Shônen", "Magie", "Aventure", "Amitié", "Combats"],
    rating: 7.9
  },
  {
    id: "food-wars",
    title: "Food Wars!",
    originalTitle: "食戟のソーマ",
    description: "Soma Yukihira, 15 ans, a grandi en aidant son père à gérer leur modeste restaurant familial dans un quartier populaire. Passionné de cuisine depuis l'enfance, il rêve de reprendre l'établissement familial, mais son père l'inscrit de force à l'Académie culinaire Totsuki, l'école la plus prestigieuse et la plus impênable du Japon. Dans cette institution d'élite où moins de 10% des étudiants obtiennent leur diplôme, la compétition fait rage et les échecs se paient par l'exclusion immédiate. Les étudiants s'affrontent dans des 'Shokugeki', des duels culinaires où tout est permis et où la défaite peut signifier la fin d'une carrière. Avec son style de cuisine peu orthodoxe hérité de la restauration populaire, Soma va devoir faire ses preuves face aux héritiers de grandes dynasties culinaires et aux génies de la gastronomie. Entre techniques avant-gardistes, ingrédients exotiques et réactions gustatives démesurées, Food Wars! transforme la cuisine en spectacle grandiose où chaque plat peut changer un destin.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2015,
    type: "Anime",
    status: "Terminé",
    genres: ["Shônen", "Cuisine", "École", "Comédie", "Ecchi"],
    rating: 8.5
  },
  {
    id: "free",
    title: "Free!",
    originalTitle: "フリー!",
    description: "Haruka Nanase vit pour l'eau. Ce lycéen taciturne ne se sent vraiment vivant que lorsqu'il nage, particulièrement en nage libre où il excelle naturellement. Quand il retrouve Rin Matsuoka, son ancien coéquipier d'équipe de natation primaire devenu rival après un séjour en Australie, les souvenirs de leur amitié d'enfance et de leur passion commune pour la natation refont surface. Avec l'aide de Makoto Tachibana, son meilleur ami d'enfance au caractère protecteur, Nagisa Hazuki, un lycéen enthousiaste spécialiste de la brasse, et plus tard Rei Ryugazaki, un ancien membre du club d'athlétisme fasciné par la beauté théorique de la natation, Haruka reforme le club de natation du lycée Iwatobi. L'objectif : participer aux compétitions préfectorales et se mesurer à l'équipe de Rin au prestigieux lycée Samezuka. Mais au-delà de la rivalité sportive, Free! explore avec finesse les liens d'amitié masculine, les rêves d'adolescence, la pression de la performance et la beauté pure du sport pratiqué avec passion. Chaque personnage développe son propre style de nage reflétant sa personnalité, dans une série qui sublime l'esthétique aquatique.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2013,
    type: "Anime",
    status: "Terminé",
    genres: ["Sport", "Natation", "École", "Amitié", "Slice of Life"],
    rating: 7.3
  },
  {
    id: "golden-kamui",
    title: "Golden Kamuy",
    originalTitle: "ゴールデンカムイ",
    description: "En 1907, au début de l'ère Meiji, Saichi Sugimoto, surnommé 'Sugimoto l'Immortel' pour sa capacité légendaire à survivre aux batailles, est un vétéran de la guerre russo-japonaise qui cherche désespérément de l'or pour honorer la promesse faite à son ami mourant : payer l'opération des yeux de sa veuve. Il entend parler d'une légende urbaine concernant un trésor colossal d'or Ainu caché quelque part en Hokkaido par un criminel avant son arrestation. Ce dernier a tatoué les indications sur le corps de 24 prisonniers d'Abashiri, la prison la plus redoutable du Japon. Quand Sugimoto est attaqué par un ours brun, il est sauvé par Asirpa, une jeune fille Ainu experte en survie et en chasse, dont le père aurait été assassiné par l'homme au trésor. Ensemble, ils forment une alliance improbable pour retrouver les prisonniers évadés et reconstituer la carte au trésor, tout en affrontant d'autres chasseurs de prime, des soldats renégats menés par le lieutenant Tsurumi, et en découvrant la riche culture Ainu. Mêlant action, comédie, gastronomie locale et respect culturel, Golden Kamuy offre une aventure unique dans le Japon sauvage de Hokkaido.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "Terminé",
    genres: ["Aventure", "Historique", "Seinen", "Action", "Culture Ainu"],
    rating: 8.6
  },
  {
    id: "haikyuu",
    title: "Haikyû!!",
    originalTitle: "ハイキュー!!",
    description: "Hinata Shoyo, 162 cm, a découvert sa passion pour le volley-ball en regardant le 'Petit Géant' de Karasuno remporter le championnat national malgré sa petite taille. Déterminé à suivre ses traces, il crée un club de volley-ball dans son collège rural avec ses amis novices, mais leur première et dernière compétition se solde par une défaite humiliante face à Tobio Kageyama, le génial et tyrannique 'Roi du Terrain'. Ironie du sort, les deux rivaux se retrouvent dans la même équipe au lycée Karasuno, ancienne puissance tombée en désuétude surnommée désormais les 'Corbeaux sans Ailes'. Hinata apporte sa vitesse, son agilité et sa détermination inébranlable, tandis que Kageyama maîtrise une technique de passe d'une précision chirurgicale. Ensemble, avec l'aide de leurs coéquipiers comme le capitaine Daichi, le libero nerveux Nishinoya ou le passeur d'expérience Sugawara, ils vont redécouvrir l'espérance et l'ambition. Haikyû!! transcende le simple manga sportif en explorant les thèmes de la persévérance, du travail d'équipe et de la beauté pure du volley-ball, où chaque match devient un spectacle émotionnel intense.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Sport", "Volley-ball", "Shônen", "École", "Amitié"],
    rating: 8.7
  },
  {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter",
    originalTitle: "ハンター×ハンター",
    description: "Gon Freecss, 12 ans, a grandi sur l'île de la Baleine, élevé par sa tante Mito après que son père Ging l'ait abandonné pour poursuivre sa carrière de Hunter. Les Hunters sont des individus d'élite ayant passé un examen redoutablement difficile leur donnant accès à des privilèges exclusifs et à des missions dangereuses : exploration de territoires inconnus, chasse aux criminels, recherche de trésors légendaires. Déterminé à comprendre ce qui a poussé son père à l'abandonner pour cette profession, Gon quitte son île natale pour passer l'examen de Hunter. Durant cette épreuve impitoyable où des centaines de candidats s'affrontent, il rencontre Killua, un jeune assassin en fuite de sa famille meurtriere, Kurapika, dernier survivant du clan Kuruta en quête de vengeance, et Leorio, un étudiant en médecine motivé par l'argent. Ensemble, ils vont découvrir un monde où les pouvoirs surnaturels appelés 'Nen' règnent en maîtres et où chaque nouvelle aventure les confrontera à des ennemis toujours plus redoutables.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2011,
    type: "Anime",
    status: "En pause",
    genres: ["Shônen", "Aventure", "Action", "Amitié", "Psychologique"],
    rating: 9.1
  },
  {
    id: "mob-psycho-100",
    title: "Mob Psycho 100",
    originalTitle: "モブサイコ100",
    description: "Shigeo Kageyama, surnommé 'Mob' (la foule) pour sa personnalité effacée, est un collégien de 14 ans d'apparence banale qui cache en réalité des pouvoirs psychiques parmi les plus puissants au monde. Capable de télékinésie dévastatrice, d'exorcisme et de bien d'autres facultés ESP, Mob s'efforce de mener une vie normale et de développer ses compétences sociales plutôt que ses dons surnaturels. Il travaille à temps partiel pour Reigen Arataka, un autoproclaimé 'plus grand voyant du XXIe siècle' qui est en réalité un escroc charismatique sans aucun pouvoir, mais doté d'un talent exceptionnel pour la manipulation et les conseils de vie. Quand les émotions de Mob atteignent 100%, ses pouvoirs se déchaînent de manière incontrôlable, créant des ravages spectaculaires. Entre exorcismes d'esprits maléfiques, confrontations avec d'autres espers et télépathes, et tentatives maladroites de déclaration amoureuse, Mob navigue dans l'adolescence tout en apprenant que le vrai pouvoir réside dans la bonté, l'amitié et l'acceptation de soi. Créé par ONE (auteur de One Punch Man), cette œuvre mêle action supernatural et comédie tout en délivrant un message profond sur la croissance personnelle.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Comédie", "Surnaturel", "Psychologique", "École"],
    rating: 8.6
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    originalTitle: "僕のヒーローアカデミア",
    description: "Dans un monde où 80% de la population possède des super-pouvoirs appelés 'Alters', être héros professionnel est devenu un métier comme un autre. Izuku Midoriya, surnommé 'Deku', fait partie des 20% de 'Quirkless' nés sans pouvoir, mais son rêve de devenir le plus grand héros comme son idole All Might ne faiblit pas. Quand il rencontre fortuitement All Might, le Symbol of Peace découvre chez ce garçon l'âme d'un vrai héros et décide de lui transmettre son propre Alter, le légendaire 'One For All'. Izuku intègre alors Yuei, la plus prestigieuse académie de héros du Japon, où il côtoie d'autres étudiants aux pouvoirs extraordinaires comme Katsuki Bakugo, son rival d'enfance explosive, ou Shoto Todoroki, héritier d'une puissante dynastie de héros. Mais tandis qu'Izuku apprend à maîtriser son nouveau pouvoir dévastateur qui détruit son propre corps, une organisation mystérieuse menée par All For One, l'ennemi juré d'All Might, émerge de l'ombre pour semer le chaos et remettre en question les fondements mêmes de la société des héros.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "En cours",
    genres: ["Shônen", "Super-héros", "École", "Action", "Amitié"],
    rating: 8.5
  },
  {
    id: "noragami",
    title: "Noragami",
    originalTitle: "ノラガミ",
    description: "Yato est un dieu mineur sans le sou qui rêve de posséder son propre sanctuaire et d'être vénéré par des millions de fidèles. En attendant, il propose ses services pour seulement 5 yens : retrouver un chat perdu, nettoyer une maison, ou accomplir toute tâche que les humains veulent bien lui confier. Vêtu d'un survêtement défraîchi et doté d'un caractère à la fois puéril et mystérieux, Yato cache en réalité un passé sombre en tant que dieu de la guerre et de la calamité. Sa vie bascule quand Hiyori Iki, une lycéenne ordinaire, le sauve d'un accident de voiture et se retrouve transformée en 'demi-fantôme' capable de voir le monde spirituel. Son âme peut désormais quitter son corps endormi, la plaçant dangereusement entre le monde des vivants et celui des morts. Pour l'aider, Yato a besoin d'un Shinki, une âme humaine purifiée transformée en arme divine. Il trouve Yukine, l'esprit d'un adolescent décédé qui devient son épée sacrée. Ensemble, ce trio improbable affronte les Ayakashi (démons), navigue dans les intrigues divines et découvre les liens complexes entre dieux, humains et esprits, tout en explorant les thèmes de l'amitié, du pardon et de la rédemption.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Comédie", "Surnaturel", "Drame", "Mythologie"],
    rating: 8.2
  },
  {
    id: "overlord",
    title: "Overlord",
    originalTitle: "オーバーロード",
    description: "En 2138, YGGDRASIL, l'un des MMORPG les plus populaires au monde, ferme définitivement ses serveurs après 12 ans d'existence. Momonga, joueur vétéran et leader de la guilde Ainz Ooal Gown, décide de rester connecté jusqu'aux dernières secondes pour honorer la mémoire de ses anciens compagnons de jeu. Mais au lieu de se retrouver déconnecté, il découvre qu'il est désormais piégé dans le corps de son personnage : un Overlord squelette d'une puissance phénoménale, maître de la Grande Tombe de Nazarick. Tous les PNJ de sa guilde ont pris vie et le vénèrent comme leur maître suprême, chacun disposant de personnalités complexes et d'une loyauté absolue. Adoptant le nom d'Ainz Ooal Gown, Momonga décide d'explorer ce nouveau monde pour comprendre s'il existe d'autres joueurs transportés comme lui. Avec ses serviteurs aux pouvoirs démesurés comme Albedo la succube, Shalltear la vampire ou Demiurge le démon stratège, il va progressivement établir sa domination sur ce monde fantasy, jonglant entre sa mentalité de joueur moderne et son nouveau rôle de souverain absolu. Overlord explore avec finesse les thèmes du pouvoir, de la moralité et de l'adaptation à un rôle que l'on n'a jamais demandé.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2015,
    type: "Anime",
    status: "En cours",
    genres: ["Isekai", "Fantasy", "Action", "Magie", "Jeu vidéo"],
    rating: 8.0
  },
  {
    id: "parasite",
    title: "Parasite",
    originalTitle: "寄生獣",
    description: "Une nuit, des organismes extraterrestres microscopiques s'abattent sur la Terre avec pour mission d'infecter et de contrôler les cerveaux humains. Ces parasites prennent possession de leur hôte en pénétrant par le nez ou les oreilles pendant le sommeil, remplaçant complètement leur tête par une créature métamorphe aux capacités terrifiantes. Shinichi Izumi, lycéen de 17 ans timide et rêvélar, échappe de peu à cette infection : le parasite qui l'attaque ne parvient qu'à prendre possession de sa main droite, créant une situation unique. Contrairement aux autres parasites, cette créature qu'il nomme 'Migi' (droite) conserve sa personnalité indépendante et développe une relation symbiotique avec Shinichi. Ensemble, ils doivent affronter d'autres parasites qui voient en eux une anomalie à éliminer, tout en tentant de préserver l'humanité de Shinichi face à la nature impitoyablement logique et prédatrice de Migi. Cette cohabitation forcée transforme progressivement Shinichi, le rendant plus fort physiquement mais questionnant sa propre humanité. Parasyte examine avec une intensité philosophique les notions d'identité, de survie, d'évolution et de ce qui définit réellement l'être humain face à un prédateur supérieur.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Horreur", "Science-fiction", "Psychologique", "Action", "Parasites"],
    rating: 8.3
  },
  {
    id: "promised-neverland",
    title: "The Promised Neverland",
    originalTitle: "約束のネバーランド",
    description: "Grace Field House est un orphelinat idyllique où 38 enfants vivent heureux sous la bienveillance de leur 'Maman' Isabella. Emma, Norman et Ray, trois enfants de 11 ans parmi les plus brillants, excellent aux tests quotidiens et coulent des jours paisibles dans ce paradis apparent entouré d'une forêt dense et d'un portail qu'ils n'ont jamais le droit de franchir. Leur vision du monde s'effondre brutalement quand ils découvrent la véritable nature de Grace Field : cet orphelinat est en réalité une ferme d'élevage humain où les enfants sont engraissés intellectuellement avant d'être livrés comme nourriture de luxe à des démons intelligents. Isabella, leur mère aimée, n'est qu'une gardienne chargée de maintenir cette illusion jusqu'à l'âge de 'récolte'. Face à cette réalité atroce, le trio décide d'organiser une évasion impossible : faire sortir les 38 enfants de cette prison dorge sans alerter Isabella ni les démons, tout en découvrant les secrets du monde extérieur. Dans cette course contre la montre où chaque erreur peut être fatale, The Promised Neverland mêle thriller psychologique, stratégie pure et horreur existentielle, questionnant la nature de l'innocence et de la famille dans un cadre dystopique saisissant.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Thriller", "Psychologique", "Mystère", "Shônen", "Horreur"],
    rating: 8.4
  },
  {
    id: "le-voyage-de-chihiro",
    title: "Le Voyage de Chihiro",
    originalTitle: "千と千尋の神隠し",
    description: "Chihiro, une petite fille de 10 ans, doit travailler dans un monde d'esprits pour sauver ses parents transformés en cochons.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2001,
    type: "Movie",
    status: "Terminé",
    genres: ["Aventure", "Family", "Fantastique", "Ghibli", "Magie"],
    rating: 9.3
  },
  {
    id: "steins-gate",
    title: "Steins;Gate",
    originalTitle: "シュタインズ・ゲート",
    description: "Rintaro Okabe, étudiant excentrique de 18 ans se faisant appeler 'scientifique fou', passe ses journées dans son laboratoire de fortune avec ses amis Mayuri et Daru, travaillant sur des inventions farfelues. Leur dernière création, le 'Phone Microwave', semble ne servir qu'à transformer les bananes en gelée verte, jusqu'à ce qu'Okabe découvre accidentellement qu'il peut envoyer des messages texte dans le passé. Cette découverte révolutionnaire attire l'attention de l'organisation secrète SERN, qui mene ses propres recherches sur le voyage temporel. Quand Mayuri est assassinée par des agents de SERN, Okabe utilise désespérément sa machine pour tenter de la sauver, mais chaque modification du passé crée de nouvelles lignes temporelles aux conséquences imprévisibles. Pris au piège dans une boucle temporelle cauchemardesque, Okabe découvre que changer le destin exige des sacrifices déchirants et que la responsabilité de connaître l'avenir peut devenir un fardeau insupportable. Steins;Gate explore magistralement les paradoxes temporels et les dilemmes moraux liés au pouvoir de réécrire l'histoire.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2011,
    type: "Anime",
    status: "Terminé",
    genres: ["Science-fiction", "Thriller", "Drame", "Voyage temporel", "Psychologique"],
    rating: 9.0
  },
  {
    id: "tensei-shitara-slime-datta-ken",
    title: "Moi, quand je me réincarne en Slime",
    originalTitle: "転生したらスライムだった件",
    description: "Satoru, employé de bureau lambda, se fait assassiner par un criminel en pleine rue. Son histoire aurait dû s'arrêter là, mais il se retrouve soudain réincarné dans un autre monde sous la forme d'un Slime, le monstre le plus faible du bestiaire fantastique. Son nouveau corps est équipé de deux compétences uniques : « Prédateur », lui permettant de récupérer les aptitudes de ses adversaires, et « Grand sage », grâce à laquelle il acquiert une compréhension aigüe de son environnement. Mais même muni de ces armes, ses chances de survie semblent encore limitées...",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "En cours",
    genres: ["Isekai", "Fantasy", "Comédie", "Action", "Magie"],
    rating: 8.1
  },
  {
    id: "tokyo-revengers",
    title: "Tokyo Revengers",
    originalTitle: "東京卍リベンジャーズ",
    description: "Takemichi Hanagaki, 26 ans, vit une existence morne de temps-partiel sans ambition jusqu'à ce qu'il apprenne la mort de Hinata Tachibana, son premier amour du collège, tuée par le gang criminel Tokyo Manji. Le lendemain, en tombant sur les rails du métro, Takemichi se retrouve mystérieusement transporté 12 ans dans le passé, au collège, peu avant sa rupture avec Hinata. Réalisant qu'il peut voyager dans le temps, il décide de changer le cours de l'histoire pour sauver la jeune fille et son petit frère Naoto. Pour cela, il doit infiltrer le Tokyo Manji Gang (Toman) à ses débuts, quand ce n'était encore qu'un groupe de collégiens délinquants, et empêcher sa transformation en organisation criminelle meurtriere. Takemichi va devoir gagner le respect de personnages légendaires comme Mikey Sano, le leader charismatique de Toman, et Draken, son bras droit loyal, tout en évitant que les événements tragiques se reproduisent. Mais chaque modification du passé crée de nouvelles timelines imprévisibles, et Takemichi découvre que sauver Hinata nécessite de comprendre les rouages complexes de la délinquance japonaise et les liens fraternels qui unissent ces jeunes rebelles.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2021,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Drame", "Voyage temporel", "Délinquance", "Shônen"],
    rating: 8.0
  },
  {
    id: "violet-evergarden",
    title: "Violet Evergarden",
    originalTitle: "ヴァイオレット・エヴァーガーデン",
    description: "Après une guerre dévastatrice, Violet Evergarden, ancienne enfant soldat aux mains mécaniques, tente de se réintégrer dans la société civile. N'ée que pour tuer et suivre les ordres de son commandant Gilbert Bougainvillea qu'elle vénérait, Violet se retrouve désormais sans but après la fin du conflit et la disparition présumée de Gilbert. Déterminée à comprendre les dernières paroles que Gilbert lui a adressées - 'Je t'aime' - elle devient Écrivaine Publique Automatique à l'agence de Claudia Hodgins. Ce métier consiste à retranscrire fidèlement les pensées et sentiments des clients en lettres élégantes. Mais Violet, qui ne comprend pas les émotions humaines et s'exprime de manière purement factuelle, doit apprendre à saisir les nuances du cœur humain pour écrire des lettres qui touchent vraiment leurs destinataires. À travers chaque mission - lettre d'amour, testament, correspondance familiale ou message de réconciliation - Violet découvre progressivement l'éventail des émotions humaines, apprend l'empathie et commence à guérir de ses traumatismes de guerre. Cette quête poétique et bouleversante pour comprendre l'amour est magnifiée par une animation d'une beauté à couper le souffle signée Kyoto Animation.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2018,
    type: "Anime",
    status: "Terminé",
    genres: ["Drame", "Romance", "Militaire", "Émotionnel", "Post-guerre"],
    rating: 8.5
  },
  {
    id: "bungou-stray-dogs",
    title: "Bungo Stray Dogs",
    originalTitle: "文豪ストレイドッグス",
    description: "Atsushi Nakajima, 18 ans, a été expulsé de son orphelinat et erre affamé dans les rues de Yokohama quand il sauve de la noyade Osamu Dazai, un homme excentrique obsd par le suicide. Ce dernier révèle être membre de l'Agence de Détectives Armés, une organisation spéciale où chaque agent possède un pouvoir surnaturel nommé d'après une œuvre littéraire célèbre. Dazai lui-même maîtrise 'No Longer Human', capacité d'annuler tout don surnaturel par le toucher. Quand Atsushi découvre qu'il peut se transformer en tigre blanc géant sans le contrôler, l'agence lui offre un refuge et un but : utiliser son pouvoir pour résoudre des affaires impliquant d'autres utilisateurs de capacités. Aux côtés du président Fukuzawa, de Kunikida l'idéaliste aux carnets réalisateurs de souhaits, de Ranpo le détective de génie, ou encore de Yosano la médecin sadique aux soins miraculeux, Atsushi affronte la Mafia du Port menée par Mori et son lieutenant Akutagawa, ainsi que d'autres organisations aux motivations obscures. Chaque personnage s'inspire directement d'un auteur réel et de ses œuvres (Dazai Osamu, Nakajima Atsushi, Akutagawa Ryunosuke...), créant un univers riche en références littéraires où action urbaine et culture se mêlent avec finesse.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2016,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Mystère", "Surnaturel", "Littérature", "Comédie"],
    rating: 7.9
  },
  {
    id: "elfen-lied",
    title: "Elfen Lied",
    originalTitle: "エルフェンリート",
    description: "Lucy est une Diclonius, nouvelle espèce mutante caractérisée par de petites cornes sur la tête et des 'vecteurs', bras invisibles d'une portée de plusieurs mètres capables de trancher n'importe quoi et de vibrer à haute fréquence. Retenue prisonnire dans un laboratoire gouvernemental secret où elle subit des expériences inhumaines, Lucy s'échappe dans un déchainé de violence, massacrant ses garéliens sans pitié. Mais durant sa fuite, elle reçoit un coup à la tête qui déclenche un dédoublement de personnalité : elle devient Nyu, créature infantile et innocente incapable de violence. C'est sous cette forme qu'elle est découverte sur une plage par Kouta, étudiant universitaire, et sa cousine Yuka. Ignorant sa véritable nature, ils la recueillent chez eux. Mais Lucy ressurgit périodiquement, et avec elle ressurgissent les souvenirs traumatisants de l'enfance de Kouta, liés à une tragdie familiale qu'il a refoulée. Parallèlement, l'agence gouvernementale lance des opérations pour capturer Lucy, déployant d'autres Diclonius comme Nana. Elfen Lied explore avec une brutalité graphique saisissante les thèmes de la discrimination, de l'inhumanité de l'homme envers ce qu'il ne comprend pas, et du cycle de la violence, tout en questionnant ce qui fait notre humanité.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2004,
    type: "Anime",
    status: "Terminé",
    genres: ["Horreur", "Psychologique", "Drame", "Seinen", "Gore"],
    rating: 7.4
  },
  {
    id: "made-in-abyss",
    title: "Made in Abyss",
    originalTitle: "メイドインアビス",
    description: "Au centre de l'île de Beolusk s'ouvre l'Abysse, un gouffre gigantesque et mystérieux qui s'enfonce dans les entrailles de la Terre sur plus de 20 000 mètres de profondeur. Cette béance récèle des artéfacts anciens aux pouvoirs inexplicables et abrite des créatures étranges et souvent hostiles. Riko, 12 ans, rêve de devenir une exploratrice accomplie comme sa mère Lyza, légendaire 'Marteau de l'annihilation' qui a disparu lors de sa dernière expédition. Quand Riko découvre Reg, un mystérieux robot amnrique aux allures d'garçon doté de bras extensibles et d'un rayon désintégrateur, elle décide de descendre illégalement dans l'Abysse pour retrouver sa mère. Mais l'Abysse cache un secret terrifiant : plus on descend, plus la 'malédiction de l'Abysse' devient forte, infligeant nausées, hallucinations, et dans les niveaux les plus profonds, perte d'humanité ou mort à quiconque tente de remonter. Ce voyage initiatique aux allures de conte de fées dissimule une obscurité glaçante qui n'hésite pas à montrer la cruauté d'un monde qui dvore littéralement ses explorateurs.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2017,
    type: "Anime",
    status: "En cours",
    genres: ["Aventure", "Fantasy", "Mystère", "Dark Fantasy", "Exploration"],
    rating: 8.7
  },
  {
    id: "nisekoi",
    title: "Nisekoi",
    originalTitle: "ニセコイ",
    description: "Raku Ichijo est un lycéen ordinaire qui rêve de devenir fonctionnaire, mais son père dirige en secret un puissant clan yakuza. Sa vie tranquille se complique quand Chitoge Kirisaki, une nouvelle élève blonde explosive aux allures d'occidentale, débarque dans son lycée. Leur première rencontre est catastrophique : après une dispute, Chitoge le frappe violemment au genou avec sa mallette. Mais le destin les rattrape quand leurs pères respectifs - dirigeants de clans yakuza ennemis - leur annoncent qu'ils doivent feindre une relation amoureuse pendant trois ans pour maintenir la paix entre leurs organisations et éviter une guerre des gangs sanglante. Malgré leur antipathie mutuelle, Raku et Chitoge sont contraints de jouer les amoureux en public. La situation se complique davantage quand Kosaki Onodera, le véritable amour secret de Raku depuis l'enfance, et d'autres filles s'ajoutent au harem, chacune possédant potentiellement la clé du pendentif de Raku qui révélerait l'identité de sa promesse d'enfance. Entre comédie romantique, quiproquos à répétition et triangle amoureux complexe, Nisekoi explore les thèmes de l'amour, du devoir familial et des promesses d'enfance dans un mélange détonnant de yakuza et de romance lycéenne.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Romance", "Comédie", "École", "Harem", "Shônen"],
    rating: 7.6
  },
  {
    id: "one-punch-man",
    title: "One Punch Man",
    originalTitle: "ワンパンマン",
    description: "Saitama, 25 ans, vit dans la ville Z et mene une existence monotone en tant que héros pour le plaisir. Après trois ans d'entraînement spartiate (100 pompes, 100 abdos, 100 squats et 10 km de course chaque jour), il a acquis une force absolue qui lui permet de vaincre n'importe quel ennemi d'un seul coup de poing. Mais cette puissance ultime s'accompagne d'un problème inattendu : l'ennui total. Aucun adversaire ne résiste à ses attaques, aucun combat ne lui procure plus d'adrénaline, et sa calvitie complète témoigne du prix payé pour cette force. Quand des monstres géants, des aliens envahisseurs ou des super-vilains terrorisent les villes, Saitama les élimine sans effort, souvent par accident. Rejoint par Genos, un cyborg vengôur qui devient son disciple dévoué, Saitama intègre l'Association des Héros tout en restant largement ignoré du grand public. Cette parodie géniale des mangas de super-héros questionne avec humour les codes du genre : que se passe-t-il quand on atteint la perfection absolue et qu'il n'y a plus de défis à relever ?",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2015,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Comédie", "Super-héros", "Seinen", "Parodie"],
    rating: 8.7
  },
  {
    id: "seven-deadly-sins",
    title: "The Seven Deadly Sins",
    originalTitle: "七つの大罪",
    description: "Dans le royaume de Liones, les Seven Deadly Sins étaient autrefois les chevaliers les plus puissants et respectés, jusqu'à ce qu'ils soient accusés de trahison et de tentative d'assassinat sur le Grand Chevalier Zaratras. Dispersés aux quatre vents après leur supposc crime, ils sont désormais pourchassés comme criminels. Dix ans plus tard, Elizabeth Liones, troisième princesse du royaume, s'échappe du château royal pour retrouver ces légendaires hors-la-loi. Le royaume est en effet tombé sous la tyrannie des Holy Knights corrompus qui ont emprisonné le roi et opèment le peuple. Sa quête la mène à Meliodas, propriétaire d'une taverne ambulante et chef des Seven Deadly Sins, le 'Dragon de la Colère'. Malgré son apparence de jeune garçon innocent, Meliodas possède une force colossale et des secrets troublants. Ensemble, ils partent retrouver les autres membres dispersés : Diane la géante, Ban l'immortel, King le roi des fées, Gowther la poupet et Escanor dont la puissance varie selon l'heure du jour. Mais en reformant ce groupe légendaire, Elizabeth et Meliodas réveillent des forces anciennes et des secrets enfouis qui dépassent largement la simple rébellion contre des chevaliers corrompus. The Seven Deadly Sins mêle action épique, magie puissante et mystères mythologiques dans un univers fantasy riche et complexe.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2014,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Fantasy", "Shônen", "Magie"],
    rating: 7.7
  },
  {
    id: "the-rising-of-the-shield-hero",
    title: "The Rising of the Shield Hero",
    originalTitle: "盾の勇者の成り上がり",
    description: "Naofumi Iwatani, otaku de 20 ans, est invoqué dans un monde fantasy en tant que Héros du Bouclier, l'un des quatre héros légendaires destinés à sauver ce monde des Vagues de Catastrophe, des invasions de monstres dévastateurs. Contrairement aux trois autres héros armés d'épée, de lance et d'arc, Naofumi ne possède qu'un bouclier et ne peut pas attaquer directement. Dès son arrivée, il est ostracisé et méprisé par les habitants qui considèrent le bouclier comme l'arme la plus faible. Sa situation empire drastiquement quand Malty, l'unique aventurière accepté de l'accompagner, l'accuse faussement de viol, détruisant complètement sa réputation et le forçant à survivre seul dans un monde qui le déteste. Amer et méfiant, Naofumi doit apprendre à se battre autrement, développant des stratégies défensives et d'attaque indirecte. Il finit par acheter Raphtalia, une demi-humaine raton laveur réduite en esclavage, qui devient sa première compagne loyale. Ensemble, ils vont prouver que même le héros le plus méprisé peut devenir indispensable, tout en démasquant les corruptions et complots qui gangrenément ce royaume. The Rising of the Shield Hero explore les thèmes de la trahison, de la rédemption et de la force que peut donner la détermination face à l'adversité.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "En cours",
    genres: ["Isekai", "Fantasy", "Action", "Drame", "Aventure"],
    rating: 8.0
  },
  {
    id: "jojo-bizarre-adventure",
    title: "JoJo's Bizarre Adventure",
    originalTitle: "ジョジョの奇妙な冒険",
    description: "La saga légendaire de la famille Joestar s'étend sur plus d'un siècle, chaque génération devant affronter des menaces surnaturelles liées au mystérieux Masque de Pierre et aux créatures qui en découlent. Tout commence en 1880 avec Jonathan Joestar, jeune gentleman anglais qui doit combattre son frère adoptif Dio Brando, devenu vampire après avoir utilisé l'artéfact maudit. Cette rivalité éternelle entre les Joestar et Dio traversera les époques, touchant Joseph Joestar dans les années 30, puis Jotaro Kujo dans les années 80. À partir de la troisième partie, l'univers JoJo introduit les 'Stands', manifestations psychiques aux pouvoirs uniques reflétant la personnalité de leur utilisateur. Chaque arc narratif explore une époque différente avec un membre de la lignée Joestar, mélangeant action spectaculaire, références musicales, poses iconiques et un style visuel incomparable. De l'Angleterre victorienne au Japon moderne en passant par l'Italie de la mafia, JoJo's Bizarre Adventure redfinit les codes du manga d'action avec son imagination débridye et son sens aigu du spectacle grandiose.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2012,
    type: "Anime",
    status: "En cours",
    genres: ["Action", "Aventure", "Bizarre", "Surnaturel", "Stand"],
    rating: 8.5
  },
  {
    id: "unnamed-memory",
    title: "Unnamed Memory",
    originalTitle: "アンネームドメモリー",
    description: "Oscar, le prince héritier du puissant royaume de Farsas, est maudit depuis son enfance pour ne jamais avoir d'héritier. Espérant briser cette malédiction, il cherche Tinasha, la sorcière la plus puissante du continent. Pour la rencontrer, il doit gravir sa tour mystérieuse qui exauce le vœu de quiconque atteint le sommet. À son arrivée, il lui demande de devenir son épouse. Commence alors une histoire d'amour complexe entre un prince déterminé et une sorcière aux pouvoirs immenses, où magie, politique et sentiments s'entremêlent dans un monde fantasy riche en mystères.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2024,
    type: "Anime",
    status: "En cours",
    genres: ["Fantasy", "Romance", "Magie", "Royauté", "Drame", "Surnaturel"],
    rating: 7.8
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    originalTitle: "ヴィンランド・サガ",
    description: "Dans l'Europe du 11e siècle, pendant l'âge des Vikings, Thorfinn grandit en entendant les histoires de marins expérimentés qui parlent du pays légendaire du Vinland, un territoire chaud et fertile au-delà de l'océan. Quand son père Thors, un ancien guerrier devenu pacifiste, est assassiné par Askeladd, un chef de guerre viking, Thorfinn rejoint la bande de son ennemi juré dans l'espoir de défier Askeladd en duel et venger son père. Mais la vie d'un guerrier est dure, et Thorfinn va découvrir que la vengeance a un prix élevé. Cette épopée historique explore les thèmes de la guerre, de la vengeance, de l'honneur et de la recherche de la paix à travers le parcours d'un jeune homme marqué par la violence.",
    imageUrl: "",
    bannerUrl: "/picture/bassembanniere.png",
    year: 2019,
    type: "Anime",
    status: "Terminé",
    genres: ["Action", "Aventure", "Drame", "Historique", "Seinen", "Vikings", "Guerre"],
    rating: 9.0
  }
];
