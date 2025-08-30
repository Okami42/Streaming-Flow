import Link from "next/link";
import { Github } from "lucide-react";
import CustomImage from "./ui/custom-image";

export default function SeriesFooter() {
  return (
    <footer className="relative mt-20 pt-16 pb-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0c1222]/50 to-[#06080b]" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              À Propos
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Okastream est un site de référencement et de visionnage de films et séries,
              créé par des passionnés du divertissement sans but lucratif. 
              Nous vous proposons un large catalogue de contenus populaires et incontournables.
            </p>
            <CustomImage
              src="/picture/logookaviolet.png"
              alt="Okastream Logo"
              width={120}
              height={30}
              className="h-8 w-auto mt-4"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              Liens Rapides
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <FooterLink href="/series/catalogue">Catalogue</FooterLink>
              <FooterLink href="/series/aide">Aide</FooterLink>
              <FooterLink href="/profil">Profil</FooterLink>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              Légal
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />
            </h3>
            <p className="text-gray-400 text-sm mt-4">
              Okastream n'héberge aucune vidéo sur son site, nous ne faisons que
              référencer des contenus disponibles sur différentes plateformes.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Okastream - Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">
              Fait avec <span className="text-blue-500">♥</span> pour les amateurs de séries et films
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-400 text-sm hover:text-white transition-colors duration-300 relative group block py-1"
    >
      <span className="relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
} 
