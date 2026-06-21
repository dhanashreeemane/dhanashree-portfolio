"use client";

import dynamic from "next/dynamic";

// ssr:false dynamic imports must be called from within a Client Component —
// this thin wrapper exists so page.tsx (a Server Component) can stay a
// Server Component while still lazy-loading the WebGL-only background.
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

export default function ParticleBackgroundClient() {
  return <ParticleBackground />;
}
