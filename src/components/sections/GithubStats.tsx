"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Users, GitCommitHorizontal } from "lucide-react";
import { profile } from "@/data/profile";

interface GhStats {
  public_repos: number;
  followers: number;
  following: number;
}

/**
 * Pulls basic public stats from the GitHub REST API client-side.
 * No auth token required for this endpoint, but it is rate-limited
 * (60 req/hr per IP) — for production traffic, proxy this through an
 * API route with a token. See TODO below.
 */
export default function GithubStats() {
  const [stats, setStats] = useState<GhStats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const username = profile.links.github.split("/").filter(Boolean).pop();
    if (!username) {
      setStatus("error");
      return;
    }

    // TODO: for higher rate limits and reliability in production, replace
    // this client-side fetch with a Next.js API route (e.g. /api/github)
    // that calls GitHub with a server-side token from process.env.GITHUB_TOKEN.
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub API error");
        return res.json();
      })
      .then((data) => {
        setStats({
          public_repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
        });
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const metrics = [
    { icon: GitBranch, label: "public repos", value: stats?.public_repos },
    { icon: Users, label: "followers", value: stats?.followers },
    { icon: GitCommitHorizontal, label: "following", value: stats?.following },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-lg p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-ink">GitHub activity</h3>
        <span className="prompt-label">live</span>
      </div>

      {status === "error" ? (
        <p className="mt-4 font-mono text-xs text-ink-faint">
          Live stats unavailable right now — check back shortly.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <m.icon size={16} className="mx-auto text-accent-cyan" />
              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {status === "loading" ? (
                  <span className="inline-block h-5 w-8 animate-pulse rounded bg-base-line align-middle" />
                ) : (
                  m.value
                )}
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-ink-faint">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
        <Star size={12} />
        Pulled live from the GitHub public API
      </div>
    </motion.div>
  );
}
