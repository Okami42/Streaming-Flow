import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomImage from "@/components/ui/custom-image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030711] text-white">
      {/* Logo et titre en haut */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">OKAnime</span>
        </div>
      </div>

      {/* Écran d'accueil divisé en deux parties */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Section Animés (gauche) */}
        <Link href="/anime" className="flex-1 group relative overflow-hidden">
          <div className="absolute inset-0 bg-[#030711]/90 md:group-hover:bg-[#030711]/70 transition-all duration-500 z-10"></div>
          <div className="absolute inset-0">
            <CustomImage
              src="https://media.discordapp.net/attachments/1159954836595421275/1353087523462578266/bassembanniere.png?ex=67e10934&is=67dfb7b4&hm=fe5f582cc8e4a7a34498b9785223c891011259bcd683695da08fc0ee69fa0484&=&format=webp&quality=lossless"
              alt="Fond animés"
              fill={true}
              className="object-cover object-center transition-transform duration-700 md:group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 md:group-hover:translate-y-[-10px]">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              Animés
            </h2>
            <p className="text-lg md:text-xl text-white/80 text-center max-w-md px-4">
              Explorez notre vaste bibliothèque d'animés japonais
            </p>
            <div className="mt-8 bg-gradient-to-r from-pink-600 to-blue-600 p-[1px] rounded-full">
              <div className="bg-[#0c1222] hover:bg-[#151a2a] px-6 py-2 rounded-full transition-all">
                Découvrir
              </div>
            </div>
          </div>
        </Link>

        {/* Section Séries/Films (droite) */}
        <Link href="/series" className="flex-1 group relative overflow-hidden">
          <div className="absolute inset-0 bg-[#030711]/90 md:group-hover:bg-[#030711]/70 transition-all duration-500 z-10"></div>
          <div className="absolute inset-0">
            <CustomImage
              src="https://media.discordapp.net/attachments/1159954836595421275/1353087523462578266/bassembanniere.png?ex=67e10934&is=67dfb7b4&hm=fe5f582cc8e4a7a34498b9785223c891011259bcd683695da08fc0ee69fa0484&=&format=webp&quality=lossless"
              alt="Fond séries et films"
              fill={true}
              className="object-cover object-center transition-transform duration-700 md:group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-500 md:group-hover:translate-y-[-10px]">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Séries & Films
            </h2>
            <p className="text-lg md:text-xl text-white/80 text-center max-w-md px-4">
              Découvrez notre collection de séries et films en streaming
            </p>
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] rounded-full">
              <div className="bg-[#0c1222] hover:bg-[#151a2a] px-6 py-2 rounded-full transition-all">
                Explorer
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Pied de page */}
      <div className="absolute bottom-4 w-full text-center text-white/60 text-sm z-20">
        © 2024 OKAnime - Tous droits réservés
      </div>
    </div>
  );
}
