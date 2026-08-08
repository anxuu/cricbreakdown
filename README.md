# CricBreakdown

Stat-first cricket analysis site — IPL breakdowns, stats deep-dives, and cricket history. Built with Astro + Tailwind CSS.

## Local development
```
npm install
npm run dev
```

## Build
```
npm run build
```
Output goes to `dist/`.

## Deploy
Push this repo to GitHub, then import it into Vercel or Cloudflare Pages —
both auto-detect Astro and deploy on every push. No manual build config needed.

## Adding a new article
Create a new `.md` file in `src/content/articles/` following the frontmatter
shape of the existing articles (title, description, category, tags, pubDate).
It will appear on the site automatically after the next deploy.

## Before going live
- Add your real AdSense snippet in `src/layouts/Layout.astro` (marked with a TODO comment)
- Update the contact email in `src/pages/contact.astro`
- Update dates and contact email in `privacy-policy.astro` and `terms.astro`
- Connect Google Search Console and submit `/sitemap-index.xml`
