import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // superfícies (near-black desaturado, estilo Linear/Vercel)
        bg: '#08090b',
        surface: '#0e0f12',
        surface2: '#15171b',
        // texto
        ink: '#f5f5f6',
        sub: '#a1a1aa',
        faint: '#71717a',
        // acento único, usado com parcimônia
        accent: '#7c6cff',
        // marca (usada só nas telas simuladas dos apps, dentro do device)
        brandPurple: '#a855f7',
        brandPink: '#ec4899',
      },
      fontFamily: {
        sans: [
          '"Geist Variable"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
