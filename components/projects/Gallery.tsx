"use client";

import React, { useMemo } from "react";
import ImageGallery from "@/components/projects/ImageGallery";

type ImageItem = { src: string; alt?: string };
type VideoItem = { src: string; poster?: string; title?: string };

interface GalleryProps {
  images?: ImageItem[];
  videos?: VideoItem[];
  className?: string;
}

export default function Gallery({
  images = [],
  videos = [],
  className,
}: GalleryProps) {
  const galleryImages = useMemo(
    () =>
      (images || []).map((img, idx) => ({
        id: idx,
        src: img.src,
        alt: img.alt || "Project image",
      })),
    [images],
  );

  const hasContent = galleryImages.length > 0 || (videos && videos.length > 0);
  if (!hasContent) return null;

  return (
    <section className={className}>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))/20] bg-[hsl(var(--accent))/10] px-3 py-1 text-xs font-medium text-[hsl(var(--accent))]">
        Gallery
      </div>
      {/* Images with lightbox */}
      {galleryImages.length > 0 && (
        <div className="mb-4">
          <ImageGallery images={galleryImages} columns={2} />
        </div>
      )}
      {/* Videos */}
      {videos && videos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {videos.map((v, i) => (
            <div
              key={`vid-${i}`}
              className="overflow-hidden rounded-lg border border-[hsl(var(--border))]"
            >
              {isEmbed(v.src) ? (
                <div className="relative aspect-video w-full">
                  <iframe
                    className="absolute left-0 top-0 h-full w-full"
                    src={toEmbedSrc(v.src)}
                    title={v.title || "Project video"}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <video
                  className="h-full w-full"
                  controls
                  preload="metadata"
                  poster={v.poster}
                >
                  <source src={v.src} />
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function isEmbed(src: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
}

function toEmbedSrc(src: string) {
  // Normalize YouTube URLs into embed form
  const yt = src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  return src;
}
