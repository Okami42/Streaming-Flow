import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { HistoryProvider } from "@/context/history-context";

export const metadata: Metadata = {
  title: "Okastream | Anime & Scans ET Films & Séries",
  description: "Site de référencement et de visionnage de contenus d'animation japonaise et Films & Séries",
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
