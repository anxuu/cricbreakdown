# CricBreakdown Blog Publishing Template and Instructions

**Purpose:** This is the canonical instruction file to follow whenever preparing or publishing a blog for CricBreakdown. Read and follow it before editing or adding any article.

Repository: `anxuu/cricbreakdown`  
Stack: Astro, TypeScript, Tailwind CSS v4  
Production hosting: Vercel  
Main branch: `main`

## Important content rule

Do not rewrite, paraphrase, shorten, expand, fact-check, or otherwise change supplied article content unless explicitly asked. Preserve facts, statistics, names, numbers, opinions, wording, paragraphs, and headings. Only make formatting changes needed to render the article correctly.

## 1. Inspect the existing blog template first

Before making changes, inspect the current implementation of:

- `src/pages/articles/[...slug].astro`
- `src/components/ArticleCover.astro`
- `src/styles/global.css`
- `src/content/articles/`
- `src/content/config.ts` or the current Astro content schema
- Category pages
- `ArticleCard.astro`

Follow the latest implementation and existing reusable components. Do not create a separate design for a new article.

## 2. Article location and frontmatter

Article files belong in:

`src/content/articles/`

Use a clean, SEO-friendly filename/slug and follow the current content schema exactly. Do not invent unsupported frontmatter fields. Include every field required by the current schema.

Use the site's supported fields where applicable:

- `title`
- `description`
- `category`
- `tags`
- `author`
- `pubDate`
- `updatedDate`
- `featured`
- `metaTitle`
- `metaDescription`
- `categoryLabel`
- `cover`
- `coverAlt`
- `faq`

Check the schema before deciding whether optional fields such as `authorSlug` are supported.

## 3. SEO metadata

SEO metadata must never appear as visible article content.

If the input contains an SEO metadata section, map it as follows:

- Target keywords → tags/frontmatter
- Meta title → `metaTitle`
- Meta description → `metaDescription`
- Suggested URL slug → filename/slug

Do not leave the SEO metadata section in the article body.

## 4. Formatting and paragraph structure

Preserve the supplied article text. Only apply formatting changes needed for correct rendering.

### Bold lead-ins

Whenever there is a bold lead-in, put its explanation on the next line, with a paragraph break. Do not place the explanation on the same line as the lead-in.

Correct:

```md
**The scenario that helps India:**

Win in Colombo and hope Bangladesh lose...
```

Incorrect:

```md
**The scenario that helps India:** Win in Colombo and hope Bangladesh lose...
```

Apply this consistently throughout the article, including lead-ins such as `**The fields:**`, `**The bowling changes:**`, and `**Prediction:**`.

### Em dashes

Remove em dashes (`—`) from article content. Replace them with appropriate punctuation or sentence structure without changing meaning. Do not introduce new em dashes.

### Paragraph spacing

Keep paragraphs clearly separated. Add a proper visual paragraph gap before the explanation following a bold lead-in. Keep standalone short statements, such as `**The fields.**`, `**The bowling changes.**`, and `**Siraj and Prasidh.**`, visually separate from the following paragraph. Articles should be easy to scan on desktop and mobile.

## 5. Tables

Convert tab-separated or visually intended tables into proper Markdown tables, unless the existing article/template requires HTML table markup for a specific design.

Use existing CricBreakdown table styling. Tables should:

- Look clean on desktop.
- Scroll horizontally on mobile when necessary.
- Avoid unnecessary empty space.
- Size naturally when there are only a few columns.
- Use existing reusable table CSS.
- Avoid stretching a small two-column table unnecessarily across the full article width.

If an existing article uses the site's HTML table classes, follow that established pattern, such as:

```html
<div class="stats-table-wrapper">
  <table class="stats-table">
    ...
  </table>
</div>
```

If a table contains an image, preserve the image inside the table cell and make it responsive. Do not use manually spaced text as a table.

## 6. Cover image

If a Cloudinary cover image URL is provided, add it to frontmatter:

```yaml
cover: "IMAGE_URL"
coverAlt: "DESCRIPTIVE ALT TEXT"
```

Do not manually insert a duplicate `<figure>` cover into the Markdown article. The reusable `src/components/ArticleCover.astro` component must handle the cover.

