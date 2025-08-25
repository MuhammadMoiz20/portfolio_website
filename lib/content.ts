import { getAllContent, readContentFile, getAllSlugs } from './mdx';

export const Content = {
  posts: () => getAllContent('posts'),
  projects: () => getAllContent('projects'),
  post: (slug: string) => readContentFile('posts', slug),
  project: (slug: string) => readContentFile('projects', slug),
  slugs: {
    posts: () => getAllSlugs('posts'),
    projects: () => getAllSlugs('projects'),
  },
};


