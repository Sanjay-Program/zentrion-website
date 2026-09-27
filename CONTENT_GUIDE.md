# Zentrion Content Management Guide

This guide explains how to add new Guides, Tools, Labs, and Cheatsheets to the Zentrion Technologies ecosystem.

## 1. How to Create a New Guide
Guides are powered by Markdown (`.md`) files. The website automatically parses them and generates the URL structure.

**Location:** `content/guides/[category]/[slug].md`

**Example:** To create a guide on Nmap scanning, create the file at `content/guides/network/nmap-scanning-tutorial.md`. The URL will automatically be `/guides/network/nmap-scanning-tutorial`.

### Guide Metadata (Frontmatter)
Every guide must start with `---` separated YAML metadata:

```yaml
---
title: "Nmap Scanning Tutorial"
description: "A comprehensive guide to Nmap."
category: "network"
subcategory: "reconnaissance"
difficulty: "Intermediate"
readingTime: "15 min"
author: "Zentrion Research"
publishedDate: "2026-10-01"
updatedDate: "2026-10-01"
tags: ["Nmap", "Networking", "Recon"]
relatedGuides: ["wireshark-packet-analysis"]
relatedTools: ["port-scanner"]
relatedLabs: ["network-recon"]
---
```

## 2. How to Connect Related Resources
Use the `relatedGuides`, `relatedTools`, and `relatedLabs` arrays in the frontmatter. 
Provide the **slug** of the related resource (the final part of its URL). 
Example: If the tool URL is `/tools/port-scanner`, the slug is `port-scanner`.

## 3. How to Create a Tool
Tools must execute in the browser. 
1. Create a new Next.js page at `app/tools/[slug]/page.tsx`
2. Add a comprehensive description, a "How it works" section, and a Privacy Note explicitly stating that computation happens locally.
3. Add links to related guides or labs in the tool UI.

## 4. How to Create a Lab
Labs are interactive, browser-contained environments located at `app/labs/(workspace)/[slug]/page.tsx`.
1. Provide a scenario, learning objectives, and clear instructions.
2. Use `lib/learning-state.ts` (localStorage) to mark the lab as completed when the user succeeds.

## 5. How to Create a Roadmap
Roadmaps are visual learning paths located in `app/roadmaps/[slug]/page.tsx`.
Make sure every step in the roadmap connects to an *actual* Zentrion Guide, Tool, or Lab. Do not use placeholders.

## 6. How to Build Locally & Test
1. Run `npm run dev` to start the local development server.
2. Check your new guide at `http://localhost:3000/guides/[category]/[slug]`.
3. Before deploying, run a full production build locally to ensure there are no compilation errors:
   ```bash
   npm run build
   ```

## 7. How to Deploy to Cloudflare
Zentrion is a statically exported Next.js app (`output: export`).
1. Commit your markdown files or code changes to the `main` branch.
2. Push to GitHub: `git push origin main`.
3. Cloudflare Pages will automatically detect the commit, run `npm run build`, and deploy the static output to the global CDN edge.
