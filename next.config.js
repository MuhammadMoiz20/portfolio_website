/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'], // Add any image domains you need to load from
  },
  swcMinify: true,
  // Add additional configuration as needed
};

module.exports = nextConfig;
