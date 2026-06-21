"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Server } from "lucide-react";
import { profile } from "@/data/profile";
import { education } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./about"
          title="A bit about how I work"
          description="The infrastructure side of building software — where automation, reliability, and security meet."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass-panel relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg"
          >
            <Image
              src={profile.avatarSrc}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base/90 to-transparent p-4">
              <p className="font-mono text-xs text-accent-cyan">{profile.location}</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {profile.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-ink-dim leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-4 pt-4 sm:grid-cols-2"
            >
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel rounded-lg p-5"
                >
                  <GraduationCap size={18} className="text-accent-violet" />
                  <p className="mt-3 font-display text-sm font-semibold text-ink">
                    {edu.degree}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">
                    {edu.institution || "—"} {edu.period && `· ${edu.period}`}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 pt-2 font-mono text-xs text-ink-faint"
            >
              <Server size={14} className="text-accent-cyan" />
              Currently focused on cloud-native infrastructure & DevSecOps practice
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
