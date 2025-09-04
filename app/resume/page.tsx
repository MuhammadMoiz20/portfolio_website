"use client";
import ActionBar from "@/components/resume/ActionBar";

export const dynamic = "force-static";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-7 last:mb-0 print:mb-4">
    <h2 className="mb-2 flex items-center gap-2 text-base font-semibold tracking-wide text-gray-800 dark:text-gray-200 print:text-[14px]">
      <span className="h-[14px] w-1.5 rounded bg-[hsl(var(--accent))] print:hidden" />
      {title}
    </h2>
    <div className="space-y-5 print:space-y-2 text-[13.5px] leading-relaxed print:text-[12px]">
      {children}
    </div>
  </section>
);

interface RoleProps {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  compact?: boolean;
}

const Role = ({ title, company, location, period, bullets }: RoleProps) => (
  <div className="relative rounded-md border border-gray-200/70 bg-white/40 p-4 shadow-sm dark:border-gray-800/70 dark:bg-gray-900/40 print:border-0 print:shadow-none">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="text-[14px] font-semibold leading-snug">
        {title} <span className="font-normal text-gray-400">|</span>{" "}
        <span className="text-[hsl(var(--accent))] dark:text-[hsl(var(--accent))]">
          {company}
        </span>
      </h3>
      <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 tabular-nums">
        {period}
      </span>
    </div>
    <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
      {location}
    </p>
    <ul className="mt-2 ml-4 list-disc space-y-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="text-[12.5px] leading-snug">
          {b}
        </li>
      ))}
    </ul>
  </div>
);

interface ProjectProps {
  name: string;
  stack?: string;
  bullets: string[];
  highlight?: boolean;
}

const ProjectCard = ({ name, stack, bullets, highlight }: ProjectProps) => (
  <div
    className={`relative rounded-md border p-4 transition dark:border-gray-800/70 print:border-0 print:shadow-none ${highlight ? "border-[hsl(var(--accent))]/60 bg-[hsl(var(--accent))]/5 shadow-sm dark:bg-[hsl(var(--accent))]/10" : "border-gray-200/70 bg-white/40 shadow-sm dark:bg-gray-900/40"}`}
  >
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <h3 className="text-[13.5px] font-semibold leading-snug">
        {name}
        {stack && (
          <span className="ml-1.5 font-normal text-[11.5px] text-gray-500 dark:text-gray-400">
            {stack}
          </span>
        )}
      </h3>
    </div>
    <ul className="mt-2 ml-4 list-disc space-y-1.5">
      {bullets.map((b, i) => (
        <li key={i} className="text-[12.5px] leading-snug">
          {b}
        </li>
      ))}
    </ul>
  </div>
);

interface SimpleItemProps {
  title: string;
  detail?: string;
  bullets?: string[];
}

