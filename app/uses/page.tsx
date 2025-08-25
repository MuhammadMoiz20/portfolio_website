export const dynamic = 'force-static';

export default function UsesPage() {
  return (
    <div className="container-custom pt-20">
      <h1 className="mb-4 text-5xl font-bold">Uses</h1>
      <p className="text-muted-foreground">Gear and software I use.</p>
      <ul className="mt-6 list-inside list-disc text-sm">
        <li>Editor: VS Code + Cursor, JetBrains Mono</li>
        <li>Terminal: Windows Terminal</li>
        <li>Design: Figma</li>
      </ul>
    </div>
  );
}


