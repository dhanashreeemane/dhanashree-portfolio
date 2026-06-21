"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./skills --list"
          title="Tools & technologies"
          description="Grouped the way they're actually used — from pipeline to platform to perimeter."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (catIndex % 3) * 0.08 }}
              className="glass-panel group rounded-lg p-6 transition-colors hover:border-accent-blue/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-ink">
                  {category.title}
                </h3>
                <span className="font-mono text-[10px] text-ink-faint">
                  {String(catIndex + 1).padStart(2, "0")}/
                  {String(skillCategories.length).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-dim">{category.description}</p>

              <div className="mt-5 space-y-3.5">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                      <span className="text-ink-dim">{skill.name}</span>
                      <span className="text-ink-faint">{skill.level}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-base-line">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
