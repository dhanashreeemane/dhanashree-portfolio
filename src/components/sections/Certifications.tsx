"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import { certifications, achievements } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import GithubStats from "./GithubStats";

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./certifications --verify"
          title="Certifications & achievements"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-panel rounded-lg p-5 hover:border-accent-violet/40 transition-colors"
              >
                <Award size={18} className="text-accent-violet" />
                <p className="mt-3 font-display text-sm font-semibold text-ink leading-snug">
                  {cert.title}
                </p>
                {(cert.issuer || cert.year) && (
                  <p className="mt-1 font-mono text-[11px] text-ink-faint">
                    {cert.issuer}
                    {cert.issuer && cert.year && " · "}
                    {cert.year}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-lg p-7"
            >
              <h3 className="font-display text-base font-semibold text-ink">
                Key achievements
              </h3>
              <ul className="mt-5 space-y-3.5">
                {achievements.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-ink-dim"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-status-up" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <GithubStats />
          </div>
        </div>
      </div>
    </section>
  );
}
