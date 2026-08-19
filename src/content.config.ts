import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['ipl', 'international', 'stats', 'history', 'teams']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Ansar'),
    authorSlug: z.string().default('ansar'),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    featured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    categoryLabel: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { articles };
