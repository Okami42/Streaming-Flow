/**
 * Configuration optimisée pour HLS.js
 * Paramètres ajustés pour minimiser les problèmes de désynchronisation audio/vidéo
 */

export const getOptimizedHlsConfig = () => {
  return {
    // Paramètres généraux
    debug: false,
    enableWorker: true,
    lowLatencyMode: false, // Désactivé pour améliorer la stabilité
    
    // Paramètres de buffer
    maxBufferLength: 60, // Augmenter la taille du buffer pour plus de stabilité (60 secondes)
    maxMaxBufferLength: 120, // Valeur maximale autorisée pour le buffer (120 secondes)
    maxBufferSize: 60 * 1000 * 1000, // 60MB buffer size
    maxBufferHole: 0.5, // Tolérance pour les trous dans le buffer (500ms)
    highBufferWatchdogPeriod: 5, // Période de surveillance du buffer élevé
    
    // Paramètres de synchronisation audio/vidéo
    nudgeOffset: 0.2, // Valeur de correction pour la synchronisation
    nudgeMaxRetry: 5, // Nombre maximum de tentatives de correction
    
    // Paramètres de chargement
    fragLoadingTimeOut: 120000, // Timeout pour le chargement des fragments (2min)
    manifestLoadingTimeOut: 30000, // Timeout pour le chargement du manifest (30s)
    levelLoadingTimeOut: 30000, // Timeout pour le chargement des niveaux (30s)
    
    // Paramètres d'optimisation
    startFragPrefetch: true, // Précharger le premier fragment
    testBandwidth: true, // Tester la bande passante pour l'adaptation
    progressive: true, // Chargement progressif
    
    // Paramètres de synchronisation pour le live
    liveSyncDuration: 3, // Durée de synchronisation live (3s)
    liveMaxLatencyDuration: 10, // Latence maximale pour le live (10s)
    liveDurationInfinity: false, // Ne pas considérer la durée comme infinie
    
    // Paramètres de récupération d'erreurs
    appendErrorMaxRetry: 5, // Nombre maximum de tentatives d'ajout de segments
    
    // Paramètres pour la gestion des erreurs de synchronisation A/V
    // Ces paramètres personnalisés aident à gérer les problèmes de désynchronisation
    avSyncMaxDrift: 0.1, // Dérive maximale autorisée entre audio et vidéo (100ms)
    avSyncCheckInterval: 5000, // Intervalle de vérification de la synchronisation (5s)
    
    // Paramètres pour le ABR (Adaptive Bitrate)
    abrEwmaDefaultEstimate: 1000000, // 1Mbps par défaut
    abrEwmaFastLive: 3.0,
    abrEwmaFastVoD: 3.0,
    abrEwmaSlowLive: 9.0,
    abrEwmaSlowVoD: 9.0,
    abrMaxWithRealBitrate: true, // Utiliser le débit réel pour l'ABR
  };
};

/**
 * Configuration pour les appareils à faible puissance (mobiles, tablettes anciennes)
 */
export const getLowPowerHlsConfig = () => {
  const baseConfig = getOptimizedHlsConfig();
  return {
    ...baseConfig,
    maxBufferLength: 30, // Buffer plus petit pour économiser la mémoire
    maxMaxBufferLength: 60,
    maxBufferSize: 30 * 1000 * 1000, // 30MB buffer size
    enableWorker: false, // Désactiver les workers pour les appareils à faible puissance
  };
};

/**
 * Détecte si l'appareil est probablement à faible puissance
 */
export const isLowPowerDevice = (): boolean => {
  // Détection simple basée sur l'agent utilisateur pour les appareils mobiles
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Si disponible, utiliser hardwareConcurrency pour estimer la puissance de l'appareil
  const hasLowCPU = navigator.hardwareConcurrency 
    ? navigator.hardwareConcurrency < 4
    : false;
    
  return isMobile || hasLowCPU;
};

/**
 * Obtient la configuration HLS optimisée en fonction de l'appareil
 */
export const getHlsConfig = () => {
  return isLowPowerDevice() ? getLowPowerHlsConfig() : getOptimizedHlsConfig();
};

export default getHlsConfig; 