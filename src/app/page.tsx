import React from "react";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import {
  classics,
  hidden,
  recentEpisodes,
  recentScans,
  tuesdayReleases
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Plus, Sparkles, Star, Play } from "lucide-react";
import Link from "next/link";
import CustomImage from "@/components/ui/custom-image";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Type pour les éléments de contenu compatible avec ContentSection
interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  time?: string;
  type: "Anime" | "Scans";
  language: "VOSTFR" | "VF";
}

// Conversion des données pour garantir la compatibilité des types
const typedTuesdayReleases = tuesdayReleases.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedRecentEpisodes = recentEpisodes.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedRecentScans = recentScans.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedClassics = classics.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

const typedHidden = hidden.map(item => ({
  ...item,
  type: item.type as "Anime" | "Scans",
  language: item.language as "VOSTFR" | "VF"
}));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <HeroSection />

        <div className="container mx-auto px-4 py-8">
          {/* Featured Anime */}
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-[#151a2a] to-[#0c1222] border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-bold text-white">Anime à la une</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/4 lg:w-1/5">
                <Link href="/catalogue/solo-leveling" className="block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border-2 border-pink-500/20 hover:border-pink-500/50 transition-all shadow-lg hover:shadow-pink-500/20">
                    <CustomImage
                      src="https://img-cdn.thepublive.com/wion/media/post_attachments/files/web-story/900_1600/2024/3/26/1711469910345_sololeveling.jpg"
                      alt="Solo Leveling"
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
                <h3 className="text-2xl font-bold text-white mb-2">Solo Leveling</h3>
                <p className="text-gray-300 mb-4">
                  Dix ans auparavant, des portails ont commencé à apparaître dans le monde. Sung Jin Woo est considéré comme le plus faible des Chasseurs de rang E. Lors d'une mission dans un donjon de rang D, il acquiert une capacité étrange qui pourrait lui permettre de devenir le plus puissant des Chasseurs.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Action", "Fantasy", "Aventure", "Surnaturel"].map((tag) => (
                    <span key={tag} className="inline-block px-2 py-1 text-xs bg-[#151a2a] text-gray-300 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Link href="/catalogue/solo-leveling">
                    <Button className="theme-button">
                      <Play className="mr-2 h-4 w-4" />
                      Regarder
                    </Button>
                  </Link>
                  <Link href="/catalogue">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      Voir le catalogue
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sections with gradient backgrounds to create depth */}
          <div className="space-y-10">
            <ContentSection
              title="Sorties du Mardi"
              icon={<CalendarDays className="h-5 w-5 text-pink-500" />}
              items={typedTuesdayReleases}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Derniers Épisodes Ajoutés"
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              items={typedRecentEpisodes}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Derniers Scans Ajoutés"
              icon={<Plus className="h-5 w-5 text-green-500" />}
              items={typedRecentScans}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />

            <ContentSection
              title="Les Classiques"
              icon={<Star className="h-5 w-5 text-yellow-500" />}
              items={typedClassics}
              className="bg-gradient-to-r from-transparent to-[#0c1222]/10 p-6 rounded-xl"
            />

            <ContentSection
              title="Découvrez des Pépites"
              icon={<Sparkles className="h-5 w-5 text-purple-500" />}
              items={typedHidden}
              className="bg-gradient-to-r from-[#0c1222]/10 to-transparent p-6 rounded-xl"
            />
          </div>

          {/* Newsletter/Promo section */}
          <div className="mt-16 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-white/10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
                Restez à jour avec les dernières sorties
              </h2>
              <p className="text-gray-300 mb-6">
                Ne manquez jamais une sortie d'épisode ou de chapitre ! Suivez-nous sur Discord et Twitter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/anime-flow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#5865F2] to-[#404EED] text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Rejoindre Discord
                </a>
                <a
                  href="https://twitter.com/anime_flow"
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
