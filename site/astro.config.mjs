import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import rehypeDialogueVoices from './src/lib/rehype-dialogue-voices.mjs';

export default defineConfig({
  integrations: [mdx(), tailwind({ applyBaseStyles: false })],
  site: 'https://ai-tetsugaku-suru.vercel.app',
  markdown: {
    rehypePlugins: [rehypeDialogueVoices],
  },
});
