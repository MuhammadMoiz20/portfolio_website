/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextConfig = withMDX({
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Basic security hardening
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          // CSP: allow self, vercel analytics/og, plausible (optional)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*",
              "font-src 'self' data:",
              "connect-src 'self' https://plausible.io https://vitals.vercel-insights.com",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.moizofficial.com',
          },
        ],
        destination: 'https://www.moizofficial.com/:path*',
        permanent: true,
      },
      { source: '/og', destination: '/api/og', permanent: true },
      { source: '/rss', destination: '/rss.xml', permanent: true },
      { source: '/feed', destination: '/rss.xml', permanent: true },
    ];
  },
});

module.exports = nextConfig;
