import Link from "next/link";
import { Instagram, Twitter, Github } from "lucide-react";
import CustomImage from "./ui/custom-image";

export default function Footer() {
  return (
    <footer className="relative mt-20 pt-16 pb-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0c1222]/50 to-[#06080b]" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              À Propos
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-pink-500 to-blue-500" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Okanime est un site de référencement et de visionnage de contenus
              de l'animation japonaise les moins accessibles possibles, créé par des
              passionnés, de l'animation et du divertissement sans but lucratif.
            </p>
            <CustomImage
              src="https://media.discordapp.net/attachments/1159954836595421275/1353016792762548305/logookaviolet.png?ex=67e01e95&is=67decd15&hm=f279d6d843057d526999be9eef999adc8342d93e0dc2702f95f97611ed6f444a&=&format=webp&quality=lossless"
              alt="Okanime Logo"
              width={120}
              height={30}
              className="h-8 w-auto mt-4"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              Liens Rapides
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-pink-500 to-blue-500" />
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <FooterLink href="/catalogue">Catalogue</FooterLink>
              <FooterLink href="/planning">Planning</FooterLink>
              <FooterLink href="/aide">Aide</FooterLink>
              <FooterLink href="/profil">Profil</FooterLink>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4 relative inline-block">
              Connectez-vous
              <span className="absolute -bottom-1 left-0 w-12 h-[2px] bg-gradient-to-r from-pink-500 to-blue-500" />
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/anime-flow"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#151a2a] hover:bg-[#1e263f] p-2.5 rounded-full border border-white/5 transition-all duration-300 hover:border-white/20 primary-glow"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://twitter.com/anime_flow"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#151a2a] hover:bg-[#1e263f] p-2.5 rounded-full border border-white/5 transition-all duration-300 hover:border-white/20 primary-glow"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Okanime n'héberge aucune vidéo sur son site, nous ne faisons que
              référencer des contenus disponibles sur différentes plateformes.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Okanime - Tous droits réservés.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">
              Fait avec <span className="text-pink-500">♥</span> pour les amateurs d'anime
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
      <span className="relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-blue-500">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-pink-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
