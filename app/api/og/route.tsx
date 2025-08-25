import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Muhammad Moiz';
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          background: '#0b1220',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.8, marginTop: 8 }}>Software Engineer</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}


