import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import './styles.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Moiz | Dartmouth Student',
  description: 'Personal portfolio website showcasing projects and skills of a Dartmouth Junior',
  keywords: ['Muhammad Moiz', 'Moiz' , 'Muhammad', 'portfolio', 'web development', 'Dartmouth', 'student', 'junior', 'projects'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="any" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/logo.png" />
        <meta name="theme-color" content="#111827" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Muhammad Moiz" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://www.moizofficial.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Muhammad Moiz" />
        <meta property="og:url" content="https://www.moizofficial.com/" />
        <meta property="og:image" content="/images/og-default.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zahid_moiz" />
        <meta name="twitter:creator" content="@zahid_moiz" />
        <meta name="twitter:image" content="/images/og-default.jpg" />
        <meta name="google-site-verification" content="GA_SEARCH_CONSOLE_PLACEHOLDER" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID_PLACEHOLDER"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA_MEASUREMENT_ID_PLACEHOLDER');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Muhammad Moiz',
          url: 'https://www.moizofficial.com/',
          sameAs: [
            'https://x.com/zahid_moiz',
            'https://www.linkedin.com/in/moizofficial/',
            'https://github.com/MuhammadMoiz20'
          ],
          jobTitle: 'Junior at Dartmouth College',
          description: 'Junior at Dartmouth College | Computer Science | System Developer | Seeking Software Engineering Roles | Infrastructure, Systems Design, React',
          image: '/logo.png',
        }) }} />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
