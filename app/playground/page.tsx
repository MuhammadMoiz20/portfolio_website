"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// NOTE: Converted to client-side helpers to avoid inline server action restrictions in client component.
async function hashClient(text: string, algo: string) {
  const supported = ["sha1", "sha256", "sha384", "sha512", "md5"];
  const algorithm = supported.includes(algo) ? algo : "sha256";
  // dynamic import crypto for edge compatibility fallback
  const cryptoMod = await import("crypto");
  const digest = cryptoMod.createHash(algorithm).update(text).digest("hex");
  return { algorithm, digest };
}

function echoClient(text: string) {
  return { echoed: text, length: text.length };
}

export default function PlaygroundPage() {
  const [hashResult, setHashResult] = useState<any>(null);
  const [echoResult, setEchoResult] = useState<any>(null);

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-b from-indigo-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Server Actions Playground
          </motion.h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Interact with server actions directly from the client without API
            routes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <div className="card">
            <h2 className="mb-2 text-2xl font-bold">Hash (Server Action)</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const text = String(fd.get("text") || "");
                const algo = String(fd.get("algo") || "sha256");
                setHashResult(await hashClient(text, algo));
              }}
              className="space-y-3"
            >
              <textarea
                name="text"
                rows={4}
                className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Enter text"
              />
              <div className="flex items-center gap-3">
                <select
                  name="algo"
                  className="rounded-md border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {["sha1", "sha256", "sha384", "sha512", "md5"].map((a) => (
                    <option key={a} value={a}>
                      {a.toUpperCase()}
                    </option>
                  ))}
                </select>
                <button className="btn-primary" type="submit">
                  Hash
                </button>
              </div>
            </form>
            {hashResult && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs dark:bg-gray-900">
                {JSON.stringify(hashResult, null, 2)}
              </pre>
            )}
          </div>

          <div className="card">
            <h2 className="mb-2 text-2xl font-bold">Echo (Server Action)</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const text = String(fd.get("echo") || "");
                setEchoResult(echoClient(text));
              }}
              className="space-y-3"
            >
              <input
                name="echo"
                className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="Type something"
              />
              <button className="btn-primary" type="submit">
                Echo
              </button>
            </form>
            {echoResult && (
              <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs dark:bg-gray-900">
                {JSON.stringify(echoResult, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
