"use client";

import CustomImage from "./ui/custom-image";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden">
      {/* Background with anime characters */}
      <div className="absolute inset-0">
        <CustomImage
          src="/picture/bassembanniere.png"
          alt="Anime characters"
          fill
          priority
          unoptimized={true}
          className="object-cover object-center sm:object-center"
          sizes="100vw"
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
            <h2 className="text-xs sm:text-sm font-semibold tracking-wider mb-1 sm:mb-2">EXCLUSIVITÉ OKANIME</h2>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal md:font-bold text-white mb-1 sm:mb-2 md:mb-4 drop-shadow-lg">
            NOUVELLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">SAISON</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-2 sm:mb-3 md:mb-6 max-w-[230px] sm:max-w-[280px] md:max-w-[260px] font-light">
            Solo Leveling Saison 2 est enfin disponible. Ne manquez rien de cette nouvelle saison.
          </p>

          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <Link href="/catalogue/welcome-demon-school-teacher">
              <Button className="bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white border-0 font-medium text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 h-8 sm:h-9 md:h-10">
                Regarder
              </Button>
            </Link>
            <Link href="/planning">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 h-8 sm:h-9 md:h-10">
                <Play className="h-3 w-3 md:h-4 md:w-4" /> Planning
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
