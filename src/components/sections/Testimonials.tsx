"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="./testimonials" title="What people say" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-panel rounded-lg p-7"
            >
              <Quote size={20} className="text-accent-blue/60" />
              <blockquote className="mt-4 text-sm leading-relaxed text-ink-dim">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 font-mono text-xs text-ink-faint">
                <span className="text-ink">{t.name}</span> — {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
