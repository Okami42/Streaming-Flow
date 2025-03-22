import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { HistoryProvider } from "@/context/history-context";

export const metadata: Metadata = {
  title: "Okanime | Anime et Scans en ligne",
  description: "Site de référencement et de visionnage de contenus d'animation japonaise",
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
