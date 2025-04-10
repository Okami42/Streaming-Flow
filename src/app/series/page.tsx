import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Sparkles, Star, Play, Film } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";
import ContentSection from "@/components/ContentSection";

// Styles pour l'animation des étoiles
const starStyles = `
  @keyframes twinkle {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .stars-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: white;
    animation: twinkle 4s infinite;
  }

  .star:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  .star:nth-child(2) {
    top: 30%;
    left: 40%;
    animation-delay: 1s;
  }

  .star:nth-child(3) {
    top: 15%;
    left: 60%;
    animation-delay: 2s;
  }

  .star:nth-child(4) {
    top: 40%;
    left: 80%;
    animation-delay: 3s;
  }

  .star:nth-child(5) {
    top: 60%;
    left: 20%;
    animation-delay: 2.5s;
  }

  .star:nth-child(6) {
    top: 75%;
    left: 50%;
    animation-delay: 1.5s;
  }

  .star:nth-child(7) {
    top: 80%;
    left: 70%;
    animation-delay: 0.5s;
  }

  .star:nth-child(8) {
    top: 10%;
    left: 90%;
    animation-delay: 3.5s;
  }
`;

export default function SeriesPage() {
  // Données temporaires pour les séries et films (à remplacer par de vraies données par la suite)
  const featuredSeries = {
    id: "breaking-bad",
    title: "Breaking Bad",
    description: "Un professeur de chimie atteint d'un cancer du poumon inopérable se lance dans la fabrication et la vente de méthamphétamine pour assurer l'avenir financier de sa famille.",
    imageUrl: "https://fr.web.img5.acsta.net/pictures/19/06/18/12/11/3956503.jpg",
    genres: ["Drame", "Crime", "Thriller"]
  };
  
  // Exemples de séries populaires
  const popularSeries = [
    {
      id: "game-of-thrones",
      title: "Game of Thrones",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "8 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "stranger-things",
      title: "Stranger Things",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "4 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-boys",
      title: "The Boys",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "3 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "the-witcher",
      title: "The Witcher",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2 saisons",
      type: "Série",
      language: "VF"
    },
    {
      id: "peaky-blinders",
      title: "Peaky Blinders",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "6 saisons",
      type: "Série",
      language: "VF"
    }
  ];
  
  // Exemples de films récents
  const recentFilms = [
    {
      id: "dune",
      title: "Dune",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h35",
      type: "Film",
      language: "VF"
    },
    {
      id: "the-batman",
      title: "The Batman",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h55",
      type: "Film",
      language: "VF"
    },
    {
      id: "top-gun-maverick",
      title: "Top Gun: Maverick",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h10",
      type: "Film",
      language: "VF"
    },
    {
      id: "no-time-to-die",
      title: "No Time to Die",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h43",
      type: "Film",
      language: "VF"
    },
    {
      id: "everything-everywhere",
      title: "Everything Everywhere All at Once",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h19",
      type: "Film",
      language: "VF"
    }
  ];
  
  // Exemples de films classiques
  const classicFilms = [
    {
      id: "the-godfather",
      title: "Le Parrain",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h55",
      type: "Film",
      language: "VF"
    },
    {
      id: "pulp-fiction",
      title: "Pulp Fiction",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h34",
      type: "Film",
      language: "VF"
    },
    {
      id: "shawshank-redemption",
      title: "Les Évadés",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h22",
      type: "Film",
      language: "VF"
    },
    {
      id: "fight-club",
      title: "Fight Club",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h19",
      type: "Film",
      language: "VF"
    },
    {
      id: "matrix",
      title: "Matrix",
      imageUrl: "https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp",
      time: "2h16",
      type: "Film",
      language: "VF"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: starStyles }} />
      <Header />

      <main className="flex-grow">
        {/* Hero section avec okastreamtextbanner.png */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <CustomImage
              src="/picture/okastreamtextbanner.png"
              alt="Séries et Films"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-transparent to-transparent" />

            {/* Animated particle effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="stars-container">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
              </div>
            </div>
          </div>

          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Série à la une */}
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-bold text-white">Série à la une</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/4 lg:w-1/5">
                <Link href={`/series/${featuredSeries.id}`} className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-blue-500/20 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20">
                    <CustomImage
                      src={featuredSeries.imageUrl}
                      alt={featuredSeries.title}
                      fill={true}
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{featuredSeries.title}</h3>
                <p className="text-gray-300 mb-4">
                  {featuredSeries.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredSeries.genres.map((tag) => (
                    <span key={tag} className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href={`/series/${featuredSeries.id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                      <Play className="mr-2 h-4 w-4" />
                      Regarder
                    </Button>
                  </Link>
                  <Link href="/series/catalogue">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Voir le catalogue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sections avec fonds dégradés */}
          <div className="space-y-10">
            <ContentSection
              title="Séries Populaires"
              icon={<Film className="h-5 w-5 text-blue-500" />}
              items={popularSeries as any}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Films Récents"
              icon={<Clock className="h-5 w-5 text-purple-500" />}
              items={recentFilms as any}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Films Classiques"
              icon={<Star className="h-5 w-5 text-yellow-500" />}
              items={classicFilms as any}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />
          </div>

          {/* Section Newsletter/Promo */}
          <div className="mt-16 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Ne manquez aucune nouvelle sortie
              </h2>
              <p className="text-gray-300 mb-6">
                Restez informé des dernières sorties de séries et films ! Suivez-nous sur nos réseaux sociaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/series-films"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#5865F2] to-[#404EED] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Rejoindre Discord
                </a>
                <a
                  href="https://twitter.com/series_films"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#1D9BF0] to-[#1A8CD8] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Suivre sur Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 