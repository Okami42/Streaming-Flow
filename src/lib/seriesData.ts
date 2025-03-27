import { Content } from "./types";

export const seriesData: Content[] = [
  {
    id: "breaking-bad",
    title: "Breaking Bad",
    description: "Un professeur de chimie atteint d'un cancer du poumon inopérable se lance dans la fabrication et la vente de méthamphétamine pour assurer l'avenir financier de sa famille.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    bannerUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    episodes: [
      { id: 1, title: "Pilot", videoUrl: "https://filemoon.sx/e/a6bywq4y41fu" },
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
  }
];

// Films récents
export const recentFilms = [
  seriesData.find(item => item.id === "dune"),
  seriesData.find(item => item.id === "pulp-fiction")
].filter(Boolean);

// Séries populaires
export const popularSeries = [
  seriesData.find(item => item.id === "breaking-bad"),
  seriesData.find(item => item.id === "game-of-thrones"),
  seriesData.find(item => item.id === "stranger-things"),
  seriesData.find(item => item.id === "the-boys")
].filter(Boolean);

// Films classiques
export const classicFilms = [
  seriesData.find(item => item.id === "pulp-fiction")
].filter(Boolean); 