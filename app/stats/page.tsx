"use client";

import useSWR from "swr";
import { motion } from "framer-motion";

type GithubUser = {
  followers: number;
  public_repos: number;
};

type Repo = {
  stargazers_count: number;
  forks_count: number;
};

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" as any }).then((r) => r.json());

export default function StatsPage() {
  const username = "MuhammadMoiz20";
  const { data: user } = useSWR<GithubUser>(
    `https://api.github.com/users/${username}`,
    fetcher,
  );
  const { data: repos } = useSWR<Repo[]>(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    fetcher,
  );

  const totalStars = (repos || []).reduce(
    (sum, r) => sum + (r.stargazers_count || 0),
    0,
  );
  const totalForks = (repos || []).reduce(
    (sum, r) => sum + (r.forks_count || 0),
    0,
  );

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Developer Stats
          </motion.h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Live GitHub metrics showcasing open-source impact and activity.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Followers", value: user?.followers ?? "—" },
            { label: "Public Repos", value: user?.public_repos ?? "—" },
            { label: "Total Stars", value: totalStars },
            { label: "Total Forks", value: totalForks },
          ].map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="text-3xl font-extrabold">{card.value}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {card.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
