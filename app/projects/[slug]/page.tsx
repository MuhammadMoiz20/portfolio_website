import { Content } from "@/lib/content";
import { compileContentMDX } from "@/lib/mdx";
import ProjectLog from "@/components/projects/ProjectLog";
import SocialShare from "@/components/projects/SocialShare";
import GitHubButton from "@/components/projects/GitHubButton";
import { getProjectLog } from "@/data/projectLogs";
import Gallery from "@/components/projects/Gallery";
import type { Metadata } from "next";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  const metas = Content.projects();
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = Content.project(slug);
  const base = "https://www.moizofficial.com";
  const galleryFirst = (meta as any)?.gallery?.images?.[0];
  const galleryFirstSrc =
    typeof galleryFirst === "string" ? galleryFirst : galleryFirst?.src;
  // Normalize cover to absolute URL; avoid Next image optimizer for OG
  const rawPath = (
    meta.cover ??
    galleryFirstSrc ??
    "/images/profile.jpg"
  ).trim();
  const normalizedPath = rawPath.startsWith("http")
    ? rawPath
    : rawPath.startsWith("/")
      ? `${base}${rawPath}`
      : `${base}/${rawPath}`;
  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: `https://www.moizofficial.com/projects/${meta.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.moizofficial.com/projects/${meta.slug}`,
      title: meta.title,
      description: meta.summary,
      images: [
        { url: normalizedPath, width: 1200, height: 630, alt: meta.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@zahid_moiz",
      images: [normalizedPath],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { content, meta } = Content.project(slug);
  const mdx = await compileContentMDX(content);
  const logEntries = getProjectLog(slug);
  const absoluteUrl = `https://www.moizofficial.com/projects/${meta.slug}`;
  // Normalize gallery data (optional)
  const images = (meta as any)?.gallery?.images?.map((it: any) =>
    typeof it === "string" ? { src: it } : it,
  ) as { src: string; alt?: string }[] | undefined;
  const videos = (meta as any)?.gallery?.videos?.map((it: any) =>
    typeof it === "string" ? { src: it } : it,
  ) as { src: string; poster?: string; title?: string }[] | undefined;
  const galleryFirst = images?.[0]?.src;
  const displayCover = meta.cover ?? galleryFirst;
  return (
    <article className="pt-20">
      <div className="container-custom max-w-6xl px-4 sm:px-6">
        {/* Page header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))/20] bg-[hsl(var(--accent))/10] px-3 py-1 text-xs font-medium text-[hsl(var(--accent))]">
            Project
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {meta.title}
          </h1>
          {meta.summary && (
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {meta.summary}
            </p>
          )}
          {meta.tags && meta.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[hsl(var(--accent))/25] bg-[hsl(var(--accent))/8] px-2.5 py-1 text-xs font-medium text-[hsl(var(--accent))]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: meta.title,
              url: `https://www.moizofficial.com/projects/${meta.slug}`,
              image: meta.cover
                ? [`https://www.moizofficial.com${meta.cover}`]
                : undefined,
              description: meta.summary,
            }),
          }}
        />

        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Sidebar moved below the cover on mobile (order-2) and remains sidebar on lg */}
          <aside className="order-2 lg:order-2 lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Project Info */}
              <div className="card rounded-xl p-6">
                <h2 className="mb-4 text-lg font-semibold">Project Info</h2>
                <dl className="space-y-3 text-sm">
                  {meta.date && (
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Date</dt>
                      <dd className="font-medium">{meta.date}</dd>
                    </div>
                  )}
                  {typeof meta.readingTimeMinutes === "number" && (
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Read time</dt>
                      <dd className="font-medium">
                        {meta.readingTimeMinutes} min
                      </dd>
                    </div>
                  )}
                </dl>
                {meta.tags && meta.tags.length > 0 && (
                  <div className="mt-5">
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {meta.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[hsl(var(--accent))/25] bg-[hsl(var(--accent))/8] px-2.5 py-0.5 text-xs font-medium text-[hsl(var(--accent))]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Links & Share */}
              <div className="card rounded-xl p-6">
                <h2 className="mb-4 text-lg font-semibold">Links</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <GitHubButton repoUrl={meta.links?.repo} />
                  {meta.links?.live && (
                    <a
                      href={meta.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      Live
                    </a>
                  )}
                  {meta.links?.backend && (
                    <a
                      href={meta.links.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2"
                      aria-label="View Backend repository on GitHub"
                    >
                      Backend (GitHub)
                    </a>
                  )}
                  {meta.links?.app && (
                    <a
                      href={meta.links.app}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2"
                      aria-label="View App repository on GitHub"
                    >
                      App (GitHub)
                    </a>
                  )}
                  {meta.links?.caseStudy && (
                    <a
                      href={meta.links.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline inline-flex items-center gap-2"
                    >
                      Case Study
                    </a>
                  )}
                </div>
                <div className="mt-5 border-t pt-5">
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Share
                  </h3>
                  <SocialShare title={meta.title} url={absoluteUrl} />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="order-1 lg:order-1 lg:col-span-2 space-y-8">
            {/* Cover image */}
            {displayCover && (
              <figure className="card overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayCover}
                  alt={meta.title}
                  className="h-full w-full object-cover"
                />
              </figure>
            )}

            {/* Gallery */}
            {images?.length || videos?.length ? (
              <div className="card rounded-xl p-4 sm:p-5">
                <Gallery images={images} videos={videos} />
              </div>
            ) : null}

            {/* Content */}
            <div className="card rounded-xl p-6">
              <div className="prose prose-beautified max-w-none">{mdx}</div>
            </div>

            {/* Log */}
            <div className="card rounded-xl p-6">
              <ProjectLog entries={logEntries} />
            </div>
          </div>

          {/* Duplicate sidebar removed; single sidebar is rendered above on mobile */}
        </div>
      </div>
    </article>
  );
}
