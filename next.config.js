/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.ytimg.com',
      'i0.wp.com',
      'static1.srcdn.com',
      'static1.colliderimages.com',
      'via.placeholder.com',
      'image.tmdb.org',
      'media.themoviedb.org',
      'fr.web.img4.acsta.net',
      'fr.web.img5.acsta.net',
      'fr.web.img6.acsta.net',
      'www.notebookcheck.biz',
      'media.discordapp.net'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: '/api/proxy/:path*',
      },
    ]
  }
}

export default nextConfig

