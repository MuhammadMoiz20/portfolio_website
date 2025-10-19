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
      "Built multi-tenant SaaS for e-commerce returns/logistics with rule-based workflows and carrier APIs. Designed event-driven architecture (AWS SQS, DLQs, retries) achieving 99.9% uptime and strong data isolation.",
    image: "/images/projects/news-scraper.jpg",
    tags: ["NestJS", "PostgreSQL RLS", "AWS", "Event-driven", "SaaS"],
    featured: true,
  },
  {
    id: 2,
    title: "ManToGo",
    description:
      "Launched campus delivery platform with secure WebSocket chat, payments, and routing. Scaled to 450+ users in 6 weeks, integrating Dining & Payroll systems to support student jobs.",
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
      "Built crawler, indexer, and query engine for 15K+ pages with efficient memory and I/O management. Optimized tokenization and thread pooling, reducing query latency from 30s → 0.8s.",
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
  {
    id: 7,
    title: "Autod — AI Web App Generator",
    description:
      "Developed AI-driven generator translating natural-language prompts into full-stack production web apps. Architected ECS + RDS + CloudFront stack with containerized CI/CD, maintaining 99.9% uptime.",
    image: "/images/projects/autod.jpg",
    tags: [
      "Next.js",
      "React",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "AWS",
      "Clerk",
      "Inngest",
    ],
    featured: true,
  },
  {
    id: 8,
    title: "Full-Stack Social Platform",
    description:
      "Built responsive, real-time social app with JWT authentication and optimized caching. Reduced page load times by 35% via query optimization and lazy loading.",
    image: "/images/projects/social-platform.jpg",
    tags: ["Next.js", "React", "Prisma", "MongoDB", "NextAuth"],
    featured: false,
  },
];
