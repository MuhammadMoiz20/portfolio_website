export interface BlogAuthor {
  name: string;
  avatar?: string;
  title?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  slug: string;
  date: string;
  author?: BlogAuthor;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 6,
    title:
      "Meet Muhammad Moiz: A Journey Through Tech, Innovation, and Ambition",
    excerpt:
      "An introduction to Muhammad Moiz — a Dartmouth student, entrepreneur, and software engineer passionate about building the future through code, AI, and creativity.",
    content: ``,
    image: "/images/blog/moiz-intro.jpg",
    category: "Personal",
    slug: "meet-muhammad-moiz",
    date: "2025-04-26",
    author: {
      name: "Muhammad Moiz",
      avatar: "/images/blog/moiz-avatar.jpg", // Update path if you have an avatar image
      title: "Student, Entrepreneur & Software Engineer",
    },
    tags: [
      "Software Engineering",
      "Entrepreneurship",
      "AI",
      "Dartmouth",
      "Technology",
      "Personal Growth",
    ],
  },
];
