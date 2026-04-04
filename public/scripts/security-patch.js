// Script pour bloquer les popups et redirections de movearnpre.com
if (window.top !== window.self) {
  // Ce code s'exécute uniquement dans les iframes
  try {
    const originalOpen = window.open;
    window.open = function(url, target, features) {
      // Bloquer les popups si l'URL contient movearnpre ou popunder
      if (url && (url.includes('movearnpre') || url.includes('pop') || url.includes('ads'))) {
        console.log('Popup blocked:', url);
        return null;
      }
      return originalOpen.call(this, url, target, features);
    };
    
    // Observer pour supprimer les scripts de redirection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'SCRIPT' && 
                node.src && 
                (node.src.includes('movearnpre') || node.src.includes('ads'))) {
              node.remove();
            }
          });
        }
      });
    });
    
    // Démarrer l'observation une fois le DOM chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document, { childList: true, subtree: true });
      });
    } else {
      observer.observe(document, { childList: true, subtree: true });
    }
  } catch (e) {
    console.error('Erreur lors du blocage des popups:', e);
  }
}

// Bloquer les popups et redirections pour movearnpre.com spécifique
window.addEventListener('load', function() {
  if (window.location.href.includes('movearnpre.com')) {
    window.open = function() { return null; };
    window.location.assign = function() {};
    window.location.replace = function() {};
    
    // Observer et supprimer les scripts publicitaires
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeName === 'SCRIPT') {
              node.remove();
            }
          });
        }
      });
    });
    
    observer.observe(document, { childList: true, subtree: true });
  }
});
