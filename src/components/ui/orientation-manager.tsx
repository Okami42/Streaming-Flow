import { useEffect, useRef } from 'react';

interface OrientationManagerProps {
  isFullScreen: boolean;
  videoContainerId: string;
  onOrientationChange?: (orientation: 'portrait' | 'landscape') => void;
}

export default function OrientationManager({ 
  isFullScreen, 
  videoContainerId, 
  onOrientationChange 
}: OrientationManagerProps) {
  const orientationRef = useRef<'portrait' | 'landscape'>('portrait');
  const fullScreenStateRef = useRef(false);

  useEffect(() => {
    fullScreenStateRef.current = isFullScreen;
  }, [isFullScreen]);

  useEffect(() => {
    const handleOrientationChange = () => {
      const currentOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      
      if (orientationRef.current !== currentOrientation) {
        orientationRef.current = currentOrientation;
        onOrientationChange?.(currentOrientation);
      }

      // Si on est en plein écran, maintenir le plein écran lors du changement d'orientation
      if (fullScreenStateRef.current) {
        const videoContainer = document.getElementById(videoContainerId);
        if (videoContainer) {
          const videoElement = videoContainer.querySelector('video') as HTMLVideoElement & {
            webkitEnterFullscreen?: () => void;
            webkitSupportsFullscreen?: boolean;
            webkitDisplayingFullscreen?: boolean;
          };
          const iframeElement = videoContainer.querySelector('iframe');
          
          // Vérifier si on est sur iOS
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          
          if (isIOS || isSafari) {
            // Sur iOS, maintenir le plein écran de la vidéo
            if (videoElement && videoElement.webkitEnterFullscreen && !videoElement.webkitDisplayingFullscreen) {
              setTimeout(() => {
                try {
                  if (videoElement.webkitEnterFullscreen) {
                    videoElement.webkitEnterFullscreen();
                  }
                } catch (e) {
                  console.log("Erreur lors du maintien du plein écran sur iOS:", e);
                }
              }, 150);
            }
          } else {
            // Sur les autres navigateurs, maintenir le plein écran du conteneur
            const targetElement = videoElement || iframeElement || videoContainer;
            if (targetElement && !document.fullscreenElement && 
                !(document as any).webkitFullscreenElement && 
                !(document as any).mozFullScreenElement &&
                !(document as any).msFullscreenElement) {
              setTimeout(() => {
                try {
                  if (targetElement.requestFullscreen) {
                    targetElement.requestFullscreen();
                  } else if ((targetElement as any).webkitRequestFullscreen) {
                    (targetElement as any).webkitRequestFullscreen();
                  } else if ((targetElement as any).mozRequestFullScreen) {
                    (targetElement as any).mozRequestFullScreen();
                  } else if ((targetElement as any).msRequestFullscreen) {
                    (targetElement as any).msRequestFullscreen();
                  }
                } catch (e) {
                  console.log("Erreur lors du maintien du plein écran:", e);
                }
              }, 150);
            }
          }
        }
      }
    };

    // Écouter les changements d'orientation
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Écouter les changements d'orientation via l'API Screen Orientation
    if ('screen' in window && 'orientation' in window.screen && window.screen.orientation && typeof window.screen.orientation.addEventListener === 'function') {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      if ('screen' in window && 'orientation' in window.screen && window.screen.orientation && typeof window.screen.orientation.removeEventListener === 'function') {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, [videoContainerId, onOrientationChange]);

  return null; // Ce composant ne rend rien visuellement
} 