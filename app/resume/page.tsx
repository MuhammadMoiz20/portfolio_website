export const dynamic = 'force-static';

export default function ResumePage() {
  return (
    <div className="container-custom pt-16 print:pt-0">
      <header className="mb-8 flex items-center justify-between print:mb-2">
        <h1 className="text-3xl font-bold">Muhammad Moiz</h1>
        <a href="/resume.pdf" className="btn-outline print:hidden">Download PDF</a>
      </header>
      <section className="grid gap-6 print:gap-2 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4 print:space-y-2">
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Software Engineering Intern — Absanoh</h3>
            <p className="text-sm text-muted-foreground">Jun 2025 – Present</p>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>Checkout flows (+15% completion), AWS Lambda + DynamoDB with retries/DLQs.</li>
              <li>CI/CD with Docker + GitHub Actions (30 → &lt;5 min deploys).</li>
            </ul>
          </div>
        </div>
        <aside className="space-y-4 print:space-y-2">
          <h2 className="text-xl font-semibold">Info</h2>
          <ul className="text-sm text-muted-foreground">
            <li>Hanover, NH</li>
            <li>github.com/MuhammadMoiz20</li>
            <li>linkedin.com/in/moizofficial</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}


