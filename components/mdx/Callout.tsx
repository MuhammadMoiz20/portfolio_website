'use client';

import { PropsWithChildren } from 'react';

export function Callout({ children }: PropsWithChildren) {
  return (
    <div className="my-4 rounded-lg border bg-muted/40 p-4 text-sm">
      {children}
    </div>
  );
}


