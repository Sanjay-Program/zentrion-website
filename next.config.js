/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is pre-rendered to plain HTML/CSS/JS at
  // build time (no server, no API routes, no server actions anywhere in
  // this project), which is exactly what Cloudflare Pages' static hosting
  // wants. Build output lands in ./out — that's the folder to deploy.
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // Next's built-in image optimization needs a server; static export
    // doesn't have one, so images are served as-is from /public instead.
    unoptimized: true,
  },
  // Security headers live in public/_headers instead of next.config.js
  // here, since headers() requires a Node server and isn't available (or
  // needed) with output: 'export' — Cloudflare Pages reads _headers
  // directly at the edge.
};

module.exports = nextConfig;
