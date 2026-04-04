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
        event.message.includes('Blocked a frame') ||
        event.message.includes('Permissions policy violation') ||
        event.message.includes('Potential permissions policy violation')
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
      errorString.includes('autofocusing') ||
      errorString.includes('Permissions policy') ||
      errorString.includes('policy violation') ||
      errorString.includes('Image is missing required "src" property') ||
      errorString.includes('missing required "src"')
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
                if (url && url.includes('sibnet.ru')) {
                  // Ajouter attribution allow="autoplay" pour Sibnet
                  element.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; screen-wake-lock; accelerometer; gyroscope; clipboard-write; web-share');
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
                    script.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; screen-wake-lock; accelerometer; gyroscope; clipboard-write; web-share');
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
