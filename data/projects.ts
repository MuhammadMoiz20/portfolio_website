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
    title: "ManToGo",
    description:
      "Dartmouth-backed delivery platform with Dining/Payroll; led full-stack dev of payments, routing, and rewards; scaled to 450+ users in 6 weeks.",
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
    id: 2,
    title: "Dartmouth News Scraper",
    description:
      "Python scraper with distributed processing, error handling, rate limiting, image processing, duplicate detection, and smart PDF generation. OOP modular design for scalable, fault-tolerant archiving.",
    image: "/images/projects/news-scraper.jpg",
    tags: ["Python", "Web Scraping", "PDF Generation", "OOP"],
    github: "https://github.com/MuhammadMoiz20/dartmouth-news-scraper",
    featured: true,
  },
  {
    id: 3,
    title: "Nuggets – Multiplayer Exploration Game",
    description:
      "UDP-based multiplayer exploration game with line-of-sight and slope mechanics, syncing player actions <100ms; Agile workflows and modular design reduced bug reports by 40%.",
    image: "/images/projects/nuggets-game.jpg",
    tags: ["C", "UDP", "Game Development", "Agile"],
    featured: true,
  },
  {
    id: 4,
    title: "Tiny Search Engine",
    description:
      "Crawler, Indexer & Querier in C cutting query time from 25s to 1s with Valgrind memory checks and defensive coding; modular libraries enable rapid new data source integration.",
    image: "/images/projects/search-engine.jpg",
    tags: ["C", "Data Structures", "Memory Management", "Algorithms"],
    featured: false,
  },
  {
    id: 5,
    title: "ResumeAI",
    description:
      "Intelligent resume optimization system; Flask/React full-stack app with reusable components, consistent design system, and accessible UI.",
    image: "/images/projects/resume-ai.jpg",
    tags: ["React", "Flask", "UI Components", "Accessibility"],
    featured: false,
  },
  {
    id: 6,
    title: "Dispatch",
    description:
      "Multi-tenant SaaS automating logistics/returns with real-time sync, carrier APIs, and rule-based workflows; event-driven, fault-tolerant ops on AWS.",
    image: "/images/projects/news-scraper.jpg",
    tags: ["NestJS", "PostgreSQL RLS", "AWS", "Event-driven", "SaaS"],
    featured: true,
  },
];
