/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode to avoid calling useEffect twice in development.
  // The uploader and downloader are both using useEffect to listen for peerjs events
  // which causes the connection to be created twice.
  reactStrictMode: false,
  // Don't use standalone output on Vercel - it handles Next.js automatically
  // Only use standalone for Docker deployments
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  // Ensure service worker and stream.html are accessible
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/stream.html',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig