import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: LucideIcon;
  external?: boolean;
  download?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = "primary",
  icon: Icon,
  external,
  download,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium font-mono transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent-cyan";

  const variants = {
    primary:
      "bg-accent-blue text-white hover:bg-accent-blue/90 shadow-glow hover:shadow-glow-cyan hover:-translate-y-0.5",
    secondary:
      "border border-base-line bg-base-panel/60 text-ink hover:border-accent-cyan/50 hover:text-accent-cyan backdrop-blur-sm hover:-translate-y-0.5",
    ghost: "text-ink-dim hover:text-accent-cyan",
  };

  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], className)}
      download={download}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} />}
      {children}
    </Link>
  );
}
