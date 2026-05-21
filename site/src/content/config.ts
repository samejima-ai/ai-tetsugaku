import { defineCollection, z } from 'astro:content';

const philosophy = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const dialogues = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    recordedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    participants: z.array(z.string()).min(2),
    format: z.enum(['raw', 'summary', 'exegesis']),
    related: z.array(z.string()).optional(),
    masked: z.literal(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { philosophy, dialogues };