const SimpleItem = ({ title, detail, bullets }: SimpleItemProps) => (
  <div className="rounded-md border border-gray-200/70 bg-white/40 p-3 shadow-sm dark:border-gray-800/70 dark:bg-gray-900/40 print:border-0 print:shadow-none">
    <div className="text-[13px] font-medium leading-snug text-gray-800 dark:text-gray-200">
      {title}
    </div>
    {detail && (
      <p className="mt-0.5 text-[11.5px] text-gray-500 dark:text-gray-400 leading-snug">
        {detail}
      </p>
    )}
    {bullets && bullets.length > 0 && (
      <ul className="mt-1.5 ml-4 list-disc space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="text-[12px] leading-snug">
            {b}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function ResumePage() {
  return (
    <div className="container-custom max-w-6xl pt-24 print:pt-4 print:pb-0">
      {/* Header */}
      <header className="mb-6 print:mb-2">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight print:text-2xl">
          Muhammad Moiz
        </h1>
        <p className="mt-2 max-w-4xl text-[13.5px] text-gray-600 dark:text-gray-400 print:text-[11px]">
          Hanover, NH · (603) 349-0579 ·{" "}
          <a href="mailto:moizcs059@gmail.com" className="underline">
            moizcs059@gmail.com
          </a>{" "}
          ·{" "}
          <a href="https://linkedin.com/in/moizofficial" className="underline">
            linkedin.com/in/moizofficial
          </a>{" "}
          ·{" "}
          <a href="https://github.com/MuhammadMoiz20" className="underline">
            github.com/MuhammadMoiz20
          </a>
        </p>
        <div className="mt-4 print:hidden">
          <ActionBar variant="structured" />
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-3 print:grid-cols-3 print:gap-4">
        <div className="lg:col-span-2 print:col-span-2 space-y-2">
          <Section title="Education">
            <div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-[13px] font-medium">
                  <h3 className="font-semibold leading-snug">
                    Dartmouth College — B.S. Computer Science & Mathematics
                    (GPA: 3.7)
                  </h3>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    Jun 2026
                  </span>
                </div>
                <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
                  4+1 M.S. admission (Start Fall 2026 · Conferral Jun 2027)
                </p>
                <p className="text-[11.5px]">
                  Selected Coursework: Operating Systems, Compilers, Advanced
                  Algorithms, Artificial Intelligence, Linear Algebra
                </p>
              </div>
            </div>
          </Section>

          <Section title="Experience">
            <Role
              title="Software Engineering Intern"
              company="Absanoh – E‑commerce Platform"
              location="Manchester, UK"
              period="Jun 2025 – Aug 2025"
              bullets={[
                "Built React checkout microservice with Stripe, raising purchase completion 18% for 12K+ monthly shoppers.",
                "Deployed AWS Lambda + DynamoDB with DLQs/logging, cutting critical errors 45% and sustaining 99.95% uptime.",
                "Automated Docker CI/CD (GitHub Actions), slashing deployments 30→4 min; enabled 6+ daily releases.",
                "Created Jest/PyTest suites with 90% coverage, reducing post-release bug incidents 30% across sprints.",
              ]}
            />
            <Role
              title="Software Developer"
              company="Dartmouth Rauner Special Collections Library"
              location="Hanover, NH"
              period="Sep 2024 – May 2025"
              bullets={[
                "Designed PostgreSQL FTS + Node/Flask indexing pipeline for 500K+ manuscripts; delivered <1s queries.",
                "Optimized query plans, indexes, caching; sustained millions of lookups under peak load with no degradation.",
                "Automated ingest & metadata workflows saving archivists 10+ hours weekly; doubled cataloging throughput.",
              ]}
            />
            <Role
              title="Software Engineering Intern"
              company="Muff Fashion LTD – Apparel E‑commerce"
              location="Manchester, UK"
              period="Jun–Aug 2023 & 2024"
              bullets={[
                "2024: Built AWS Lambda/S3 async image pipeline (DLQs, presigned URLs) cutting 60% manual asset work; LCP +28%.",
                "2023: Optimized REST endpoints + LRU caching keeping p95 API latency <200 ms for 20K+ MAUs.",
                "2023: Built Python/SQL → Tableau dashboards; reporting time -50%, accuracy +35%.",
                "2023: Added CloudWatch alarms reducing noisy pages 40% and improving ops reliability.",
              ]}
            />
          </Section>

          <Section title="Projects">
            <div className="space-y-4">
              <ProjectCard
                name="Tiny Search Engine"
                stack="C · Systems Design"
                highlight
                bullets={[
                  "Crawler + indexer + querier for 15K files (academic corpus).",
                  "Reduced naive 30s aggregate query time to 0.8s via custom tokenization & memory pooling.",
                  "Profiled I/O + allocation hot paths; implemented arena allocator + batched disk reads.",
                ]}
              />
              <ProjectCard
                name="ManToGo"
                stack="React · Node.js · Mapbox"
                highlight
                bullets={[
                  "Built payments, routing, rewards, and order lifecycle modules.",
                  "Onboarded 150+ users in 3 weeks; validated full transactional flow end‑to‑end.",
                ]}
              />
              <ProjectCard
                name="Nuggets"
                stack="UDP Multiplayer Game"
                highlight
                bullets={[
                  "Authoritative UDP server w/ client interpolation + entity reconciliation.",
                  "Maintained <100ms perceived sync for 4+ players; graceful disconnect + rejoin handling.",
                ]}
              />
            </div>
          </Section>

          <Section title="Additional Experience & Leadership">
            <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
              <SimpleItem
                title="Teaching Assistant – CS59 Programming Fundamentals"
                detail="Mentored 50+ students on C debugging; improved pass rate +12%."
              />
              <SimpleItem
                title="Project Assistant – Evergreen.AI Research"
                detail="Prototyped React/Python AI wellness platform for 100+ undergrads."
              />
            </div>
          </Section>

          <Section title="Certifications">
            <div className="flex flex-wrap gap-2 text-[11px] print:text-[10px]">
              {[
                "AWS Certified Cloud Practitioner (exp. 2025)",
                "CodePath Intermediate Technical Interview (2024)",
                "IBM Full Stack Developer",
                "Scrimba Frontend (JavaScript/React)",
              ].map((c) => (
                <span
                  key={c}
                  className="rounded border border-gray-300 bg-gray-50 px-2 py-0.5 dark:border-gray-700 dark:bg-gray-800 print:border-0 print:bg-transparent print:px-0"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-8 print:space-y-4 text-[13px] lg:pl-2">
          <Section title="Skills">
            <div className="flex flex-wrap gap-y-1 gap-x-3 text-[11.5px] print:text-[10px]">
              {[
                "Python",
                "Java",
                "C++",
                "TypeScript",
                "React",
                "Node.js",
                "Flask",
                "Docker",
                "Kubernetes",
                "Terraform",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "AWS S3",
                "DynamoDB",
                "Lambda",
                "ECS",
                "CloudFormation",
                "GCP",
                "CI/CD",
                "Microservices",
                "Event-driven",
                "TDD",
                "System Design",
              ].map((s) => (
                <span
                  key={s}
                  className="rounded bg-gray-100 px-2 py-0.5 text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:bg-transparent print:px-0 print:py-0 print:text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Summary">
            <p className="text-[12.5px] leading-snug">
              Full‑stack & cloud engineer focused on performant microservices,
              resilient data systems, and developer productivity. Blend of
              systems-level problem solving and product iteration.
            </p>
          </Section>
          <Section title="Last Updated">
            <p className="text-[11px]">September 2025</p>
          </Section>
        </aside>
      </div>
      <style jsx global>{`
        @media print {
          .btn-xs,
          .btn-outline,
          .btn-primary {
            display: none !important;
          }
          .markdown-resume a {
            text-decoration: none !important;
          }
          header {
            margin-bottom: 0.75rem !important;
          }
          ul {
            margin-top: 0.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
