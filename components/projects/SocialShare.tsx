"use client";

import { useCallback, useMemo, useState } from "react";
import { FaLinkedin, FaRedditAlien, FaLink } from "react-icons/fa";
import XIcon from "@/components/common/XIcon";

interface SocialShareProps {
  title: string;
  url?: string;
  className?: string;
}

export default function SocialShare({
  title,
  url,
  className,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [url]);

  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // no-op
    }
  }, [shareUrl]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <a
          aria-label="Share on X/Twitter"
          className="btn-outline inline-flex items-center gap-2 text-sm"
          href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon size={16} /> X / Twitter
        </a>
        <a
          aria-label="Share on LinkedIn"
          className="btn-outline inline-flex items-center gap-2 text-sm"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          aria-label="Share on Reddit"
          className="btn-outline inline-flex items-center gap-2 text-sm"
          href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRedditAlien /> Reddit
        </a>
        <button
          aria-label="Copy link"
          onClick={handleCopy}
          className="btn-outline inline-flex items-center gap-2 text-sm"
        >
          <FaLink /> {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
