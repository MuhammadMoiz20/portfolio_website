import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Muhammad Moiz | Software Engineer (Full‑stack, AI/ML, Cloud)',
  description:
    'Learn more about Muhammad Moiz, a results‑oriented Software Engineer with 3+ years in full‑stack, AI/ML, and cloud. Discover background, education, skills, and journey.',
  alternates: { canonical: 'https://www.moizofficial.com/about' },
  openGraph: {
    type: 'profile',
    title: 'About Muhammad Moiz',
    description: 'Background, education, skills, and journey.',
    url: 'https://www.moizofficial.com/about',
  },
  twitter: { card: 'summary_large_image', creator: '@zahid_moiz' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}


