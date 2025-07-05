import { Content, Episode } from "./types";

// Ajout de l'interface EpisodeWithDuration pour les épisodes avec durée
export interface EpisodeWithDuration extends Episode {
  duration?: number; // Durée en secondes
}

export const seriesData: Content[] = [
  {
    id: "motorheads",
    title: "Motorheads",
    description: "Une équipe de passionnés de mécanique et de voitures de collection parcourt le monde à la recherche des véhicules les plus rares et les restaure à leur gloire d'antan. Entre défis techniques, courses contre la montre et rencontres avec des collectionneurs excentriques, l'équipe de Motorheads repousse les limites de la restauration automobile.",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    episodes: [],
    status: "En cours",
    year: 2023,
    studio: "MotorTV",
    type: "Série",
    genres: ["Documentaire", "Automobile", "Aventure"],
    rating: 8.5,
    language: "VF/VOSTFR",
    seasons: 1,
    seasonsList: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        episodes: [
          { 
            id: 1, 
            title: "Pilote", 
            videoUrl: "https://exemple.com/motorheads-s01e01", 
            duration: 55 * 60, // 55min
            imageUrl: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 2, 
            title: "Lueur d'espoir", 
            videoUrl: "https://exemple.com/motorheads-s01e02", 
            duration: 55 * 60, // 55min
            imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5f452d1f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 3, 
            title: "Premier tour de piste", 
            videoUrl: "https://exemple.com/motorheads-s01e03", 
            duration: 54 * 60, // 54min
            imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 4, 
            title: "Pièces détachées", 
            videoUrl: "https://exemple.com/motorheads-s01e04", 
            duration: 50 * 60, // 50min
            imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 5, 
            title: "À quel prix ?", 
            videoUrl: "https://exemple.com/motorheads-s01e05", 
            duration: 55 * 60, // 55min
            imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 6, 
            title: "Reconstruction", 
            videoUrl: "https://exemple.com/motorheads-s01e06", 
            duration: 49 * 60, // 49min
            imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 7, 
            title: "Faux contact", 
            videoUrl: "https://exemple.com/motorheads-s01e07", 
            duration: 51 * 60, // 51min
            imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 8, 
            title: "Court-circuit", 
            videoUrl: "https://exemple.com/motorheads-s01e08", 
            duration: 57 * 60, // 57min
            imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 9, 
            title: "Démarrage", 
            videoUrl: "https://exemple.com/motorheads-s01e09", 
            duration: 48 * 60, // 48min
            imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          },
          { 
            id: 10, 
            title: "Cardinal", 
            videoUrl: "https://exemple.com/motorheads-s01e10", 
            duration: 48 * 60, // 48min
            imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "squid-game",
    title: "Squid Game",
    description: "Tentés par un prix alléchant en cas de victoire, des centaines de joueurs désargentés acceptent de s'affronter lors de jeux pour enfants apparemment inoffensifs, mais mortellement dangereux.",
    imageUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    episodes: [],
    status: "Terminée",
    year: 2021,
    studio: "Netflix",
    type: "Série",
    genres: ["Drame", "Thriller", "Action", "Survie"],
    rating: 8.7,
    language: "VF/VOSTFR",
    seasons: 3,
    seasonsList: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        episodes: [
          { 
            id: 1, 
            title: "Un, deux, trois, soleil", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E01.mp4", 
            duration: 61 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/vMFJS9LIUUAmQ1thq4vJ7iHKwRz.jpg"
          },
          { 
            id: 2, 
            title: "Enfer", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E02.mp4", 
            duration: 63 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/uacNwki3PqXEFk9Pal9Ng5NwwAI.jpg"
          },
          { 
            id: 3, 
            title: "L'homme au parapluie", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E03.mp4", 
            duration: 55 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/xNtgrNEsMXvmRQQtcFuJdbXOjmP.jpg"
          },
          { 
            id: 4, 
            title: "L'équipe avant tout", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E04.mp4", 
            duration: 55 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/9cUGOdLN4gmnf3b9ILArnJsJI8Q.jpg"
          },
          { 
            id: 5, 
            title: "Un monde juste", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E05.mp4", 
            duration: 52 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/A5SZMEDnvLCHdT9wDfzg3jmNi4U.jpg"
          },
          { 
            id: 6, 
            title: "Gganbu", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E06.mp4", 
            duration: 62 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/uu4TgyyW259aOZHN0Ew4TEcNZQz.jpg"
          },
          { 
            id: 7, 
            title: "VIP", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E07.mp4", 
            duration: 58 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/A5SZMEDnvLCHdT9wDfzg3jmNi4U.jpg"
          },
          { 
            id: 8, 
            title: "Leader", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E08.mp4", 
            duration: 33 * 60 ,
            imageUrl: "https://image.tmdb.org/t/p/original/kYezBjgH3QI2U4Z6D1rQPIUyZJP.jpg"
          },
          { 
            id: 9, 
            title: "Finale", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S01/Squid-Game-S01-E09.mp4", 
            duration: 56 * 60,
            imageUrl: "https://image.tmdb.org/t/p/original/qFx5XKzD9LXw3OXlbMWOu4OGp7r.jpg"
          }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        episodes: [
          { 
            id: 1, 
            title: "Le retour", 
            videoUrl: "https://cineburger.xyz/series/Squid-Game/S02/Squid-Game-S02-E01.mp4",
            duration: 55 * 60, // 55min
            imageUrl: "https://image.tmdb.org/t/p/original/pJXYAUKXwGTJr8Lx84iuGMZpVM7.jpg"
          },
          { 
            id: 2, 
            title: "Nouveau jeu", 
            videoUrl: "https://exemple.com/squid-game-s2-2",
            duration: 55 * 60, // 55min
            imageUrl: "https://image.tmdb.org/t/p/original/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg"
          },
          { 
            id: 3, 
            title: "Les règles changent", 
            videoUrl: "https://exemple.com/squid-game-s2-3",
            duration: 55 * 60, // 55min
            imageUrl: "https://image.tmdb.org/t/p/original/2OMB0Xs8nTPxwT1KQ5KpCR5UkGs.jpg"
          },
          { 
            id: 4, 
            title: "Alliances fragiles", 
            videoUrl: "https://exemple.com/squid-game-s2-4",
            duration: 55 * 60, // 55min
            imageUrl: "https://image.tmdb.org/t/p/original/1fGTAYwJjdLLJVxS0wU0nNDe3RL.jpg"
          },
          { 
            id: 5, 
            title: "Le grand test", 
            videoUrl: "https://exemple.com/squid-game-s2-5",
            duration: 58 * 60, // 58min
            imageUrl: "https://image.tmdb.org/t/p/original/8ozLnbAhxOSQxPKQKs3XCCsNwGW.jpg"
          },
          { 
            id: 6, 
            title: "Confrontation", 
            videoUrl: "https://exemple.com/squid-game-s2-6",
            duration: 62 * 60, // 1h02
            imageUrl: "https://image.tmdb.org/t/p/original/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg"
          },
          { 
            id: 7, 
            title: "Le masque tombe", 
            videoUrl: "https://exemple.com/squid-game-s2-7",
            duration: 59 * 60, // 59min
            imageUrl: "https://image.tmdb.org/t/p/original/8LHSDyRlM9mJXYpN3Jeqh7C8YpQ.jpg"
          },
          { 
            id: 8, 
            title: "Dernière chance", 
            videoUrl: "https://exemple.com/squid-game-s2-8",
            duration: 65 * 60, // 1h05
            imageUrl: "https://image.tmdb.org/t/p/original/pJXYAUKXwGTJr8Lx84iuGMZpVM7.jpg"
          }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        episodes: [
          { 
            id: 1, 
            title: "La fin justifie les moyens", 
            videoUrl: "https://exemple.com/squid-game-s3-1",
            duration: 58 * 60, // 58min
            imageUrl: "https://image.tmdb.org/t/p/original/3TpMBcAE26ZeKRJ0nt79IrSY9Np.jpg"
          },
          { 
            id: 2, 
            title: "Derrière le voile", 
            videoUrl: "https://exemple.com/squid-game-s3-2",
            duration: 54 * 60, // 54min
            imageUrl: "https://image.tmdb.org/t/p/original/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg"
          },
          { 
            id: 3, 
            title: "Le système s'effondre", 
            videoUrl: "https://exemple.com/squid-game-s3-3",
            duration: 61 * 60, // 1h01
            imageUrl: "https://image.tmdb.org/t/p/original/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg"
          },
          { 
            id: 4, 
            title: "Ceux qui tirent les ficelles", 
            videoUrl: "https://exemple.com/squid-game-s3-4",
            duration: 57 * 60, // 57min
            imageUrl: "https://image.tmdb.org/t/p/original/bAQ8O5Uw6FedtlCbJTutenzPVKd.jpg"
          },
          { 
            id: 5, 
            title: "Révélations", 
            videoUrl: "https://exemple.com/squid-game-s3-5",
            duration: 63 * 60, // 1h03
            imageUrl: "https://image.tmdb.org/t/p/original/A3bsT0m1um6tvcmlIzQTJv0CoNe.jpg"
          },
          { 
            id: 6, 
            title: "Le dernier jeu", 
            videoUrl: "https://exemple.com/squid-game-s3-6",
            duration: 72 * 60, // 1h12
            imageUrl: "https://image.tmdb.org/t/p/original/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg"
          },
          { 
            id: 7, 
            title: "Conclusion", 
            videoUrl: "https://exemple.com/squid-game-s3-7",
            duration: 68 * 60, // 1h08
            imageUrl: "https://image.tmdb.org/t/p/original/8ozLnbAhxOSQxPKQKs3XCCsNwGW.jpg"
          }
        ]
      }
    ]
  },
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    description: "Un professeur de chimie atteint d'un cancer du poumon inopérable se lance dans la fabrication et la vente de méthamphétamine pour assurer l'avenir financier de sa famille.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    bannerUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    episodes: [
      { id: 1, title: "Chute Libre", videoUrl: "https://iframe.mediadelivery.net/play/404680/688c681c-b7ba-4652-b81e-013e6064ba9e" },
      { id: 2, title: "Cat's in the Bag...", videoUrl: "https://exemple.com/video2" },
      { id: 3, title: "...And the Bag's in the River", videoUrl: "https://exemple.com/video3" }
    ],
    status: "Terminée",
    year: 2008,
    studio: "AMC",
    type: "Série",
    genres: ["Drame", "Crime", "Thriller"],
    rating: 9.5,
    language: "VF/VOSTFR",
    seasons: 5
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    description: "Sur le continent de Westeros, le roi Robert Baratheon gouverne le Royaume des Sept Couronnes depuis plus de dix-sept ans. Mais des complots se trament pour prendre le pouvoir.",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    episodes: [
      { id: 1, title: "Winter Is Coming", videoUrl: "https://exemple.com/got1" },
      { id: 2, title: "The Kingsroad", videoUrl: "https://exemple.com/got2" },
      { id: 3, title: "Lord Snow", videoUrl: "https://exemple.com/got3" }
    ],
    status: "Terminée",
    year: 2011,
    studio: "HBO",
    type: "Série",
    genres: ["Fantastique", "Drame", "Action"],
    rating: 9.2,
    language: "VF/VOSTFR",
    seasons: 8
  },
  {
    id: "stranger-things",
    title: "Stranger Things",
    description: "Dans la petite ville de Hawkins, un garçon disparaît mystérieusement. Alors que ses amis, sa famille et la police cherchent des réponses, ils plongent dans un extraordinaire mystère.",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    episodes: [
      { id: 1, title: "Chapter One: The Vanishing of Will Byers", videoUrl: "https://exemple.com/st1" },
      { id: 2, title: "Chapter Two: The Weirdo on Maple Street", videoUrl: "https://exemple.com/st2" },
      { id: 3, title: "Chapter Three: Holly, Jolly", videoUrl: "https://exemple.com/st3" }
    ],
    status: "En cours",
    year: 2016,
    studio: "Netflix",
    type: "Série",
    genres: ["Horreur", "Science-fiction", "Drame"],
    rating: 8.7,
    language: "VF/VOSTFR",
    seasons: 4
  },
  {
    id: "the-boys",
    title: "The Boys",
    description: "Dans un monde où les super-héros sont devenus corrompus et se comportent plus comme des célébrités que des héros, The Boys, un groupe de justiciers, décide de les combattre.",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    episodes: [
      { id: 1, title: "The Name of the Game", videoUrl: "https://exemple.com/tb1" },
      { id: 2, title: "Cherry", videoUrl: "https://exemple.com/tb2" },
      { id: 3, title: "Get Some", videoUrl: "https://exemple.com/tb3" }
    ],
    status: "En cours",
    year: 2019,
    studio: "Amazon",
    type: "Série",
    genres: ["Action", "Comédie", "Crime"],
    rating: 8.7,
    language: "VF/VOSTFR",
    seasons: 3
  },
  {
    id: "dune",
    title: "Dune",
    description: "Paul Atreides, un jeune homme brillant au destin plus grand que lui-même, doit se rendre sur la planète la plus dangereuse de l'univers pour assurer l'avenir de sa famille et de son peuple.",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    episodes: [
      { id: 1, title: "Dune (Film complet)", videoUrl: "https://exemple.com/dune" }
    ],
    status: "Terminé",
    year: 2021,
    studio: "Warner Bros",
    type: "Film",
    genres: ["Science-fiction", "Aventure", "Drame"],
    rating: 8.0,
    language: "VF/VOSTFR",
    runtime: "2h35"
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    description: "Les vies de deux hommes de main, d'un boxeur, de la femme d'un gangster et de deux braqueurs s'entremêlent dans quatre histoires de violence et de rédemption.",
    imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    bannerUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
    episodes: [
      { id: 1, title: "Pulp Fiction (Film complet)", videoUrl: "https://exemple.com/pulp" }
    ],
    status: "Terminé",
    year: 1994,
    studio: "Miramax",
    type: "Film",
    genres: ["Crime", "Drame", "Thriller"],
    rating: 8.9,
    language: "VF/VOSTFR",
    runtime: "2h34"
  },
  {
    id: "adventure-time",
    title: "Adventure Time",
    description: "Adventure Time suit les aventures de Finn, un jeune garçon humain, et de son meilleur ami Jake, un chien aux pouvoirs magiques qui lui permettent de changer de forme et de taille à volonté. Ils vivent dans la Terre de Ooo, un monde post-apocalyptique peuplé de créatures et personnages fantastiques.",
    imageUrl: "https://m.media-amazon.com/images/I/81YoIbnTKZL._AC_UF1000,1000_QL80_.jpg",
    bannerUrl: "/picture/okastreamtextbanner.png",
    episodes: [
      { id: 1, title: "L'envers et l'endroit (S1E1)", videoUrl: "https://video.sibnet.ru/shell.php?videoid=5432812" },
      { id: 2, title: "Prisonniers de l'amour (S1E2)", videoUrl: "https://video.sibnet.ru/shell.php?videoid=5432813" },
      { id: 3, title: "La baguette enchantée (S1E3)", videoUrl: "https://video.sibnet.ru/shell.php?videoid=5432814" }
    ],
    seasonsList: [
      {
        seasonNumber: 1,
        title: "Saison 1",
        episodes: [
          { id: 1, title: "L'envers et l'endroit", videoUrl: "5432812" },
          { id: 2, title: "Prisonniers de l'amour", videoUrl: "5432813" },
          { id: 3, title: "La baguette enchantée", videoUrl: "5432814" },
          { id: 4, title: "Les deux personnes que j'aime le plus", videoUrl: "5432815" },
          { id: 5, title: "Le roi muet", videoUrl: "5432816" },
          { id: 6, title: "Problème de fourrure", videoUrl: "5432817" },
          { id: 7, title: "Ricardio, le cœur", videoUrl: "5432818" },
          { id: 8, title: "Business à la noisette", videoUrl: "5432819" },
          { id: 9, title: "Le cerveau de Jake", videoUrl: "5432820" },
          { id: 10, title: "Les cristaux du pouvoir", videoUrl: "5432821" },
          { id: 11, title: "Les jeux olympiques des sorciers", videoUrl: "5432822" },
          { id: 12, title: "Terreur sur le train", videoUrl: "5432823" },
          { id: 13, title: "La cité des monstres", videoUrl: "5432824" },
          { id: 14, title: "L'enchiridion", videoUrl: "5432825" },
          { id: 15, title: "Bataille de magiciens", videoUrl: "5432826" },
          { id: 16, title: "L'océan de peur", videoUrl: "5432827" },
          { id: 17, title: "Princesse fantôme en cavale", videoUrl: "5432828" },
          { id: 18, title: "Mortel pour la vie", videoUrl: "5432829" },
          { id: 19, title: "Le duc", videoUrl: "5432830" },
          { id: 20, title: "Frosh, le bleu", videoUrl: "5432831" },
          { id: 21, title: "Donner la vie", videoUrl: "5432832" },
          { id: 22, title: "Mon héros", videoUrl: "5432833" },
          { id: 23, title: "BMO Noir", videoUrl: "5432834" },
          { id: 24, title: "Rien qu'un souhait", videoUrl: "5432835" },
          { id: 25, title: "La chambre de lumière", videoUrl: "5432836" },
          { id: 26, title: "Prométhée et moi", videoUrl: "5432837" }
        ]
      },
      {
        seasonNumber: 2,
        title: "Saison 2",
        episodes: [
          { id: 1, title: "Le dilemme de Jake", videoUrl: "5432838" },
          { id: 2, title: "Les yeux", videoUrl: "5432839" },
          { id: 3, title: "La faim des estomacs", videoUrl: "5432840" },
          { id: 4, title: "Les gladiateurs", videoUrl: "5432841" },
          { id: 5, title: "La guerre des cartes", videoUrl: "5432842" },
          { id: 6, title: "Les cheveux", videoUrl: "5432843" },
          { id: 7, title: "Le pouvoir du cristal", videoUrl: "5432844" },
          { id: 8, title: "Le roi liche", videoUrl: "5432845" },
          { id: 9, title: "Les gardiens du soleil", videoUrl: "5432846" },
          { id: 10, title: "Le train mystérieux", videoUrl: "5432847" },
          { id: 11, title: "L'entreprise", videoUrl: "5432849" },
          { id: 12, title: "Les autres tartes", videoUrl: "5432850" },
          { id: 13, title: "Le Roi Ver", videoUrl: "5432851" },
          { id: 14, title: "La chambre gelée", videoUrl: "5432852" },
          { id: 15, title: "Le père de Finn", videoUrl: "5432853" },
          { id: 16, title: "Susan Strong", videoUrl: "5432854" },
          { id: 17, title: "Le Vrai Toi", videoUrl: "5432855" },
          { id: 18, title: "Les Cristaux ont du pouvoir", videoUrl: "5432856" },
          { id: 19, title: "Chaleur et amour", videoUrl: "5432857" },
          { id: 20, title: "Le vaisseau spatial", videoUrl: "5432858" },
          { id: 21, title: "Sa Muse", videoUrl: "5432859" },
          { id: 22, title: "Rien que des sièges", videoUrl: "5432860" },
          { id: 23, title: "Le démon des gardiens", videoUrl: "5432861" },
          { id: 24, title: "Le visiteur de la citadelle", videoUrl: "5432862" },
          { id: 25, title: "La limite", videoUrl: "5432863" },
          { id: 26, title: "Morale à chaud", videoUrl: "5432864" }
        ]
      },
      {
        seasonNumber: 3,
        title: "Saison 3",
        episodes: [
          { id: 1, title: "Conquête de la citadelle rouge", videoUrl: "5432865" },
          { id: 2, title: "Souvenir d'un souvenir", videoUrl: "5432866" },
          { id: 3, title: "Trop jeune", videoUrl: "5432867" },
          { id: 4, title: "Le monstre", videoUrl: "5432868" },
          { id: 5, title: "Trop vieux", videoUrl: "5432869" },
          { id: 6, title: "Le jour des câlins", videoUrl: "5432870" },
          { id: 7, title: "La princesse-pomme", videoUrl: "5432871" },
          { id: 8, title: "Danse d'alignement", videoUrl: "5432872" },
          { id: 9, title: "Fionna et Cake", videoUrl: "5432873" },
          { id: 10, title: "Ce que j'ai fait", videoUrl: "5432874" },
          { id: 11, title: "La petite bombe", videoUrl: "5432875" },
          { id: 12, title: "Le placard de Marceline", videoUrl: "5432876" },
          { id: 13, title: "La chambre du Duc", videoUrl: "5432877" },
          { id: 14, title: "Le nouveau roi", videoUrl: "5432878" },
          { id: 15, title: "Le héros au cœur pur", videoUrl: "5432879" },
          { id: 16, title: "BMO Noire", videoUrl: "5432881" },
          { id: 17, title: "Cinq histoires courtes", videoUrl: "5432882" },
          { id: 18, title: "La princesse fantôme", videoUrl: "5432883" },
          { id: 19, title: "Incendium", videoUrl: "5436576" },
          { id: 20, title: "La princesse cookie", videoUrl: "5432885" },
          { id: 21, title: "La créature", videoUrl: "5432886" },
          { id: 22, title: "Dans ton emprise", videoUrl: "5432887" },
          { id: 23, title: "Le roi ver", videoUrl: "5432888" },
          { id: 24, title: "Une histoire de personnages", videoUrl: "5432889" },
          { id: 25, title: "Le rêve d'un ami", videoUrl: "5432890" },
          { id: 26, title: "Le retour à la normalité", videoUrl: "5432891" }
        ]
      },
      {
        seasonNumber: 4,
        title: "Saison 4",
        episodes: [
          { id: 1, title: "Une Flamme chaude", videoUrl: "5432892" },
          { id: 2, title: "Cinq petites histoires", videoUrl: "5432894" },
          { id: 3, title: "Le placard des secrets", videoUrl: "5432895" },
          { id: 4, title: "Rêve d'amour", videoUrl: "5432896" },
          { id: 5, title: "Retour à la Citadelle", videoUrl: "5432897" },
          { id: 6, title: "Daddy et moi", videoUrl: "5432898" },
          { id: 7, title: "Au Royaume de Ooo", videoUrl: "5432899" },
          { id: 8, title: "Les Cartes Magiques", videoUrl: "5432900" },
          { id: 9, title: "La Princesse Monstre", videoUrl: "5432901" },
          { id: 10, title: "La Goliad", videoUrl: "5432903" },
          { id: 11, title: "Le royaume des fourmis", videoUrl: "5432904" },
          { id: 12, title: "La limite", videoUrl: "5432905" },
          { id: 13, title: "La Princesse Cookie", videoUrl: "5432906" },
          { id: 14, title: "Le feu et la glace", videoUrl: "5432907" },
          { id: 15, title: "BMO Noire", videoUrl: "5432908" },
          { id: 16, title: "Le Roi Ver", videoUrl: "5432909" },
          { id: 17, title: "La Chambre Gelée", videoUrl: "5432910" },
          { id: 18, title: "La Princesse Fantôme", videoUrl: "5432911" },
          { id: 19, title: "Lady & Canicorne", videoUrl: "5432912" },
          { id: 20, title: "Le petit garçon et sa bête", videoUrl: "5432913" },
          { id: 21, title: "Ignition Point", videoUrl: "5432914" },
          { id: 22, title: "La Grande Fête des Oiseaux", videoUrl: "5432915" },
          { id: 23, title: "Les Fils de Mars", videoUrl: "5432916" },
          { id: 24, title: "Roi Ver", videoUrl: "5432917" },
          { id: 25, title: "Je me souviens de toi", videoUrl: "5432918" },
          { id: 26, title: "Le Lich", videoUrl: "5432919" }
        ]
      },
      {
        seasonNumber: 5,
        title: "Saison 5",
        episodes: [
          { id: 1, title: "Finn le humain", videoUrl: "5432921" },
          { id: 2, title: "Jake le chien", videoUrl: "5432922" },
          { id: 3, title: "Cinq histoires brèves", videoUrl: "5432924" },
          { id: 4, title: "Toutes vos fautes", videoUrl: "5432925" },
          { id: 5, title: "La flamme en toi", videoUrl: "5432927" },
          { id: 6, title: "Jake le papa", videoUrl: "5432929" },
          { id: 7, title: "Davey", videoUrl: "5432931" },
          { id: 8, title: "Le mystère du colis", videoUrl: "5432932" },
          { id: 9, title: "James Baxter le cheval", videoUrl: "5432933" },
          { id: 10, title: "Le trône sans terre", videoUrl: "5432934" },
          { id: 11, title: "Une semaine chez Marceline", videoUrl: "5432935" },
          { id: 12, title: "La reine des billes", videoUrl: "5432937" },
          { id: 13, title: "Simon et Marcy", videoUrl: "5432938" },
          { id: 14, title: "BMO perdu", videoUrl: "5432939" },
          { id: 15, title: "La princesse biscuit", videoUrl: "5432940" },
          { id: 16, title: "Le petit Dude", videoUrl: "5432941" },
          { id: 17, title: "La vie et la mort", videoUrl: "5432942" },
          { id: 18, title: "BMO et Bubblegum", videoUrl: "5432944" },
          { id: 19, title: "Coucou magique", videoUrl: "5432945" },
          { id: 20, title: "Golem de feu", videoUrl: "5432946" },
          { id: 21, title: "Le festin de Jake", videoUrl: "5432947" },
          { id: 22, title: "Un citron donne un espoir", videoUrl: "5432948" },
          { id: 23, title: "Un citron trop acide", videoUrl: "5432949" },
          { id: 24, title: "Le Roi Liche", videoUrl: "5432950" },
          { id: 25, title: "La fille de Jake", videoUrl: "5432951" },
          { id: 26, title: "Le festival des tartes", videoUrl: "5432952" },
          { id: 27, title: "La réforme froide", videoUrl: "5432954" },
          { id: 28, title: "Le jeu des calins", videoUrl: "5432955" },
          { id: 29, title: "La tour", videoUrl: "5432956" },
          { id: 30, title: "L'amour à réveiller", videoUrl: "5432957" },
          { id: 31, title: "La Robe de Soie", videoUrl: "5432958" },
          { id: 32, title: "La Malédiction", videoUrl: "5432960" },
          { id: 33, title: "Nous sommes marionnettes", videoUrl: "5432961" },
          { id: 34, title: "Fer et Feu", videoUrl: "5432962" },
          { id: 35, title: "La boîte mystère", videoUrl: "5432963" },
          { id: 36, title: "Voix mystérieuses", videoUrl: "5432964" },
          { id: 37, title: "Le Visiteur", videoUrl: "5432965" },
          { id: 38, title: "La lame d'herbe", videoUrl: "5432966" },
          { id: 39, title: "Finn en slip", videoUrl: "5432967" },
          { id: 40, title: "Une histoire de fantôme", videoUrl: "5432968" },
          { id: 41, title: "Le royaume familier", videoUrl: "5432970" },
          { id: 42, title: "Jake le Château", videoUrl: "5432971" },
          { id: 43, title: "Le Catalyseur", videoUrl: "5432972" },
          { id: 44, title: "Le Grand Oiseau", videoUrl: "5432973" },
          { id: 45, title: "Le Journal intime", videoUrl: "5432974" },
          { id: 46, title: "Dentiste", videoUrl: "5432976" },
          { id: 47, title: "La montagne", videoUrl: "5432977" },
          { id: 48, title: "Le calme", videoUrl: "5432978" },
          { id: 49, title: "Billy l'astucieux", videoUrl: "5432979" },
          { id: 50, title: "Le gardien de la Citadelle", videoUrl: "5432980" },
          { id: 51, title: "La pomme empoisonnée", videoUrl: "5432981" },
          { id: 52, title: "L'échelle", videoUrl: "5432982" }
        ]
      },
      {
        seasonNumber: 6,
        title: "Saison 6",
        episodes: [
          { id: 1, title: "La Révolte", videoUrl: "5432984" },
          { id: 2, title: "Escapade", videoUrl: "5432986" },
          { id: 3, title: "Pouvoirs Alimentaires", videoUrl: "5432987" },
          { id: 4, title: "La Tour", videoUrl: "5432988" },
          { id: 5, title: "Horreur au Sous-sol", videoUrl: "5432989" },
          { id: 6, title: "Bébés à Bord", videoUrl: "5432991" },
          { id: 7, title: "Jake le Brique", videoUrl: "5432992" },
          { id: 8, title: "La Déesse Calmante", videoUrl: "5432993" },
          { id: 9, title: "James II", videoUrl: "5432995" },
          { id: 10, title: "Le Roi des Rats", videoUrl: "5432996" },
          { id: 11, title: "Triste Anniversaire", videoUrl: "5432997" },
          { id: 12, title: "Ocarina", videoUrl: "5432998" },
          { id: 13, title: "La Citrouille d'Automne", videoUrl: "5432999" },
          { id: 14, title: "Tronc d'Arbre", videoUrl: "5433000" },
          { id: 15, title: "Aliénation", videoUrl: "5433001" },
          { id: 16, title: "Joshua et Margaret", videoUrl: "5433002" },
          { id: 17, title: "La Chauve-Souris", videoUrl: "5433004" },
          { id: 18, title: "Jake le Papa", videoUrl: "5433005" },
          { id: 19, title: "Grotte d'Eau", videoUrl: "5433006" },
          { id: 20, title: "Evergreen", videoUrl: "5433007" },
          { id: 21, title: "Astral Plane", videoUrl: "5433008" },
          { id: 22, title: "Le Visiteur", videoUrl: "5433009" },
          { id: 23, title: "Le Dernier Jour", videoUrl: "5433011" },
          { id: 24, title: "L'Épée de Gazon", videoUrl: "5433013" },
          { id: 25, title: "Le Royaume de Gunter", videoUrl: "5433015" },
          { id: 26, title: "Compy Nocturne", videoUrl: "5433017" },
          { id: 27, title: "Le Mont Orgel", videoUrl: "5433019" },
          { id: 28, title: "Betty", videoUrl: "5433021" },
          { id: 29, title: "Retour à la Citadelle", videoUrl: "5433023" },
          { id: 30, title: "Roi de la Colline", videoUrl: "5433026" },
          { id: 31, title: "Souhait Suprême", videoUrl: "5433028" },
          { id: 32, title: "Amour Fou", videoUrl: "5433031" },
          { id: 33, title: "Orge et Bonsoir", videoUrl: "5433033" },
          { id: 34, title: "Jermaine", videoUrl: "5433035" },
          { id: 35, title: "Chaise Onirique", videoUrl: "5433037" },
          { id: 36, title: "Royaume Gelé", videoUrl: "5433039" },
          { id: 37, title: "Les Amis pour Toujours", videoUrl: "5433041" },
          { id: 38, title: "Quel Puzzle", videoUrl: "5433043" },
          { id: 39, title: "Le Festin", videoUrl: "5433045" },
          { id: 40, title: "Cosmos Sans Moi", videoUrl: "5433047" },
          { id: 41, title: "Royaume du Feu", videoUrl: "5433050" },
          { id: 42, title: "La Tour Cocon", videoUrl: "5433052" }
        ]
      },
      {
        seasonNumber: 7,
        title: "Saison 7",
        episodes: [
          { id: 1, title: "Bonnie & Neddy", videoUrl: "5433055" },
          { id: 2, title: "Vents & Intempéries", videoUrl: "5433057" },
          { id: 3, title: "Îles de Football", videoUrl: "5433059" },
          { id: 4, title: "Voyage en Caisse", videoUrl: "5433062" },
          { id: 5, title: "Le Marchand", videoUrl: "5433065" },
          { id: 6, title: "Pluie de Baisers", videoUrl: "5433067" },
          { id: 7, title: "La Brèche", videoUrl: "5433069" },
          { id: 8, title: "Président Porcelaine", videoUrl: "5433071" },
          { id: 9, title: "Souvenirs de Bonnie", videoUrl: "5433072" },
          { id: 10, title: "Le Temple de Mars", videoUrl: "5433073" },
          { id: 11, title: "Guerre d'Élémentaires", videoUrl: "5433074" },
          { id: 12, title: "Royaume de Gelée", videoUrl: "5433075" },
          { id: 13, title: "La Veillée", videoUrl: "5433076" },
          { id: 14, title: "Merveilleuse Cité", videoUrl: "5433077" },
          { id: 15, title: "Organisalien", videoUrl: "5433078" },
          { id: 16, title: "Échecs & Princesses", videoUrl: "5433079" },
          { id: 17, title: "Enfant Flammèche", videoUrl: "5433080" },
          { id: 18, title: "Le Retour de Gunter", videoUrl: "5433081" },
          { id: 19, title: "La Nuit", videoUrl: "5433082" },
          { id: 20, title: "Mémoire d'Homme", videoUrl: "5433083" },
          { id: 21, title: "Chassé-Croisé", videoUrl: "5433084" },
          { id: 22, title: "Nuit du Bonbon", videoUrl: "5433085" },
          { id: 23, title: "Lames de Cristal", videoUrl: "5433086" },
          { id: 24, title: "Prélude Final", videoUrl: "5433087" },
          { id: 25, title: "L'Invasion", videoUrl: "5433088" }
        ]
      },
      {
        seasonNumber: 8,
        title: "Saison 8",
        episodes: [
          { id: 1, title: "Roi du Royaume", videoUrl: "5433089" },
          { id: 2, title: "Retour à la Terre", videoUrl: "5433090" },
          { id: 3, title: "Navires dans la Nuit", videoUrl: "5433091" },
          { id: 4, title: "Jeu de Dames", videoUrl: "5433092" },
          { id: 5, title: "Sac à Puces", videoUrl: "5433093" },
          { id: 6, title: "Musique Glacée", videoUrl: "5433095" },
          { id: 7, title: "La Montagne de Diamant", videoUrl: "5433096" },
          { id: 8, title: "Sur la Colline", videoUrl: "5433097" },
          { id: 9, title: "La Bulle", videoUrl: "5433098" },
          { id: 10, title: "Alliance Improbable", videoUrl: "5433100" },
          { id: 11, title: "Élémentaire", videoUrl: "5433101" },
          { id: 12, title: "La Cité des Anges", videoUrl: "5433102" },
          { id: 13, title: "Roi des Sables", videoUrl: "5433103" },
          { id: 14, title: "La Promesse", videoUrl: "5433104" },
          { id: 15, title: "L'Échelle", videoUrl: "5433105" },
          { id: 16, title: "Reboot", videoUrl: "5433107" },
          { id: 17, title: "Le Cavalier Noir", videoUrl: "5433108" },
          { id: 18, title: "Îles", videoUrl: "5433109" },
          { id: 19, title: "Connexion Astrale", videoUrl: "5433110" },
          { id: 20, title: "Forêt Oubliée", videoUrl: "5433111" },
          { id: 21, title: "Arbre des Souhaits", videoUrl: "5433112" },
          { id: 22, title: "Lumière et Ombre", videoUrl: "5433113" },
          { id: 23, title: "Le Dernier Voyage", videoUrl: "5433115" },
          { id: 24, title: "Les Gardiens", videoUrl: "5433117" },
          { id: 25, title: "Fionna et Cake", videoUrl: "5433118" },
          { id: 26, title: "La Nuit des Trois", videoUrl: "5433119" },
          { id: 27, title: "Prémonition", videoUrl: "5433121" }
        ]
      },
      {
        seasonNumber: 9,
        title: "Saison 9",
        episodes: [
          { id: 1, title: "Orb", videoUrl: "5433124" },
          { id: 2, title: "Éléments", videoUrl: "5433125" },
          { id: 3, title: "Royaume de Bonbon", videoUrl: "5433126" },
          { id: 4, title: "Monde de Glace", videoUrl: "5433127" },
          { id: 5, title: "Terre de Boue", videoUrl: "5433129" },
          { id: 6, title: "Royaume de Feu", videoUrl: "5433130" },
          { id: 7, title: "Tempête", videoUrl: "5433131" },
          { id: 8, title: "Cloudy", videoUrl: "5433133" },
          { id: 9, title: "Étoile Filante", videoUrl: "5433134" },
          { id: 10, title: "En Souvenir d'Elle", videoUrl: "5433135" },
          { id: 11, title: "Ketchup", videoUrl: "5433137" },
          { id: 12, title: "Whispers", videoUrl: "5433138" },
          { id: 13, title: "Trois Épées", videoUrl: "5433139" },
          { id: 14, title: "Bespoke", videoUrl: "5433140" }
        ]
      },
      {
        seasonNumber: 10,
        title: "Saison 10",
        episodes: [
          { id: 1, title: "L'Ultime Bataille", videoUrl: "5433142" },
          { id: 2, title: "Archipel des Sons", videoUrl: "5433143" },
          { id: 3, title: "Fils du Destin", videoUrl: "5433144" },
          { id: 4, title: "Sous la Pluie", videoUrl: "5433145" },
          { id: 5, title: "Temple Lumineux", videoUrl: "5433147" },
          { id: 6, title: "BMO le Long", videoUrl: "5433148" },
          { id: 7, title: "La Forêt Noire", videoUrl: "5433149" },
          { id: 8, title: "Rêverie", videoUrl: "5433150" },
          { id: 9, title: "Verre de Terre", videoUrl: "5433151" },
          { id: 10, title: "Ailes Brisées", videoUrl: "5433152" },
          { id: 11, title: "Les Trois Gardiens", videoUrl: "5433153" },
          { id: 12, title: "Ça Commence", videoUrl: "5433154" },
          { id: 13, title: "Le Voyage Continue", videoUrl: "5433156" },
          { id: 14, title: "Départ Ultime", videoUrl: "5433157" }
        ]
      },
      {
        seasonNumber: 11,
        title: "Fionna And Cake",
        episodes: [
          { id: 1, title: "La Nouvelle Histoire", videoUrl: "5786046" },
          { id: 2, title: "Mondes Parallèles", videoUrl: "5786048" },
          { id: 3, title: "Destins Croisés", videoUrl: "5786050" },
          { id: 4, title: "Le Roi Gumball", videoUrl: "5786053" },
          { id: 5, title: "Aventures Inversées", videoUrl: "5827775" },
          { id: 6, title: "Dimensions Cachées", videoUrl: "5827776" },
          { id: 7, title: "Le Royaume des Rêves", videoUrl: "5827779" },
          { id: 8, title: "Face au Destin", videoUrl: "5827780" },
          { id: 9, title: "Retour aux Sources", videoUrl: "5827781" },
          { id: 10, title: "Héros et Héroïnes", videoUrl: "5827782" }
        ]
      },
      {
        seasonNumber: 12,
        title: "Distant Lands",
        episodes: [
          { id: 1, title: "BMO", videoUrl: "5724172" },
          { id: 2, title: "Obsidian", videoUrl: "5724175" },
          { id: 3, title: "Together Again", videoUrl: "5724178" },
          { id: 4, title: "Wizard City", videoUrl: "5724181" }
        ]
      }
    ],
    status: "Terminée",
    year: 2010,
    studio: "Cartoon Network",
    type: "Série",
    genres: ["Animation", "Aventure", "Comédie", "Fantastique"],
    rating: 8.6,
    language: "VF",
    seasons: 12
  },
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    description: "Trente ans après les événements du premier film, un nouveau blade runner, l'Officier K, découvre un secret enfoui depuis longtemps qui pourrait plonger la société dans le chaos. Cette découverte l'amène à retrouver Rick Deckard, disparu depuis tout ce temps.",
    imageUrl: "https://fusion.molotov.tv/arts/i/446x588/Ch8SHQoUwtj3pLilnXZVcdnXGgzVKBizwXwSA2pwZxgBCh8IARIbChSA_fyWJZmlm6Y3WrLBpjPRNPWsfRIDcG5n/jpg",
    bannerUrl: "/picture/okastreamtextbanner.png",
    episodes: [
      { id: 1, title: "Blade Runner 2049 (Film complet)", videoUrl: "https://beerscloud.com/iframe/6njC9wk7DN" }
    ],
    status: "Terminé",
    year: 2017,
    studio: "Warner Bros",
    type: "Film",
    genres: ["Science-fiction", "Thriller", "Drame"],
    rating: 8.0,
    language: "VF/VOSTFR",
    runtime: "2h44"
  }
];

// Films récents
export const recentFilms = [
  seriesData.find(item => item.id === "blade-runner-2049"),
  seriesData.find(item => item.id === "dune"),
  seriesData.find(item => item.id === "pulp-fiction")
].filter(Boolean);

// Séries populaires
export const popularSeries = [
  seriesData.find(item => item.id === "breaking-bad"),
  seriesData.find(item => item.id === "game-of-thrones"),
  seriesData.find(item => item.id === "stranger-things"),
  seriesData.find(item => item.id === "the-boys"),
  seriesData.find(item => item.id === "adventure-time")
].filter(Boolean);

// Films classiques
export const classicFilms = [
  seriesData.find(item => item.id === "blade-runner-2049"),
  seriesData.find(item => item.id === "pulp-fiction")
].filter(Boolean);

// Fonction pour récupérer toutes les séries du catalogue
export function getAllSeries() {
  return seriesData;
} 