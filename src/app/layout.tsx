import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
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
  title: "Okastream | Anime & Scans ET Films & Séries",
  description: "Site de référencement et de visionnage de contenus d'animation japonaise et Films & Séries. Regardez vos anime et séries préférés en streaming gratuit sur Okastream.",
  keywords: "Okastream, anime, manga, séries, films, streaming, gratuit, vostfr, Breaking Bad, One Piece, Naruto, Attack on Titan",
  metadataBase: new URL("https://www.okastream.fr"),
  alternates: {
    canonical: "/"
  },
  verification: {
    google: "JXUG7kpK-JLc6mNdI8pFXnTQPnJA4Z-TKV4iefh1aAg",
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
      </head>
      <Script id="videojs-error-fix" strategy="afterInteractive">
        {`
          // Solution complète pour les erreurs Sibnet, videojs, VAST et sécurité
          window.addEventListener('DOMContentLoaded', () => {
            // 1. Interception des erreurs globales
            window.addEventListener('error', function(event) {
              // Vérifier si l'erreur provient de scripts problématiques ou contient des messages spécifiques
              if (
                (event.filename && (
                  event.filename.includes('progressTips.js') ||
                  event.filename.includes('vast.vpaid.js') ||
                  event.filename.includes('sibnet.ru') ||
                  event.filename.includes('overlayclip.js')
                )) ||
                (event.message && (
                  event.message.includes('Cannot read properties of undefined') ||
                  event.message.includes('VAST Error') ||
                  event.message.includes('VASTClient') ||
                  event.message.includes('AbortError') ||
                  event.message.includes('pause()') ||
                  event.message.includes('Failed to read') ||
                  event.message.includes('SecurityError') ||
                  event.message.includes('named property') ||
                  event.message.includes('BLOCKED_BY_CSP') ||
                  event.message.includes('Blocked a frame')
                ))
              ) {
                console.log('[Erreur supprimée]:', event.message);
                event.preventDefault();
                event.stopPropagation();
                return false;
              }
            }, true);

            // 2. Interception des console.error
            const originalConsoleError = console.error;
            console.error = function(...args) {
              const errorString = args.join(' ');
              if (
                errorString.includes('VAST') ||
                errorString.includes('videojs') ||
                errorString.includes('pause()') ||
                errorString.includes('AbortError') ||
                errorString.includes('SecurityError') ||
                errorString.includes('CSP') ||
                errorString.includes('autofocusing')
              ) {
                console.log('[Console.error supprimé]:', errorString);
                return;
              }
              originalConsoleError.apply(console, args);
            };

            // 3. Solutions pour les iframes et problèmes de sécurité
            try {
              // Patch pour les erreurs d'autofocus et de sécurité
              const createElementOriginal = document.createElement;
              document.createElement = function(tagName) {
                const element = createElementOriginal.call(document, tagName);
                
                // Empêcher les erreurs d'autofocus
                if (tagName.toLowerCase() === 'input') {
                  Object.defineProperty(element, 'autofocus', {
                    set: function() { /* Ignorer */ },
                    get: function() { return false; }
                  });
                }
                
                // Empêcher les problèmes de sécurité avec les iframes
                if (tagName.toLowerCase() === 'iframe') {
                  // Intercepter la définition du src 
                  const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src')?.set;
                  if (originalSrcSetter) {
                    Object.defineProperty(element, 'src', {
                      set: function(url) {
                        try {
                          if (url.includes('sibnet.ru')) {
                            // Ajouter attribution allow="autoplay" pour Sibnet
                            element.setAttribute('allow', 'autoplay; fullscreen');
                            // Démarrer l'iframe avec un écouteur pour prévenir les erreurs
                            setTimeout(() => {
                              try {
                                element.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-presentation');
                              } catch(e) {}
                            }, 100);
                          }
                          originalSrcSetter.call(this, url);
                        } catch(e) {
                          console.log('[Erreur src iframe supprimée]');
                        }
                      },
                      get: function() {
                        return element.getAttribute('src');
                      }
                    });
                  }
                }
                
                return element;
              };
            } catch(e) {
              console.log('[Erreur lors du patch createElement]:', e);
            }

            // 4. Solutions pour jQuery et videojs
            setTimeout(() => {
              try {
                // Si jQuery n'est pas défini mais est utilisé par un iframe
                if (typeof window.jQuery === 'undefined') {
                  window.jQuery = window.$ = function() {
                    return {
                      find: function() { return { css: function() {} }; },
                      css: function() { return this; },
                      hide: function() { return this; },
                      show: function() { return this; },
                      on: function() { return this; },
                      off: function() { return this; },
                      attr: function() { return this; }
                    };
                  };
                }
                
                // 5. Bloquer les publicités et erreurs VAST VPAID
                if (typeof window.videojs !== 'undefined') {
                  try {
                    // Remplacer la fonction pause pour éviter les erreurs AbortError
                    const origVideoJs = window.videojs;
                    window.videojs = function() {
                      const player = origVideoJs.apply(this, arguments);
                      
                      // Patch des fonctions problématiques
                      try {
                        const origPause = player.pause;
                        player.pause = function() {
                          try {
                            return origPause.apply(this, arguments);
                          } catch(e) {
                            console.log('[Erreur pause() interceptée]');
                            return player;
                          }
                        };
                      } catch(e) {}
                      
                      return player;
                    };
                    
                    // Patch également videojs.ready
                    const origVideoJsReady = window.videojs.ready;
                    window.videojs.ready = function(fn) {
                      return origVideoJsReady.call(this, function() {
                        try {
                          // Désactiver les plugins problématiques
                          const player = this;
                          
                          // Bloquer le plugin VAST
                          if (player && typeof player.vast === 'function') {
                            player.vast = function() {
                              console.log('[VAST plugin désactivé]');
                              return player;
                            };
                          }
                          
                          // Patcher la fonction play pour éviter CSP
                          if (player && player.play) {
                            const origPlay = player.play;
                            player.play = function() {
                              try {
                                return origPlay.apply(this, arguments);
                              } catch(e) {
                                console.log('[Erreur play() interceptée]');
                                return player;
                              }
                            };
                          }
                          
                          fn.apply(this, arguments);
                        } catch (e) {
                          console.log('[Erreur dans videojs.ready interceptée]:', e);
                        }
                      });
                    };
                    
                    // Nettoyer les URL VAST dans le DOM
                    setInterval(() => {
                      try {
                        const scripts = document.querySelectorAll('script[src*="vast"], script[src*="ad"], link[href*="vast"], iframe[src*="getcode.php"]');
                        scripts.forEach(script => {
                          if (!script.hasAttribute('data-cleaned')) {
                            script.setAttribute('data-cleaned', 'true');
                            if (script.tagName === 'IFRAME') {
                              script.setAttribute('allow', 'autoplay; fullscreen');
                            }
                          }
                        });
                      } catch(e) {}
                    }, 1000);
                  } catch (e) {
                    console.log('[Erreur lors de la création des patches videojs]:', e);
                  }
                }
              } catch (e) {
                console.log('[Erreur lors de la création des polyfills]:', e);
              }
            }, 500);
          });
        `}
      </Script>
      <body className={`min-h-screen font-sans antialiased ${inter.className}`}>
        <FontOptimizer />
        <ScriptOptimizer />
        <ThemeProvider>
          <HistoryProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </HistoryProvider>
        </ThemeProvider>
        
        {/* Script pour optimiser le chargement des images */}
        <Script id="image-optimization" strategy="afterInteractive">
          {`
            // Optimisation du chargement des images
            document.addEventListener('DOMContentLoaded', function() {
              // Fonction pour vérifier si une image est dans le viewport
              function isInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                  rect.top >= -300 &&
                  rect.left >= -300 &&
                  rect.bottom <= (window.innerHeight + 300) &&
                  rect.right <= (window.innerWidth + 300)
                );
              }
              
              // Observer les images pour le lazy loading
              if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver((entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      const lazyImage = entry.target;
                      if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.removeAttribute('data-src');
                        lazyImage.classList.remove('lazy-image');
                        lazyImage.classList.add('loaded');
                        lazyImageObserver.unobserve(lazyImage);
                      }
                    }
                  });
                }, { rootMargin: '200px 0px' });
                
                // Observer toutes les images avec data-src
                document.querySelectorAll('img[data-src]').forEach(img => {
                  lazyImageObserver.observe(img);
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
