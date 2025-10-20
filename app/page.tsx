import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { FiArrowRight, FiCode, FiLayers, FiMonitor } from "react-icons/fi";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import { Content } from "@/lib/content";
import PostCard from "@/components/blog/PostCard";
import Loading from "@/components/ui/Loading";

export const metadata: Metadata = {
  title: "Muhammad Moiz – Full-Stack Software Engineer",
  description:
    "Results-oriented Software Engineer with 3+ years experience building scalable SaaS, ML-powered features, and cloud apps. Python, React, AWS, CI/CD.",
  alternates: {
    canonical: "https://www.moizofficial.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.moizofficial.com/",
    title: "Muhammad Moiz – Full-Stack Software Engineer",
    description:
      "Results-oriented Software Engineer with 3+ years experience building scalable SaaS, ML-powered features, and cloud apps.",
    images: [
      {
        url: "https://www.moizofficial.com/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Moiz headshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zahid_moiz",
    images: ["https://www.moizofficial.com/images/profile.jpg"],
  },
};

export default function Home() {
  const latestPosts = Content.posts().slice(0, 3);
  return (
    <div className="pt-16">
      <Suspense
        fallback={
          <div className="py-16">
            <Loading type="dots" text="Loading hero..." />
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      <section className="bg-white py-16 dark:bg-gray-950">
        <div className="container-custom grid gap-12 lg:grid-cols-[1.75fr,1fr]">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Full-Stack software that ships strategy, not just code
            </h2>
            <p className="mb-5 text-gray-700 dark:text-gray-300">
              I&apos;m Muhammad Moiz, and I design and deliver production
              systems that keep teams moving. From idea validation to hardened
              releases, I combine discovery workshops, API-first architecture,
              and rapid prototyping to shrink feedback loops. That process has
              helped venture-backed startups launch self-serve SaaS, product
              teams unblock migrations, and research groups commercialize AI/ML
              features without derailing roadmaps.
            </p>
            <p className="mb-5 text-gray-700 dark:text-gray-300">
              As a Full-Stack Software Engineer, I partner with design,
              security, and stakeholder teams to translate requirements into
              resilient experiences. I build React applications, Python and Node
              services, and data pipelines that land on AWS or GCP with
              observability and CI/CD baked in. My recent focus has been
              productionizing machine learning workloads—retrieval-augmented
              generation, personalization, and analytics dashboards—so they are
              measurable, explainable, and cost aware.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Every engagement tries to leave a team stronger than I found it:
              documentation that gets maintained, infrastructure-as-code that is
              reproducible, and delivery practices that survive handoffs.
              Whether we are modernizing legacy platforms or shipping a green
              field product, the target is the same—software that aligns
              customer outcomes with business strategy.
            </p>
          </div>
          <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Core capabilities
            </h3>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                Outcome-driven sprints that connect user research to roadmap
                impact.
              </li>
              <li>
                Cloud-native architectures across AWS, GCP, Docker, and
                Kubernetes with automated testing and observability.
              </li>
              <li>
                AI/ML feature delivery including vector search, data labeling,
                and model monitoring.
              </li>
              <li>
                Collaboration rituals—docs, tech talks, mentorship—that scale
                engineering culture.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-16">
            <Loading type="dots" text="Loading skills..." />
          </div>
        }
      >
        <SkillsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-16">
            <Loading type="dots" text="Loading projects..." />
          </div>
        }
      >
        <ProjectsPreview />
      </Suspense>

      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Impact Highlights</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Outcomes from full‑stack, AI/ML, and cloud work across industry
              and campus.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="card">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                  <achievement.icon size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{achievement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Latest Insights</h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Thoughts and perspectives on technology, design, and the digital
              landscape.
            </p>
          </div>

          <Suspense fallback={<Loading type="dots" text="Loading posts..." />}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </Suspense>

          <div className="mt-10 text-center">
            <Link href="/blog" className="btn-outline">
              View all posts
            </Link>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="py-16">
            <Loading type="dots" text="Loading contact..." />
          </div>
        }
      >
        <ContactCTA />
      </Suspense>
    </div>
  );
}

const achievements = [
  {
    title: "Conversions +22% for 50K+ users",
    description:
      "Deployed on-device ML recommendation engine at Muff LTD (2025).",
    icon: FiCode,
  },
  {
    title: "Checkout latency -40%",
    description:
      "Re-architected system into cloud microservices with peak-load scaling.",
    icon: FiLayers,
  },
  {
    title: "Retrieval speed +3×",
    description:
      "Rauner: Elasticsearch + embeddings; 300K+ manuscripts searchable.",
    icon: FiMonitor,
  },
];
