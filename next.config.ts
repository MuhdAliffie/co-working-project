import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow all external images (suitable for dev/prototype; restrict in production)
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
}

export default nextConfig
