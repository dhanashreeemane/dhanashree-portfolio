"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Blog() {
  return (
    <section id="blog" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./blog --recent"
          title="Notes from the field"
          description="Short write-ups on pipelines, security tooling, and infrastructure decisions." // TODO: wire up to a real CMS/MDX source — see src/data/content.ts
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href={post.href}
                className="glass-panel group block h-full rounded-lg p-6 transition-colors hover:border-accent-cyan/40"
              >
                <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-0.5 font-mono text-[10px] text-accent-blue">
                  {post.tag}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink group-hover:text-accent-cyan transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-dim leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between font-mono text-[11px] text-ink-faint">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readMins} min read
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-cyan"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
