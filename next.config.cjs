/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ext.same-assets.com', 'storage-anime.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        pathname: '/**',
      },
    ],
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
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig 