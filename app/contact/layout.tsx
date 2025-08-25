import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me | Muhammad Moiz Portfolio',
  description:
    'Get in touch with Muhammad Moiz for job opportunities, collaborations, or just to say hello!',
  alternates: { canonical: 'https://www.moizofficial.com/contact' },
  openGraph: {
    type: 'website',
    url: 'https://www.moizofficial.com/contact',
    title: 'Contact Muhammad Moiz',
    description: 'Job opportunities, collaborations, or just say hello.',
  },
  twitter: { card: 'summary_large_image', creator: '@zahid_moiz' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}


