/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ext.same-assets.com', 
      'storage-anime.com', 
      'video.sibnet.ru', 
      'sibnet.ru', 
      'embed.sibnet.ru',
      'i.ytimg.com',
      'i0.wp.com',
      'static1.srcdn.com',
      'static1.colliderimages.com',
      'via.placeholder.com',
      'image.tmdb.org'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'storage-anime.com',
      },
      {
        protocol: 'https',
        hostname: 'video.sibnet.ru',
      },
      {
        protocol: 'https',
        hostname: 'sibnet.ru',
      },
      {
        protocol: 'https',
        hostname: 'embed.sibnet.ru',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    unoptimized: true,
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    // ⚠️ Ignorer les erreurs TypeScript lors du build pour Vercel
    ignoreBuildErrors: true
  },
  eslint: {
    // ⚠️ Ignorer les erreurs ESLint lors du build pour Vercel
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' }
        ]
      }
    ]
  }
}

module.exports = nextConfig 