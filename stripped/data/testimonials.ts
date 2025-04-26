export interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "Working with this talented Dartmouth Junior was a fantastic experience. Their technical skills, creativity, and attention to detail resulted in a website that exceeded our expectations.",
    author: "Dr. Sarah Johnson",
    position: "Professor of Computer Science, Dartmouth College",
    avatar: "/images/testimonials/avatar1.jpg",
  },
  {
    id: 2,
    content: "As a project partner, I was consistently impressed by their problem-solving abilities and innovative approach. They have a remarkable ability to translate complex ideas into elegant technical solutions.",
    author: "Michael Chen",
    position: "Tech Lead at InnovateTech",
    avatar: "/images/testimonials/avatar2.jpg",
  },
  {
    id: 3,
    content: "I had the pleasure of mentoring this student during their internship, and I was blown away by their quick learning and adaptability. They brought fresh perspectives and valuable contributions to our team.",
    author: "Emily Rodriguez",
    position: "Senior Developer at WebSolutions Inc.",
    avatar: "/images/testimonials/avatar3.jpg",
  },
];
