"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Download, FolderGit2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import Button from "@/components/ui/Button";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
});

function TypedRoles() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = profile.roles[index];
    const speed = deleting ? 28 : 55;

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1100);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % profile.roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <span className="inline-flex items-center gap-2 text-accent-cyan">
      <span>{profile.roles[index].substring(0, subIndex)}</span>
      <span className="animate-blink text-white">_</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-shell relative flex min-h-[100svh] items-center overflow-hidden pt-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,#05070D_76%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent-blue/10 blur-3xl"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(82vw,720px)] w-[min(82vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-70 sm:h-[620px] sm:w-[620px] sm:opacity-80 lg:h-[760px] lg:w-[760px] lg:opacity-100">
        <HeroScene />
      </div>
      <div className="section-padding relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-6 top-0 h-14 w-14 rounded-full bg-accent-cyan/10 blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prompt-label"
          >
            status: <span className="status-dot" /> available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-3xl font-display text-[clamp(3.2rem,7vw,6.6rem)] font-bold leading-[0.92] tracking-[-0.055em] text-balance text-ink"
          >
            <span className="block">Hi, I&apos;m</span>
            <span className="mt-3 block bg-gradient-to-r from-white via-cyan-100 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(34,211,238,0.2)]">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 flex min-h-10 items-center gap-3 font-mono text-base text-ink-dim sm:text-lg"
          >
            <span className="hidden text-ink-faint sm:inline">I build</span>
            <TypedRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-7 text-balance text-ink-dim"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href={profile.links.resume} icon={Download} download>
              Download Resume
            </Button>
            <Button href="#projects" variant="secondary" icon={FolderGit2}>
              View Projects
            </Button>
            <Button href="#contact" variant="ghost" icon={Mail}>
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {[
              { label: "Reliability", value: "99.98%" },
              { label: "Automation", value: "24/7" },
              { label: "Security", value: "Zero Trust" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-panel rounded-2xl border border-base-line/80 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-ink-faint">{item.label}</p>
                <p className="mt-1 font-display text-2xl text-ink">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto min-h-[360px] w-full max-w-xl sm:min-h-[460px] lg:min-h-[610px]"
        >
          <div
            aria-hidden="true"
            className="absolute -left-8 top-12 h-24 w-24 rounded-full bg-accent-blue/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-6 bottom-5 h-28 w-28 rounded-full bg-accent-cyan/10 blur-3xl"
          />
          <div className="glass-panel absolute left-0 top-8 z-10 rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:left-3 sm:top-16">
            <div className="flex items-center gap-2 text-xs text-ink-dim"><ShieldCheck className="text-status-up" size={16} /> Security posture</div>
            <div className="mt-1 flex items-end gap-2"><strong className="font-display text-2xl text-white">98%</strong><span className="mb-1 text-[10px] text-status-up">+12.4%</span></div>
          </div>
          <div className="glass-panel absolute bottom-5 right-0 z-10 rounded-2xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,.35)] sm:bottom-14 sm:right-4">
            <div className="flex items-center gap-2 text-xs text-ink-dim"><Sparkles className="text-accent-violet" size={15} /> Live infrastructure</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-xs text-white"><span className="status-dot" /> All systems nominal</div>
          </div>
          <div className="glass-panel absolute bottom-0 left-1/2 z-10 hidden w-[82%] -translate-x-1/2 overflow-hidden rounded-2xl border border-accent-cyan/10 shadow-[0_0_60px_rgba(34,211,238,0.08)] sm:block">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
            <div className="flex items-center gap-2 border-b border-base-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-status-down/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-warn/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-status-up/70" />
              <span className="ml-2 font-mono text-xs text-ink-faint">session — infra-status</span>
            </div>
            <div className="space-y-2.5 px-5 py-5 font-mono text-xs text-ink-dim sm:text-sm">
              <BootLine delay={0.6} label="$ whoami" value={profile.name} />
              <BootLine delay={0.9} label="location" value={profile.location} />
              <BootLine delay={1.2} label="role" value="DevOps · Cloud · Security" />
              <BootLine delay={1.5} label="pipeline" value="CI/CD — passing" status="up" />
              <BootLine delay={1.8} label="monitoring" value="all systems nominal" status="up" />
              <BootLine delay={2.1} label="uptime" value="ready to deploy" status="up" />
            </div>
            <div className="grid gap-3 border-t border-base-line bg-base-panel/30 px-5 py-4 sm:grid-cols-3">
              {[
                { label: "Latency", value: "< 150ms" },
                { label: "Deploys", value: "Weekly" },
                { label: "Focus", value: "Scale" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-base-line/70 bg-base/40 p-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ink-faint">{item.label}</p>
                  <p className="mt-1 font-mono text-sm text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll to about section" className="scroll-cue absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-ink-faint transition-colors hover:text-accent-cyan sm:bottom-6">
        <span>scroll</span>
        <span className="scroll-cue__mouse"><span /></span>
        <span className="scroll-cue__chevron" />
      </a>
    </section>
  );
}

function BootLine({
  delay,
  label,
  value,
  status,
}: {
  delay: number;
  label: string;
  value: string;
  status?: "up";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between gap-3 border-b border-base-line/60 pb-2 last:border-0 last:pb-0"
    >
      <span className="text-ink-faint">{label}</span>
      <span className="flex items-center gap-1.5 text-right text-ink">
        {status === "up" && <span className="h-1.5 w-1.5 rounded-full bg-status-up" />}
        {value}
      </span>
    </motion.div>
  );
}
