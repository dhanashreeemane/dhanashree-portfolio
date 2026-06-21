"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FileDown, Home, Mail, Search, UserRound, X } from "lucide-react";
import { profile } from "@/data/profile";

const actions = [
  { label: "Go home", detail: "Back to the hero", href: "#home", icon: Home },
  { label: "About me", detail: "Background and education", href: "#about", icon: UserRound },
  { label: "View projects", detail: "Selected engineering work", href: "#projects", icon: BriefcaseBusiness },
  { label: "Contact me", detail: "Let's build something", href: "#contact", icon: Mail },
  { label: "Download résumé", detail: "PDF document", href: profile.links.resume, icon: FileDown, download: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
    else setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? actions.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(term)) : actions;
  }, [query]);

  const choose = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    else window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/70 px-4 pt-[14vh] backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Quick navigation"
            initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="glass-panel w-full max-w-xl overflow-hidden rounded-3xl border-accent-cyan/20 shadow-[0_30px_100px_rgba(0,0,0,.55),0_0_60px_rgba(34,211,238,.08)]"
          >
            <div className="flex items-center gap-3 border-b border-base-line px-5">
              <Search size={18} className="shrink-0 text-accent-cyan" />
              <input
                ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && results[0]) choose(results[0].href);
                }}
                placeholder="Where would you like to go?"
                className="h-16 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <button onClick={() => setOpen(false)} aria-label="Close command palette" className="rounded-lg p-2 text-ink-faint hover:bg-white/5 hover:text-ink"><X size={17} /></button>
            </div>
            <div className="p-2">
              {results.length ? results.map((item, index) => (
                <button key={item.label} onClick={() => choose(item.href)} className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-accent-cyan/10">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-base-line bg-base/50 text-ink-dim transition-colors group-hover:border-accent-cyan/30 group-hover:text-accent-cyan"><item.icon size={17} /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-medium text-ink">{item.label}</span><span className="block truncate text-xs text-ink-faint">{item.detail}</span></span>
                  {index === 0 && <span className="hidden rounded-md border border-base-line px-1.5 py-1 font-mono text-[9px] text-ink-faint sm:block">ENTER</span>}
                  <ArrowRight size={15} className="text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-accent-cyan" />
                </button>
              )) : <p className="px-4 py-10 text-center text-sm text-ink-faint">No command found.</p>}
            </div>
            <div className="border-t border-base-line px-5 py-3 font-mono text-[10px] text-ink-faint">Quick launch · press ESC to close</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
