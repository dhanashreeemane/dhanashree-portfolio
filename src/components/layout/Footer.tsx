import Link from "next/link";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/content";
import VisitorCounter from "@/components/ui/VisitorCounter";

export default function Footer() {
  return (
    <footer className="section-padding relative border-t border-base-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Three.js.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs text-ink-dim hover:text-accent-cyan transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <VisitorCounter />
      </div>
    </footer>
  );
}
