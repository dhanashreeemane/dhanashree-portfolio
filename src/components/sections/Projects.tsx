"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { ProjectEntry } from "@/types";

const filters: { id: ProjectEntry["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "devops", label: "DevOps" },
  { id: "security", label: "Security" },
  { id: "cloud", label: "Cloud" },
  { id: "ai", label: "AI" },
];

export default function Projects() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projects" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./projects --filter"
          title="Featured work"
          description="A mix of pipeline engineering, security operations, and cloud automation."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "rounded-md border px-4 py-2 font-mono text-xs transition-colors",
                active === f.id
                  ? "border-accent-cyan/60 bg-accent-cyan/10 text-accent-cyan"
                  : "border-base-line text-ink-dim hover:border-accent-blue/40 hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className={cn(
                    "glass-panel project-card rounded-2xl p-6 transition-all duration-300 hover:border-accent-cyan/40",
                    project.featured && "ring-1 ring-accent-blue/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="shrink-0 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2 py-0.5 font-mono text-[10px] text-accent-cyan">
                        featured
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-base-line bg-base-raised/50 px-2 py-1 font-mono text-[10px] text-ink-dim"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
