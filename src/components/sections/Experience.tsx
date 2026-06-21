"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="./experience --log"
          title="Where I've put this into practice"
        />

        <div className="relative mt-14 pl-8">
          <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-blue via-accent-violet to-transparent" />

          {experience.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-3.5 w-3.5 rounded-full bg-accent-blue/30" />
                <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse-dot" />
              </span>

              <div className="glass-panel rounded-lg p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {entry.role}
                  </h3>
                  <span className="rounded-full border border-status-up/30 bg-status-up/10 px-2.5 py-0.5 font-mono text-[11px] text-status-up">
                    {entry.status === "active" ? "active" : "complete"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-ink-faint">
                  {entry.org} · {entry.period}
                </p>
                <p className="mt-4 text-sm text-ink-dim leading-relaxed">
                  {entry.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-base-line bg-base-raised/50 px-2.5 py-1 font-mono text-[11px] text-ink-dim"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
