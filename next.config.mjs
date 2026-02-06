/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not ignore TypeScript build errors — surface them during CI/builds
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
