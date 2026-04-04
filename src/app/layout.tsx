import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import { HistoryProvider } from "@/context/history-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import FontOptimizer from "@/lib/font-optimization";
import ScriptOptimizer from "@/lib/script-optimizer";

// Utilisation de la police Inter de Google Fonts au lieu des fichiers locaux non disponibles
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Okastream - Streaming Anime, Manga & Scans",
  description: "Okastream : Le meilleur site de streaming gratuit pour regarder des animes, lire des mangas et voir des séries en VOSTFR et VF. Découvrez One Piece, Naruto, Attack on Titan et plus encore sur Okastream !",
  keywords: "Okastream, okastream.fr, anime streaming, manga lecture, séries streaming, VOSTFR, VF, gratuit, One Piece, Naruto, Attack on Titan, Dragon Ball, streaming anime gratuit, okastream streaming",
  metadataBase: new URL("https://okastream.fr"),
  alternates: {
    canonical: "/"
  },
  verification: {
    google: "rKNH9kNMrDDh5zM-jzGRD6j1ji4czTHFHhWy95TuKgY",
  },
  openGraph: {
    title: "Okastream - Streaming Anime, Manga & Scans",
    description: "Okastream : Le meilleur site de streaming gratuit pour regarder des animes, lire des mangas et voir des séries en VOSTFR et VF. Découvrez One Piece, Naruto, Attack on Titan et plus encore !",
    url: "https://okastream.fr",
    siteName: "Okastream",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/picture/logookaviolet.png",
        width: 1200,
        height: 630,
        alt: "Okastream - Streaming Anime Gratuit"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/picture/logookaviolet.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        {/* Preload des ressources critiques */}
        <link
          rel="preload"
          href="/icon_logo_okami.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://image.tmdb.org"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta
          httpEquiv="Permissions-Policy"
          content="accelerometer=*, gyroscope=*, fullscreen=*, picture-in-picture=*, clipboard-write=*, web-share=*, screen-wake-lock=*"
        />
        {/* Scripts de sécurité pour iframes et pubs - différés pour ne pas bloquer le rendu */}
        <Script src="/scripts/security-patch.js" strategy="lazyOnload" />
        <Script src="/scripts/videojs-patch.js" strategy="lazyOnload" />
      </head>
      <body className={`min-h-screen font-sans antialiased ${inter.className}`}>
        <FontOptimizer />
        <ScriptOptimizer />
        <ThemeProvider>
          <AuthProvider>
            <HistoryProvider>
              <FavoritesProvider>
                {children}
              </FavoritesProvider>
            </HistoryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
