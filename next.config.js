/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
}

module.exports = nextConfig
