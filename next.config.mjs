/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github-readme-stats.vercel.app" },
    ],
  },
  // three.js / R3F ship ESM that Next traces fine by default, but this keeps
  // server-only bundling from choking on GLSL-flavored imports some R3F
  // ecosystem packages use.
  transpilePackages: ["three"],
};

export default nextConfig;
