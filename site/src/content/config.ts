import { defineCollection, z } from 'astro:content';

const philosophy = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    tags: z.array(z.string()).optional(),
    // v2: 結晶は紐づく過程を持つ（SPEC §2.4 不変条件）。Phase 0 は optional とし、
    // 公開時の人間ゲート（論点N）で必須性を担保する。
    processRef: z.string().optional(),
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
    // v2: 過程の状態（SPEC §2.3 状態フィールド / §2.4）
    state: z.enum(['flowing', 'punctuated', 'suspended']).default('flowing'),
    masked: z.literal(true),
    draft: z.boolean().default(false),
  }),
});

export const collections = { philosophy, dialogues };
