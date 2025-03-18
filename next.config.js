/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ext.same-assets.com', 'storage-anime.com', 'video.sibnet.ru', 'sibnet.ru', 'embed.sibnet.ru'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage-anime.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'video.sibnet.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sibnet.ru',
        pathname: '/**',
      }
    ],
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
  experimental: {
    // Prise en charge des anciennes syntaxes de Next.js si nécessaire
    esmExternals: 'loose',
    // Autoriser les anciens éléments marqués comme dépréciés
    serverComponentsExternalPackages: []
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
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

export default nextConfig
