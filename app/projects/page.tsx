import { Content } from '@/lib/content';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects | Muhammad Moiz',
  description: 'Selected work across full‑stack, systems, and data.',
  alternates: { canonical: 'https://www.moizofficial.com/projects' },
  openGraph: { type: 'website', url: 'https://www.moizofficial.com/projects', title: 'Projects' },
  twitter: { card: 'summary_large_image', creator: '@zahid_moiz' },
};

export default function ProjectsPage() {
  const projects = Content.projects();
  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-5xl font-bold">Projects</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Selected work across full‑stack, systems, and data.
          </p>
        </div>
      </section>
      <div className="container-custom grid gap-6 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.slug} className="group flex h-full flex-col justify-between rounded-lg border p-5 transition-colors hover:bg-muted">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {(p.tags || []).map((t) => (
                  <span key={t} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <a href={`/projects/${p.slug}`} className="block">
                <h3 className="mb-1 text-lg font-semibold group-hover:underline group-hover:underline-offset-4">{p.title}</h3>
                {p.summary && <p className="text-sm text-muted-foreground">{p.summary}</p>}
              </a>
            </div>
            <div className="mt-4 flex gap-4">
              {p.links?.repo && (
                <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline underline-offset-4">
                  Code
                </a>
              )}
              {p.links?.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline underline-offset-4">
                  Live
                </a>
              )}
              {p.links?.caseStudy && (
                <a href={p.links.caseStudy} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline underline-offset-4">
                  Case Study
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
