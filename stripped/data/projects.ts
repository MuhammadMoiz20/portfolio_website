
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string; 
  featured: boolean;
}


export const projects: Project[] = [
  {
    id: 1,
    title: 'ManToGo',
    description: 'A full-stack food delivery platform for Dartmouth Campus with real-time tracking, payment integration, and a modular frontend architecture with reusable components.',
    image: '/images/projects/mantogo.jpg',
    tags: ['React', 'Mapbox', 'PayPal API', 'UI/UX Design'],
    featured: true,
  },
  {
    id: 2,
    title: 'Dartmouth News Scraper',
    description: 'A Python-based web scraper with distributed processing for archiving Dartmouth News articles, featuring fault-tolerant design and innovative algorithms for data mining efficiency.',
    image: '/images/projects/news-scraper.jpg',
    tags: ['Python', 'Web Scraping', 'PDF Generation', 'OOP'],
    github: 'https://github.com/MuhammadMoiz20/dartmouth-news-scraper',
    featured: true,
  },
  {
    id: 3,
    title: 'Nuggets: Multiplayer Game',
    description: 'A UDP-based multiplayer exploration game with line-of-sight and slope analysis algorithms that synchronize player actions under 100ms, increasing daily active players by 20%.',
    image: '/images/projects/nuggets-game.jpg',
    tags: ['C', 'UDP', 'Game Development', 'Agile'],
    featured: true,
  },
  {
    id: 4,
    title: 'Tiny Search Engine',
    description: 'A search engine with Crawler, Indexer, and Querier components that lowered average query response time from 25s to 1s, using Valgrind analysis and defensive programming.',
    image: '/images/projects/search-engine.jpg',
    tags: ['C', 'Data Structures', 'Memory Management', 'Algorithms'],
    featured: false,
  },
  {
    id: 5,
    title: 'ResumeAI',
    description: 'An intelligent resume optimization system with a full-stack application using Flask/React, featuring component-based architecture and an intuitive, accessible user interface.',
    image: '/images/projects/resume-ai.jpg',
    tags: ['React', 'Flask', 'UI Components', 'Accessibility'],
    featured: false,
  },
];
