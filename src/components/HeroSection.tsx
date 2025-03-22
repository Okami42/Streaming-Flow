"use client";

import CustomImage from "./ui/custom-image";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
      {/* Background with anime characters */}
      <div className="absolute inset-0">
        <CustomImage
          src="https://media.discordapp.net/attachments/1322574128397680743/1353020740278157322/360_F_591976463_KMZyV6obpsrN2bJJJkYW0bzoH2XxLTlA.jpg?ex=67e02242&is=67ded0c2&hm=47e57b54f9274ad3af12ac099065f4288ebc3b3cdbc98a006d93325d753e46ed&=&format=webp"
          alt="Anime characters"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-transparent" />
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

      {/* Content */}
      <div className="container mx-auto h-full flex items-center px-4 relative z-10">
        <div className="max-w-md">
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            <h2 className="text-sm font-semibold tracking-wider mb-2">EXCLUSIVITÉ OKANIME</h2>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            NOUVELLE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              SAISON
            </span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base mb-6 max-w-xs">
            Welcome, Demon-School Teacher! Saison 4 disponible maintenant. Ne manquez rien des aventures d'Iruma à l'école des démons !
          </p>

          <div className="flex gap-4">
            <Link href="/catalogue/welcome-demon-school-teacher">
              <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white border-0 font-medium">
                Regarder
              </Button>
            </Link>
            <Link href="/planning">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-medium flex items-center gap-2">
                <Play className="h-4 w-4" /> Planning
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
    </div>
  );
}
