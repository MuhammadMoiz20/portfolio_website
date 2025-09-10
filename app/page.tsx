import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { FiArrowRight, FiCode, FiLayers, FiMonitor } from "react-icons/fi";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ContactCTA from "@/components/home/ContactCTA";
import BlogGrid from "@/components/blog/BlogGrid";
import { blogPosts } from "@/data/blog";
import Loading from "@/components/ui/Loading";

export const metadata: Metadata = {
  title: "Muhammad Moiz – Software Engineer (Full‑stack • AI/ML • Cloud)",
  description:
    "Results-oriented Software Engineer with 3+ years experience building scalable SaaS, ML-powered features, and cloud apps. Python, React, AWS, CI/CD.",
  alternates: {
    canonical: "https://www.moizofficial.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.moizofficial.com/",
    title: "Muhammad Moiz – Software Engineer",
    description:
      "Results-oriented Software Engineer with 3+ years experience building scalable SaaS, ML-powered features, and cloud apps.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@zahid_moiz",
  },
};

export default function Home() {
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
            <BlogGrid
              posts={blogPosts.slice(0, 3)}
              title={undefined}
              description={undefined}
            />
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
    title: "Checkout conversion 32% → 50%",
    description:
      "Rebuilt React/Stripe flows with idempotency keys at Muff Garments (2025).",
    icon: FiCode,
  },
  {
    title: "99.95% uptime, errors −45%",
    description:
      "AWS Lambda + DynamoDB with retries/DLQs; Docker + CI/CD (30m → 4m).",
    icon: FiLayers,
  },
  {
    title: "Archival processing −90%",
    description:
      "Rauner: Parallel pipelines; 99.8% uptime; +40% processing speed, −25% storage.",
    icon: FiMonitor,
  },
];
