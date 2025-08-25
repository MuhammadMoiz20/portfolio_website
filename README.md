## SEO architecture

This project uses the Next.js app directory Metadata API for SEO.

- Defaults: `app/layout.tsx` (`metadata` export) sets title template, description, robots, Open Graph, Twitter, and sitewide JSON-LD (Person, Organization, WebSite with SearchAction). Preconnect for analytics is added when enabled.
- Per-page metadata:
  - About/Contact/Blog/Projects listing pages declare `metadata` in their files
  - Blog posts use `lib/seo.buildPostMetadata` and inject `BlogPosting` JSON-LD
  - Projects detail pages inject a `CreativeWork` JSON-LD
- Canonicals via `alternates.canonical` per page; no global canonical.

### Sitemaps and robots

- `app/robots.ts` allows crawling and points to the sitemap.
- `app/sitemap.ts` includes static routes and dynamic blog/project URLs; drafts are excluded via the content helpers.

### Open Graph images

- Dynamic OG images via `app/api/og/route.tsx`. When a page lacks a cover, it falls back to `/api/og?title=...`.

### Security headers and caching

- Set in `next.config.js` (`headers()`): CSP, Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy.
- Images are served with long-lived immutable caching.

### Core Web Vitals

- LCP hero image uses `priority` in `HeroSection`.
- Use `next/image` with explicit sizes/containers to avoid CLS.
- Third-party scripts are deferred and minimal.

### Regenerate sitemap

`app/sitemap.ts` is dynamic at request time; no manual step required.