Standard cover presentation:

- 1478 × 656 pixels
- Aspect ratio 1478 / 656
- Maximum width 840px
- Width 100%
- 24px border radius
- `object-fit: cover`
- Responsive

The standard order is: category/date metadata → H1 → gradient seam → cover image → article content.

## 7. FAQ: frontmatter only, never duplicate it in the body

This rule is important: **include article FAQs in one place only.**

- FAQs must be specific to the article.
- Put supplied FAQs in the frontmatter using the supported structure:

```yaml
faq:
  - question: "Question?"
    answer: "Answer."
```

- Let the existing reusable article template render the expandable FAQ design.
- Do not manually add another FAQ section or FAQ HTML in the Markdown body when the template already renders frontmatter FAQs.
- Never use another article's FAQs as a fallback.
- Do not duplicate the same FAQs in frontmatter and in the article body.
- Verify the existing template's FAQ behavior before changing shared components.

## 8. Blog header and recommendations

- Do not display the article description underneath the H1 if the current template does not do so.
- Do not add extra visible SEO text.
- Use the existing reusable **“You might also like”** recommendation carousel.
- Do not manually add recommendation cards inside an article unless specifically requested.

## 9. Category

Use only a valid category from the current schema. Current known categories are:

- `ipl`
- `international`
- `stats`
- `history`
- `teams`

Verify the current schema before publishing. If a category is genuinely intended to be supported but is missing, update the schema only when necessary and inspect the impact carefully.

The article should automatically appear in `/articles` and the relevant `/category/[category]` page through the existing implementation.

## 10. URL, canonical and structured data

Use the existing article URL pattern:

`https://www.cricbreakdown.com/articles/[slug]`

The existing article template should generate the canonical URL. Do not add a second canonical manually.

Use the existing BlogPosting structured data implementation. Ensure it provides the relevant fields:

- headline
- description
- datePublished
- dateModified
- author
- publisher
- articleSection
- keywords
- image
- canonical URL

Do not create duplicate structured data if the existing template already handles it.

## 11. Protect existing pages and components

- Inspect shared files carefully before modifying them.
- Reuse existing components where they already solve the requirement.
- Do not create article-specific hacks.
- Do not duplicate CSS unnecessarily.
- Do not duplicate cover HTML.
- Do not duplicate FAQ HTML.
- Do not change existing articles unless required for compatibility.

## 12. Final verification checklist

Before considering an article ready, verify:

- [ ] Article builds with the current Astro content schema.
- [ ] SEO metadata is not visible in the article body.
- [ ] Cover appears exactly once, through `ArticleCover.astro`, when supplied.
- [ ] Supplied article content remains unchanged except for required formatting.
- [ ] No em dashes remain when this rule applies.
- [ ] Bold lead-ins start on a new line and have proper paragraph spacing.
- [ ] Tables render correctly using existing styling.
- [ ] Tables do not create unnecessary empty space.
- [ ] FAQs are article-specific and stored in frontmatter only, not duplicated in the body.
- [ ] FAQ expand/collapse behavior works through the existing template.
- [ ] Category is valid.
- [ ] Article appears in `/articles` and its category page after publication.
- [ ] Canonical URL is correct.
- [ ] BlogPosting structured data uses the cover image when available.
- [ ] Existing articles remain unaffected.
- [ ] No duplicate components or CSS were created.

## 13. Git and publishing workflow

When the task is to publish an article, commit the completed article to `main` after verification. Use a clear commit message such as:

```bash
git add -A
git commit -m "content: publish [ARTICLE SHORT TITLE]"
git push origin main
```

Do not create a new branch unless explicitly requested. Confirm Vercel deployment status instead of claiming a page is live before deployment succeeds.

When the user asks only to save or update this instruction/template file, **do not create or update article pages and do not claim an article was published**. Only commit the requested documentation file.

## 14. Article inputs

The user may provide:

1. Article content
2. Cover image URL
3. Cover alt text
4. Target keywords
5. Meta title
6. Meta description
7. Suggested slug
8. FAQs, if available

Use these inputs as provided and follow the instructions above. If required information is missing, do not invent it.
