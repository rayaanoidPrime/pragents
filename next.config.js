/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Important for Docker deployments
  
  // Configure image domains if you use Next.js Image component
  images: {
    domains: ['localhost'],
  },
  
  // Add any other Next.js configuration options you need
  experimental: {
    // Any experimental features you want to enable
  },
}

module.exports = nextConfig