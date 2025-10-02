export interface ProjectGalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  gallery?: ProjectGalleryImage[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Dispatch",
    description:
      "Developed a multi-tenant SaaS for automating e-commerce returns/logistics with rule-based workflows + carrier APIs. Implemented event-driven architecture (AWS SQS, DLQs, retries) for 99.9% uptime and strong tenant data isolation.",
    image: "/images/projects/news-scraper.jpg",
    tags: ["NestJS", "PostgreSQL RLS", "AWS", "Event-driven", "SaaS"],
    featured: true,
  },
  {
    id: 2,
    title: "ManToGo",
    description:
      "Built a campus-wide delivery platform integrated with Dining & Payroll, creating paid student jobs. Scaled to 450+ active users in 6 weeks; led design of payments, routing, and reward systems.",
    image: "/images/projects/mantogo.jpg",
    tags: ["React", "Node.js", "Mapbox", "Real-time", "SaaS"],
    featured: true,
    gallery: [
      {
        id: 1,
        src: "/images/projects/mantogo-1.jpg",
        alt: "Order tracking interface",
        caption: "Real-time order tracking UI",
      },
      {
        id: 2,
        src: "/images/projects/mantogo-2.jpg",
        alt: "Checkout screen",
        caption: "Integrated payment checkout",
      },
    ],
  },
  {
    id: 3,
    title: "Tiny Search Engine",
    description:
      "Implemented a crawler, indexer, and query engine for 15K+ pages with efficient memory & I/O management. Optimized tokenization and thread pooling, reducing average query latency from 30s → 0.8s.",
    image: "/images/projects/search-engine.jpg",
    tags: ["C", "Systems Design", "Memory Management", "Algorithms"],
    featured: true,
  },
  {
    id: 4,
    title: "Dartmouth News Scraper",
    description:
      "Python scraper with distributed processing, error handling, rate limiting, image processing, duplicate detection, and smart PDF generation. OOP modular design for scalable, fault-tolerant archiving.",
    image: "/images/projects/news-scraper.jpg",
    tags: ["Python", "Web Scraping", "PDF Generation", "OOP"],
    github: "https://github.com/MuhammadMoiz20/dartmouth-news-scraper",
    featured: false,
  },
  {
    id: 5,
    title: "Nuggets – Multiplayer Exploration Game",
    description:
      "UDP-based multiplayer exploration game with line-of-sight and slope mechanics, syncing player actions <100ms; Agile workflows and modular design reduced bug reports by 40%.",
    image: "/images/projects/nuggets-game.jpg",
    tags: ["C", "UDP", "Game Development", "Agile"],
    featured: false,
  },
  {
    id: 6,
    title: "ResumeAI",
    description:
      "Intelligent resume optimization system; Flask/React full-stack app with reusable components, consistent design system, and accessible UI.",
    image: "/images/projects/resume-ai.jpg",
    tags: ["React", "Flask", "UI Components", "Accessibility"],
    featured: false,
  },
];
