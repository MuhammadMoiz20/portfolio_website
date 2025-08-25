import { NextResponse } from 'next/server';
import { Content } from '@/lib/content';

export async function GET() {
  const posts = Content.posts();
  const base = 'https://www.moizofficial.com';
  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${base}/blog/${p.slug}</guid>
      <description><![CDATA[${p.summary || ''}]]></description>
    </item>`
    )
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Muhammad Moiz — Blog</title>
      <link>${base}/blog</link>
      <description>Articles on software engineering and ML</description>
      ${items}
    </channel>
  </rss>`;
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}


