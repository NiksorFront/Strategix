import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './src/pages/cms/**/*.{vue,js,ts}',
    './src/shared/ui/shadcn/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--strategix-gray)',
        input: 'var(--strategix-gray)',
        ring: 'var(--strategix-accent)',
        background: 'var(--strategix-light)',
        foreground: 'var(--strategix-dark)',
        primary: {
          DEFAULT: 'var(--strategix-accent)',
          foreground: 'var(--strategix-dark)',
        },
        secondary: {
          DEFAULT: 'var(--strategix-accent-light)',
          foreground: 'var(--strategix-dark)',
        },
        muted: {
          DEFAULT: 'var(--strategix-light)',
          foreground: 'var(--strategix-gray)',
        },
        accent: {
          DEFAULT: 'var(--strategix-accent)',
          foreground: 'var(--strategix-light)',
        },
        destructive: {
          DEFAULT: 'var(--strategix-dark)',
          foreground: 'var(--strategix-light)',
        },
        popover: {
          DEFAULT: 'var(--strategix-light)',
          foreground: 'var(--strategix-dark)',
        },
        card: {
          DEFAULT: 'var(--strategix-light)',
          foreground: 'var(--strategix-dark)',
        },
      },
      borderRadius: {
        lg: 'var(--card-radius)',
        md: 'calc(var(--card-radius) - 4px)',
        sm: 'calc(var(--card-radius) - 8px)',
      },
      boxShadow: {
        soft: '0 6px 40px rgba(32,34,38,0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;

export default config;
