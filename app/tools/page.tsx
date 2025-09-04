"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ToolsPage() {
  // Hash tool state
  const [hashText, setHashText] = useState("");
  const [hashAlgo, setHashAlgo] = useState("sha256");
  const [hashOutput, setHashOutput] = useState<string>("");
  const [hashLoading, setHashLoading] = useState(false);

  // Metadata tool state
  const [metaUrl, setMetaUrl] = useState("");
  const [metaOutput, setMetaOutput] = useState<any>(null);
  const [metaLoading, setMetaLoading] = useState(false);

  const runHash = async () => {
    setHashLoading(true);
    setHashOutput("");
    try {
      const res = await fetch("/api/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: hashText, algo: hashAlgo }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setHashOutput(data.digest);
    } catch (e: any) {
      setHashOutput(`Error: ${e.message || "Unknown error"}`);
    } finally {
      setHashLoading(false);
    }
  };

  const runMeta = async () => {
    setMetaLoading(true);
    setMetaOutput(null);
    try {
      const res = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: metaUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMetaOutput(data);
    } catch (e: any) {
      setMetaOutput({ error: e.message || "Unknown error" });
    } finally {
      setMetaLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-b from-secondary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Developer Tools
          </motion.h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Showcasing practical backend endpoints with interactive UI.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          {/* Hashing Tool */}
          <div className="card">
            <h2 className="mb-2 text-2xl font-bold">Text Hashing</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Compute secure hashes (SHA-256, SHA-512, etc.) via server API.
            </p>
            <textarea
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              rows={4}
              placeholder="Enter text to hash"
              value={hashText}
              onChange={(e) => setHashText(e.target.value)}
            />
            <div className="mb-3 flex items-center gap-3">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Algorithm
              </label>
              <select
                className="rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={hashAlgo}
                onChange={(e) => setHashAlgo(e.target.value)}
              >
                {["sha1", "sha256", "sha384", "sha512", "md5"].map((a) => (
                  <option key={a} value={a}>
                    {a.toUpperCase()}
                  </option>
                ))}
              </select>
              <button
                onClick={runHash}
                disabled={hashLoading || !hashText.trim()}
                className="btn-primary"
              >
                {hashLoading ? "Hashing..." : "Hash"}
              </button>
            </div>
            {hashOutput && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs dark:bg-gray-900">
                {hashOutput}
              </pre>
            )}
          </div>

          {/* Metadata Tool */}
          <div className="card">
            <h2 className="mb-2 text-2xl font-bold">URL Metadata</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Fetch page title, description, and OpenGraph image via server API.
            </p>
            <input
              type="url"
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="https://example.com"
              value={metaUrl}
              onChange={(e) => setMetaUrl(e.target.value)}
            />
            <button
              onClick={runMeta}
              disabled={metaLoading || !metaUrl.trim()}
              className="btn-primary"
            >
              {metaLoading ? "Fetching..." : "Fetch Metadata"}
            </button>
            {metaOutput && (
              <div className="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-900">
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(metaOutput, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
