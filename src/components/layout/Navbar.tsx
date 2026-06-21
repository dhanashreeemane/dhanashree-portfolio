"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(window.scrollY / height, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-base-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-base-line/30">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-violet shadow-[0_0_12px_rgba(34,211,238,.9)]"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        />
      </div>
      <nav className="section-padding mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {profile.initials}
          <span className="text-accent-cyan">.</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-sm text-ink-dim transition-colors hover:text-accent-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open quick navigation"
            className="flex items-center gap-2 rounded-lg border border-base-line px-3 py-2 font-mono text-[10px] text-ink-faint transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
          >
            <Command size={14} /> <span>Ctrl K</span>
          </button>
          <Link
            href="#contact"
            className="rounded-md bg-accent-blue px-4 py-2 font-mono text-sm font-medium text-white shadow-glow transition-all hover:bg-accent-blue/90 hover:shadow-glow-cyan"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-ink lg:hidden"
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-base/95 backdrop-blur-xl lg:hidden"
          >
            <div className="section-padding flex h-16 items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink">
                {profile.initials}<span className="text-accent-cyan">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-ink"
              >
                <X size={24} />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="section-padding mt-8 flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl font-medium text-ink hover:text-accent-cyan"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
