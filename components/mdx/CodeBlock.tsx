'use client';

import { useState } from 'react';

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = typeof children === 'string' ? children : (document.getElementById('codeblock')?.textContent || '');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border bg-background/80 px-2 py-1 text-xs text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre id="codeblock" className="overflow-x-auto rounded-lg border p-4 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
}


