import { WatchHistoryItem, ReadHistoryItem } from './history';

export const mockWatchHistory: WatchHistoryItem[] = [
  {
    id: 'demon-slayer-s1e19',
    title: 'Demon Slayer',
    imageUrl: 'https://ext.same-assets.com/3039906599/884967313.jpeg',
    lastWatchedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    progress: 843, // 14:03
    duration: 1440, // 24:00
    episodeInfo: {
      season: 1,
      episode: 19,
      title: 'Hinokami',
    },
    type: 'Anime',
  },
  {
    id: 'jujutsu-kaisen-s2e15',
    title: 'Jujutsu Kaisen',
    imageUrl: 'https://ext.same-assets.com/2879165773/327560351.jpeg',
    lastWatchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    progress: 720, // 12:00
    duration: 1440, // 24:00
    episodeInfo: {
      season: 2,
      episode: 15,
      title: 'Le domaine de l\'expansion',
    },
    type: 'Anime',
  },
  {
    id: 'vinland-saga-s1e10',
    title: 'Vinland Saga',
    imageUrl: 'https://ext.same-assets.com/4165707166/2193428669.jpeg',
    lastWatchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    progress: 1200, // 20:00
    duration: 1500, // 25:00
    episodeInfo: {
      season: 1,
      episode: 10,
      title: 'Ragnarok',
    },
    type: 'Anime',
  },
  {
    id: 'akudama-drive-s1e5',
    title: 'Akudama Drive',
    imageUrl: 'https://ext.same-assets.com/3410839635/1638134647.jpeg',
    lastWatchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    progress: 600, // 10:00
    duration: 1380, // 23:00
    episodeInfo: {
      season: 1,
      episode: 5,
      title: 'Sharp',
    },
    type: 'Anime',
  },
];

export const mockReadHistory: ReadHistoryItem[] = [
  {
    id: 'priest-of-corruption-c45',
    title: 'The Priest of Corruption',
    imageUrl: 'https://ext.same-assets.com/2961408211/1841763537.jpeg',
    lastReadAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    chapter: 45,
    page: 18,
    totalPages: 25,
    type: 'Scans',
  },
  {
    id: 'novels-extra-c78',
    title: 'The Novel\'s Extra',
    imageUrl: 'https://ext.same-assets.com/290343418/911444686.jpeg',
    lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    chapter: 78,
    page: 35,
    totalPages: 42,
    type: 'Scans',
  },
  {
    id: 'return-to-player-c23',
    title: 'Return to Player',
    imageUrl: 'https://ext.same-assets.com/844008929/3598158507.jpeg',
    lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    chapter: 23,
    page: 10,
    totalPages: 27,
    type: 'Scans',
  },
];

export const combinedHistory = [...mockWatchHistory, ...mockReadHistory].sort((a, b) => {
  const dateA = new Date('lastWatchedAt' in a ? a.lastWatchedAt : a.lastReadAt);
  const dateB = new Date('lastWatchedAt' in b ? b.lastWatchedAt : b.lastReadAt);
  return dateB.getTime() - dateA.getTime(); // Sort by most recent
});
