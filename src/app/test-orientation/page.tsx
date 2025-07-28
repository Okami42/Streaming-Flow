"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize, Minimize, RotateCw, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrientationManager from "@/components/ui/orientation-manager";

export default function TestOrientationPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [testResults, setTestResults] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Détecter l'orientation actuelle
  useEffect(() => {
    const updateOrientation = () => {
      const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      setCurrentOrientation(orientation);
      addTestResult(`Orientation changée: ${orientation}`);
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);

    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  // Détecter le mode plein écran
  useEffect(() => {
    const handleFullScreenChange = () => {
      const newFullScreen = document.fullscreenElement !== null || 
        (document as any).webkitFullscreenElement !== null || 
        (document as any).mozFullScreenElement !== null ||
        (document as any).msFullscreenElement !== null;
      
      setIsFullScreen(newFullScreen);
      addTestResult(`Plein écran: ${newFullScreen ? 'Activé' : 'Désactivé'}`);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const toggleFullScreen = () => {
    const videoContainer = document.getElementById('test-video-container');
    if (!videoContainer) return;

    const videoElement = videoContainer.querySelector('video') as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitSupportsFullscreen?: boolean;
      webkitDisplayingFullscreen?: boolean;
    };
    const iframeElement = videoContainer.querySelector('iframe');
    const targetElement = videoElement || iframeElement || videoContainer;

    try {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      // Vérifier si on est déjà en plein écran
      const isCurrentlyFullscreen = document.fullscreenElement !== null || 
        (document as any).webkitFullscreenElement !== null || 
        (document as any).mozFullScreenElement !== null ||
        (document as any).msFullscreenElement !== null;
      
      // Si on est en plein écran, en sortir
      if (isCurrentlyFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
        return;
      }
      
      // Sinon, entrer en plein écran
      if (isIOS || isSafari) {
        if (videoElement && videoElement.webkitEnterFullscreen && !videoElement.webkitDisplayingFullscreen) {
          videoElement.webkitEnterFullscreen();
          return;
        }
      }
      
      // Pour les autres navigateurs
      if (targetElement.requestFullscreen) {
        targetElement.requestFullscreen();
      } else if ((targetElement as any).webkitRequestFullscreen) {
        (targetElement as any).webkitRequestFullscreen();
      } else if ((targetElement as any).mozRequestFullScreen) {
        (targetElement as any).mozRequestFullScreen();
      } else if ((targetElement as any).msRequestFullscreen) {
        (targetElement as any).msRequestFullscreen();
      }
    } catch (error) {
      addTestResult(`Erreur plein écran: ${error}`);
    }
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  const testNavigation = () => {
    addTestResult("Test de navigation - clic sur un lien");
    // Simuler un clic sur un lien pour tester
    const testLink = document.createElement('a');
    testLink.href = '#';
    testLink.textContent = 'Test Link';
    document.body.appendChild(testLink);
    testLink.click();
    document.body.removeChild(testLink);
  };

  const forceExitFullscreen = () => {
    addTestResult("Sortie forcée du plein écran");
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } catch (error) {
      addTestResult(`Erreur sortie forcée: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🧪 Test Orientation & Plein Écran</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Informations système */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Informations Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><strong>Navigateur:</strong> {navigator.userAgent}</div>
              <div><strong>Orientation actuelle:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  currentOrientation === 'landscape' ? 'bg-green-600' : 'bg-blue-600'
                }`}>
                  {currentOrientation.toUpperCase()}
                </span>
              </div>
              <div><strong>Mode plein écran:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  isFullScreen ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {isFullScreen ? 'ACTIF' : 'INACTIF'}
                </span>
              </div>
              <div><strong>Largeur:</strong> {window.innerWidth}px</div>
              <div><strong>Hauteur:</strong> {window.innerHeight}px</div>
            </CardContent>
          </Card>

          {/* Contrôles de test */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Contrôles de Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={toggleFullScreen}
                className="w-full"
                variant={isFullScreen ? "destructive" : "default"}
              >
                {isFullScreen ? <Minimize className="h-4 w-4 mr-2" /> : <Maximize className="h-4 w-4 mr-2" />}
                {isFullScreen ? 'Quitter Plein Écran' : 'Plein Écran'}
              </Button>
              
              {isFullScreen && (
                <Button 
                  onClick={forceExitFullscreen}
                  className="w-full"
                  variant="destructive"
                >
                  🚨 Sortie d'Urgence
                </Button>
              )}
              
              <Button 
                onClick={testNavigation}
                className="w-full"
                variant="outline"
              >
                Test Navigation
              </Button>
              
              <Button 
                onClick={clearTestResults}
                className="w-full"
                variant="outline"
              >
                Effacer Logs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lecteurs vidéo de test */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle>Lecteurs Vidéo de Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sibnet" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sibnet">Sibnet</TabsTrigger>
                <TabsTrigger value="mp4">MP4 Natif</TabsTrigger>
                <TabsTrigger value="iframe">Iframe Test</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sibnet" className="mt-4">
                <div id="test-video-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  {/* Contrôles flottants pour le plein écran */}
                  {isFullScreen && (
                    <div className="absolute top-4 left-4 z-[9999] flex flex-col gap-2">
                      <Button 
                        onClick={toggleFullScreen}
                        size="sm"
                        variant="destructive"
                        className="bg-black/80 hover:bg-black/90 text-white border border-white/20"
                      >
                        <Minimize className="h-4 w-4 mr-1" />
                        Quitter
                      </Button>
                      <Button 
                        onClick={forceExitFullscreen}
                        size="sm"
                        variant="destructive"
                        className="bg-red-600/80 hover:bg-red-600/90 text-white"
                      >
                        🚨 Urgence
                      </Button>
                    </div>
                  )}
                  
                  <iframe 
                    ref={iframeRef}
                    src="https://video.sibnet.ru/shell.php?videoid=5742388&skin=4&share=1"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0" 
                    scrolling="no" 
                    allowFullScreen
                    allow="fullscreen; autoplay; picture-in-picture; screen-wake-lock; accelerometer; gyroscope; clipboard-write; web-share"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="mp4" className="mt-4">
                <div id="test-video-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  {/* Contrôles flottants pour le plein écran */}
                  {isFullScreen && (
                    <div className="absolute top-4 left-4 z-[9999] flex flex-col gap-2">
                      <Button 
                        onClick={toggleFullScreen}
                        size="sm"
                        variant="destructive"
                        className="bg-black/80 hover:bg-black/90 text-white border border-white/20"
                      >
                        <Minimize className="h-4 w-4 mr-1" />
                        Quitter
                      </Button>
                      <Button 
                        onClick={forceExitFullscreen}
                        size="sm"
                        variant="destructive"
                        className="bg-red-600/80 hover:bg-red-600/90 text-white"
                      >
                        🚨 Urgence
                      </Button>
                    </div>
                  )}
                  
                  <video 
                    ref={videoRef}
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    className="w-full h-full"
                    controls
                    playsInline
                    webkit-playsinline="true"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="iframe" className="mt-4">
                <div id="test-video-container" className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                  {/* Contrôles flottants pour le plein écran */}
                  {isFullScreen && (
                    <div className="absolute top-4 left-4 z-[9999] flex flex-col gap-2">
                      <Button 
                        onClick={toggleFullScreen}
                        size="sm"
                        variant="destructive"
                        className="bg-black/80 hover:bg-black/90 text-white border border-white/20"
                      >
                        <Minimize className="h-4 w-4 mr-1" />
                        Quitter
                      </Button>
                      <Button 
                        onClick={forceExitFullscreen}
                        size="sm"
                        variant="destructive"
                        className="bg-red-600/80 hover:bg-red-600/90 text-white"
                      >
                        🚨 Urgence
                      </Button>
                    </div>
                  )}
                  
                  <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0" 
                    allowFullScreen
                    allow="fullscreen; autoplay; picture-in-picture"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Logs de test */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Logs de Test ({testResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto bg-black p-4 rounded text-sm font-mono">
              {testResults.length === 0 ? (
                <div className="text-gray-500">Aucun log pour le moment. Commencez à tester !</div>
              ) : (
                testResults.map((log, index) => (
                  <div key={index} className="text-green-400 mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gray-900 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle>📋 Instructions de Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">1</span>
              <span>Mettez une vidéo en plein écran</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">2</span>
              <span>Tournez votre téléphone (portrait ↔ landscape)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">3</span>
              <span>Vérifiez que le plein écran se maintient</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs">4</span>
              <span>Testez que vous ne pouvez pas naviguer en mode plein écran</span>
            </div>
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-600/30 rounded">
              <strong>💡 Conseil:</strong> Utilisez les outils de développement de votre navigateur pour simuler un appareil mobile et tester l'orientation.
            </div>
          </CardContent>
        </Card>

        {/* Gestionnaire d'orientation */}
        <OrientationManager 
          isFullScreen={isFullScreen}
          videoContainerId="test-video-container"
          onOrientationChange={(orientation) => {
            addTestResult(`OrientationManager: ${orientation}`);
          }}
        />

        {/* Styles CSS pour les contrôles en plein écran */}
        <style jsx global>{`
          /* S'assurer que les contrôles flottants restent visibles en plein écran */
          #test-video-container:fullscreen .absolute,
          #test-video-container:-webkit-full-screen .absolute {
            z-index: 999999 !important;
            pointer-events: auto !important;
          }

          /* Styles pour les contrôles flottants */
          #test-video-container:fullscreen button,
          #test-video-container:-webkit-full-screen button {
            pointer-events: auto !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          /* Empêcher les autres éléments d'interférer */
          #test-video-container:fullscreen *:not(.absolute):not(button),
          #test-video-container:-webkit-full-screen *:not(.absolute):not(button) {
            pointer-events: none !important;
          }

          /* Styles spécifiques pour iOS Safari */
          @supports (-webkit-touch-callout: none) {
            #test-video-container:fullscreen .absolute,
            #test-video-container:-webkit-full-screen .absolute {
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
            }
          }

          /* Assurer la visibilité en mode paysage */
          @media screen and (orientation: landscape) {
            #test-video-container:fullscreen .absolute,
            #test-video-container:-webkit-full-screen .absolute {
              position: fixed !important;
              top: 20px !important;
              left: 20px !important;
              z-index: 999999 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
} 