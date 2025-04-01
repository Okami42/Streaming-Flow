import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { HistoryProvider } from "@/context/history-context";

export const metadata: Metadata = {
  title: "Okastream | Anime & Scans ET Films & Séries",
  description: "Site de référencement et de visionnage de contenus d'animation japonaise et Films & Séries. Regardez vos anime et séries préférés en streaming gratuit sur Okastream.",
  keywords: "Okastream, anime, manga, séries, films, streaming, gratuit, vostfr, Breaking Bad, One Piece, Naruto, Attack on Titan",
  metadataBase: new URL("https://www.okastream.fr"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Okastream | Anime & Scans ET Films & Séries",
    description: "Site de référencement et de visionnage de contenus d'animation japonaise et Films & Séries",
    url: "https://www.okastream.fr",
    siteName: "Okastream",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/picture/logookaviolet.png",
        width: 1200,
        height: 630,
        alt: "Okastream"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '128x128' },
      { url: '/icon_logo_okami.png', sizes: '192x192' }
    ],
    apple: { url: '/icon_logo_okami.png', sizes: '180x180' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <HistoryProvider>
            {children}
          </HistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
