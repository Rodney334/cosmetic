/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    isrMemoryCacheSize: 0, // Désactive le cache ISR temporairement
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig