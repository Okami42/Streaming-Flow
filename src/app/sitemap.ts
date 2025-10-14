import { MetadataRoute } from 'next'
import { animes } from '@/lib/catalogue-utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://okastream.fr'
  
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/anime`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/series`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/series/catalogue`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/series/search`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/planning`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/series/planning`,
      lastModified: new Date(),
      priority: 0.6,
    }
  ]

  // Pages d'animés dynamiques
  const animePages: MetadataRoute.Sitemap = animes.map((anime) => ({
    url: `${baseUrl}/catalogue/${anime.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }))

  return [...staticPages, ...animePages]
}


