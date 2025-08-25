import { PropsWithChildren } from 'react';

export function Prose({ children }: PropsWithChildren) {
  return <div className="prose dark:prose-invert">{children}</div>;
}


