# Dhanashree Mane — Portfolio

A dark, glassmorphic portfolio site for a DevOps / Cloud / Cybersecurity engineer, built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber (Three.js).

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # eslint
```

Requires **Node.js 18.18+** (Next.js 15 minimum).

---

## Before you launch: replace these placeholders

Everything below lives in plain data files, not scattered through components, so it's a five-minute pass.

### 1. `src/data/profile.ts`
- `email`, `phone`
- `links.linkedin`, `links.github`
- `links.resume` — path to your resume PDF (see step 2)
- `avatarSrc` — path to your photo (see step 3)

### 2. Resume PDF
Drop your resume at `public/resume/Dhanashree-Mane-Resume.pdf` (exact filename, or update the path in `profile.ts`). The hero "Download Resume" button just links to this path — no other wiring needed.

### 3. Profile photo
Replace `public/images/avatar-placeholder.svg` with a real photo (`.jpg`/`.png`/`.webp` all work — just update `avatarSrc` in `profile.ts` to match the new filename).

### 4. `src/data/content.ts`
Search this file for `TODO` — it flags every field without real content yet: certification years/issuers, education dates, real testimonials (or delete the section if you don't have any yet), and blog post dates/links.

### 5. SEO / Open Graph
- `src/data/profile.ts` → `siteMeta.url`: set to your real deployed domain.
- Add a real `public/images/og-cover.png` (1200×630) for link previews — referenced in `src/app/layout.tsx`.

---

## Wiring up the "live" features

A few sections have working UI but need a backend connected. Each is marked with a `TODO` comment at the exact line to change. Copy `.env.example` to `.env.local` and fill in what you use.

| Feature | File | What it needs |
|---|---|---|
| Contact form | `src/components/sections/ContactForm.tsx` | Create `src/app/api/contact/route.ts` that emails the submission (Resend, SendGrid, or Nodemailer all work) |
| AI chat widget | `src/components/ui/ChatWidget.tsx` | Create `src/app/api/chat/route.ts` that calls the Anthropic API server-side with `ANTHROPIC_API_KEY` |
| GitHub stats | `src/components/sections/GithubStats.tsx` | Works out of the box via the public GitHub API (rate-limited to 60 req/hr/IP). For production traffic, proxy through an API route with a token |
| Visitor counter | `src/components/ui/VisitorCounter.tsx` | Works out of the box via the free CountAPI service. Swap for a self-hosted counter (Vercel KV/Upstash) for production reliability |
| Blog posts | `src/data/blogPosts` in `src/data/content.ts` | Currently static placeholder entries — point `href` at real posts, or connect an MDX/CMS source |

None of these block the build — the site runs and looks complete with the stub/placeholder behavior in place.

---

## Project structure

```
src/
  app/
    layout.tsx          # root layout, fonts, metadata
    page.tsx             # assembles all sections
    sitemap.ts           # dynamic sitemap.xml
    globals.css           # design tokens, base styles, utilities
  components/
    layout/               # Navbar, Footer, ThemeProvider
    sections/              # Hero, About, Skills, Experience, Projects,
                            # Certifications, Testimonials, Blog, Contact
    3d/                    # Three.js scenes (particle field, floating objects)
    ui/                    # Button, SectionHeading, CursorGlow, ChatWidget,
                            # VisitorCounter — small reusable pieces
  data/                    # All editable content lives here
    profile.ts             # name, bio, contact info, links
    content.ts              # experience, projects, certs, testimonials, blog
    skills.ts                # skill categories + proficiency levels
  hooks/                    # useReducedMotion, useInView
  lib/                       # cn() class-merging utility
  types/                      # shared TypeScript interfaces
public/
  images/                      # avatar, OG image
  resume/                       # resume PDF
```

## Design notes

- **Palette**: near-black base (`#05070D`) with blue/violet/cyan accents and status colors (green/amber/red) borrowed from real monitoring dashboards.
- **Type**: Space Grotesk (headings), JetBrains Mono (labels, data, the recurring `$` prompt eyebrow), Inter (body copy).
- **Signature element**: the hero's "boot sequence" status panel — written to feel like SSHing into a server that resolves into the profile, rather than a generic hero card.
- **3D scope**: kept deliberately restrained — an ambient particle field plus a few floating wireframe objects (server rack, cluster node, security ring) in the hero. All 3D is skipped/replaced with a static fallback when the visitor has `prefers-reduced-motion` enabled.
- **Accessibility**: visible focus rings throughout, reduced-motion respected in both CSS and the 3D/cursor-glow components, semantic form labels.

## Deployment

### Vercel (recommended — zero config)
1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add any environment variables from `.env.example` you're using.
4. Deploy. Vercel auto-detects Next.js.

### Other hosts (Netlify, Render, self-hosted Node)
```bash
npm run build
npm run start   # serves on port 3000 by default
```
Any host that runs a Node.js server works, since this uses the standard Next.js App Router (no static export — the GitHub stats and contact form expect a server runtime once wired up).

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion 11 · Three.js · React Three Fiber 9 · React Hook Form + Zod · Lucide icons
