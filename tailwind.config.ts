import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#05070D", // page background
          panel: "#0B1220", // card / panel surface
          raised: "#111A2C", // hovered / raised surface
          line: "#1C2740", // hairline borders
        },
        accent: {
          blue: "#3B82F6",
          violet: "#8B5CF6",
          cyan: "#22D3EE",
        },
        status: {
          up: "#22C55E",
          warn: "#F59E0B",
          down: "#EF4444",
        },
        ink: {
          DEFAULT: "#E6EDF7", // primary text
          dim: "#92A1BE", // secondary text
          faint: "#5C6B8A", // tertiary / disabled
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "grid-cyber":
          "linear-gradient(to right, rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cyber": "44px 44px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,130,246,0.15), 0 0 24px -4px rgba(59,130,246,0.35)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.15), 0 0 24px -4px rgba(34,211,238,0.35)",
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        scan: "scan 3s linear infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(34,197,94,0.5)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 0 6px rgba(34,197,94,0)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
