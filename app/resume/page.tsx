"use client";

import ActionBar from "@/components/resume/ActionBar";
import { Mail, Github, Linkedin } from "lucide-react";

export const dynamic = "force-static";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-6 last:mb-0 print:mb-4 resume-section">
    <h2 className="mb-2 border-b pb-1 text-lg font-semibold tracking-wide print:mb-1 print:text-base text-gray-900 dark:text-white">
      {title}
    </h2>
    <div className="space-y-4 print:space-y-2 text-sm leading-relaxed print:text-[13px]">
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
  <div className="role-card">
    <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm font-medium">
      <h3 className="font-semibold">
        {title} |{" "}
        <span className="text-primary-600 dark:text-primary-400">
          {company}
        </span>
      </h3>
      <span className="text-[12px] tabular-nums text-gray-500 dark:text-gray-400">
        {period}
      </span>
    </div>
    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
      {location}
    </p>
    <ul className="mt-1 list-disc pl-5 space-y-1">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  </div>
);

export default function ResumePage() {
  return (
    <>
      <ActionBar active="structured" />
      <div className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 opacity-60 blur-3xl print:hidden"
        >
          <div className="mx-auto h-56 w-[90%] max-w-5xl rounded-full bg-gradient-radial from-accent/25 via-sky-300/30 to-transparent dark:from-accent/20 dark:via-indigo-500/10" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-[35%] -z-10 h-64 w-64 rounded-full bg-gradient-radial from-accent/20 via-sky-200/30 to-transparent blur-3xl dark:from-accent/15 dark:via-sky-900/20 print:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-[10%] -z-10 h-72 w-72 rounded-full bg-gradient-radial from-purple-300/20 via-accent/10 to-transparent blur-3xl dark:from-purple-900/20 dark:via-accent/10 print:hidden"
        />

        <div className="container-custom pt-24 print:pt-4 print:pb-0 px-4 sm:px-6 break-words">
          <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-900/60 print:shadow-none print:border-0 print:bg-transparent prose prose-wide resume-prose motion-safe:animate-fade-in">
            {/* Header */}
            <header className="mb-6 flex flex-col items-start gap-3 print:mb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight print:text-2xl bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                  Muhammad Moiz
                </h1>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400 print:text-[12px]">
                  <span className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-white/60 px-2.5 py-1 backdrop-blur dark:bg-gray-800/50 print:bg-transparent print:border-0">
                    Hanover, NH
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-white/60 px-2.5 py-1 backdrop-blur dark:bg-gray-800/50 print:bg-transparent print:border-0">
                    (603) 349-0579
                  </span>
                  <a
                    href="mailto:moizcs059@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-white/60 px-2.5 py-1 text-foreground transition hover:border-accent/50 hover:bg-white/80 dark:bg-gray-800/50 print:bg-transparent print:border-0"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    <span>moizcs059@gmail.com</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/moizofficial"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-white/60 px-2.5 py-1 text-foreground transition hover:border-accent/50 hover:bg-white/80 dark:bg-gray-800/50 print:bg-transparent print:border-0"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden />
                    <span>linkedin.com/in/moizofficial</span>
                  </a>
                  <a
                    href="https://github.com/MuhammadMoiz20"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-white/60 px-2.5 py-1 text-foreground transition hover:border-accent/50 hover:bg-white/80 dark:bg-gray-800/50 print:bg-transparent print:border-0"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    <span>github.com/MuhammadMoiz20</span>
                  </a>
                </div>
              </div>
              <div className="hidden gap-2 print:hidden md:flex">
                {/* Keep space balanced on desktop; actions live in ActionBar */}
              </div>
            </header>

            <div className="grid gap-10 md:grid-cols-3 print:grid-cols-3 print:gap-6 motion-safe:animate-slide-up">
              {/* Education block - appears first on mobile, left column on md */}
              <div className="order-1 md:order-1 md:col-span-2">
                <Section title="Education">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-sm font-medium">
                      <h3 className="font-semibold">
                        Dartmouth College – B.S. in Computer Science &
                        Engineering, GPA 3.7
                      </h3>
                      <span className="text-[12px] text-gray-500 dark:text-gray-400">
                        Expected Jun 2026
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Selected Coursework: Full Stack (Citation), Operating
                      Systems, Compilers, Advanced Algorithms, Artificial
                      Intelligence
                    </p>
                    {/* Honors moved to the aside 'Honors' section */}
                  </div>
                </Section>
              </div>

              {/* Aside - Honors / Leadership / Skills. Appears after Education on mobile, right column on md */}
              <aside className="order-2 md:order-3 print:order-none space-y-8 print:space-y-4 text-sm">
                <Section title="Honors">
                  <div>
                    <p className="inline-flex items-center rounded-md border border-border/60 bg-yellow-50/80 px-2.5 py-1 text-sm font-medium dark:bg-yellow-900/20">
                      CS 52 Full Stack Development — Faculty citation for top
                      performance in class of 60
                    </p>
                  </div>
                </Section>

                <Section title="Leadership">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>President, Dartmouth Alpha Lambda Mu</li>
                    <li>President, Roots IVY Alum CS Society</li>
                    <li>Founder, Young in Tech Pakistan</li>
                  </ul>
                </Section>

                <Section title="Skills">
                  <ul className="grid grid-cols-1 gap-2 text-xs print:text-[11px]">
                    {[
                      "Languages: Python, Java, JavaScript/TypeScript, C/C++",
                      "Frameworks: React, Node.js, Flask",
                      "Cloud & DevOps: AWS, Docker, GitHub Actions, Kubernetes",
                      "Databases & Storage: PostgreSQL, MongoDB, Redis, AWS S3, DynamoDB",
                      "Notable Certifications: AWS Cloud Practitioner (pending), IBM Full Stack Dev, CodePath Technical Interview Prep",
                    ].map((s) => (
                      <li
                        key={s}
                        className="inline-flex items-start rounded-md border border-border/60 bg-white/60 px-2 py-1 text-left backdrop-blur transition hover:border-accent/40 hover:bg-white/80 dark:border-gray-800 dark:bg-gray-800/60"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Section>
                {/* Last Updated removed from aside; single instance kept at page bottom */}
              </aside>

              {/* Rest of main content - appears after aside on mobile, left column on md */}
              <div className="order-3 md:order-2 md:col-span-2">
                <Section title="Relevant Experience">
                  <Role
                    title="Software Engineering Intern"
                    company="Muff Garments LTD – apparel e-commerce"
                    location="Manchester, UK"
                    period="Jun 2025 – Aug 2025"
                    bullets={[
                      "Boosted checkout conversion 32%→50% by rebuilding React/Stripe payment flows with idempotency keys.",
                      "Achieved 99.95% uptime and cut error rates 45% using AWS Lambda + DynamoDB with DLQs/retries.",
                      "Reduced deployment time 30m→4m (85%) by implementing Docker + CI/CD enabling 6–8 daily releases.",
                      "Decreased post-release bugs 30% with 90% test coverage (Jest/PyTest) and rigorous code reviews.",
                    ]}
                  />
                  <Role
                    title="Software Developer"
                    company="Rauner Special Collections (Backed & Published by Dartmouth)"
                    location="Hanover, NH"
                    period="Sep 2024 – May 2025"
                    bullets={[
                      "Cut archival processing time 90% (2h→<20m) across 60+ institutions via parallelized automation pipelines.",
                      "Eliminated 80% manual curator work by building resilient Python/Selenium scrapers for 10K+ videos monthly.",
                      "Maintained 99.8% uptime for distributed scrapers ingesting 1K+ news articles monthly with error recovery.",
                      "Optimized storage 25% and boosted processing speed 40% through image deduplication/classification.",
                    ]}
                  />
                  <Role
                    title="Software Engineering Intern"
                    company="Muff Garments LTD – apparel e-commerce"
                    location="Manchester, UK"
                    period="Jun 2023 – Aug 2023"
                    bullets={[
                      "Improved LCP 28% by automating asset pipelines on AWS Lambda + S3 with compression and optimized delivery.",
                      "Maintained <200ms API latency for 20K+ MAUs with LRU caching, optimized SQL, and restructured endpoints.",
                      "Cut reporting time 50% and raised accuracy 35% by building Python/SQL ETL pipelines feeding Tableau dashboards.",
                    ]}
                  />
                </Section>

                <Section title="Projects">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        Dispatch (NestJS, PostgreSQL RLS, AWS)
                      </strong>{" "}
                      – Built multi-tenant SaaS automating logistics/returns
                      with real-time sync, carrier APIs, and rule-based
                      workflows; deployed resilient event-driven architecture
                      for secure, fault-tolerant ops.
                    </li>
                    <li>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        ManToGo (React, Node.js, Mapbox)
                      </strong>{" "}
                      – Built Dartmouth-backed delivery platform with
                      Dining/Payroll, creating paid student jobs and leading
                      full-stack dev of payments, routing, and rewards; scaled
                      to 450+ users in 6 weeks.
                    </li>
                    <li>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        Tiny Search Engine (C, Systems Design)
                      </strong>{" "}
                      – Built a web crawler, indexer, and query engine for 15K+
                      pages; cut average search latency from 30 s to 0.8 s using
                      custom tokenization, memory pooling, and low-level I/O
                      optimizations.
                    </li>
                  </ul>
                </Section>

                <Section title="Additional Experience">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Teaching Assistant (CS59: Programming Fundamentals) |
                      Dartmouth College – Summer 2025 – Mentored 50+ students on
                      C debugging; pass rate improved 12% vs. prior year.
                    </li>
                    <li>
                      Project Assistant | Evergreen.AI Research Group – Jan 2024
                      – May 2024 - Prototyped React/Python AI wellness platform
                      piloted by 100+ undergrads; informed campus health
                      initiatives.
                    </li>
                  </ul>
                </Section>

                <Section title="Certifications">
                  <p>
                    Notable Certifications: AWS Cloud Practitioner (pending),
                    IBM Full Stack Dev, CodePath Technical Interview Prep
                  </p>
                </Section>
                {/* Last Updated moved to bottom of page on all viewports */}
                <Section title="Last Updated">
                  <p className="text-xs inline-flex items-center rounded-full border border-border/60 bg-white/60 px-2.5 py-1 backdrop-blur dark:border-gray-800 dark:bg-gray-800/60">
                    September 10, 2025
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
