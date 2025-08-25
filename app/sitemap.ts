import type { MetadataRoute } from 'next';
import { Content } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.moizofficial.com';
  const now = new Date();

  const staticRoutes = ['', '/about', '/projects', '/blog', '/contact'].map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const postRoutes = Content.posts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const projectRoutes = Content.projects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: p.date ? new Date(p.date as any) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}

