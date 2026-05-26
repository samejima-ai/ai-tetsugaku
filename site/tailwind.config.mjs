/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        mincho: ['"Shippori Mincho"', '"Noto Serif JP"', 'Georgia', 'serif'],
        sans: ['"Noto Sans JP"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'xs': ['0.694rem', { lineHeight: '1.5' }],
        'sm': ['0.833rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.85' }],
        'md': ['1.2rem', { lineHeight: '1.5' }],
        'lg': ['1.44rem', { lineHeight: '1.4' }],
        'xl': ['1.728rem', { lineHeight: '1.4' }],
        // 大見出しはスマホで縮みPCで伸びる流体サイズ（clamp）
        '2xl': ['clamp(1.6rem, 1.2rem + 1.9vw, 2.074rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.85rem, 1.3rem + 2.6vw, 2.488rem)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
};
