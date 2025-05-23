export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  slug: string;
  date: string;
  author?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 6,
    title: 'Meet Muhammad Moiz: A Journey Through Tech, Innovation, and Ambition',
    excerpt: 'An introduction to Muhammad Moiz — a Dartmouth student, entrepreneur, and software engineer passionate about building the future through code, AI, and creativity.',
    content: `
  Muhammad Moiz is a junior at Dartmouth College with a passion for software engineering, entrepreneurship, and the future of technology. With a strong foundation in computer science, Moiz has already made his mark as the CEO and Co-Founder of Maves Apparel, a fashion platform reaching over 30,000 monthly visitors globally.
  
  Beyond business, Moiz’s technical journey spans a wide range of projects — from building intelligent resume optimization systems to crafting multiplayer exploration games and pioneering AI-driven platforms. His academic pursuits are matched by real-world impact, blending innovation, leadership, and a relentless drive for growth.
  
  Currently focused on mastering full-stack development, AI systems, and systems programming, Moiz strives to bridge the gap between ambitious ideas and scalable, impactful technology. His work reflects a commitment to high-quality engineering, creative problem-solving, and empowering others through tech.
  
  When he's not coding or scaling businesses, Moiz enjoys exploring new technologies, contributing to open-source projects, and sharing knowledge with the broader developer community. Join him on a journey of learning, building, and pushing the boundaries of what’s possible.`,
    image: '/images/blog/moiz-intro.jpg',
    category: 'Personal',
    slug: 'meet-muhammad-moiz',
    date: '2025-04-26',
    author: 'Muhammad Moiz',
    tags: ['Software Engineering', 'Entrepreneurship', 'AI', 'Dartmouth', 'Technology', 'Personal Growth'],
  },
];
