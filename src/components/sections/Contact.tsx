"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin },
  { icon: Github, label: "GitHub", href: profile.links.github },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="./contact --reach"
          title="Let's build something secure"
          description="Open to DevOps, cloud, and security roles — or just a conversation about infrastructure."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass-panel flex flex-col justify-between rounded-lg p-7"
          >
            <div className="space-y-5">
              <ContactRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
              <ContactRow icon={MapPin} label="Location" value={profile.location} />
            </div>

            <div className="mt-8 border-t border-base-line pt-6">
              <p className="font-mono text-xs text-ink-faint">Find me elsewhere</p>
              <div className="mt-3 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-base-line text-ink-dim transition-all hover:-translate-y-0.5 hover:border-accent-cyan/50 hover:text-accent-cyan"
                  >
                    <s.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-lg p-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-base-line text-accent-cyan">
        <Icon size={15} />
      </div>
      <div>
        <p className="font-mono text-[11px] text-ink-faint">{label}</p>
        <p className="mt-0.5 text-sm text-ink">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </a>
    );
  }
  return content;
}
