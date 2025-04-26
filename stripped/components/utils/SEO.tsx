'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  jsonLd?: object;
}

export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = '/logo.png',
  keywords = [],
  jsonLd,
}: SEOProps) {
  const siteName = 'Muhammad Moiz';
  const fullTitle = `${title} | ${siteName}`;
  const domain = 'https://www.moizofficial.com';
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${domain}${ogImage}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl || domain} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Muhammad Moiz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@zahid_moiz" />
      <meta name="twitter:creator" content="@zahid_moiz" />
      <meta name="twitter:image" content={imageUrl} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  );
}

