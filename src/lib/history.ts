export interface WatchHistoryItem {
  id: string;
  title: string;
  imageUrl: string;
  lastWatchedAt: string; // ISO string
  progress: number; // Progress in seconds
  duration: number; // Total duration in seconds
  episodeInfo: {
    season: number;
    episode: number;
    title?: string;
  };
  type: 'Anime' | 'Scans';
}

export interface ReadHistoryItem {
  id: string;
  title: string;
  imageUrl: string;
  lastReadAt: string; // ISO string
  chapter: number;
  page: number;
  totalPages: number;
  type: 'Scans';
}

export type HistoryItem = WatchHistoryItem | ReadHistoryItem;

// Helper to calculate the percentage of progress
export function calculateProgress(item: HistoryItem): number {
  if ('progress' in item) {
    return Math.min(100, Math.round((item.progress / item.duration) * 100));
  } else {
    return Math.min(100, Math.round((item.page / item.totalPages) * 100));
  }
}

// Format time from seconds to MM:SS
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Format time from seconds to hh:mm:ss if hours > 0, otherwise MM:SS
export function formatTimeExtended(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Get remaining time to watch
export function getRemainingTime(item: WatchHistoryItem): string {
  const remainingSeconds = item.duration - item.progress;
  return formatTimeExtended(remainingSeconds);
}

// Get localized date (e.g. "Il y a 3 jours")
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'À l\'instant';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `Il y a ${diffInMonths} mois`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `Il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
}
